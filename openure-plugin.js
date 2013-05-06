//$(function () {
//    document.body.appendChild(document.createElement('script')).src="'" + chrome.extension.getURL("openure.js") + "';"
//    document.body.appendChild(document.createElement('script')).src="openure-startup.js";
//    alert("asdf");
    var script = document.createElement('script');
    script.src = "openure-startup.js";
    document.head.appendChild(script);
//    document.html.appendChild(spoon);
//});