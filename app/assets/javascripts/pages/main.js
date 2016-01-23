window.Cart = new CartModal();

$(function() {
    function activateObjectFit() {
        if (window.objectFit)
            objectFit.polyfill({
                selector: 'img.cover',
                fittype: 'cover',
                disableCrossDomain: 'false'
            });
    }

    activateObjectFit();
    Products.init();
});