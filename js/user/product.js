function makeCardProduct(data) {

	const btnPlus = `<div class="card-act ms-auto">
                        <button class="btn btn-green ms-auto"
                            onclick="addProductToCart(${data.product_id})"><i class="fas fa-plus"></i></button>
                    </div>`;

    const card = `<ons-card class="card-product-wraper">
				${((localStorage.getItem('X_USER_ID') != null) ? btnPlus : '')}
                <div class="card-product">
                    <div class="card-content">
                        <img src="${localStorage.getItem('API_BASEURL')}/img/product/${data.product_img}"  onclick="viewDetailProduct(${data.product_id})" />
                        <div class="card-info">
                            <h4 class="mb-1">${data.product_nama}</h4>
                            <p>RP ${data.product_harga}</p>
                        </div>
                    </div>
                </div>
            </ons-card>`;

            return card;
}

function viewDetailProduct(id) {

	localStorage.setItem('DETAIL_PRODUCT_ID', id);

	fn.pushPage({
		'id': 'produk-detail.html',
		'Detail': 'PullHook',
	});
}

function initProductsUser()
{
    $.ajax({
		url: localStorage.getItem('API_BASEURL')+'/products',
		method: 'GET',
		success: function (res) {
			$('#products_wraper').empty();
			res.data.forEach(function (d) {
				$('#products_wraper').append(makeCardProduct(d));
			});
		}
	});
}

ons.ready(function () {

	var pullHook = document.getElementById('pull-hook');

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
				initProductsUser();
				break;
		}

		pullHook.innerHTML = message;
	});

	pullHook.onAction = function (done) {
		setTimeout(done, 1000);
	};
});

function addProductToCart(idProduct)
{
	// console.log(`ID Product: ${idProduct}`);
	$.ajax({
		url: localStorage.getItem('API_BASEURL') + '/cart/add',
		method: 'POST',
		data: {
			product_xid: idProduct,
			user_xid: localStorage.getItem('X_USER_ID')
		},
		success: function (res) {
			initCartList();
			ons.notification.toast(res.message, { timeout: 1000});
		}
	});

}

initProductsUser();