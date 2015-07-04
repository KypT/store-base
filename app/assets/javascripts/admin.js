//= require util.js

function updateAttribute(url, attr, value) {
    var data = {};
    data[attr] = value;
    $.ajax(url, {data: data, method: 'put'});
}

function activateAdminMode() {
    var $editables = $('.editable');

    if ($editables.length > 0) {
        $editables.blur(function() {
            var $this = $(this),
                url = $this.attr('data-url'),
                attr = $this.attr('data-attr'),
                val = $this.html();

            updateAttribute(url, attr, val);
        })
    }
}

$(activateAdminMode);