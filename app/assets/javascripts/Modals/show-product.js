function ShowProductModal($modal) {
    var $showModal = $('.show-product-modal'),
        $buyModal = $('.buy-product-modal'),
        ShowUIModal = UI.Modal.create($showModal, {centerY: true}),
        buyCounter = UI.Counter.create($showModal.find('#buy-counter')),
        sliderContainer = $('.slider-container'),
        sliderReady = false;

    var $buyGroup   = $showModal.find('.buy-menu'),
        $orderGroup = $showModal.find('.order-menu'),
        flag = 0;

    $showModal.find('.modal-switch').click(function() {
        if (flag = (flag + 1) % 2) {
            $buyGroup.addClass('hide');
            $orderGroup.removeClass('hide');
        }
        else {
            $buyGroup.removeClass('hide');
            $orderGroup.addClass('hide');
        }
    });

    function buyBtnClicked() {
        var $this = $(this);
        $this.text('Спасибо! Товар добавлен в корзину');

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

    function initSlider() {
        console.log('initializing slider');
        var slider =  sliderContainer.find('.slider');
        slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });

        var sliderNav = sliderContainer.find('.slider-nav');
        sliderNav.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider',
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });
    }

    function fillSlider(product) {

        console.log(sliderContainer.find('.slider').slick('getSlick'));

        function imageHtml(url) {
            return '<div><img src = "'+ url +'"></div>';
        }

        while(true) {
            var slide = sliderContainer.find('.slider').slick('slickCurrentSlide');

            sliderContainer.find('.slider').slick('slickRemove', slide);
            sliderContainer.find('.slider-nav').slick('slickRemove', slide);
            if (slide == 0) break;
        }

        product.images.forEach(function(image) {
            sliderContainer.find('.slider').slick('slickAdd', imageHtml(image.file.url));
        });

        product.images.forEach(function(image) {
            sliderContainer.find('.slider-nav').slick('slickAdd', imageHtml(image.file.url));
        });

        sliderContainer.find('.slider').slick('slickGoTo', 0);
        sliderContainer.find('.slider-nav').slick('slickGoTo', 0);
    }

    function prepare(product) {
        if (!sliderReady) {
            initSlider();
            sliderReady = true;
        }

        fillSlider(product);
        $showModal.find('.modal-product-name').text(product.name);
        $showModal.find('.amount-info span').text(product.stock);
        $showModal.find('.price').text(product.price);
        $showModal.find('.more-amount').data('target', '.cart-counter-' + product.id);

        if (product.description.length > 0)
            $showModal.find('.description').text(product.description);
        else
            $showModal.find('.description').text('Steampunk inspired brooch, representing a tricky mix of Cheshire cats sly smile and a Mad Hatter. Hand-painted on wood with acrylics.<br><br>* Materials: wood, acrylic paint, glossy varnish.<br>* Measurements: 55x40mm.<br>* All goods are carefully packaged in proprietary envelopes and bags, wrapped in several layers of protective film and will be mailed in a mailing bag or in a box (if it is something delicate).<br>* NEW ACTION: Free cute postcard included with each order! Look for details: <a href="https://www.etsy.com/ru/listing/226400813/free-card-included-with-each-order" target="_blank">https://www.etsy.com/listing/226400813/free-card-included-with-each-order</a><br.');

        if (product.stock > 0) {
            $showModal.find('.empty-stock-message').addClass('hide');
            $showModal.find('.stock-message').removeClass('hide');
        }
        else {
            $showModal.find('.empty-stock-message').removeClass('hide');
            $showModal.find('.stock-message').addClass('hide');
        }

        $showModal.find('.less-amount').data('target', '.cart-counter-' + product.id);
        $showModal.find('.amount-counter').addClass('cart-counter-' + product.id).text(1);

        var $buyBtn = $showModal.find('.buy-button');

        $buyBtn.off('ajax:beforeSend').on('ajax:beforeSend', addAmountToRequest(buyCounter));
        $buyBtn.off('ajax:success').on('ajax:success', buyBtnClicked);
        $buyBtn[0].search = "?id=" + product.id + '&type=stocked';
        $buyBtn.text('Купить');

        if (product.stock > 0) {
            buyCounter.config({max: product.stock});
        }

        buyCounter.reset();

        if (window.Admin != undefined) {
            var url = Products.path(product),
                product_tags = product.tags.map(function(val) { return val.name }).join(', '),
                product_collection = product.category?  product.category.name : '';
            Admin.activateDropZone($showModal.find('form.file-upload-zone'), url, function() {
                location.reload();
            });
            $showModal.find('*[contenteditable="true"]').attr('data-url', url);
            $showModal.find('.modal-tags input[data-attr="tags"]').val(product_tags);
            $showModal.find('.modal-tags input[data-attr="category"]').val(product_collection);
        }
        else {
            $showModal.find('.modal-tags').html(tags(product));
        }
    }

    function addAmountToRequest(counter) {
        return function(_, request, options) {
            options.url += '&amount=' + counter.val();
        }
    }

    function hide() {
        if (!ShowUIModal.visible()) return;
        ShowUIModal.hide();
    }

    return {
        show: function() {
            ShowUIModal.show();
        },

        prepare: function(product) {
            prepare(product);
        },

        visible: function() {
            return ShowUIModal.visible();
        },

        hide: hide
    }
}