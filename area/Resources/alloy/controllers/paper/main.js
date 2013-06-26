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
    var punchApi = require("punchAPI"), WIDTH = Ti.Platform.displayCaps.platformWidth;
    $.win.navBarHidden = !0;
    $.win.addEventListener("focus", function() {
        $.win.winName = "paper";
        $.win.navBarHidden = !0;
        Alloy.Globals.currentWindow = $.win;
    });
    $.win.backgroundImage = "null";
    $.win.backgroundColor = "white";
    $.win.title = Alloy.Globals.searchedBy;
    var mainFeedContainer = Ti.UI.createView();
    $.win.add(mainFeedContainer);
    mainFeedContainer.top = 0;
    mainFeedContainer.add(Alloy.createController("paper/main/mainFeed").getView());
    var reloadInterval = 1, canReload = !0;
    Alloy.Globals.reloadMainFeed = function(e) {
        if (canReload) {
            reload();
            canReload = !1;
            setTimeout(function() {
                canReload = !0;
                console.log("You can reload!");
            }, reloadInterval);
        } else console.log("You cannot reload");
    };
    var reload = function() {
        $.win.remove(mainFeedContainer);
        mainFeedContainer = Ti.UI.createView();
        mainFeedContainer.top = 0;
        $.win.add(mainFeedContainer);
        mainFeedContainer.add(Alloy.createController("paper/main/mainFeed").getView());
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;