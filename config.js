// localStorage.setItem('API_BASEURL', 'http://localhost:8080');
localStorage.setItem('API_BASEURL', 'https://marekio.habarataku.my.id');

ons.ready(function () {

    document.addEventListener("show", function (event) {
        if (event.target.id == 'keranjang') {
            if (!isLogin()) {
                fn.pushPage({
                    'id': 'login.html',
                    'anim': 'PullHook'
                });
            }
        } else if (event.target.id == 'akun') {
            if (!isLogin()) {
                fn.pushPage({
                    'id' : 'login.html',
                    'anim' : 'PullHook'
                });
            }
        }
    });

});