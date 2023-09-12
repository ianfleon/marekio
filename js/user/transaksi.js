console.log("transaksi.js");

$.ajax({
	url: `${localStorage.getItem('API_BASEURL')}/pesanan/get?user_xid=${localStorage.getItem('X_USER_ID')}&pesanan_status=0`,
	method: 'GET',
	success: function(res) {
		console.log(res);
	}
});

function setViewListPesanan()
{
	$('pesanan_proses_wraper');

	$card = ``;
}