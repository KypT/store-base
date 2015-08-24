window.UI = (function () {
    return {
        initModal4Products: function ($products, $modal) {
            var modal = UI.Modal.create($modal);
            $products.click(modal.show);
            return modal;
        },

        addShowEffectToProducts: function ($products) {
            setTimeout(function () {
                $products.addClass('show');
            }, 300);
        },

        Counter: (function () {
            function addAmountToRequest(_, request, options) {
                var count = parseInt($(this.getAttribute('data-target')).text());
                options.url += '&amount=' + count;
            }

            function getCount($counter) {
                return parseInt($counter.text());
            }

            function initDecreaseBtn($btn, min) {
                $btn.click(decreaseCounter(min));
            }

            function initIncreaseBtn($btn) {
                $btn.click(increaseCounter);
            }

            function decreaseCounter(min) {
                return function() {
                    var $counter = $(this.getAttribute('data-target')),
                        count = getCount($counter);
                    if (--count < min) count = min;
                    $counter.text(count);
                }
            }

            function increaseCounter() {
                var $counter = $(this.getAttribute('data-target'));
                $counter.text(getCount($counter) + 1);
            }

            return {
                modal: function ($counter) {
                    initIncreaseBtn($counter.find('.more-amount'));
                    initDecreaseBtn($counter.find('.less-amount'), 1);
                },
                cart: function ($counter) {
                    initIncreaseBtn($counter.find('.more-amount'));
                    initDecreaseBtn($counter.find('.less-amount'), 0);
                    $counter.find('a').bind('ajax:beforeSend', addAmountToRequest);
                }
            }
        }()),

        Dropdown: (function () {
            return {
                create: function ($dropdown, $trigger) {
                    var onmouseleave = function () {
                        var $this = $(this),
                            timeoutId = setTimeout(function () {
                                $dropdown.fadeOut(200);
                            }, 200);
                        $trigger.data('timeoutId', timeoutId);
                    };
                    var onmouseenter = function () {
                        clearTimeout($trigger.data('timeoutId'));
                        $dropdown.fadeIn(200);
                    };
                    $dropdown.mouseleave(onmouseleave);
                    $dropdown.mouseenter(onmouseenter);
                    $trigger.mouseleave(onmouseleave);
                    $trigger.mouseenter(onmouseenter);
                }
            }
        }()),

        Modal: (function () {
            function addAmountToRequest(_, request, options) {
                var count = parseInt($(this.getAttribute('data-target')).text());
                options.url += '&amount=' + count;
            }

            return {
                create: function ($modal) {
                    var modalCounter = $modal.find('.amount-control'),
                        modalBuyButton = $modal.find('.buy-button'),
                        modalOrderButton = $modal.find('.order-button');

                    UI.Counter.modal(modalCounter);
                    modalBuyButton.bind('ajax:beforeSend', addAmountToRequest);
                    modalOrderButton.bind('ajax:beforeSend', addAmountToRequest);

                    return {
                        show: function () {
                            var productId = this.getAttribute('data-id'),
                                product = Products.get(productId);
                            $modal.find('*[contenteditable="true"]').attr('data-url', '/store/' + product.name);
                            $modal.find('.modal-product-name').text(product.name);
                            $modal.find('.modal-product-price span').text(product.price);
                            $modal.find('.more-amount').data('target', '.cart-counter-' + product.id);
                            $modal.find('.modal-product-description > p').text(product.description);
                            $modal.find('.less-amount').data('target', '.cart-counter-' + product.id);
                            $modal.find('.amount-counter').addClass('cart-counter-' + product.id).text(1);
                            $modal.find('.modal-product-images').css('background-image', 'url(' + Products.imageFor(product) + ')');
                            $modal.find('.buy-button')[0].search = "?id=" + product.id + '&type=stocked';
                            $modal.find('.order-button')[0].search = "?id=" + product.id + '&type=copy';
                            $modal.modal('show');
                        }
                    }
                }
            }
        }())
    }
}());