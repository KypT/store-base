window.TagSystem = (function() {
    var tags = [];

    return {
        add: function(tag) {
            tags.push(tag);
            Content.init(tags);
        },
        remove: function(tag) {
            tags.splice(tags.indexOf(tag), 1);
            Content.init(tags);
        },
        contains: function(tag) {
            return tags.indexOf(tag) != -1;
        }
    }
}());