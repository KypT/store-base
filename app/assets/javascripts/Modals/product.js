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
                if (product.images.length == 0) return;
                if (product.images.length <= ++imageId) imageId = 0;
                setImage(product.images[imageId].file.url);
            },

            prev: function() {
                if (product.images.length == 0) return;
                if (imageId <= 0) imageId = product.images.length;
                setImage(product.images[--imageId].file.url);
            }
        }
    }

    function tags(product) {
        function categoryTag(cat) {
            if (cat.special) return specialTag(cat);
            return "<a href='/store/" + cat.name + "' class = 'tag'>" + cat.name + "</a>";
        }

        function collectionTag(col) {
            return "<a href='/store/collections/" + col.id + "' class = 'collection'>" + col.name + "</a>";
        }

        function specialTag(spe) {
            return "<a href='/store/specials/" + spe.special_id + "' class = 'special'>" + spe.name + "</a>";
        }

        var result = '';

        if (product.tags)
            result = product.tags.map( categoryTag ).join('');
        if (product.category)
            result += collectionTag(product.category);

        return result;
    }

    function prepare(product) {
        imageSlder = new ImageSlider(product);
        $modal.find('.img-container .left').click(imageSlder.prev);
        $modal.find('.img-container .right').click(imageSlder.next);
        $modal.find('.modal-product-name').text(product.name);
        $modal.find('.amount-info span').text(product.stock);
        $modal.find('.price').text(product.price);
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
            var url = '/items/' + product.name,
                product_tags = product.tags.map(function(val) { return val.name }).join(', '),
                product_collection = product.category?  product.category.name : '';
            $modal.find('form.file-upload-zone').attr('action', url);
            $modal.find('*[contenteditable="true"]').attr('data-url', url);
            $modal.find('.modal-tags input[data-attr="tags"]').val(product_tags);
            $modal.find('.modal-tags input[data-attr="category"]').val(product_collection);
        }
        else
        {
            $modal.find('.modal-tags').html(tags(product));
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
            if ($modal.length == 0) {
                console.log('Product modal not found');
                return;
            }
            prepare(product);
            history.pushState(location.pathname, null, '/items/' + product.name);
            UIModal.show();
        },

        hide: hide
    }
}