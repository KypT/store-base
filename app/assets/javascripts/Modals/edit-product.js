function EditProductModal(selector) {
    var $this = $(selector),
        editUIModal = UI.Modal.create($this, {centerY: true});

    function productImage(product, image) {
        return  '<div class="img-cnt" data-id="'+ image.id +'">' +
                '<img src="'+ image.file.url +'">' +
                '<div class="remove"><a data-remote="true" data-confirm="Точно?" data-method="delete" href="/items/'+ product.id +'/image/'+ image.id +'">Удалить</div>' +
                '</div>';
    }

    function prepare(product) {
        var url = Products.path(product);

        $this.find('.modal-product-name').text(product.name);
        $this.find('.description').text(product.description);
        $this.find('.stock').text(product.stock);
        $this.find('.price').text(product.price);
        $this.find('*[contenteditable="true"]').attr('data-url', url);

        var $images = $this.find('.edit-images .images');
        product.images.forEach(function(image) {
            var $image = productImage(product, image);
            $images.append($image);
        });

        $images.sortable();
        $images.disableSelection();

        Admin.activateDropZone($this.find('form.file-upload-zone'), url, function() {
            location.reload();
        });

        $this.find('.save-order').click(function() {
            var order = [];

            $images.find('.img-cnt').each(function(_, image) {
                var id = image.getAttribute('data-id');
                order.push(id);
            });

            $.post('/items/' + product.id + '/images', {order: order});
        });
    }

    var editModal = {
        show: function(id) {
            console.log(id);
            var product = Products.get(id);
            prepare(product);
            editUIModal.show();
        },

        prepare: function(product) {
            editUIModal(product);
        },

        visible: function() {
            return editUIModal.visible();
        },

        hide: function() {
            if (!editUIModal.visible()) return;
            editUIModal.hide();
        }
    };

    return editModal;
}