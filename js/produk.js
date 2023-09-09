console.log('Page: Products');

$.ajax({
	url: 'http://localhost:8080/products/list',
	method: 'GET',
	success: function(res) {
		res.data.forEach(function(d) {
		// console.log($('section#produk_content'));
			$('#product_card_wraper').append(createProductCard(d));
		});
	}
});

function createProductCard(data)
{
	console.log(data);
	const card = $(`<ons-card onclick="document.cookie='productId=${data.product_id}';fn.pushPage({'id': 'produk-detail.html', 'Detail': 'PullHook', 'productID': ${data.product_id}})">
                    <div class="card-product">
                        <div class="card-content">
                            <img src="http://localhost:8080/img/${data.img}" />
                            <div class="card-info">
                                <h4 class="mb-1">${data.nama}</h4>
                                <p>RP ${data.harga}</p>
                            </div>
                        </div>
                    </div>
                </ons-card>`);
	// console.log(card);
	return card;
}