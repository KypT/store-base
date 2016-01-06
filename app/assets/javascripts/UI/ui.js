window.UI = (function () {
    var $subscription = $('.subscription'),
        $subscriptionBtn = $subscription.find('.subscribe');


    $subscription.on('ajax:complete', function(_, data) {
        var response = JSON.parse(data.responseText);
        if (response.result == 'ok')
            $subscription.find('h2').text('Спасибо!');
        else
            $subscription.find('h2').text('Упс, что-то пошло не так. Пожалуйста, повторите позже');

    });

    return {};
}());