class Orderan {

    setItems(data) {

        // console.log(data);
        
        $.ajax({
            url: localStorage.getItem('API_BASEURL') + '/pesanan/status/' + data.status,
            method: 'GET',
            success: function (res) {
                setListOrderan(res, data.wraper);
            }
        });
    }

}

function setListOrderan(res, wraper) {

    $(wraper).empty();

    $.each(res.data, function (i, v) {
        const card = `<ons-card class="card-orderan" tappable
                onclick="detailOrderan('${i}')">
                <div class="title"># ${i.toUpperCase()}</div>
                <div class="content">
                    <p><b>${v.user.nama}</b></p>
                    <p>${v.user.hp}</p>
                    <p>${v.user.alamat}</p>
                </div>
            </ons-card>`;
        $(wraper).append(card);
    });

}

function detailOrderan(c) {
    localStorage.setItem('ORDERAN_DETAIL_CODE', c);
    fn.pushPage({
        'id': 'detail-pesanan.html',
        'anim': 'PullHook'
    });
}

function initOrderan() {
    // console.log('initOrderan()');
    ons.ready(function () {
        document.addEventListener('show', function (event) {
    
            // console.log(event.target.id);
    
            const page = event.target.id;
            const orderan = new Orderan();
    
            let dataItem = {};
    
            switch (page) {
                case 'orderan-proses':
                orderan.setItems({
                    status: 0,
                    wraper: '#orderan-diproses-section'
                });
                break;
                case 'orderan-diantar':
                orderan.setItems({
                    status: 1,
                    wraper: '#orderan-diantar-section'
                });
                break;
                case 'orderan-selesai':
                orderan.setItems({
                    status: 2,
                    wraper: '#orderan-selesai-section'
                });
                break;
            };
        });
    });
}

initOrderan();