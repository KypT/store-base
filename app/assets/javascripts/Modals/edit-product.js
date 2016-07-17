function EditProductModal(selector) {
    var $this = $(selector),
        editUIModal = UI.Modal.create($this, {centerY: true});

    function productImage(product, image) {
        return  '<div class="img-cnt" data-id="'+ image.id +'">' +
                '<img src="'+ image.file.thumb.url +'">' +
                '<div class="remove"><a data-remote="true" data-confirm="Точно?" data-method="delete" href="/items/'+ product.id +'/image/'+ image.id +'">Удалить</div>' +
                '</div>';
    }

    function prepare(product) {
        var url = Products.path(product);
        var editor = CKEDITOR.instances.editor1;

        editor.setData(product.description);
        editor.url = url;
        editor.attr = 'description';

        $this.find('.modal-product-name').text(product.name);
        $this.find('.stock').text(product.stock);
        $this.find('.price').text(product.price);
        $this.find('*[contenteditable="true"]').attr('data-url', url);

        var tags = product.tags.map(function(tag) {return tag.name; });

        if (product.category)
            $this.find('#collection').val(product.category.name);
        $this.find('#tags').val(tags);

        $this.find('#collection').off('change').on('change', function() {
            var collection = $('#collection').val();
            Admin.updateAttribute(Products.path(product), 'category', collection);
        });

        $this.find('.save-item').off('click').on('click', function() {
            location.reload();
        });

        $this.find("#tags").select2({
            tags: true
        }).off('change', tagsChangedHandler).on('change', product, tagsChangedHandler);

        var $images = $this.find('.edit-images .images');
        $images.empty();
        product.images.forEach(function(image) {
            var $image = productImage(product, image);
            $images.append($image);
        });

        $images.sortable();
        $images.disableSelection();

        Admin.activateDropZone($this.find('form.file-upload-zone'), url, function() {
            location.reload();
        });

        $this.find('.save-order').off('click').on('click', function() {
            var order = [];

            $images.find('.img-cnt').each(function(_, image) {
                var id = image.getAttribute('data-id');
                order.push(id);
            });

            $.post('/items/' + product.id + '/images', {order: order});
        });
    }

    function tagsChangedHandler(event) {
        var tags = $('#tags').val(),
            product = event.data;
        Admin.updateAttribute(Products.path(product), 'tags', tags);
    }

    var editModal = {
        show: function(id) {
            Products.get(id).done(function(product) {
                prepare(product);
                editUIModal.show();
            });
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