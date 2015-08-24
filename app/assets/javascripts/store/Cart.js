window.Cart = (function() {
    var $cart = $('.cart.modal'),
        $wrapper = $('.modal-wrapper'),
        $cartCounter = $cart.find('.items-counter');

    $(document).click(function(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            hide();
    });

    $('.close-cart').click(hide);

    UI.Counter.cart($cart.find('.amount-control'));

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
            var $section = $cart.find('.' + type),
                $product = $(html);
            $section.find('.products').append($product);
            UI.Counter.cart($product.find('.amount-control'));
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