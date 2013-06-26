function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        tabBarHidden: !0,
        barColor: "#000000",
        title: "一覧",
        id: "win"
    });
    $.addTopLevelView($.__views.win);
    $.__views.navbar = Ti.UI.createView({
        height: Alloy.CFG.navbarHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "navbar"
    });
    $.__views.win.add($.__views.navbar);
    $.__views.navbarLeft = Ti.UI.createView({
        left: 0,
        width: 48,
        height: Alloy.CFG.nabvarHeight,
        id: "navbarLeft"
    });
    $.__views.navbar.add($.__views.navbarLeft);
    $.__views.backButton = Ti.UI.createImageView({
        image: "/images/back_arrow.png",
        left: 10,
        width: 34,
        height: 22,
        id: "backButton"
    });
    $.__views.navbarLeft.add($.__views.backButton);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.win.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, shop = args.shop;
    $.win.navBarHidden = !0;
    $.win.layout = "vertical";
    $.win.addEventListener("focus", function() {
        $.win.winName = "shopList";
        Alloy.Globals.currentWindow = $.win;
    });
    $.navbar.backgroundColor = Alloy.CFG.colors.orange;
    $.navbarLeft.backgroundColor = "white";
    $.navbarLeft.addEventListener("click", function() {
        $.win.close();
    });
    $.tableView.data = _.map(shop, function(item) {
        return Alloy.createController("paper/shopListRow", {
            shop: item
        }).getView();
    });
    $.navbar.addEventListener("swipe", function(e) {
        e.direction == "down" && this.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;