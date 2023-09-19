// localStorage.setItem('STATUS_INIT_TRANSAKSI', 0);

class Transaksi {

	setItems(dataItem) {
		// console.log(dataItem);
		$.ajax({
			url: `${localStorage.getItem('API_BASEURL')}/pesanan/list/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=${dataItem.status}`,
			method: 'GET',
			success: function (res) {
				$(dataItem.wraper).empty();
				$.each(res.data, function (i, v) {
					const x = setViewListPesanan({
						code: i,
						data: v
					}, dataItem.icon);
					$(dataItem.wraper).append(x);
				});
			}
		});
	}

}

function setViewListPesanan(res, icon) {

	let list = '';

	res.data.forEach(function (l) {
		list += `<ons-list>${l}</ons-list>`;
	});

	const card = `<ons-card tappable
                onclick="setViewDetailPesanan('${res.code}')">
                <div class="title fs-14pt">
                    <i class="${icon}"></i> ${res.code.toUpperCase()}
                </div>
                <div id="" class="content">
                    <ons-list>
						${list}
                    </ons-list>
                </div>
            </ons-card>`;

	return card;
}

function setViewDetailPesanan(c) {
	localStorage.setItem('DETAIL_PESANAN_CODE', c);
	fn.pushPage({
		'id': 'transaksi-detail.html',
		'anim': 'PullHook'
	});
}

function initTransaksi() {

	ons.ready(function () {
		document.addEventListener("show", function (event) {

			const page = event.target.id;

			// console.log(page);

			const transaksi = new Transaksi();

			switch (page) {
				case 'transaksi-proses':
					transaksi.setItems({
						status: 0,
						wraper: '#transaksi-proses-section',
						icon: 'fa fa-ticket'
					});
					break;
				case 'transaksi-diantar':
					transaksi.setItems({
						status: 1,
						wraper: '#transaksi-diantar-section',
						icon: 'fas fa-motorcycle'
					});
					break;
				case 'transaksi-selesai':
					transaksi.setItems({
						status: 2,
						wraper: '#transaksi-selesai-section',
						icon: 'fas fa-check'
					});
					break;
			}
		});

	});
}


if (isLogin()) {
	initTransaksi();
}