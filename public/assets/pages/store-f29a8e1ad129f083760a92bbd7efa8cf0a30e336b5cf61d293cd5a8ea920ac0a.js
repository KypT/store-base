window.Content = (function() {
    var tag = null,
        category = null,
        searchQuery = null,
        pageCapacity = 100;

    function generateTags() {
        return tag ? [tag] : [];
    }

    return {
        page: 0,
        tag: function(t) {
            tag = t;
            this.load();
        },
        untag: function() {
            tag = null;
            Content.load();
        },
        tagged: function(t) {
            return t == tag;
        },
        category: function (cat) {
            if (arguments.length == 0) return category;
            category = cat;
            this.load();
        },
        like: function(words) {
            searchQuery = words;
            this.load();
        },
        reset: function() {
            tags = [];
            category = null;
            searchQuery = null;
            pageCapacity = 100;
            this.load();
        },
        load: function(page) {
            page = page || 0;
            if (page < 0) page = 0;
            $.get('/store/get', {
                    offset: page * pageCapacity, limit: pageCapacity,
                    tags: generateTags(), category: category,
                    search: searchQuery
                });
        }
    }
}());
window.Cart = (function() {
    var $cart = $('.cart.modal'),
        $wrapper = $('.modal-wrapper'),
        $cartCounter = $cart.find('.items-counter');

    $(document).click(function(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            hide();
    });

    $('.close-cart').click(hide);

    UI.Counter.create($cart.find('.amount-control'));

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

    function addAmountToRequest(_, request, options) {
        var count = parseInt($(this.getAttribute('data-target')).text());
        options.url += '&amount=' + count;
    }

    return {
        toggle: function() {
            if (visible()) hide();
            else show();
        },

        addProduct: function(html, type) {
            var $section = $cart.find('.' + type),
                $product = $(html),
                $counter = $product.find('.amount-control');

            $section.find('.products').append($product);
            UI.Counter.create($counter, 0, 10);
            $counter.find('a').bind('ajax:beforeSend', addAmountToRequest);
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



window.Store = (function() {
    var $store = $('.store'),
        $modal = $('.products.modal'),
        $content = $store.find('.content'),
        $tagButtons = $store.find('.tag'),
        $toggleCollections = $store.find('.collections'),
        $collectionsDropdown = $store.find('.collections .dropdown');

    Content.load();
    UI.Dropdown.create($collectionsDropdown, $toggleCollections);
    $tagButtons.click(tagHandler);

    function tagHandler() {
        var id = $(this).data('id');
        if (!Content.tagged(id))
            Content.tag(id);
    }

    return {
        displayProducts: function($productsHtml) {
            $content.removeClass('collections container');
            $content.html($productsHtml);
            var $products = $('.product');
            UI.addShowEffectToProducts($products);
            UI.initModal4Products($products, $modal);
        },

        displayCollection: function($collection) {
            $content.addClass('collections container');
            $content.html($collection);
            var $products = $('.product');
            UI.addShowEffectToProducts($products);
            UI.initModal4Products($products, $modal);
        }
    }
}());
