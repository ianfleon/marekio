console.log('transaksi-diantar.js');

$.ajax({
	url: `${localStorage.getItem('API_BASEURL')}/pesanan/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=1`,
	method: 'GET',
	success: function(res) {
		$.each(res.data, function(i, v) {
			// console.log(v);
			const x = setViewListPesanan({
				code: i,
				data: v
			}, 'fas fa-motorcycle');

			$('#pesanan_diantar_wraper').append(x);
			
			console.log('diantar');

		});
	}
});