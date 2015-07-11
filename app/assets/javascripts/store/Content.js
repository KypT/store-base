window.Content = (function() {
    var $container = $('.store-products'),
        loadAmount = 8,
        lowerBound = 0,
        upperBound = 999,
        offset = 0,
        tags = [];

    function displayResults(data) {
        if (data.length > 0)
            $container.html(data);
        else
            offset -= loadAmount;
    }

    function loadProducts() {
        $.get('/store/get?offset=' + offset + '&limit=' + loadAmount,
            {
                offset: offset,
                limit: loadAmount,
                tags: tags
            },
            displayResults);
    }

    return {
        setLoadAmount: function(val) { loadAmount = val; },
        setUpperBound: function(val) { upperBound = val; },

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