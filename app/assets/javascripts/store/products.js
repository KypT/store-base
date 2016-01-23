window.Products = (function () {
    var products = {};

    return {
        get: function (id) {
            var deferred = $.Deferred();

            if (products[id]) {
                setTimeout(function() {
                    deferred.resolve(products[id]);
                }, 0);
            }
            else {
                $.getJSON('/items/' + id).done(function(product) {
                    products[id] = product;
                    deferred.resolve(product);
                });
            }

            return deferred;
        },

        init: function($products) {
            if (typeof($products) === 'undefined')
                $products = $('.product');

            $products.click(function () {
                ModalManager.open('product-show', this.getAttribute('data-id'));
            });

            ModalManager.init($products);

            setTimeout(function () {
                $products.addClass('show');
            }, 0);
        },

        imageFor: function (item) {
            if (item.images.length > 0)
                return item.images[0].file.url;
            return '/assets/missing-image.png';
        },

        path: function(product) {
            return '/items/' + product.id + '/' + product.name.replace(/ /g, '_');
        }
    }
}());