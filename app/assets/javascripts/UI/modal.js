window.UI.Modal = (function () {
    return {
        create: function (selector, settings) {
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
                var $modal = $(selector);
                if ($body.height() < $wrapper.height())
                    $body.height($wrapper.height());

                console.log($wrapper.height());
                console.log($modal.height());

                var diff = $wrapper.height() - $modal.height();
                console.log(diff);

                if (diff > 0) {
                    $modal.css('margin-top', diff / 2 );
                }
                else {
                    $modal.removeAttr('style');
                }
            }

            return {
                visible: function() {
                    var $modal = $(selector);
                    return $modal.hasClass('show');
                },

                hide: function() {
                    var $modal = $(selector);
                    $wrapper.removeClass('show');
                    $modal.removeClass('show');
                    $body.removeClass('modal-showing');
                },

                show: function () {
                    var $modal = $(selector);
                    $wrapper.addClass('show');
                    $modal.addClass('show');
                    $body.addClass('modal-showing');
                    if (options.centerY) centerY();
                }
            }
        }
    }
}());