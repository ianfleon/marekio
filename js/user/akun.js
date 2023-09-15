localStorage.setItem('X_USER_ID', 20);

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

$.ajax({
    url: localStorage.getItem('API_BASEURL') + '/user/detail/' + localStorage.getItem('X_USER_ID'),
    method: 'GET',
    success: function(res) {
        setViewDetailProfile(res.data);
    }
});