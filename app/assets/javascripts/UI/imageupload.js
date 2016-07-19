$(function() {
    var $imageUpload = $('.image-upload-cnt'),
        reviewImage = $('.image-upload input'),
        $preview = $imageUpload.find('.img-preview-cnt'),
        max = $imageUpload.data('max');

    function addImagePreview(e) {
        var imagePreview = $('<div class="img-preview"><img src="'+ e.target.result +'"></div>');
        $preview.append(imagePreview);
    }

    reviewImage.change(function() {
        if (this.files) {
            $preview.empty();

            for (var i = 0; i < this.files.length && i < max; i++) {
                var reader = new FileReader();
                reader.onload = addImagePreview;
                reader.readAsDataURL(this.files[i]);
            }
        }
    });
});