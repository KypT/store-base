window.UI = (function () {
    return {
        initModal4Products: function ($products) {
            $products.click(function () {
                var product = Products.get(this.getAttribute('data-id'));
                Modal.show(product)
            });
        },

        addShowEffectToProducts: function ($products) {
            setTimeout(function () {
                $products.addClass('show');
            }, 300);
        }
    }
}());