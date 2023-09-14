function setViewListPesanan(res, icon) {
	let list = '';

	res.data.forEach(function (l) {
		list += `<ons-list>${l}</ons-list>`;
	});

	const card = `<ons-card tappable
                onclick="fn.pushPage({'id': 'pesanan-transaksi.html', 'Pesanan #IUS871287A': 'PullHook'})">
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

function setViewTransaksiDiantar(res) {

	// const section = $(`<section id="pesanan_diantar_wraper"></section>`);
	// const onspage = $(`<ons-page id="transaksi-diantar"></ons-page>`);
	// const tmp = $(`<template id="transaksi-diantar.html"></template>`);

	$.ajax({
		url: `${localStorage.getItem('API_BASEURL')}/pesanan/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=1`,
		method: 'GET',
		success: function (res) {
			$.each(res.data, function (i, v) {
				const x = setViewListPesanan({
					code: i,
					data: v
				}, 'fas fa-motorcycle');
				console.log($('#transaksi-diantar-section').append(x));
				// console.log(x);
			});
		}
	});

	console.log("diantar");

}


ons.ready(function () {

	document.addEventListener("show", function (event) {
		if (event.target.id = 'transaksi-proses') {
			// setViewTransaksiDiantar();
		}
	});

});

$.ajax({
	url: `${localStorage.getItem('API_BASEURL')}/pesanan/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=0`,
	method: 'GET',
	success: function (res) {
		// console.log(res);
		$.each(res.data, function (i, v) {
			// console.log(v);
			const x = setViewListPesanan({
				code: i,
				data: v
			}, 'fa fa-ticket');

		});
	}
});