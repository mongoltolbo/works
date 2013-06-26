function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        tabBarHidden: !0,
        barColor: "#000000",
        width: 320,
        height: 60,
        bottom: 0,
        id: "win"
    });
    $.addTopLevelView($.__views.win);
    $.__views.img = Ti.UI.createImageView({
        id: "img"
    });
    $.__views.win.add($.__views.img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tabs = [ {
        index: 0,
        isCenter: !1,
        image: "images/tab/account_off.png"
    }, {
        index: 1,
        isCenter: !1,
        image: "images/tab/coupon_off.png"
    }, {
        index: 2,
        isCenter: !0,
        image: "images/tab/generate_off.png"
    }, {
        index: 3,
        isCenter: !1,
        image: "images/tab/fav_off.png"
    }, {
        index: 4,
        isCenter: !1,
        image: "images/tab/setting_off.png"
    } ];
    $.img.image = "images/tab/tabbar_bg.png";
    $.img.bottom = 0;
    $.img.layout = "horizontal";
    _.each(tabs, function(tabConf) {
        $.img.add(Alloy.createController("customTab", tabConf).getView());
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;