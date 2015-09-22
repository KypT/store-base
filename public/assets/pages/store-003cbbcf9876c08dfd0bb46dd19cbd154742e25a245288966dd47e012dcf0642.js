window.Store = (function() {
    var $controls = $('.store-controls'),
        $subMenu = $controls.find('.sub-menu'),
        $content = $('.content'),
        $tabs = $controls.find('.tabs'),
        $tagBtn = $controls.find('.tag'),
        $products = $('.product'),
        $modalWrapper = $('.products.modal-wrapper'),
        modal = UI.Modal.create($modalWrapper);

    $tagBtn.click(tagHandler);
    $tabs.find('.btn').click(tabHandler);

    UI.addShowEffectToProducts($products);

    window.addEventListener("popstate", function(e) {
        if (e.state != null)
            modal.hide();
    });

    if (window.product)
        modal.show(product);

    window.addEventListener("popstate", function(e) {
        location.reload();
    });

    function tagHandler() {
        var id = $(this).data('id');
        if (!Content.tagged(id))
            Content.tag(id);
    }

    function tabHandler() {
        var $this = $(this);

        if ($this.is('.active')) return;

        $tabs.find('.active').removeClass('active');
        $this.addClass('active');

        if ($this.is('.tags.btn')) {
            history.pushState(null,  null, '/store');
            Content.load();
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
            var $products = $('.product');
            UI.addShowEffectToProducts($products);
            UI.initModal4Products($products, $modal);
            if (uri) history.pushState(null, null, uri);
        }
    }
}());
