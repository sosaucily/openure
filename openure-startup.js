var openure_keys = document.createElement('openure_keys');
openure_keys.type = "text/html";

chrome.storage.local.get(["openure_key","openure_development","openure_urls"], function (openure_data){

    if (openure_data['openure_key']) {

        var extractUrls = function () {
            var input = openure_data['openure_urls'],
                urlArray = input.split(/,|\n/),
                urlsLen = urlArray.length;

            for (var count=0; count < urlsLen; count++) {
                urlArray[count] = urlArray[count].trim();
            }
            return urlArray;
        };

        var currentHost = window.location.host;
        var urlArray = extractUrls();
        var matchingUrl = false,
            urlsLen = urlArray.length;

        for (var count=0; count<urlsLen; count++) {
            if (urlArray[count] !== "" && currentHost.indexOf(urlArray[count]) > -1) {
                matchingUrl = true;
            }
        }

        if (matchingUrl) {
            var newContent = document.createTextNode(openure_data['openure_key']);
            openure_keys.appendChild(newContent);
            document.head.appendChild(openure_keys);

            var script = document.createElement('script');
            script.src = "https://rawgit.com/sosaucily/openure/master/openure.js";
            if (openure_data['openure_development']) {
                console.log('Running Openure in development mode from the grunt server');
                script.src = "https://localhost:9000/openure.js";
            }
            script.type = "text/javascript";

            document.head.appendChild(script);
        }
    }
});
