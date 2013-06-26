function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.bar = Ti.UI.createView({
        top: 0,
        height: 40,
        id: "bar"
    });
    $.addTopLevelView($.__views.bar);
    $.__views.areaButton = Ti.UI.createButton({
        top: 0,
        left: 0,
        backgroundImage: "/images/area_off.png",
        backgroundFocusedImage: "/images/area_on.png",
        backgroundSelectedImage: "/images/area_on.png",
        id: "areaButton"
    });
    $.__views.bar.add($.__views.areaButton);
    $.__views.categoryButton = Ti.UI.createButton({
        top: 0,
        backgroundImage: "/images/cate_off.png",
        backgroundFocusedImage: "/images/cate_on.png",
        backgroundSelectedImage: "/images/cate_on.png",
        id: "categoryButton"
    });
    $.__views.bar.add($.__views.categoryButton);
    $.__views.shopList = Ti.UI.createButton({
        top: 0,
        right: 0,
        backgroundImage: "/images/list_off.png",
        backgroundFocusedImage: "/images/list_on.png",
        backgroundSelectedImage: "/images/list_on.png",
        id: "shopList"
    });
    $.__views.bar.add($.__views.shopList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, punchApi = require("punchAPI"), width = Ti.Platform.displayCaps.platformWidth / 3, height = width * (54 / 193);
    $.bar.width = Ti.Platform.displayCaps.platformWidth;
    $.bar.height = height;
    console.log(JSON.stringify(args));
    var sub = 1;
    $.areaButton.width = width - sub;
    $.categoryButton.width = width - sub;
    $.shopList.width = width - sub;
    $.areaButton.height = height;
    $.categoryButton.height = height;
    $.shopList.height = height;
    $.shopList.addEventListener("click", function() {
        if (Alloy.Globals.clickFlag) return;
        Alloy.Globals.clickFlag = !0;
        var param = {
            lat: Alloy.Globals.location.lat,
            lng: Alloy.Globals.location.lng,
            distance: Alloy.Globals.distance
        };
        punchApi.sendRequest("shop/list", param, "POST", function(args) {
            Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopList", args.resBody).getView());
        });
        Alloy.Globals.clickFlag = !1;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;