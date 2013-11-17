// Saves options to localStorage.
function save_options() {
    var select = document.getElementById("openure-key");
    var value = select.value;
    chrome.storage.local.set({"openure_key":value});

    var select = document.getElementById("openure-development");
    var value = select.checked;
    chrome.storage.local.set({"openure_development":value});

    var select = document.getElementById("openure-urls");
    var value = select.value;
    chrome.storage.local.set({"openure_urls":value});

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function () {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    chrome.storage.local.get(["openure_key","openure_development","openure_urls"], function (openure_data){
        var value = openure_data["openure_key"];
        if (value) {
            var select = document.getElementById("openure-key");
            select.value = value;
        }

        var value = openure_data["openure_development"];
        if (value) {
            var select = document.getElementById("openure-development");
            select.checked=value;
        }

        var value = openure_data["openure_urls"];
        if (value) {
            var select = document.getElementById("openure-urls");
            select.value=value;
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
