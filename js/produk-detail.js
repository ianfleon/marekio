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

var createAlertDialog = function() {
  var dialog = document.getElementById('my-alert-dialog');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('alert-dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var hideAlertDialog = function() {
  document
    .getElementById('my-alert-dialog')
    .hide();
};

var notify = function() {
  ons.notification.alert('This dialog was created with ons.notification');
};