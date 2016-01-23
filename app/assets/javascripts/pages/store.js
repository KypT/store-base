//= require store/Content

window.Store = (function() {
    var $controls = $('.store-controls'),
        $subMenu = $controls.find('.sub-menu'),
        $content = $('.content'),
        $tabs = $controls.find('.tabs'),
        $tagBtn = $controls.find('.tag'),
        $stockCheck = $controls.find('input[type="checkbox"]');

    $tagBtn.click(tagHandler);
    $tabs.find('li').click(tabHandler);
    $stockCheck.change(function() {
        Content.stocked($stockCheck[0].checked);
    });

    if ($tabs.find('#tags-tab').is('.active')) {
        $subMenu.slideDown();
    }

    window.addEventListener("popstate", function() {
        location.reload();
    });

    window.addEventListener("scroll", function() {
        if  ($(document).height() - $(window).height() - $(window).scrollTop() <= 100) {
            Content.load();
        }
    });


    function tagHandler() {
        var $this = $(this),
            id = $this.data('id');
        if (!Content.tagged(id)) {
            history.pushState(null,  null, '/store/' + $this.text());
            $tagBtn.removeClass('active');
            $this.addClass('active');
            Content.tag(id);
        }
        else {
            history.pushState(null,  null, '/store');
            $this.removeClass('active');
            Content.untag();
        }
    }

    function tabHandler() {
        var $this = $(this);

        if ($this.is('.active')) return;

        $tabs.find('.active').removeClass('active');
        $this.addClass('active');

        var url = $this.data('url');
        history.pushState(null, null, url);
        $content.load(url, null, function() {
            Products.init();
        });

        if ($this.is('.tags')) {
            $tagBtn.removeClass('active');
            $subMenu.slideDown();
        }
        else {
            $subMenu.slideUp();
        }
    }

    function productsContainer() {
        return $('.products.catalog');
    }

    return {
        displayContent: function(html, uri) {
            $content.html(html);
            Products.init();
            if (uri) history.pushState(null, null, uri);
        },

        appendProducts: function(html) {
            productsContainer().append(html);
            Products.init($('.product:not(.show)'));
        },

        clearProducts: function() {
            productsContainer().empty();
        }
    }
}());