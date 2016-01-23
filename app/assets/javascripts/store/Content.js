window.Content = (function() {
    var tag = null,
        category = null,
        stocked = false,
        searchQuery = null,
        pageCapacity = 12,
        page = 1;

    function generateTags() {
        return tag ? [tag] : [];
    }

    return {
        stocked: function(val) {
            stocked = val;
            page = 1;
            Store.clearProducts();
            this.load();
        },
        tag: function(t) {
            tag = t;
            page = 1;
            Store.clearProducts();
            Content.load();
        },
        untag: function() {
            tag = null;
            page = 1;
            Store.clearProducts();
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
        load: function() {
            $.get('/store/get', {
                offset: page * pageCapacity, limit: pageCapacity,
                tags: generateTags(), category: category,
                search: searchQuery, stocked: stocked
            }).always(function(result) {
                if (result.status = 200) {
                    Store.appendProducts(result.responseText);
                }
            });
            page += 1;
        }
    }
}());