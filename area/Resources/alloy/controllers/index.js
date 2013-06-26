function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentLocation = null, punchApi = require("punchAPI");
    Alloy.Globals.location = {
        lat: 35.671482,
        lng: 139.7088
    };
    Alloy.Globals.distance = 3000;
    Alloy.Globals.limit = 10;
    Alloy.Globals.clickFlag = !1;
    Alloy.Globals.category = [ 10, 20, 30, 40, 50 ];
    Alloy.Globals.categories = [ {
        check: !0,
        name: "買物",
        cid: 10
    }, {
        check: !0,
        name: "飲食",
        cid: 20
    }, {
        check: !0,
        name: "サービス",
        cid: 30
    }, {
        check: !0,
        name: "イベント",
        cid: 40
    }, {
        check: !0,
        name: "地域情報",
        cid: 50
    } ];
    Alloy.Globals.searchedBy = "渋谷区";
    Alloy.Globals.back = function() {
        Alloy.Globals.currentTabGroup.activeTab.close(Alloy.Globals.currentWindow, {
            animated: !0
        });
    };
    Ti.Geolocation.purpose = "Required!!";
    var data = {
        lat: Alloy.Globals.location.lat,
        lng: Alloy.Globals.location.lng,
        distance: Alloy.Globals.defaultDistance,
        category: 10,
        limit: Alloy.Globals.limit,
        page: 0
    }, path = "feed/geoFeed", tg = Ti.UI.createTabGroup();
    tg.addTab(Alloy.createController("paper").getView());
    var osname = Ti.Platform.osname;
    osname === "iphone" || osname === "ipad" ? tg.open({
        transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    }) : tg.open();
    Alloy.Globals.currentTabGroup = tg;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;