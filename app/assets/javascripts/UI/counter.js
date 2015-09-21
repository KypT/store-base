window.UI.Counter = (function () {
    return {
        create: function($counter, settings) {
            var $dec = $counter.find('.less-btn'),
                $inc = $counter.find('.more-btn'),
                $val = $counter.find('.count'),
                callback = undefined;

            var options = {
                max: Infinity,
                min: 0
            };

            config(settings);

            function inc(a) { return a + 1 }
            function dec(a) { return a - 1 }

            function config(settings) {
                if (settings != undefined) {
                    var keys = Object.keys(settings);
                    for (var i = 0; i < keys.length; i++)
                        options[keys[i]] = settings[keys[i]];
                }
            }

            function count(op) {
                return function() {
                    var count = parseInt($val.text());
                    count = op(count);

                    if (count > options.max) count = options.max;
                    if (count < options.min) count = options.min;

                    if (count > options.max) $inc.addClass('disabled');
                    if (count <=  options.max) $inc.removeClass('disabled');

                    $val.text(count);
                    if (callback) callback($counter, count);
                }
            }

            $dec.off('click').on('click', count(dec));
            $inc.off('click').on('click', count(inc));

            return {
                val: function(val) {
                    if (val) $val.text(val);
                    else return parseInt($val.text());
                },

                config: config,

                click: function(foo) {
                    callback = foo;
                },

                reset: function() {
                    $val.text(options.min);
                }
            }
        }
    }
}());