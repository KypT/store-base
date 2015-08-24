//= require store/Content
//= require store/Cart

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