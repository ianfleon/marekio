function makeCardProduct(data) {
    const card = `<ons-card class="card-product-wraper">
    <div class="card-act ms-auto">
                        <button class="btn btn-green ms-auto"
                            onclick="addProductToCart(${data.product_id})"><i class="fas fa-plus"></i></button>
                    </div>
                <div class="card-product">
                    <div class="card-content">
                        <img src="${localStorage.getItem('API_BASEURL')}/img/product/${data.product_img}" alt="Onsen UI" />
                        <div class="card-info">
                            <h4 class="mb-1">${data.product_nama}</h4>
                            <p>RP ${data.product_harga}</p>
                        </div>
                    </div>
                </div>
            </ons-card>`;

            return card;
}

function initProductsUser()
{
    $.ajax({
		url: 'http://localhost:8080/products',
		method: 'GET',
		success: function (res) {
			$('#products_wraper').empty();
			res.data.forEach(function (d) {
				$('#products_wraper').append(makeCardProduct(d));
			});
		}
	});
}

initProductsUser();

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
		url: 'http://localhost:8080/cart/add',
		method: 'POST',
		data: {
			product_xid: idProduct,
			user_xid: 18
		},
		success: function (res) {
			initCartList();
			ons.notification.toast(res.message, { timeout: 1000});
		}
	});

}