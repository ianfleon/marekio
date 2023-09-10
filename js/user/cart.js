console.log('user/cart.js');

function initCartList()
{
    console.log('cart.js::initCartList()');
    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/user/cart/18',
        method: 'GET',
        success: function (res) {
            $('#cart_item_wraper').empty();
            $.each(res.data, function(i, d) {
                $('#cart_item_wraper').append(setViewCartList(d));
            });
        },
        error: function() {
            console.error('Gagal terhubung ke server.');
        }
    });
}

function setViewCartList(data)
{
    const item = `<ons-list-item>
                    <div class="left me-4">
                        <i class="list-item__icon ion-md-trash me-4"
                            onclick="ons.notification.confirm('Ingin hapus item ini?')"></i>
                        <img class="list-item__thumbnail" src="${localStorage.getItem('API_BASEURL')}/img/product/${data.product_img}">
                    </div>
                    <div class="center">
                        <span class="list-item__title">${data.product_nama}</span><span class="list-item__subtitle">15.000</span>
                    </div>
                    <div class="right">
                        <div><i class="ion-ios-remove-circle-outline"></i></div>
                        <p class="mx-4">1</p>
                        <div><i class="ion-ios-add-circle-outline"></i></div>
                    </div>
                </ons-list-item>`;
    return item;
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