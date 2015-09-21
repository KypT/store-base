function CartModal() {
    var $cart = $('.cart.modal'),
        UIModal = UI.Modal.create($cart),
        $cartCounter = $('.items-counter');

    $('.close-cart').click(hide);
    $('.cart-icon').click(toggle);

    $(document).click(function(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            hide();
    });

    $cart.find('.cart-product').each(function(ind, val) {
        initCartCounter($(val));
    });

    $cart.find('.section').each(function(_, s) {
        var $section = $(s);
        if (sectionIsEmpty($section))
            hideSection($section);
    });

    function toggle() {
        if (visible()) hide();
        else show();
    }

    function initCartCounter($product) {
        var $counter = $product.find('.counter'),
            product = Products.get(parseInt($product.data('id'))),
            type = $product.data('type'),
            options = {};

        if (type == 'stocked')
            options = {max: product.stock};

        var counter = UI.Counter.create($counter, options);

        $counter.find('.less-btn, .more-btn').on('click', function() {
            $.get('/cart/new', { id: product.id, type: type, amount:  counter.val()});
        });
    }

    function visible() {
        return UIModal.visible();
    }

    function hide() {
        if (!UIModal.visible()) return;
        $cart.animate({right: -500}, 300, 'swing');
        UIModal.hide();
    }

    function show() {
        $cart.animate({right: 0}, 300, 'swing');
        UIModal.show();
    }

    function hideProduct(id, type) {
        $cart.find('.' + type + ' .cart-product[data-id="' + id +'"]').remove();
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
        return $section.find('.cart-product').length == 0;
    }

    function updateCart() {
        if ($cart.find('.cart-product').length == 0)
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
        toggle: toggle,

        addProduct: function(html, type) {
            var $section = $cart.find('.' + type),
                $product = $(html);

            $section.find('.products').append($product);
            initCartCounter($product);
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
                $cartCounter.text(count);
            }
            else {
                $cartCounter.removeClass('hide');
                $cartCounter.text(count);
            }
        }
    }
}