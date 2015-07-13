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
        $trigger.click(function() {
            $dropdown.fadeToggle(200);
        });
        $dropdown.mouseleave(function() {
            setTimeout(function() { $dropdown.fadeOut(200); }, 100);
        });
    }

    function showProductModal() {
        var productId = this.getAttribute('data-id'),
            product = Content.getProduct(productId);
        $productModal.modal('show');
        $productModal.find('.product-name').html(product.name);
        $productModal.find('.product-image').css('background-image', 'url(' + Content.getImage(productId) + ')');
    }

    return {
        init: function() {
            bindDropdownTo($collectionsDropdown, $toggleCollections);
            bindDropdownTo($categoriesDropdown, $toggleCategories);
            $tagButtons.click( tagHandler );
            $tags.find('.tag').click(function() { removeTag(this.getAttribute('id')) });
            $loadPrev.click( Content.loadPrevProducts );
            $loadNext.click( Content.loadNextProducts );
        },
        initProducts: function() {
            var $products = $('.product');
            $products.click( showProductModal );
        }
    }
}());