window.Controls = (function() {
    var $storeControls = $('.store-controls'),
        $toggleCollections = $storeControls.find('.collections .store-btn'),
        $toggleCategories = $storeControls.find('.categories .store-btn'),
        $collectionsDropdown = $storeControls.find('.collections .dropdown'),
        $categoriesDropdown = $storeControls.find('.categories .dropdown'),
        $tagButtons = $('.tag-buttons .tag'),
        $tags = $('.tags'),
        $loadPrev = $('.get-prev'),
        $loadNext = $('.get-next');

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

    return {
        init: function() {
            bindDropdownTo($collectionsDropdown, $toggleCollections);
            bindDropdownTo($categoriesDropdown, $toggleCategories);
            $tagButtons.click( tagHandler );
            $tags.find('.tag').click(function() { removeTag(this.getAttribute('id')) });
            $loadPrev.click( Content.loadPrevProducts );
            $loadNext.click( Content.loadNextProducts );
        }
    }
}());