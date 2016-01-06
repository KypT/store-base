function BuyProductModal(selector) {
    var UIModal = UI.Modal.create(selector, {centerY: true}),
        orderCounter = UI.Counter.create($(selector).find('#order-counter'));

    function addAmountToRequest(counter) {
        return function(_, request, options) {
            options.url += '&amount=' + counter.val();
        }
    }

    var buyModal =  {
        show: function() {
            var $modal = $(selector);
            if ($modal.length == 0) {
                console.log('Product modal not found');
                return;
            }
            UIModal.show();
        },

        prepare: function(product) {
            var $modal = $(selector),
                $orderBtn = $modal.find('.order-button');

            $orderBtn[0].search = "?id=" + product.id + '&type=copy';
            $orderBtn.off('ajax:beforeSend').on('ajax:beforeSend', addAmountToRequest(orderCounter));
            orderCounter.reset();
        },

        visible: function() {
            return UIModal.visible();
        },

        hide: function() {
            if (!UIModal.visible()) return;
            UIModal.hide();
        }
    };

    return buyModal;
}