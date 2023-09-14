window.fn = {};

window.fn.toggleMenu = function () {
    document.getElementById('appSplitter').right.toggle();
};

window.fn.loadView = function (index) {
    document.getElementById('appTabbar').setActiveTab(index);
    document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
    window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
    if (anim) {
        document.getElementById('appNavigator').pushPage(page.id, {
            data: {
                title: page.title
            },
            animation: anim
        });
    } else {
        document.getElementById('appNavigator').pushPage(page.id, {
            data: {
                title: page.title
            }
        });
    }
};

ons.ready(function() {

    document.addEventListener('show', function(event) {
        // console.log(event.target.id);
        // if (event.target.id == 'akun') {
        //     if (!isLogin()) {
        //         fn.pushPage({'id': 'login.html', 'anim': 'PullHook'});
        //     }
        // }
    });

});

function isLogin() {
    
    if (localStorage.getItem('X_USER_ID') != null) {
        return true;
    }

    return false;
}