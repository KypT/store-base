window.Admin = (function() {

    $(function() {
        activateEditables();
        activateCKEDITOR();
    });

    function activateCKEDITOR() {
        CKEDITOR.disableAutoInline = true;

        $('.ckeditor').each(function(_, edit) {
            CKEDITOR.replace(edit);
        });

        for (var inst in CKEDITOR.instances) {
            CKEDITOR.instances[inst].on('blur', function() {
                var url = $('.article').data('url'),
                    attr = 'content',
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
            data: data,
            method: 'put'});
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
        },

        activateDropZone: function($form, url, callback) {
            $form.change(function (e) {
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