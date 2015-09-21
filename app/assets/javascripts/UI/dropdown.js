window.UI.Dropdown = (function () {
    return {
        create: function ($dropdown, $trigger) {
            var onmouseleaveHander = function () {
                var $this = $(this),
                    timeoutId = setTimeout(function () {
                        $dropdown.fadeOut(200);
                    }, 200);
                $trigger.data('timeoutId', timeoutId);
            };
            var clickHandler = function () {
                clearTimeout($trigger.data('timeoutId'));
                $dropdown.fadeIn(200);
            };
            $dropdown.mouseleave(onmouseleaveHander);
            $dropdown.click(clickHandler);
            $trigger.mouseleave(onmouseleaveHander);
            $trigger.click(clickHandler);
        }
    }
}());