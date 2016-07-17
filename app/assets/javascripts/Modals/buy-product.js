function BuyProductModal(selector) {
    var $self = $(selector),
        UIModal = UI.Modal.create(selector, {centerY: true}),
        orderCounter = UI.Counter.create($(selector).find('#order-counter'));

    function addDataToRequest(counter) {
        return function(_, request, options) {
            if (counter.val() == 0)
                request.abort();

            options.url += '&amount=' + counter.val();
        }
    }

    var buyModal = {
        show: function(product) {
            Products.get(product).done(function(product) {
                if ($self.length == 0) {
                    console.log('Product modal not found');
                    return;
                }

                buyModal.prepare(product);
                UIModal.show();
            });
        },

        prepare: function(product) {
            var $modal = $(selector),
                $orderBtn = $modal.find('.order-button');

            $self.find('.open-modal[data-modal="product-show"]').attr('data-arg', product.id);
            $orderBtn[0].search = "?id=" + product.id + '&type=copy';
            $self.find('.price').text(product.price);
            $orderBtn.off('ajax:beforeSend').on('ajax:beforeSend', addDataToRequest(orderCounter));
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