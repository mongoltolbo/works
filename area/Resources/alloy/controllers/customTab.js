function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.imgContainer = Ti.UI.createView({
        id: "imgContainer"
    });
    $.addTopLevelView($.__views.imgContainer);
    $.__views.img = Ti.UI.createImageView({
        id: "img"
    });
    $.__views.imgContainer.add($.__views.img);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, tabNum = 5, centerFlag = args.isCenter ? 1 : 0, width = Ti.Platform.displayCaps.platformWidth / tabNum;
    $.imgContainer.width = width;
    $.img.width = width - centerFlag * 10;
    $.imgContainer.addEventListener("click", function(e) {
        centerFlag ? Alloy.Globals.currentWindow.winName == "paper" ? Alloy.Globals.reloadMainFeed() : Alloy.Globals.currentTabGroup.setActiveTab(args.index) : Alloy.Globals.currentTabGroup.setActiveTab(args.index);
    });
    $.img.image = args.image;
    $.img.bottom = 2;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;