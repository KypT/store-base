window.Admin = (function() {

    activateEditables();
    activateFileUploadZones();

    function activateFileUploadZones() {
        var $zones = $('form.file-upload-zone');
        $zones.change(function (e) {
            var form = e.target.form,
                formData = new FormData(form);
            $.ajax({
                url: form.getAttribute('action'),
                type: 'POST',
                data: formData,
                processData: false,
                cache: false,
                contentType: false
            });
        })
    }

    function activateEditables() {
        var $editables = $('*[contenteditable=true]');

        if ($editables.length > 0) {
            $editables.blur(function() {
                var $this = $(this),
                    url = $this.attr('data-url'),
                    attr = $this.attr('data-attr'),
                    val = $.trim($this.text());

                updateAttribute(url, attr, val);
            })
        }
    }

    function updateAttribute(url, attr, value) {
        var data = {};
        data[attr] = value;
        $.ajax(url, {data: data, method: 'put'});
    }

    return {
        upload: function () {
            var $form = $('form.file-upload-zone'),
                formData = new FormData($form[0]);
            $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: formData,
                processData: false,
                cache: false,
                contentType: false
            });
        }
    }
}());
