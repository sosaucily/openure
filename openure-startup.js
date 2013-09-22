var openure_keys = document.createElement('openure_keys');
openure_keys.type = "text/html";

chrome.storage.local.get(["openure_key","openure_development"], function (openure_data){

    if (openure_data['openure_key']) {

        var newContent = document.createTextNode(openure_data['openure_key']);
        openure_keys.appendChild(newContent);
        document.head.appendChild(openure_keys);

        var script = document.createElement('script');
        script.src = "https://raw.github.com/sosaucily/openure/master/openure.js";
        if (openure_data['openure_development']) {
            console.log('Running Openure in development mode from the grunt server');
            script.src = "https://localhost:9000/openure.js";
        }
        script.type = "text/javascript";
        document.head.appendChild(script);
    }
});
