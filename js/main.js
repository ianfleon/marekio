// console.log(localStorage);

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

function setUserTabbar() {
    const t = $(`<ons-tab page="transaksi-diantar.html" label="Diantar">
                </ons-tab>
                <ons-tab page="transaksi-selesai.html" label="Selesai">
                </ons-tab>`);
    $('#mytabbar').append(t);
}

function isLogin() {

    if (localStorage.getItem('X_USER_ID') != null) {
        return true;
    }

    return false;
}

function logout()
{
    localStorage.clear();
    location.reload();
}

if (isLogin()) {
    setUserTabbar();
}