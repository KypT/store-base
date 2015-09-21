//= require UI/all
//= require pages/all
//= require Modals/cart
//= require Modals/product
//= require store/Content
//= require store/products

$(function() {
    window.Modal = new ProductModal();
    window.Cart = new CartModal();

    function activateObjectFit() {
        if (window.objectFit)
            objectFit.polyfill({
                selector: 'img.cover',
                fittype: 'cover',
                disableCrossDomain: 'false'
            });
    }

    activateObjectFit();
    UI.initModal4Products($('.product'));
});