function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createView({
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.imgContainer = Ti.UI.createView({
        id: "imgContainer"
    });
    $.__views.row.add($.__views.imgContainer);
    $.__views.feedImage = Ti.UI.createImageView({
        id: "feedImage"
    });
    $.__views.imgContainer.add($.__views.feedImage);
    $.__views.view = Ti.UI.createView({
        id: "view"
    });
    $.__views.row.add($.__views.view);
    $.__views.feedText = Ti.UI.createLabel({
        id: "feedText"
    });
    $.__views.view.add($.__views.feedText);
    $.__views.time = Ti.UI.createLabel({
        color: "#777",
        font: {
            fontSize: 8
        },
        id: "time"
    });
    $.__views.view.add($.__views.time);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, margin = 5, WIDTH = Ti.Platform.displayCaps.platformWidth, created_at = args.created_at - 57600000, date = new Date(created_at), height = WIDTH / 4;
    console.log("[listView.js]" + JSON.stringify(args));
    $.row.top = margin;
    $.row.bottom = margin;
    $.row.layout = "horizontal";
    $.view.layout = "vertical";
    $.view.width = WIDTH - height;
    $.imgContainer.width = height - 10;
    $.imgContainer.height = height - 10;
    $.imgContainer.left = margin;
    $.row.height = height;
    $.view.height = height - 10;
    $.view.left = margin;
    $.feedImage.image = args.feed_image_urls[0];
    $.feedImage.top = 0;
    $.feedImage.addEventListener("load", function(e) {
        var blob = $.feedImage.toBlob(), w = blob.width, h = blob.height;
        if (h > w) {
            $.feedImage.width = height;
            $.feedImage.height = height * (h / w);
        } else {
            $.feedImage.height = height;
            $.feedImage.width = height * (w / h);
        }
        $.feedImage.show();
    });
    var text = args.text.replace(/http:\/\/t.co\/[a-zA-Z0-9]{10}/g, "");
    $.feedText.text = text;
    $.feedText.font = Alloy.CFG.font.common;
    $.feedText.top = 0;
    $.feedText.height = height - 30;
    $.feedText.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
    $.feedText.width = Ti.UI.FILL;
    $.feedText.backgroundColor = "white";
    $.time.text = String.formatDate(date, "short") + "  " + String.formatTime(date, "short");
    $.time.height = 20;
    $.time.right = margin;
    $.time.font = {
        fontSize: 10
    };
    $.imgContainer.addEventListener("click", function() {
        var v = Alloy.createController("paper/feedDetail", {
            feed: args,
            from: "shopFeed"
        }).getView(), anim = Ti.UI.createAnimation({
            opacity: 1,
            duration: 1000
        });
        console.log("current win: " + JSON.stringify(Alloy.Globals.currentWindow));
        Alloy.Globals.currentWindow.add(v);
        v.animate(anim);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;