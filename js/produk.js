// console.log('Page: Products');

function initProducts()
{	
	$.ajax({
		url: 'http://localhost:8080/products',
		method: 'GET',
		success: function (res) {
			$('#product_card_wraper').empty();
			res.data.forEach(function (d) {
				$('#product_card_wraper').append(createProductCard(d));
			});
		}
	});
}

function createProductCard(data) {
	// console.log(data);
	const card = $(`<ons-card onclick="viewDetailProduct(${data.product_id})">
                    <div class="card-product">
                        <div class="card-content">
                            <img src="http://localhost:8080/img/${data.product_img}" />
                            <div class="card-info">
                                <h4 class="mb-1">${data.product_nama}</h4>
                                <p>RP ${data.product_harga}</p>
                            </div>
                        </div>
                    </div>
                </ons-card>`);
	return card;
}

function viewDetailProduct(id) {

	localStorage.setItem('product_id', id);

	fn.pushPage({
		'id': 'produk-detail.html',
		'Detail': 'PullHook',
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
				initProducts();
				break;
		}

		pullHook.innerHTML = message;
	});

	pullHook.onAction = function (done) {
		setTimeout(done, 1000);
	};
});

initProducts();