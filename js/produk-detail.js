function initDetailProduct() {

    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/products/detail/' + localStorage.getItem('PRODUCT_DETAIL_ID'),
        method: 'GET',
        success: function (res) {
            // console.log(res);
            setViewDetailProduct(res.data);
        }
    });
}

function setViewDetailProduct(data) {
    const detail = `<ons-card id="card-">
                    <img src="${localStorage.getItem('API_BASEURL')}/img/product/${data.product_img}"
                        class="img-detail mb-4">
                    <h4 class="mb-1"><b>${data.product_nama}</b></h4>
                    <p class="mb-4">RP ${data.product_harga}</p>
                    <div class="description">${data.product_desc}</div>
                </ons-card>`;
                
    $('#product_detail_content').empty();
    $('#product_detail_content').append(detail);
}

function deleteProduct(id) {

    $.ajax({
        url: localStorage.getItem('API_BASEURL') +'/products/delete/' + id,
        method: 'GET',
        success: function (res) {
            // console.log(res);
            document.getElementById('appNavigator').popPage();
            initProducts();
        }
    });
}

var infoButton = document.getElementById('info-button');

window.fn.showDialog = function (id) {
    var elem = document.getElementById(id);
    if (id === 'popover-dialog') {
        elem.show(infoButton);
    } else {
        elem.show();
        if (id === 'modal-dialog') {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                fn.hideDialog(id)
            }, 2000);
        }
    }
};

window.fn.hideDialog = function (id) {
    document.getElementById(id).hide();
};

var createAlertDialog = function () {
    var dialog = document.getElementById('my-alert-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('alert-dialog.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

var hideAlertDialog = function () {
    document
        .getElementById('my-alert-dialog')
        .hide();
};

var notify = function () {
    ons.notification.alert('This dialog was created with ons.notification');
};

initDetailProduct();