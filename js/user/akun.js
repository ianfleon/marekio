function setViewDetailProfile(data) {
    const card = `<ons-card>
                <div class="d-flex flex-column-center text-center">
                    <img src="${localStorage.getItem('API_BASEURL')}/assets/avatar/${data.user_jk}.png"
                        class="akun-img mb-2">
                    <div class="akun-info">
                        <h4 class="mb-1">${data.user_nama}</h4>
                        <p class="text-muted">${data.user_alamat}</p>
                    </div>
                </div>
            </ons-card>`;

    $('#profil-info-section').empty();
    $('#profil-info-section').append(card);
}

function initInfoProfil() {

    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/user/detail/' + localStorage.getItem('X_USER_ID'),
        method: 'GET',
        success: function (res) {
            setViewDetailProfile(res.data);
        }
    });
}

ons.ready(function () {

    let pullHook = document.getElementById('pull-hook-akun');

    pullHook.addEventListener('changestate', function (event) {

        var message = '';

        switch (event.state) {
            case 'initial':
                message = 'Refresh';
                break;
            case 'preaction':
                message = 'Refresh..';
                break;
            case 'action':
                message = 'Loading...';
                initInfoProfil();
                break;
        }

        pullHook.innerHTML = message;
    });

    pullHook.onAction = function (done) {
        setTimeout(done, 1000);
    };
});


if (isLogin()) {
    initInfoProfil();
}
