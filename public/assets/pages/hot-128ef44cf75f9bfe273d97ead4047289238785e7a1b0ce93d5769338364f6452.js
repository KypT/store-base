$(function() {
    var $products = $('.product.product-data'),
        $modal = $('.products.modal');

    UI.addShowEffectToProducts($products);
    UI.initModal4Products($products, $modal);
});
