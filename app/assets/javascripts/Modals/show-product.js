function ShowProductModal() {
    var $showModal = $('.show-product-modal'),
        ShowUIModal = UI.Modal.create($showModal, {centerY: true}),
        buyCounter = UI.Counter.create($showModal.find('#buy-counter')),
        $slider = $showModal.find('.slider'),
        $sliderNav = $showModal.find('.slider-nav'),
        $nextImg = $showModal.find('.next-image'),
        $prevImg = $showModal.find('.prev-image'),
        slider = undefined,
        sliderNav = undefined;

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
        $(".buy-success-msg").show();
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

    function initSlider(product) {
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });

        $slider.addClass('full-height');
        sliderNav = undefined;

        if (product.images.length > 1) {
            $slider.removeClass('full-height');
            $prevImg.show();
            $nextImg.show();

            $sliderNav.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider',
                dots: false,
                centerMode: true,
                focusOnSelect: true
            });
            sliderNav = $sliderNav.slick('getSlick');
        } else {
            $prevImg.hide();
            $nextImg.hide();
        }

        slider = $slider.slick('getSlick');

        $nextImg.off('click').on('click', function () { slider.next(); });
        $prevImg.off('click').on('click', function() { slider.prev(); });
    }

    function fillSlider(product) {
        slider.unslick();

        if (sliderNav)
            sliderNav.unslick();

        function imageHtml(url) {
            return '<div><img src = "'+ url +'"></div>';
        }

        $slider.empty();
        $sliderNav.empty();

        product.images.forEach(function(image) {
            var imageTag = imageHtml(image.file.url),
                thumbTag = imageHtml(image.file.thumb.url);
            $slider.append(imageTag);
            if (product.images.length > 1)
                $sliderNav.append(thumbTag);
        });

        initSlider(product);
        setTimeout(function () {
            slider.setPosition();
            if (sliderNav)
                sliderNav.setPosition();
        }, 0)
    }

    function prepare(product) {
        if (slider == undefined) {
            initSlider(product);
        }

        fillSlider(product);
        $showModal.find('.open-modal[data-modal="product-buy"]').attr('data-arg', product.id);
        $showModal.find('.details .name').text(product.name);
        $showModal.find('.link.open-modal').attr('data-arg', product.id);
        $showModal.find('.stock-amount').text(product.stock);
        $showModal.find('.price').text('Цена: ' + product.price + '₽');
        $showModal.find('.more-amount').data('target', '.cart-counter-' + product.id);
        $showModal.find('.description').html(product.description);
        $showModal.find('.buy-success-msg').hide();

        if (product.stock > 0) {
            var $buyBtn = $showModal.find('.buy-button');
            $showModal.find('.buy-panel').show();
            buyCounter.config({max: product.stock});
            $buyBtn.off('ajax:beforeSend').on('ajax:beforeSend', addAmountToRequest(buyCounter));
            $buyBtn.off('ajax:success').on('ajax:success', buyBtnClicked);
            $buyBtn[0].search = "?id=" + product.id + '&type=stocked';
            $buyBtn.text('Купить');
            $showModal.find('.less-amount').data('target', '.cart-counter-' + product.id);
            $showModal.find('.amount-counter').addClass('cart-counter-' + product.id).text(1);
        }
        else {
            $showModal.find('.buy-panel').hide();
        }


        buyCounter.reset();
        $showModal.find('.product-tags').html(tags(product));
    }

    function addAmountToRequest(counter) {
        return function(_, request, options) {
            options.url += '&amount=' + counter.val();
            if (counter.val() == 0)
                request.abort();
        }
    }

    function hide() {
        if (!ShowUIModal.visible()) return;
        ShowUIModal.hide();
    }

    var showModal = {
        show: function(product) {
            if (typeof(product) != "object" && typeof(+product) == "number")
                Products.get(product).done(function(product) {
                    prepare(product);
                    ShowUIModal.show();

                    if (location.pathname != Products.path(product)) {
                        history.pushState(location.pathname, null, Products.path(product));
                    }
                });

        },

        visible: function() {
            return ShowUIModal.visible();
        },

        hide: hide
    };

    return showModal;
}