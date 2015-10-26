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

    window.addEventListener("popstate", function(e) {
        if (e.state != null)
            Modal.hide();
    });

    window.addEventListener("popstate", function(e) {
        location.reload();
    });

    function tagHandler() {
        var $this = $(this),
            id = $this.data('id');
        if (!Content.tagged(id)) {
            history.pushState(null,  null, '/store/' + $this.text());
            $tagBtn.removeClass('active');
            $this.addClass('active');
            Content.tag(id);
            Content.load();
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

        if ($this.is('.tags')) {
            history.pushState(null,  null, '/store');
            $tagBtn.removeClass('active');
            Content.untag();
            $subMenu.slideDown();
        }
        else {
            var url = $this.data('url');
            history.pushState(null, null, url);
            $content.load(url);
            $subMenu.slideUp();
        }
    }

    return {
        displayContent: function(html, uri) {
            $content.html(html);
            Products.init();
            if (uri) history.pushState(null, null, uri);
        }
    }
}());