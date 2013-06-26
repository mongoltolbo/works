function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        tabBarHidden: !0,
        barColor: "#000000",
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
    $.__views.cateTable = Ti.UI.createTableView({
        id: "cateTable"
    });
    $.__views.win.add($.__views.cateTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var categories = Alloy.Globals.categories, b = Titanium.UI.createButton({
        title: "Close",
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    });
    $.win.navBarHidden = !0;
    $.win.layout = "vertical";
    $.win.setLeftNavButton(b);
    var apply = function() {
        console.log(JSON.stringify(Alloy.Globals.categories));
        var result = [];
        _.each(Alloy.Globals.categories, function(cate) {
            cate.check == 1 && result.push(cate.cid);
        });
        Alloy.Globals.category = result;
        $.win.close();
        Alloy.Globals.reloadMainFeed();
    };
    b.addEventListener("click", apply);
    $.navbar.backgroundColor = Alloy.CFG.colors.orange;
    $.navbarLeft.add(b);
    var i = 0;
    _.each(categories, function(category) {
        var row = Alloy.createController("paper/cateRow", {
            cate: category,
            index: i++
        }).getView();
        $.cateTable.appendRow(row);
    });
    $.cateTable.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
    $.win.addEventListener("swipe", function(e) {
        e.direction == "down" && this.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;