window.Controls = (function() {
    var $storeControls = $('.store-controls'),
        $toggleCollections = $storeControls.find('.collections .store-btn'),
        $toggleCategories = $storeControls.find('.categories .store-btn'),
        $collectionsDropdown = $storeControls.find('.collections .dropdown'),
        $categoriesDropdown = $storeControls.find('.categories .dropdown'),
        $tagButtons = $('.tag-buttons .tag'),
        $tags = $('.tags'),
        $loadPrev = $('.get-prev'),
        $loadNext = $('.get-next'),
        $tabs = $storeControls.find('a'),
        $storeContainer = $('.store-content'),
        $productModal = $('.products.modal');

    function tagHandler() {
        var $this = $(this),
            tag = $this.html();

        if (TagSystem.contains(tag)) removeTag(tag);
        else addTag(tag);
    }

    function removeTag(tag) {
        $tags.find('#' + tag + '.tag').fadeOut({ done: function() { $(this).removeClass('active'); }});
        TagSystem.remove(tag);
    }

    function addTag(tag) {
        $tags.find('#' + tag + '.tag').fadeIn().addClass('active');
        TagSystem.add(tag);
    }

    function bindDropdownTo($dropdown, $trigger) {
        var onmouseleave = function(){
            var $this = $(this),
                timeoutId = setTimeout(function(){ $dropdown.fadeOut(200); }, 200);
            $trigger.data('timeoutId', timeoutId);
        };
        var onmouseenter = function(){
            clearTimeout($trigger.data('timeoutId'));
            $dropdown.fadeIn(200);
        };
        $dropdown.mouseleave(onmouseleave);
        $dropdown.mouseenter(onmouseenter);
        $trigger.mouseleave(onmouseleave);
        $trigger.mouseenter(onmouseenter);
    }

    function showProductModal() {
        var productId = this.getAttribute('data-id'),
            product = Content.getProduct(productId);
        $productModal.modal('show');
        $productModal.find('.product-name').html(product.name);
        $productModal.find('.product-image').css('background-image', 'url(' + Content.getImage(productId) + ')');
    }

    function loadTab(_, data) {
        $storeContainer.html(data.responseText);
    }

    return {
        init: function() {
            bindDropdownTo($collectionsDropdown, $toggleCollections);
            bindDropdownTo($categoriesDropdown, $toggleCategories);
            $tagButtons.click( tagHandler );
            $tags.find('.tag').click(function() { removeTag(this.getAttribute('id')) });
            $loadPrev.click( Content.loadPrevProducts );
            $loadNext.click( Content.loadNextProducts );
            $tabs.bind('ajax:complete', loadTab);
        },
        initProducts: function() {
            var $products = $('.product');
            $products.click( showProductModal );
        }
    }
}());