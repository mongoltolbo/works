function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        tabBarHidden: !0,
        barColor: "#000000",
        backgroundColor: "white",
        id: "win"
    });
    $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("in mypage.js");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;