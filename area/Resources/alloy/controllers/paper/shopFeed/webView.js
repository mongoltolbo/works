function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        tabBarHidden: !0,
        barColor: "#000000",
        id: "win",
        layout: "vertical"
    });
    $.addTopLevelView($.__views.win);
    $.__views.navbar = Ti.UI.createView({
        height: Alloy.CFG.navbarHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "navbar"
    });
    $.__views.win.add($.__views.navbar);
    $.__views.backContainer = Ti.UI.createView({
        left: 0,
        width: 48,
        height: Alloy.CFG.nabvarHeight,
        id: "backContainer"
    });
    $.__views.navbar.add($.__views.backContainer);
    $.__views.backButton = Ti.UI.createImageView({
        image: "/images/back_arrow.png",
        left: 10,
        width: 34,
        height: 22,
        id: "backButton"
    });
    $.__views.backContainer.add($.__views.backButton);
    $.__views.title = Ti.UI.createLabel({
        height: 22,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "title"
    });
    $.__views.navbar.add($.__views.title);
    $.__views.webView = Ti.UI.createWebView({
        id: "webView"
    });
    $.__views.win.add($.__views.webView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.win.backButtonTitle = "戻る";
    $.webView.url = args.url;
    $.backContainer.addEventListener("click", function() {
        Alloy.Globals.currentTabGroup.activeTab.close($.win, {
            animated: !0
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;