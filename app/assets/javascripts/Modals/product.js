function ProductModal() {
    var $modal = $('.products.modal'),
        UIModal = UI.Modal.create($modal, {centerY: true}),
        buyCounter = UI.Counter.create($modal.find('#buy-counter')),
        orderCounter = UI.Counter.create($modal.find('#order-counter')),
        imageSlder = null;

    $(document).click(function(e) {
        if ($(e.target).hasClass('modal-wrapper'))
            hide();
    });

    var $buyGroup   = $modal.find('.buy-menu'),
        $orderGroup = $modal.find('.order-menu'),
        flag = 0;

    $modal.find('.modal-switch').click(function() {
        if (flag = (flag + 1) % 2) {
            $buyGroup.addClass('hide');
            $orderGroup.removeClass('hide');
        }
        else {
            $buyGroup.removeClass('hide');
            $orderGroup.addClass('hide');
        }
    });

    function ImageSlider(product) {
        var $img = $modal.find('.product-image'),
            imageId = 0;

        setImage(Products.imageFor(product));

        function setImage(image) {
            $img.attr('src', image);
        }

        return {
            next: function() {
                if (product.images.length <= ++imageId) imageId = 0;
                setImage(product.images[imageId].file.url);
            },

            prev: function() {
                if (imageId <= 0) imageId = product.images.length;
                setImage(product.images[--imageId].file.url);
            }
        }
    }

    function tags(product) {
        var result = product.tags.map( function(val) { return "<span class = 'tag'>" + val.name + "</span> " } );
        if (product.category)
            return result + "<span class = 'collection'>" + product.category.name + "</span>";
        else
            return result;
    }

    function prepare(product) {
        imageSlder = new ImageSlider(product);
        $modal.find('.img-container .left').click(imageSlder.prev);
        $modal.find('.img-container .right').click(imageSlder.next);
        $modal.find('.modal-product-name').text(product.name);
        $modal.find('.amount-info span').text(product.stock);
        $modal.find('.price').text(product.price);
        $modal.find('.modal-tags').html(tags(product));
        $modal.find('.more-amount').data('target', '.cart-counter-' + product.id);

        if (product.description.length > 0)
            $modal.find('.modal-product-description > p').text(product.description);
        else
            $modal.find('.modal-product-description > p').text('Описание отсутствует');

        if (product.stock > 0) {
            $modal.find('.empty-stock-message').addClass('hide');
            $modal.find('.stock-message').removeClass('hide');
        }
        else {
            $modal.find('.empty-stock-message').removeClass('hide');
            $modal.find('.stock-message').addClass('hide');
        }

        $modal.find('.less-amount').data('target', '.cart-counter-' + product.id);
        $modal.find('.amount-counter').addClass('cart-counter-' + product.id).text(1);

        var $buyBtn = $modal.find('.buy-button'),
            $orderBtn = $modal.find('.order-button');

        $buyBtn.off('ajax:beforeSend').on('ajax:beforeSend', addAmountToRequest(buyCounter));
        $buyBtn[0].search = "?id=" + product.id + '&type=stocked';
        $orderBtn.off('ajax:beforeSend').on('ajax:beforeSend', addAmountToRequest(orderCounter));
        $orderBtn[0].search = "?id=" + product.id + '&type=copy';

        if (product.stock > 0) {
            buyCounter.config({max: product.stock});
            $modal.find('.buy-menu').removeClass('hide');
            $modal.find('.order-menu').addClass('hide');
        }
        else {
            $modal.find('.order-menu').removeClass('hide');
            $modal.find('.buy-menu').addClass('hide');
        }

        orderCounter.reset();
        buyCounter.reset();

        if (window.Admin != undefined) {
            var url = '/items/' + product.name;
            $modal.find('form.file-upload-zone').attr('action', url);
            $modal.find('*[contenteditable="true"]').attr('data-url', url);
        }
    }

    function addAmountToRequest(counter) {
        return function(_, request, options) {
            options.url += '&amount=' + counter.val();
        }
    }

    function hide() {
        if (!UIModal.visible()) return;
        var url = history.state;
        if (url.substr(0, 6) == '/items')
            url = '/store';

        history.pushState(null, null, url);
        UIModal.hide();
    }

    return {
        show: function(product) {
            prepare(product);
            history.pushState(location.pathname, null, '/items/' + product.name);
            UIModal.show();
        },

        hide: hide
    }
}