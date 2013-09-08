// Saves options to localStorage.
function save_options() {
    var select = document.getElementById("openure-key");
    var keyName = select.value;
    localStorage["openure_keys"] = keyName;

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function () {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var keyName = localStorage["openure_keys"];
    if (!keyName) {
        return;
    }
    var select = document.getElementById("openure-key");
    select.value = keyName;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request.method == "getOpenureKeys")
        sendResponse({keys: localStorage['openure_keys']});
    else
        sendResponse({}); // snub them.
});