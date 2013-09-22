// Saves options to localStorage.
function save_options() {
    var select = document.getElementById("openure-key");
    var keyName = select.value;
    chrome.storage.local.set({"openure_key":keyName});

    var select = document.getElementById("openure-development");
    var keyName = select.checked;
    chrome.storage.local.set({"openure_development":keyName});

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function () {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    chrome.storage.local.get(["openure_key","openure_development"], function (openure_data){
        var keyName = openure_data["openure_key"];
        if (keyName) {
            var select = document.getElementById("openure-key");
            select.value = keyName;
        }

        var keyName = openure_data["openure_development"];
        if (keyName) {
            var select = document.getElementById("openure-development");
            select.checked=keyName;
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
