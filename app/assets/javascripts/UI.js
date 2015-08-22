window.Products = (function () {
    var $productModal = $('.products.modal');

    function getProduct(id) {
        for (var i = 0; i < products.length; i++)
            if (products[i].id == id) return products[i];
    }

    function imageFor(item) {
        if (item.images.length > 0)
            return item.images[0].file.url;
        return '';
    }

    function showProductModal() {
        var productId = this.getAttribute('data-id'),
            product = getProduct(productId);
        $productModal.modal('show');
        $productModal.find('.modal-product-name').text(product.name);
        $productModal.find('.modal-product-price span').text(product.price);
        $productModal.find('.more-amount').data('target', '.cart-counter-' + product.id);
        $productModal.find('.less-amount').data('target', '.cart-counter-' + product.id);
        $productModal.find('.amount-counter').addClass('cart-counter-' + product.id);
        $productModal.find('.modal-product-images').css('background-image', 'url(' + imageFor(product) + ')');
        $productModal.find('.buy-button')[0].search = "?id=" + product.id + '&type=stocked';
        $productModal.find('.order-button')[0].search = "?id=" + product.id + '&type=copy';
    }

    return {
        init: function () {
            var $products = $('.product.product-data');
            setTimeout( function () {$products.addClass('show');}, 300);
            $products.click( showProductModal );
        }
    }
}());

window.Cart = (function() {
    var $cart = $('.cart.modal'),
        $wrapper = $('.modal-wrapper'),
        $cartCounter = $('.cart .items-counter');

    $(document).click(function(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            hide();
    });

    $('.close-cart').click(hide);

    $cart.find('.section').each(function(_, s) {
        var $section = $(s);
        if (sectionIsEmpty($section))
            hideSection($section);
    });


    function visible() {
        return $wrapper.hasClass('show');
    }

    function hide() {
        $wrapper.removeClass('show');
        setTimeout(function () { $wrapper.css({display: 'none'})}, 300);
    }

    function show() {
        $wrapper.css({display: 'block'});
        setTimeout(function() { $wrapper.addClass('show')}, 0);
    }

    function hideProduct(id, type) {
        $cart.find('.' + type + ' .cart.product[data-id="' + id +'"]').remove();
    }

    function hideSection($section) {
        $section.addClass('hide');
        updateCart();
    }

    function showSection($section) {
        $section.removeClass('hide');
        updateCart();
    }

    function sectionIsEmpty($section) {
        return $section.find('.product').length == 0;
    }

    function updateCart() {
        if ($cart.find('.product').length == 0)
            showEmptyCartMessage();
        else
            hideEmptyCartMessage();
    }

    function showEmptyCartMessage() {
        $cart.find('.empty-cart-message').removeClass('hide');
        $cart.find('.checkout').addClass('hide');
    }

    function hideEmptyCartMessage() {
        $cart.find('.empty-cart-message').addClass('hide');
        $cart.find('.checkout').removeClass('hide');
    }

    return {
        toggle: function() {
            if (visible()) hide();
            else show();
        },

        addProduct: function(html, type) {
            var $section = $cart.find('.' + type);
            $section.find('.products').append(html);
            if (!sectionIsEmpty($section))
                showSection($section);
        },

        updateProduct: function(id, type, amount) {
            var $section = $cart.find('.' + type);
            if (amount == 0) hideProduct(id, type);
            $section.find('#cart-counter-' + id).text(amount);
            if (sectionIsEmpty($section))
                hideSection($section);
        },

        updateTotal: function(total) {
            $cart.find('.total').text(total);
        },

        updateIcon: function(count) {
            if (count == 0) {
                $cartCounter.addClass('hide');
            }
            else {
                $cartCounter.removeClass('hide');
                $cartCounter.text(count);
            }
        }
    }
}());