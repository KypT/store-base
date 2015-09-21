window.UI.Modal = (function () {
    return {
        create: function ($modal, settings) {
            var $body = $('body'),
                $wrapper = $('.modal-wrapper');

            var options = { centerY: false };
            config(settings);

            function config(settings) {
                if (settings != undefined) {
                    var keys = Object.keys(settings);
                    for (var i = 0; i < keys.length; i++)
                        options[keys[i]] = settings[keys[i]];
                }
            }

            function centerY() {
                if ($body.height() < $wrapper.height())
                    $body.height($wrapper.height());

                var diff = $wrapper.height() - $modal.height();
                if (diff > 0) {
                    $modal.css('margin-top', diff / 2 );
                }
                else {
                    $modal.removeAttr('style');
                }
            }

            return {
                visible: function() {
                    return $modal.hasClass('show');
                },

                hide: function() {
                    $wrapper.removeClass('show');
                    $modal.removeClass('show');
                    $body.removeClass('modal-showing');
                },

                show: function () {
                    $wrapper.addClass('show');
                    $modal.addClass('show');
                    $body.addClass('modal-showing');
                    if (options.centerY) centerY();
                }
            }
        }
    }
}());