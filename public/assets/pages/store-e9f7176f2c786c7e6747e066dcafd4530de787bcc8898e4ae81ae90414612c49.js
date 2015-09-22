window.Content = (function() {
    var tags = [],
        category = null,
        searchQuery = null,
        pageCapacity = 16;

    return {
        page: 0,
        tag: function(tag) {
            if (!this.tagged(tag))
                tags.push(tag);
            this.load();
        },
        untag: function(tag) {
            tags.splice(tags.indexOf(tag), 1);
            this.load();
        },
        tagged: function(tag) {
            return tags.indexOf(tag) > -1;
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
            pageCapacity = 8;
            this.load();
        },
        load: function(page) {
            page = page || 0;
            if (page < 0) page = 0;
            $.get('/store/get', {
                    offset: page * pageCapacity, limit: pageCapacity,
                    tags: tags, category: category,
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
    var $storeControls = $('.store-controls'),
        $toggleCollections = $storeControls.find('.collections .store-btn'),
        $toggleCategories = $storeControls.find('.categories .store-btn'),
        $collectionsDropdown = $storeControls.find('.collections .dropdown'),
        $categoriesDropdown = $storeControls.find('.categories .dropdown'),
        $tagButtons = $('.tag-buttons .tag'),
        $collectionButtons = $('.collections .collection'),
        $tags = $('.tags'),
        $tabs = $storeControls.find('a'),
        $storeContainer = $('.store-content');

    Content.load();
    UI.Dropdown.create($collectionsDropdown, $toggleCollections);
    UI.Dropdown.create($categoriesDropdown, $toggleCategories);
    $toggleCategories.click(clearTags);
    $toggleCollections.click(clearTags);
    $tabs.bind('ajax:complete', loadTab);
    $tabs.click(clearTags);
    $('.store-btn.show-cart').click(Cart.toggle);
    $tagButtons.click(tagHandler);
    $collectionButtons.click(collectionHandler);
    $tags.find('.tag').click(tagHandler);
    $tags.find('.collection').click(collectionHandler);
    initStoreSlider();

    function tagHandler() {
        var id = $(this).data('id'),
            tagSelect = '.tag[data-id=' + id + ']';

        if (!Content.tagged(id)) {
            showTag(tagSelect);
            Content.tag(id);
        }
        else {
            hideTag(tagSelect);
            Content.untag(id);
        }
    }

    function collectionHandler() {
        var id = $(this).data('id'),
            tagSelect = function (id) {
                return '.collection[data-id=' + id + ']'
            };

        if (Content.category() == undefined) {
            showTag(tagSelect(id));
            Content.category(id);
        }
        else {
            if (Content.category() != id) {
                switchTag(tagSelect(Content.category()), tagSelect(id));
                Content.category(id);
            }
            else {
                hideTag(tagSelect(id));
                Content.category(undefined);
            }
        }
    }

    function clearTags() {
        Content.reset();
    }

    function showTag(selector) {
        $tags.find(selector).fadeIn().addClass('active');
    }

    function hideTag(selector) {
        $tags.find(selector).fadeOut({
            done: function () {
                $(this).removeClass('active');
            }
        });
    }

    function switchTag(from, to) {
        $tags.find(from).fadeOut({
            done: function () {
                $(this).removeClass('active');
                $tags.find(to).fadeIn().addClass('active');
            }
        });
    }

    function loadTab(_, data) {
        $storeContainer.html(data.responseText);
        Content.reset();
        initStoreSlider();
    }

    function initStoreSlider() {
        $('.get-prev').click(function () {
            Content.load(Content.page - 1);
        });
        $('.get-next').click(function () {
            Content.load(Content.page + 1);
        });
    }

    return {
        displayProducts: function($productsHtml) {
            var $container = $('.store-products'),
                $modal = $('.products.modal');
            $container.html($productsHtml);

            var $products = $('.product.product-data');
            UI.addShowEffectToProducts($products);
            UI.initModal4Products($products, $modal);
        }
    }
}());
