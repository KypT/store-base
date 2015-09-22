window.Content = (function() {
    var tags = [],
        category = null,
        searchQuery = null,
        pageCapacity = 8;

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
window.Specials = (function() {
    function specials() {
        return $('.special');
    }

    function special(type) {
        return $('.special.' + type);
    }

    function nextSpecial() {
        var next = special('current').next('.special');
        if (next.length > 0)
            return next;
        else
            return specials().first();
    }

    function prevSpecial() {
        var prev = special('.current').prev('.special');
        if (prev.length > 0)
            return prev;
        else
            return specials().last();
    }

    return {
        next: function() {
            var prev = special('prev'),
                cur = special('current'),
                next = special('next');

            prev.removeClass('prev');
            cur.removeClass('current').addClass('prev');
            next.removeClass('next').addClass('current');
            nextSpecial().addClass('next');
        },
        prev: function() {
            special('current').removeClass('current').addClass('prev');
            special('next').removeClass('next').addClass('current');
        }
    }
}());




$(function() {
    UI.init();
    Content.load();
});
