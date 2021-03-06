function BuyProductModal(selector) {
    var $self = $(selector),
        $successMsg = $self.find('.order-success-msg'),
        UIModal = UI.Modal.create(selector, {centerY: true}),
        orderCounter = UI.Counter.create($(selector).find('#order-counter'));

    function addDataToRequest(counter) {
        return function(_, request, options) {
            if (counter.val() == 0)
                request.abort();

            options.url += '&amount=' + counter.val();
        }
    }

    function showThanks() {
        var hideFn = function() {
            $successMsg.css('visibility', 'hidden');
        };

        $successMsg.css('visibility', 'visible');
        setTimeout(hideFn, 3000);
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
            $orderBtn.off('click').on('click', showThanks);
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