function makeCardProduct(data) {
    const card = `<ons-card>
                <div class="card-product">
                    <div class="card-content mb-4">
                        <img src="${localStorage.getItem('API_BASEURL')}/img/${data.product_img}" alt="Onsen UI" />
                        <div class="card-info">
                            <h4 class="mb-1">${data.product_nama}</h4>
                            <p class="text-muted mb-2">${data.product_desc}</p>
                            <p>RP ${data.product_harga}</p>
                        </div>
                    </div>
                    <div class="card-act ms-auto">
                        <button class="btn btn-tambah ms-auto"
                            onclick="ons.notification.toast('Berhasil ditambahkan.', { timeout: 1000})">Tambah</button>
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
