//<link rel="stylesheet" href="/public/css/style.css?=1378607126">
var jqcscript = document.createElement('link');
jqcscript.href = "http://code.jquery.com/ui/1.10.3/themes/ui-lightness/jquery-ui.css";
jqcscript.rel = "stylesheet";
document.head.appendChild(jqcscript);

var script = document.createElement('script');
script.src = "https://raw.github.com/sosaucily/openure/master/openure.js";
script.type = "text/javascript";
document.head.appendChild(script);

chrome.extension.sendRequest({method: "getOpenureKeys"}, function (response) {
    if (!response) {
        return;
    }
    var openure_keys = document.createElement('openure_keys');
    openure_keys.type = "text/html";
    var newContent = document.createTextNode(response.keys);
    openure_keys.appendChild(newContent);
    document.head.appendChild(openure_keys);
});
