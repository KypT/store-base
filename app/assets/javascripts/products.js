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

        imageFor: function (item) {
            if (item.images.length > 0)
                return item.images[0].file.url;
            return '';
        }
    }
}());