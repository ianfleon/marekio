// console.log('Page: form-product.js');

function previewImage(data) {
    const imgPreview = document.getElementById('imgpreview');

    imgPreview.classList.remove('d-none');
    imgPreview.src = window.URL.createObjectURL(data.files[0]);
}

$('#btn_upload_img').click(function () {
    $('#imgupload').trigger('click');
});

$('#btn_save').click(function () {
    // console.log('btnSave: clicked!');
    const formData = new FormData(document.getElementById('form_product'));

    const fd = $('#form_product').serializeArray();
    
    $.each(fd, function(i, res) {
        // console.log(res.value);
        if (res.value == '') {
            ons.notification.alert('Tidak boleh ada yang kosong');
            return false;
        }
    });

    const productImg = $('#imgupload');

    if (productImg[0].files.length < 1) {
        ons.notification.alert('Harus ada gambar produk');
    }

    $.ajax({
        url: 'http://localhost:8080/products/add',
        method: 'POST',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function () {
            document.getElementById('appNavigator').popPage();
            initProducts();
        }
    });
});