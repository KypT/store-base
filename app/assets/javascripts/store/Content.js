window.Content = (function() {
    var tags = [],
        category = null,
        searchQuery = null,
        pageCapacity = 8;

    return {
        page: 0,
        tag: function(tag) {
            if (!this.tagged(tag))
                tags.push(tag);
            this.load();
        },
        untag: function(tag) {
            tags.splice(tags.indexOf(tag), 1);
            this.load();
        },
        tagged: function(tag) {
            return tags.indexOf(tag) > -1;
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
            pageCapacity = 8;
            this.load();
        },
        load: function(page) {
            page = page || 0;
            if (page < 0) page = 0;
            $.get('/store/get', {
                    offset: page * pageCapacity, limit: pageCapacity,
                    tags: tags, category: category,
                    search: searchQuery
                });
        }
    }
}());