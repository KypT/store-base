//= require Modals/all

window.ModalManager = (function() {
    var $wrapper = $('.modal-wrapper');

    var modals = {
        'product-show': new ShowProductModal('.show-product-modal'),
        'product-buy':  new BuyProductModal('.buy-product-modal'),
        'product-edit': new EditProductModal('.edit-product-modal'),
        'cart':         new CartModal()
    };

    function wrapperClicked(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            manager.close();
    }

    var activeModal = function() {
        var modal = undefined;
        for (var name in modals) {
            if (modals[name].visible())
                modal = modals[name];
        }

        if (modal)
            return modal;
        else
            return false;
    };

    var manager = {
        open: function(modalName, arg) {
            if (modalName === undefined)
                return activeModal();

            var modal = activeModal();
            if (modal)
                modal.hide();

            modals[modalName].show(arg);
        },

        close: function() {
            for (var modal in modals) {
                modals[modal].hide();
            }

            var url = history.state;
            if (url && url.substr(0, 6) == '/items')
                url = '/store';

            history.pushState(null, null, url);
        },

        init: function($html) {
            $html.click(function() {
                manager.open(this.getAttribute('data-modal'), this.getAttribute('data-arg'));
            });
        }
    };

    manager.init($('.open-modal'));
    document.addEventListener('click', wrapperClicked);

    return manager;
}());
