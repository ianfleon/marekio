console.log("transaksi.js");

$.ajax({
	url: `${localStorage.getItem('API_BASEURL')}/pesanan/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=0`,
	method: 'GET',
	success: function(res) {
		// console.log(res);
		$.each(res.data, function(i, v) {
			// console.log(v);
			const x = setViewListPesanan({
				code: i,
				data: v
			});

			$('#pesanan_proses_wraper').append(x);

		});
	}
});

function setViewListPesanan(res)
{

	let list = '';
	
	res.data.forEach(function(l) {
		list += `<ons-list>${l}</ons-list>`;
	});

	const card = `<ons-card tappable
                onclick="fn.pushPage({'id': 'pesanan-transaksi.html', 'Pesanan #IUS871287A': 'PullHook'})">
                <div class="title">
                    <i class="fa fa-ticket"></i> ${res.code.toUpperCase()}
                </div>
                <div id="" class="content">
                    <ons-list>
						${list}
                    </ons-list>
                </div>
            </ons-card>`;

	// console.log(card);

	return card;
}