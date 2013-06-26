function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createView({
        backgroundColor: "white",
        id: "win"
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
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView"
    });
    $.__views.win.add($.__views.scrollView);
    $.__views.imgContainer = Ti.UI.createView({
        id: "imgContainer"
    });
    $.__views.scrollView.add($.__views.imgContainer);
    $.__views.feedImage = Ti.UI.createImageView({
        id: "feedImage"
    });
    $.__views.imgContainer.add($.__views.feedImage);
    $.__views.overwrap = Ti.UI.createView({
        id: "overwrap"
    });
    $.__views.scrollView.add($.__views.overwrap);
    $.__views.controller = Ti.UI.createScrollView({
        id: "controller"
    });
    $.__views.win.add($.__views.controller);
    $.__views.text = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        shadowColor: "#000",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "text"
    });
    $.__views.controller.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, punchApi = require("punchAPI"), calcTime = require("calcTime"), feed = args.feed, width = Ti.Platform.displayCaps.platformWidth, height = width, HEIGHT = Ti.Platform.displayCaps.platformHeight, margin = 5, shopImageWidth = 36, titleWidth = width - 100;
    $.win.backgroundColor = "black";
    $.win.opacity = 0;
    $.navbar.backgroundColor = Alloy.CFG.colors.grey;
    $.navbar.top = 0;
    $.title.text = feed.shop_name;
    $.title.width = titleWidth;
    $.title.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
    var created_at = feed.created_at - 57600000, date = new Date(created_at);
    $.scrollView.top = Alloy.CFG.navbarHeight;
    $.feedImage.image = feed.feed_image_urls[0];
    $.feedImage.width = width;
    $.imgContainer.width = width;
    $.imgContainer.height = Ti.UI.SIZE;
    var shopFeedArg = {
        name: feed.shop_name,
        shop_image_url: feed.shop_img_url,
        shop_id: feed.shop_id
    };
    $.win.width = width;
    var animation = Ti.UI.createAnimation({
        left: -320,
        duration: 300
    });
    $.win.addEventListener("swipe", function(e) {
        e.direction == "right" && $.win.animate({
            opacity: 0,
            duration: 1000
        });
    });
    $.title.addEventListener("click", function() {
        if (Alloy.Globals.clickFlag) return;
        Alloy.Globals.clickFlag = !0;
        args.from == "main" ? Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView()) : $.win.animate({
            opacity: 0,
            duration: 1000
        });
        Alloy.Globals.clickFlag = !1;
    });
    $.backContainer.addEventListener("click", function() {
        $.win.animate({
            opacity: 0,
            duration: 1000
        });
    });
    $.scrollView.minZoomScale = 1;
    $.scrollView.maxZoomScale = 15;
    $.scrollView.zoomScale = 1;
    $.scrollView.oldZoom = 1;
    $.scrollView.addEventListener("touchend", function(e) {
        $.scrollView.oldZoom = $.scrollView.zoomScale;
    });
    var fadeOut = Ti.UI.createAnimation({
        opacity: 0,
        duration: 100
    }), fadeIn = Ti.UI.createAnimation({
        opacity: 1,
        duration: 100
    }), halfFadeIn = Ti.UI.createAnimation({
        opacity: 0.5,
        duration: 100
    }), scrolling = !1;
    $.scrollView.addEventListener("scroll", function(e) {
        if (!scrolling) {
            scrolling = !0;
            console.log("not pinch");
            $.controller.animate(fadeOut);
        }
    });
    $.scrollView.addEventListener("scale", function(e) {
        scrolling = !1;
        e.scale == 1 && $.controller.animate(fadeIn);
    });
    $.feedImage.addEventListener("load", function(e) {
        console.log("in load" + JSON.stringify(e));
    });
    $.imgContainer.addEventListener("doubletop", function() {
        console.log("doubletop");
    });
    var zoomScale = !1;
    $.scrollView.addEventListener("doubletap", function(e) {
        console.log(JSON.stringify(e));
        console.log("toImage: " + JSON.stringify($.scrollView.toImage()));
        var t = Titanium.UI.create2DMatrix();
        if (this.zoomScale == 1) {
            zoomScale = !0;
            this.zoomScale = 2;
        } else {
            this.zoomScale = 1;
            zoomScale = !1;
        }
        Ti.API.info("Our event tells us the center is " + e.x + ", " + e.y);
    });
    $.scrollView.addEventListener("dragstart", function() {
        $.controller.animate(fadeOut);
        console.log("dg start");
    });
    $.scrollView.addEventListener("dragend", function() {
        this.zoomScale == 1 && $.controller.animate(fadeIn);
        console.log(this.zoomScale);
        console.log("dg end");
    });
    var scrollView3 = Titanium.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        bottom: 0,
        width: width,
        height: 150,
        borderRadius: 10,
        showVerticalScrollIndicator: !0,
        showHorizontalScrollIndicator: !0,
        horizontalBounce: !0,
        verticalBounce: !0
    }), view3 = Ti.UI.createLabel({
        width: width,
        height: 120,
        top: 10,
        text: text
    });
    $.scrollView.verticalBounce = !0;
    $.controller.horizontalBounce = !1;
    $.controller.verticalBounce = !0;
    $.controller.width = width;
    $.controller.bottom = -50;
    $.controller.addEventListener("dragstart", function() {
        $.overwrap.animate(halfFadeIn);
        this.height += HEIGHT;
        console.log("control dg start");
    });
    $.controller.addEventListener("dragend", function() {
        $.overwrap.animate(fadeOut);
        this.height -= HEIGHT;
        console.log("control dg end");
    });
    var text = feed.text.replace(/\n\n/g, "\n").replace(/http:\/\/t.co\/[a-zA-Z0-9]{10}/g, "");
    $.text.height = Ti.UI.SIZE;
    $.text.text = text;
    $.text.bottom = 0;
    $.text.width = width - 10;
    $.text.color = "white";
    $.text.left = margin;
    $.controller.hide();
    var footerHeight = 75;
    setTimeout(function() {
        $.text.toImage().height < footerHeight ? $.controller.bottom = 0 : $.controller.bottom = footerHeight - $.text.toImage().height;
        $.controller.height = $.text.toImage().height;
        $.controller.show();
    }, 200);
    console.log("imgContainerHeight: " + $.imgContainer.toImage().height);
    console.log("imgContainerWidth:  " + $.imgContainer.toImage().width);
    var center1 = {
        y: $.imgContainer.toImage().height / 2,
        x: 160
    };
    $.overwrap.height = $.imgContainer.toImage().height;
    $.overwrap.width = $.imgContainer.toImage().width;
    $.overwrap.opacity = 0;
    $.overwrap.backgroundColor = "black";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;