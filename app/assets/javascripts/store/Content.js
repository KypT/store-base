window.Content = (function() {
    var tag = null,
        category = null,
        searchQuery = null,
        pageCapacity = 100;

    function generateTags() {
        return tag ? [tag] : [];
    }

    return {
        page: 0,
        tag: function(t) {
            tag = t;
            this.load();
        },
        untag: function() {
            tag = null;
            Content.load();
        },
        tagged: function(t) {
            return t == tag;
        },
        category: function (cat) {
            if (arguments.length == 0) return category;
            category = cat;
            this.load();
        },
        like: function(words) {
            searchQuery = words;
            this.load();
        },
        reset: function() {
            tags = [];
            category = null;
            searchQuery = null;
            pageCapacity = 100;
            this.load();
        },
        load: function(page) {
            page = page || 0;
            if (page < 0) page = 0;
            $.get('/store/get', {
                    offset: page * pageCapacity, limit: pageCapacity,
                    tags: generateTags(), category: category,
                    search: searchQuery
                });
        }
    }
}());