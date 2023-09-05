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


ons.getScriptPage().onInit = function () {
    this.querySelector('ons-toolbar div.center').textContent = this.data.title;
    var toolbarButton = ons.platform.isAndroid() ? ons.createElement(`<ons-icon icon="md-more-vert"></ons-icon>`) : ons.createElement(`<span>More</span>`);
    var infoButton = document.getElementById('info-button');
    infoButton.appendChild(toolbarButton);
    var toastDialog = document.getElementById('toast-dialog');
    toastDialog.parentNode.removeChild(toastDialog);
    document.getElementById('dialogs-page').appendChild(toastDialog);
    var timeoutID = 0;
    window.fn.showDialog = function (id) {
        var elem = document.getElementById(id);
        if (id === 'popover-dialog') {
            elem.show(infoButton);
        } else {
            elem.show();
            if (id === 'modal-dialog') {
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function () {
                    fn.hideDialog(id)
                }, 2000);
            }
        }
    };
    window.fn.hideDialog = function (id) {
        document.getElementById(id).hide();
    };
    const moreOptions = document.querySelectorAll('.more-options');
    if (!ons.platform.isAndroid()) {
        document.getElementById('watHmmSure-dialog').setAttribute('modifier', 'rowfooter');
        for (option of moreOptions) {
            option.hasAttribute('modifier') ?
                option.setAttribute('modifier', option.getAttribute('modifier') + ' longdivider') :
                option.setAttribute('modifier', 'longdivider');
        }
    } else {
        for (option of moreOptions) {
            option.hasAttribute('modifier') ?
                option.setAttribute('modifier', option.getAttribute('modifier') + ' nodivider') :
                option.setAttribute('modifier', 'nodivider');
        }
    }
};
document.getElementById('appNavigator').topPage.onDestroy = function () {
    var toastDialog = document.getElementById('toast-dialog');
    toastDialog.parentNode.removeChild(toastDialog);
    document.querySelector('#dialogs-page .page__content').appendChild(toastDialog);
}