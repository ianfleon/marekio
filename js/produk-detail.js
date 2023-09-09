let request = indexedDB.open('marekiodb', 1);

let db;

// This event is only implemented in recent browsers
request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  objectStore.createIndex("name", "name", { unique: false });

  // objectStore.transaction.oncomplete = (event) => {
  //   // Store values in the newly created objectStore.
  //   const customerObjectStore = db
  //     .transaction("customers", "readwrite")
  //     .objectStore("customers");
  //   customerData.forEach((customer) => {
  //     customerObjectStore.add(customer);
  //   });
  // };

};










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