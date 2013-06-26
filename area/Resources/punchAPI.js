var testdata = require("testdata"), test = !1, data = {}, host = "http://202.144.226.181/play/", ret = {
    sendRequest: function(path, param, method, callback) {
        var xhr = Ti.Network.createHTTPClient();
        test ? xhr.open("GET", "http://api.twitter.com/1/statuses/user_timeline/masason.json") : xhr.open(method, host + path);
        xhr.onload = function(e) {
            var res = JSON.parse(this.responseText);
            console.log("[punchAPI.js] in on load");
            test ? path == "map/shop" ? callback.call({}, {
                resBody: testdata[path].result,
                msgBody: param
            }) : path == "geofeed" && param.page > 0 ? callback.call({}, {
                resBody: testdata.page2,
                msgBody: param
            }) : callback.call({}, {
                resBody: testdata[path],
                msgBody: param
            }) : callback.call({}, {
                resBody: res.result,
                distance: res.distance,
                msgBody: param
            });
        };
        xhr.onreadystatechange = function(e) {
            xhr.readyState == 4 && xhr.status && console.log("in ready state.");
        };
        xhr.onerror = function(e) {
            Ti.APi.info(e);
        };
        xhr.onsendstream = function(e) {
            Ti.API.info(e.progress);
        };
        xhr.ondatastream = function(e) {
            Ti.API.info(e.progress);
        };
        Ti.API.info("method:" + method + " url: " + host + path);
        Ti.API.info("Data: " + JSON.stringify(param));
        xhr.setRequestHeader("Content-Type", "application/json");
        test || method == "GET" ? xhr.send() : xhr.send(JSON.stringify(param));
    }
};

module.exports = ret;