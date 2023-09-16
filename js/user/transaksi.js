localStorage.setItem('STATUS_INIT_TRANSAKSI', 0);

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

	$.ajax({
		url: `${localStorage.getItem('API_BASEURL')}/pesanan/list/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=0`,
		method: 'GET',
		success: function (res) {
			$('#transaksi-proses-section').empty();
			$.each(res.data, function (i, v) {
				const x = setViewListPesanan({
					code: i,
					data: v
				}, 'fa fa-ticket');
				$('#transaksi-proses-section').append(x);
			});
		}
	});

	$.ajax({
		url: `${localStorage.getItem('API_BASEURL')}/pesanan/list/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=2`,
		method: 'GET',
		success: function (res) {
			$('#transaksi-selesai-section').empty();
			$.each(res.data, function (i, v) {
				const x = setViewListPesanan({
					code: i,
					data: v
				}, 'fas fa-check');
				$('#transaksi-selesai-section').append(x);
			});
		}
	});

	$.ajax({
		url: `${localStorage.getItem('API_BASEURL')}/pesanan/list/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=1`,
		method: 'GET',
		success: function (res) {
			$('#transaksi-diantar-section').empty();
			$.each(res.data, function (i, v) {
				const x = setViewListPesanan({
					code: i,
					data: v
				}, 'fas fa-motorcycle');
				$('#transaksi-diantar-section').append(x);
			});
		}
	});
}

ons.ready(function () {

	document.addEventListener("show", function (event) {
		if (event.target.id == 'transaksi') {
			if (localStorage.getItem('STATUS_INIT_TRANSAKSI') < 1) {
				setTimeout(() => {
					localStorage.setItem('STATUS_INIT_TRANSAKSI', 1);
					initTransaksi();
				}, 1000);
			}

		}
	});

});

if (isLogin()) {
	initTransaksi();
}