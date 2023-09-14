localStorage.setItem('X_USER_ID', 20);

$.ajax({
    url: localStorage.getItem('API_BASEURL') + '/user/detail/' + localStorage.getItem('X_USER_ID'),
    method: 'GET',
    success: function(res) {
        setViewDetailProfile(res.data);
        setViewDetailAkun(res.data);
    }
});

function setViewDetailProfile(data)
{
    const card = `<ons-card>
                <div class="d-flex flex-column-center text-center">
                    <img src="${localStorage.getItem('API_BASEURL')}/img/user/${data.user_jk}.png"
                        class="akun-img mb-2">
                    <div class="akun-info">
                        <h4 class="mb-1">${data.user_nama}</h4>
                        <p class="text-muted">${data.user_alamat}</p>
                    </div>
                </div>
            </ons-card>`;

    $('#profile_detail_wraper').append(card);
}

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
                    onclick="fn.pushPage({'id': 'form-profil-akun.html', 'Edit Profil': 'PullHook'})">UBAH</ons-button>`;
                    
                    $('#detail_akun_wraper').append(card);
}