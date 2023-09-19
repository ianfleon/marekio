function setViewFormEdit(data) {

    const card = `<ons-card>
                    <form id="my-form-edit">
                    <input type="hidden" name="product_id" value="${data.product_id}"/>
                        <div class="mb-4">
                            <input class="form-input" type="text" name="product_nama"
                                placeholder="Nama Makanan / Minuman" value="${data.product_nama}"/>
                        </div>
                        <div class="mb-4">
                            <input class="form-input" name="product_harga" type="number" placeholder="Harga" value="${data.product_harga}" />
                        </div>
                        <div class="mb-4">
                            <textarea class="form-input" name="product_desc" rows="12"
                                placeholder="Deskripsi">${data.product_desc}</textarea>
                        </div>
                        <div class="mb-4">
                            <img id="imgpreview" src="${localStorage.getItem('API_BASEURL')}/img/product/${data.product_img}" class="w-100" />
                            <input type="file" onchange="previewImage(this)" id="imguploadedit" accept="image/*"
                                name="product_img" class="d-none" />
                            <ons-button modifier="large" onclick="gantiGambar()">Ganti Gambar</ons-button>
                        </div>
                    </form>
                </ons-card>`;

    setTimeout(() => {
        $('#form-edit-section').append(card);
    }, 500);
}

function previewImage(data) {
    const imgPreview = document.getElementById('imgpreview');

    imgPreview.classList.remove('d-none');
    imgPreview.src = window.URL.createObjectURL(data.files[0]);
}

function gantiGambar() {
    $('#imguploadedit').trigger('click');
}

function updateProduct() {

    // console.log('Btn Clicked!');

    const validasi = validasiFormEditProduct();

    if (validasi.status == false) {
        console.log(validasi.pesan);
        ons.notification.toast(validasi.pesan, {
            timeout: 500
        });
    } else {
        $.ajax({
            url: localStorage.getItem('API_BASEURL') + '/products/update',
            method: 'POST',
            data: validasi,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            timeout: 800000,
            success: function (res) {
                // console.log(res);
                ons.notification.toast(res.message, {
                    timeout: 1000
                });
                document.getElementById('appNavigator').popPage();
                initDetailProduct();
            }
        });
    }

}

function validasiFormEditProduct() {

    const formData = new FormData(document.getElementById('my-form-edit'));

    for (const pair of formData.entries()) {
        if (pair[1] == '') {
            return {
                'status': false,
                'pesan': 'Tidak boleh ada yang kosong!'
            }
        }
    }

    const imgsrc = $('img#imgpreview').attr('src');

    if (imgsrc == undefined || imgsrc == '') {
        const productImg = $('#imgupload');
        if (productImg[0].files.length < 1) {
            return {
                'status': false,
                'pesan': 'Harus pilih gambar!'
            }
        }
    }


    return formData;

}

$.ajax({
    url: localStorage.getItem('API_BASEURL') + '/products/detail/' + localStorage.getItem('PRODUCT_DETAIL_ID'),
    method: 'GET',
    success: function (res) {
        setViewFormEdit(res.data);
    }
});