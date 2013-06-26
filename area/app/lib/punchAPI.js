var testdata = require('testdata');
var test = false;
var data = {};
var host = "http://202.144.226.181/play/";
var ret = {
    sendRequest: function (path, param, method, callback) {
        var xhr = Ti.Network.createHTTPClient();
        if (test) {
            xhr.open('GET', 'http://api.twitter.com/1/statuses/user_timeline/masason.json'); // twitter sample
        } else {
            xhr.open(method, host + path);
        }
        xhr.onload = function (e) {
            var res = JSON.parse(this.responseText);
//            Ti.API.info("in onload" + JSON.stringify(res));
            console.log("[punchAPI.js] in on load");
            if (test) {
                if (path == "map/shop") {
                    callback.call({}, { resBody: testdata[path].result, msgBody: param });
                } else if (path == "geofeed" && param.page > 0) {
                    callback.call({}, { resBody: testdata["page2"], msgBody: param });
                } else {
                    callback.call({}, { resBody: testdata[path], msgBody: param });
                }
            } else {
                callback.call({}, {resBody: res.result, distance: res.distance, msgBody: param});
            }
        };
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4 && xhr.status) {
                console.log("in ready state.");
                // console.log("res: " + this.responseText);
                // console.log(JSON.stringify(this));
            //     var res = JSON.parse(this.responseText);
            //     Ti.API.info("in onload" + JSON.stringify(res.result));
            // if (test) {
            //     if (path == "geofeed" && param.page > 0) {
            //         callback.call({}, { resBody: testdata["page2"], msgBody: param });
            //     } else {
            //         callback.call({}, { resBody: testdata[path], msgBody: param });
            //     }
            // } else {
            //     callback.call({}, {resBody: res.result, msgBody: param});
            // }

            }
        };
        xhr.onerror = function (e) {
            Ti.APi.info(e);
        };
        xhr.onsendstream = function (e) {
            Ti.API.info(e.progress);
        };
        xhr.ondatastream = function (e) {
            Ti.API.info(e.progress);
        };
        Ti.API.info("method:" + method + " url: " + host + path);
        Ti.API.info("Data: " + JSON.stringify(param));
        xhr.setRequestHeader("Content-Type","application/json");
        if (test || method == "GET") {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(param));
        }
    }
};

module.exports = ret;
