function initDetailPesanan(data) {

    const card = $(`<div class="card"></div>`);

    const listWraper = $(`<ons-list class="mb-4">
                    <ons-list-header>Status: ${data.status_pesanan}</ons-list-header>
                </ons-list>`);

    const info = $(`<div class="d-flex">
                    <div class="me-auto text-muted">
                        Jumlah Pesanan:
                    </div>
                    <div class="ms-auto">${data.total_item} Item</div>
                </div>
                <div class="d-flex">
                    <div class="me-auto text-muted">
                        Total Harga:
                    </div>
                    <div class="ms-auto">RP ${data.total_harga}</div>
                </div>`);

    $.each(data.products, function(i, v) {
        const listItem = $(`<ons-list-item>
                            <div class="left">
                                <img class="list-item__thumbnail" src="${localStorage.getItem('API_BASEURL')}/img/product/${v.product_img}">
                            </div>
                            <div class="center">
                                <span class="list-item__title">${v.product_nama}</span><span class="list-item__subtitle">${v.pesanan_jumlah} X
                                    RP ${v.product_harga}</span>
                            </div>
                        </ons-list-item>`);
                        listWraper.append(listItem);
    });

    // console.log(listWraper);
    card.append(listWraper);
    card.append(info);
    $('#detail-pesanan-section').append(card);

}

$.ajax({
    url: localStorage.getItem('API_BASEURL') + '/pesanan/detail/' + localStorage.getItem('DETAIL_PESANAN_CODE'),
    method: 'GET',
    success: function(res) {
        // console.log(res);
        initDetailPesanan(res.data);
    }
});