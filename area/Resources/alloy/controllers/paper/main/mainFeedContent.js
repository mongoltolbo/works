function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.view = Ti.UI.createView({
        id: "view"
    });
    $.addTopLevelView($.__views.view);
    $.__views.verticalContainer = Ti.UI.createView({
        id: "verticalContainer"
    });
    $.__views.view.add($.__views.verticalContainer);
    $.__views.imgContainer = Ti.UI.createView({
        id: "imgContainer"
    });
    $.__views.verticalContainer.add($.__views.imgContainer);
    $.__views.feedImage = Ti.UI.createImageView({
        id: "feedImage"
    });
    $.__views.imgContainer.add($.__views.feedImage);
    $.__views.labelContainer = Ti.UI.createView({
        id: "labelContainer"
    });
    $.__views.verticalContainer.add($.__views.labelContainer);
    $.__views.shopImage = Ti.UI.createImageView({
        id: "shopImage"
    });
    $.__views.labelContainer.add($.__views.shopImage);
    $.__views.shopName = Ti.UI.createLabel({
        id: "shopName"
    });
    $.__views.labelContainer.add($.__views.shopName);
    $.__views.feedContainer = Ti.UI.createView({
        id: "feedContainer"
    });
    $.__views.verticalContainer.add($.__views.feedContainer);
    $.__views.feedText = Ti.UI.createLabel({
        id: "feedText"
    });
    $.__views.feedContainer.add($.__views.feedText);
    $.__views.time = Ti.UI.createLabel({
        color: "#777",
        font: {
            fontSize: 8
        },
        id: "time"
    });
    $.__views.feedContainer.add($.__views.time);
    $.__views.border = Ti.UI.createView({
        id: "border"
    });
    $.__views.verticalContainer.add($.__views.border);
    $.__views.footer = Ti.UI.createView({
        id: "footer"
    });
    $.__views.verticalContainer.add($.__views.footer);
    $.__views.like = Ti.UI.createLabel({
        id: "like"
    });
    $.__views.footer.add($.__views.like);
    $.__views.likeNum = Ti.UI.createLabel({
        id: "likeNum"
    });
    $.__views.footer.add($.__views.likeNum);
    $.__views.likeIcon = Ti.UI.createImageView({
        id: "likeIcon"
    });
    $.__views.footer.add($.__views.likeIcon);
    $.__views.activate = Ti.UI.createView({
        id: "activate"
    });
    $.__views.view.add($.__views.activate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, feed = args.feed, order = args.order, from = args.from, calcTime = require("calcTime"), COL = 3, width, height, largeWidth = Ti.Platform.displayCaps.platformWidth - Alloy.CFG.margin.large, largeHeight = largeWidth + 100, margin = order == -1 ? 10 : 5, smallWidth = Ti.Platform.displayCaps.platformWidth / 2 - Alloy.CFG.margin.large, smallHeight = Ti.Platform.displayCaps.platformWidth / 2 - Alloy.CFG.margin.large, topHeight, topWidth, iconWidth = order == -1 ? 40 : 20, iconHeight = iconWidth;
    if (order == -1) {
        width = largeWidth;
        height = largeHeight;
        topHeight = height + 10;
        topWidth = largeWidth;
        $.view.top = 0;
    } else {
        COL = 2;
        width = smallWidth;
        height = smallHeight;
        topHeight = largeWidth / 2 + 5;
        topWidth = largeWidth / 2;
    }
    $.view.backgroundImage = null;
    $.view.width = width;
    $.view.height = Ti.UI.SIZE;
    $.view.bottom = 5;
    $.imgContainer.top = 0;
    $.imgContainer.width = width;
    $.imgContainer.height = width;
    (order % 2 != 0 || order == -1) && order == -1;
    $.shopName.left = 5;
    $.view.backgrouncColor = "black";
    $.feedImage.image = feed.feed_image_urls[0];
    $.feedImage.top = 0;
    $.feedImage.opacity = 0;
    $.feedImage.addEventListener("load", function(e) {
        var blob = this.toBlob(), w = blob.width, h = blob.height;
        if (h > w) {
            this.width = width;
            this.height = width * (h / w);
        } else {
            this.height = width;
            this.width = width * (w / h);
        }
        this.animate({
            opacity: 1,
            duration: 200
        });
    });
    var text = feed.text.replace(/\n/g, " ").replace(/http:\/\/t.co\/[a-zA-Z0-9]{10}/g, "");
    $.shopName.text = feed.shop_name;
    $.shopName.color = "#000";
    $.shopName.bottom = 0;
    $.shopName.width = Ti.UI.FILL;
    $.shopName.height = iconHeight;
    $.shopName.font = {
        fontSize: order == -1 ? 16 : 12,
        fontWeight: "bold"
    };
    var openShopFeed = function() {
        var shopFeedArg = {
            name: feed.shop_name,
            shop_image_url: feed.shop_img_url,
            shop_id: feed.shop_id
        };
        Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
    };
    $.shopName.addEventListener("click", openShopFeed);
    $.activate.opacity = 0.5;
    $.activate.width = width;
    $.activate.height = width;
    $.activate.top = 0;
    $.activate.backgroundColor = "black";
    $.activate.hide();
    $.imgContainer.addEventListener("click", function() {
        var v = Alloy.createController("paper/feedDetail", {
            feed: feed,
            from: from
        }).getView(), anim = Ti.UI.createAnimation({
            opacity: 1,
            duration: 1000
        });
        Alloy.Globals.currentWindow.add(v);
        v.animate(anim);
    });
    $.labelContainer.top = Alloy.CFG.margin.middle;
    $.labelContainer.height = order == -1 ? 40 : 20;
    $.labelContainer.layout = "horizontal";
    $.shopImage.width = iconWidth;
    $.shopImage.height = iconHeight;
    $.shopImage.image = feed.shop_img_url;
    $.shopImage.left = 0;
    $.shopImage.backgroundColor = "blue";
    $.shopImage.addEventListener("click", openShopFeed);
    $.feedContainer.top = Alloy.CFG.margin.middle;
    $.feedContainer.height = Ti.UI.SIZE;
    $.feedContainer.layout = "vertical";
    $.feedContainer.backgroundColor = "white";
    $.feedText.text = text;
    $.feedText.font = {
        fontSize: 10
    };
    var created_at = feed.created_at - 57600000, date = new Date(created_at);
    $.time.text = calcTime.getDiffTime(created_at);
    $.time.right = 0;
    $.time.top = 0;
    $.border.height = 1;
    $.border.top = Alloy.CFG.margin.middle;
    $.border.backgroundColor = "#333333";
    $.footer.height = 20;
    $.verticalContainer.height = Ti.UI.SIZE;
    $.verticalContainer.layout = "vertical";
    $.like.text = "FLY!!";
    $.like.left = 0;
    $.like.font = {
        fontSize: 10,
        fontWeight: "bold"
    };
    $.likeNum.text = 0;
    $.likeNum.color = "pink";
    $.likeNum.right = 32;
    $.likeIcon.image = "/images/fav_on.png";
    $.likeIcon.right = 0;
    $.likeIcon.height = 18;
    $.likeIcon.width = 21;
    $.likeIcon.right = 3;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;