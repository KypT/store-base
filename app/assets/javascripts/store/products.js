window.Products = (function () {
    var products = [];

    return {
        set: function (prod) {
            products = prod;
        },

        get: function (id) {
            for (var i = 0; i < products.length; i++)
                if (products[i].id == id) return products[i];
        },

        init: function() {
            var $products = $('.product');

            $products.click(function () {
                var product = Products.get(this.getAttribute('data-id'));
                ModalManager.open('product-show', product);
            });

            setTimeout(function () {
                $products.addClass('show');
            }, 300);
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