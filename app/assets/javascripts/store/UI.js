window.UI = (function() {
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

    function contentContainer() {
        return $('.store-products');
    }

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
            tagSelect = function(id) { return '.collection[data-id=' + id + ']' };

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
        $tags.find(selector).fadeOut({ done: function() { $(this).removeClass('active'); }});
    }

    function switchTag(from, to) {
        $tags.find(from).fadeOut({ done: function() { $(this).removeClass('active'); $tags.find(to).fadeIn().addClass('active'); }});
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

    function loadTab(_, data) {
        $storeContainer.html(data.responseText);
        Content.reset();
        initStoreSlider();
    }

    function initStoreSlider() {
        $('.get-prev').click( function() { Content.load(Content.page - 1); });
        $('.get-next').click( function() { Content.load(Content.page + 1); });
    }

    return {
        init: function() {
            bindDropdownTo($collectionsDropdown, $toggleCollections);
            bindDropdownTo($categoriesDropdown, $toggleCategories);
            $toggleCategories.click(clearTags);
            $toggleCollections.click(clearTags);
            $tabs.bind('ajax:complete', loadTab);
            $tabs.click(clearTags);
            $('.store-btn.show-cart').click( Cart.toggle );
            $tagButtons.click( tagHandler );
            $collectionButtons.click( collectionHandler );
            $tags.find('.tag').click(tagHandler);
            $tags.find('.collection').click(collectionHandler);
            initStoreSlider();
        },

        display: function(content) {
            contentContainer().html(content);
        }
    }
}());