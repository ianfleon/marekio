function submitDaftar() { 
    
    const formData = new FormData(document.getElementById('form-daftar'));

    const v = validasiFormDaftar();
    
    if (!v.status) {
        console.log(v);
        ons.notification.toast(v.pesan, {
            timeout: 1000
        });
    } else {
        $.ajax({
            url: localStorage.getItem('API_BASEURL') + '/user/add',
            method: 'POST',
            data: v.data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 800000,
            success: function(res) {
                console.log(res);
                ons.notification.toast(res.message, {
                    timeout: 1500
                });
                if (res.code == 200) {
                    fn.pushPage({
                        'id': 'login.html',
                        'anim': 'PullHook'
                    });
                }
            }
        });
    }
}

function validasiFormDaftar() {

    const formData = new FormData(document.getElementById('form-daftar'));

    for (const pair of formData.entries()) {
        if (pair[1] == '') {
            return {
                'status': false,
                'pesan': 'Tidak boleh ada yang kosong!'
            }
        }
    }

    return {
        status: true,
        data: formData
    }

}