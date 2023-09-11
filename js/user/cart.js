// console.log('user/cart.js');

localStorage.setItem('X_USER_ID', 18);

var initCartList = function () {
    // console.log('cart.js::initCartList()');
    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/user/cart/' + localStorage.getItem('X_USER_ID'),
        method: 'GET',
        success: function (res) {
            console.log(res);
            $('#cart_item_wraper').empty();
            $('ons-progress-bar').remove();
            $.each(res.data, function (i, d) {
                // console.log(d);
                $('#cart_item_wraper').append(setViewCartList(d));
            });
        },
        error: function () {
            console.error('Gagal terhubung ke server.');
        }
    });
}

function setViewCartList(data) {
    const item = `<ons-list-item>
                    <div class="left me-4">
                        <i class="list-item__icon ion-md-trash me-4"
                            onclick="deleteProductFromCart(${data.cart_id})"></i>
                        <img class="list-item__thumbnail" src="${localStorage.getItem('API_BASEURL')}/img/product/${data.product_img}">
                    </div>
                    <div class="center">
                        <span class="list-item__title">${data.product_nama}</span><span class="list-item__subtitle">15.000</span>
                    </div>
                    <div class="right">
                        <div onclick="minCartItem('cart_item_count_idx${data.product_id}')"><i class="ion-ios-remove-circle-outline"></i></div>
                        <p class="mx-4 cart_countx" data-product="${data.product_id}" id="cart_item_count_idx${data.product_id}">1</p>
                        <div onclick="plusCartItem('cart_item_count_idx${data.product_id}')"><i class="ion-ios-add-circle-outline"></i></div>
                    </div>
                </ons-list-item>`;
    return item;
}

function minCartItem(el) {
    const p = $('#' + el);
    let c = parseInt(p.html());
    if (c > 1) {
        c = --c;
    }
    p.html(c);

}

function plusCartItem(el) {
    const p = $('#' + el);
    let c = parseInt(p.html());
    c = ++c;
    p.html(c);
}

function deleteProductFromCart(productId) {
    const confirmResult = ons.notification.confirm('Ingin hapus item ini?').then(function (values) {
        // console.log('Delete Cart: ' + productId);
        if (values > 0) {
            $.ajax({
                url: localStorage.getItem('API_BASEURL') + '/cart/delete/' + productId,
                method: 'GET',
                success: function (res) {
                    initCartList();
                    ons.notification.toast(res.message, {
                        timeout: 1000
                    });
                }
            });
        }
    });
}

function checkout() {
    
    const items = $('.cart_countx');
    
    $.each(items, function (i, val) {
        // console.log(val.innerHTML);
        const jumlah = val.innerHTML;
        const product = val.getAttribute('data-product');
        console.log(product);
    });

    $('ons-progress-bar').remove();
    const loading = `<ons-progress-bar indeterminate></ons-progress-bar>`;

    $('#pull-hook-cart').after(loading);

    ons.notification.toast('Checkout pesanan..', {
        timeout: 1000
    });

    // fn.pushPage({
    //     'id': 'transaksi.html', 'anomation': 'PullHook'
    // });

}

ons.ready(function () {

    var pullHook = document.getElementById('pull-hook-cart');

    pullHook.addEventListener('changestate', function (event) {

        var message = '';

        switch (event.state) {
            case 'initial':
                message = 'Refresh';
                break;
            case 'preaction':
                message = 'Refresh..';

                break;
            case 'action':
                message = 'Loading...';
                initCartList();
                break;
        }

        pullHook.innerHTML = message;
    });

    pullHook.onAction = function (done) {
        setTimeout(done, 1000);
    };
});


initCartList();