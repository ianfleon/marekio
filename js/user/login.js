function submitLogin() {
    const formData = new FormData(document.getElementById('form-login'));
    $.ajax({
        url: localStorage.getItem('API_BASEURL') + '/user/login',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (res) {
            
            if (res.code == '200') {
                localStorage.setItem('X_USER_ID', res.data.user_id);
                location.reload();
            }

            ons.notification.toast(res.message, {
                timeout: 1000
            });

        }
    });
}