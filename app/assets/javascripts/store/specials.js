window.Specials = (function() {
    function specials() {
        return $('.special');
    }

    function special(type) {
        return $('.special.' + type);
    }

    function nextSpecial() {
        var next = special('current').next('.special');
        if (next.length > 0)
            return next;
        else
            return specials().first();
    }

    function prevSpecial() {
        var prev = special('.current').prev('.special');
        if (prev.length > 0)
            return prev;
        else
            return specials().last();
    }

    return {
        next: function() {
            var prev = special('prev'),
                cur = special('current'),
                next = special('next');

            prev.removeClass('prev');
            cur.removeClass('current').addClass('prev');
            next.removeClass('next').addClass('current');
            nextSpecial().addClass('next');
        },
        prev: function() {
            special('current').removeClass('current').addClass('prev');
            special('next').removeClass('next').addClass('current');
        }
    }
}());