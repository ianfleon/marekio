function setViewDetailAkun(data)
{
    const card = ` <ons-list>
                    <ons-list-item>
                        <div class="left">
                            <ons-icon icon="md-face" class="list-item__icon"></ons-icon>
                        </div>
                        <div class="center">
                            ${data.user_nama}
                        </div>
                    </ons-list-item>
                    <ons-list-item>
                        <div class="left">
                            <ons-icon icon="md-phone" class="list-item__icon"></ons-icon>
                        </div>
                        <div class="center">
                            ${data.user_hp}
                        </div>
                    </ons-list-item>
                    <ons-list-item>
                        <div class="left">
                            <ons-icon icon="md-map" class="list-item__icon"></ons-icon>
                        </div>
                        <div class="center">
                            ${data.user_alamat}
                        </div>
                    </ons-list-item>
                </ons-list>
                <ons-button modifier="large"
                    onclick="fn.pushPage({'id': 'akun-profil-edit.html', 'Animation': 'PullHook'})">UBAH</ons-button>`;
                    
                    $('#detail_akun_wraper').append(card);
}

$.ajax({
    url: localStorage.getItem('API_BASEURL') + '/user/detail/' + localStorage.getItem('X_USER_ID'),
    method: 'GET',
    success: function(res) {
        setViewDetailAkun(res.data);
    }
});

