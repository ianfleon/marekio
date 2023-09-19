function setViewDetailAkun(data) {

    const card = `<ons-list>
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
                    onclick="setFormEditAkun()">UBAH</ons-button>`;

    setTimeout(() => {
        $('#detail_akun_wraper').empty();
        $('#detail_akun_wraper').append(card);
    }, 250);
}

function setFormEditAkun() {
    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/user/detail/' + localStorage.getItem('X_USER_ID'),
        method: 'GET',
        success: function (res) {
            setViewFormEditAkun(res.data);
        }
    });
}

function setViewFormEditAkun(data) {

    fn.pushPage({
        'id': 'form-akun.html',
        'anim': 'PullHook'
    });

    const formEl = `
                    <div class="mb-4">
                        <form action="#" id="form-akun-edit" class="p-4">
                            <input type="hidden" name="user_id" value="${data.user_id}"/>
                            <div class="card">
                                <div class="mb-4">
                                    <label for="user_nama" class="d-block mb-4 text-muted">Nama Lengkap</label>
                                    <input type="text" name="user_nama" value="${data.user_nama}" id="user_nama" class="form-input" />
                                </div>
                                <div class="mb-4">
                                    <label for="user_hp" class="d-block mb-4 text-muted">No. HP</label>
                                    <input type="number" name="user_hp" value="${data.user_hp}" id="user_hp" class="form-input" />
                                </div>
                                <div class="mb-4">
                                    <label class="text-muted">Jenis Kelamin</label>
                                </div>
                                <div class="mb-4">
                                    <input type="radio" id="user_jk_l" name="user_jk" value="l" ${((data.user_jk) == 'l') ? 'checked' : ''}>
                                    <label for="user_jk_p">Laki-laki</label>
                                    <input type="radio" id="user_jk_p" name="user_jk" value="p" ${((data.user_jk) == 'p') ? 'checked' : ''}>
                                    <label for="user_jk_p">Perempuan</label>
                                </div>
                                <div class="mb-4">
                                    <label for="user_alamat" class="d-block mb-4 text-muted">Alamat</label>
                                    <input type="text" name="user_alamat" value="${data.user_alamat}" id="user_alamat" class="form-input" />
                                </div>
                                <div class="mb-4">
                                    <label for="user_pw" class="d-block mb-4 text-muted">Password</label>
                                    <input type="password" name="user_pw" value="${data.user_pw}" id="user_pw" class="form-input" />
                                </div>
                                <ons-button modifier="large" onclick="saveFormAkun()">Simpan</ons-button>
                            </div>
                        </form>
                    </div>`;

    setTimeout(() => {
        $('#form-akun-section').append(formEl);
    }, 500);

}

function saveFormAkun() {
    const formData = new FormData(document.getElementById('form-akun-edit'));
    // console.log(formData);
    $.ajax({
        url: localStorage.getItem('API_BASEURL')+'/user/save',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function () {
            
            ons.notification.toast('Data Berhasil diubah!', {
                timeout: 500
            });
            
            initAkun();

            document.getElementById('appNavigator').popPage();
        }
    });
}

function initAkun() {
    // console.log('initAkun()');
    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/user/detail/' + localStorage.getItem('X_USER_ID'),
        method: 'GET',
        success: function (res) {
            setViewDetailAkun(res.data);
        }
    });
}

initAkun();