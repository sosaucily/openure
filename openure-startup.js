var script = document.createElement('script');
script.src = "https://raw.github.com/sosaucily/openure/master/openure.js";
script.type="text/javascript";
document.head.appendChild(script);

var jqscript = document.createElement('script');
jqscript.src = "http://code.jquery.com/jquery-1.8.3.min.js";
jqscript.type="text/javascript";
document.head.appendChild(jqscript);

var jqcscript = document.createElement('script');
jqcscript.src = "https://raw.github.com/replit/jq-console/master/jqconsole.min.js";
jqcscript.type="text/javascript";
document.head.appendChild(jqcscript);

chrome.extension.sendRequest({method: "getOpenureKeys"}, function(response) {
    if(!response){
        return;
    }
    var openure_keys = document.createElement('openure_keys');
    openure_keys.type="text/html";
    var newContent = document.createTextNode(response.keys);
    openure_keys.appendChild(newContent);
    document.head.appendChild(openure_keys);
});