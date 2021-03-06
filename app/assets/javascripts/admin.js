window.Admin = (function() {

    $(function() {
        activateEditables();
        activateCKEDITOR();
    });

    function activateCKEDITOR() {
        CKEDITOR.disableAutoInline = true;

        $('.ckeditor').each(function(_, edit) {
            var postUrl = $(edit).data('url');
            var attr = $(edit).data('attr');
            var editor = CKEDITOR.replace(edit);
            editor.url = postUrl;
            editor.attr = attr;
        });

        for (var inst in CKEDITOR.instances) {
            CKEDITOR.instances[inst].on('blur', function() {
                var url = this.url,
                    attr = this.attr,
                    val = this.getData();

                updateAttribute(url, attr, val);
            });
        }
    }

    function activateEditables() {
        var $editables = $('*[contenteditable=true]');

        if ($editables.length > 0) {
            $editables.blur(function() {
                var $this = $(this),
                    url = $this.attr('data-url'),
                    attr = $this.attr('data-attr'),
                    val = undefined;

                if ($this.is('input')) val = $this.val();
                else val = $.trim($this.text());

                updateAttribute(url, attr, val);
            })
        }
    }

    function updateAttribute(url, attr, value) {
        var data = {};
        data[attr] = value;
        $.ajax({
            url: url,
            type: 'POST',
            data: data
        });
    }

    return {
        updateAttribute: updateAttribute,

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
        },

        activateDropZone: function($form, url, callback) {
            $form.off('change').on('change', function (e) {
                var form = e.target.form,
                    formData = new FormData(form);
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    success: callback,
                    processData: false,
                    cache: false,
                    contentType: false
                });
            })
        }
    }
}());