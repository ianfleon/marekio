function previewImage(data) {
    const imgPreview = document.getElementById('imgpreview');

    imgPreview.classList.remove('d-none');
    imgPreview.src = window.URL.createObjectURL(data.files[0]);
}

function tambahImgBaru() {
    $('input#imguploadbaru').trigger('click');
}

function tambahProduct() {

    const validasi = validasiFormProduct();

    if (validasi.status == false) {
        ons.notification.toast(validasi.pesan, {
            timeout: 500
        });
    } else {
        $.ajax({
            url: localStorage.getItem('API_BASEURL') + '/products/add',
            method: 'POST',
            data: validasi,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            timeout: 800000,
            success: function () {
                ons.notification.toast('Berhasil tambah produk!', {
                    timeout: 1000
                });
                document.getElementById('appNavigator').popPage();
                initProducts();
            }
        });
    }


}


function validasiFormProduct() {

    const formData = new FormData(document.getElementById('form_product'));

    for (const pair of formData.entries()) {
        if (pair[1] == '') {
            return {
                'status': false,
                'pesan': 'Tidak boleh ada yang kosong!'
            }
        }
    }

    const productImg = $('#imguploadbaru');

    if (productImg[0].files.length < 1) {
        return {
            'status': false,
            'pesan': 'Harus pilih gambar!'
        }
    }

    return formData;

}