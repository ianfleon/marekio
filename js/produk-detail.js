var infoButton = document.getElementById('info-button');
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