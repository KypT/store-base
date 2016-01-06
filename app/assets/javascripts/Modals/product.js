//= require Modals/buy-product.js
//= require Modals/show-product.js

function ProductModal() {
    var showModal = new ShowProductModal('.show-product-modal'),
        buyModal  = new BuyProductModal('.buy-product-modal');

    var wrapperClicked = function(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            productModal.hide();
    };

    var productModal = {
        show: function(product) {
            document.addEventListener('click', wrapperClicked);
            showModal.prepare(product);
            buyModal.prepare(product);
            showModal.show(product);
            history.pushState(location.pathname, null, Products.path(product));
        },

        'switch': function() {
            if (showModal.visible()) {
                showModal.hide();
                buyModal.show();
            }
            else {
                buyModal.hide();
                showModal.show();
            }
        },

        hide: function() {
            showModal.hide();
            buyModal.hide();

            document.removeEventListener('click', wrapperClicked);
            var url = history.state;
            if (url && url.substr(0, 6) == '/items')
                url = '/store';

            history.pushState(null, null, url);
        }
    };

    $('.switch-product-modal').click(function() {
        productModal.switch();
    });

    return productModal;
}