window.Content = (function() {
    var $container = $('.store-products'),
        loadAmount = 8,
        lowerBound = 0,
        upperBound = 999,
        offset = 0,
        tags = [],
        products = [],
        images = [];

    function loadProducts() {
        $.get('/store/get?offset=' + offset + '&limit=' + loadAmount,
            {
                offset: offset,
                limit: loadAmount,
                tags: tags
            });
    }

    return {
        setLoadAmount: function(val) { loadAmount = val; },
        setUpperBound: function(val) { upperBound = val; },

        displayResults: function(data) {
        if (data.length > 0)
            $container.html(data);
        else
            offset -= loadAmount;
        },

        initProducts: function(data) {
            products = JSON.parse(data);
            Controls.initProducts();
        },

        getProduct: function(id) {
            return products.filter(function(val){ return val.id == id })[0];
        },

        initImages: function(data) {
            images = JSON.parse(data);
        },

        getImage: function(id) {
            return images.filter(function(val) { return val[0] == id })[0][1];
        },

        loadNextProducts: function() {
            if (offset + loadAmount <= upperBound) {
                offset += loadAmount;
                loadProducts();
            }
        },
        loadPrevProducts: function() {
            if (offset - loadAmount >= lowerBound) {
                offset -= loadAmount;
                loadProducts();
            }
        },
        init: function(_tags) {
            tags = _tags;
            offset = 0;
            loadProducts();
        }
    }
}());