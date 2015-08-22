$(function() {
    var $increaseBtn = $('.more-amount'),
        $decreaseBtn = $('.less-amount');

    function addAmountToRequest(_, request, options) {
        var count = getCount($(this.getAttribute('data-target')));
        if (count == 0) request.abort();
        else options.url += '&amount=' + count;
    }

    function getCount($counter) {
        return parseInt($counter.text());
    }

    $decreaseBtn.click(function() {
        var $counter = $(this.getAttribute('data-target')),
            count = getCount($counter);
        if (--count < 0) count = 0;
        $counter.text(count);
    });

    $increaseBtn.click(function() {
        var $counter = $(this.getAttribute('data-target'));
        $counter.text(getCount($counter) + 1);
    });

    $('.btn.buy-button').bind('ajax:beforeSend', addAmountToRequest);
    $('.btn.order-button').bind('ajax:beforeSend', addAmountToRequest);
    $('.amount-control a').bind('ajax:beforeSend', addAmountToRequest);
});