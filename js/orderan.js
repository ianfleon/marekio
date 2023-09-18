$.ajax({
    url: localStorage.getItem('API_BASEURL') + '/pesanan/status/0',
    method: 'GET',
    success: function(res) {
        setListOrderan(res);
    }
});

function setListOrderan(res) {

    // console.log(res);

    $.each(res.data, function(i, v) {   
        const card = `<ons-card class="card-orderan" tappable
                onclick="detailOrderan('${i}')">
                <div class="title"># ${i.toUpperCase()}</div>
                <div class="content">
                    <p><b>${v.user.nama}</b></p>
                    <p>${v.user.hp}</p>
                    <p>${v.user.alamat}</p>
                </div>
            </ons-card>`;
            $('#orderan-diproses-section').append(card);
    });

}

function detailOrderan(c) {
    localStorage.setItem('ORDERAN_DETAIL_CODE', c);
    fn.pushPage({'id': 'detail-pesanan.html', 'anim': 'PullHook'});
}