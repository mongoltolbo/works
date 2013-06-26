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
    $.__views.content = Ti.UI.createView({
        id: "content"
    });
    $.__views.win.add($.__views.content);
    $.__views.navbar = Ti.UI.createView({
        height: Alloy.CFG.navbarHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "navbar"
    });
    $.__views.content.add($.__views.navbar);
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
    $.__views.content.add($.__views.scrollView);
    $.__views.shopLogo = Ti.UI.createImageView({
        top: 0,
        id: "shopLogo"
    });
    $.__views.scrollView.add($.__views.shopLogo);
    $.__views.iconContainer = Ti.UI.createView({
        id: "iconContainer"
    });
    $.__views.scrollView.add($.__views.iconContainer);
    $.__views.shopImage = Ti.UI.createImageView({
        id: "shopImage"
    });
    $.__views.iconContainer.add($.__views.shopImage);
    $.__views.shopName = Ti.UI.createLabel({
        id: "shopName"
    });
    $.__views.iconContainer.add($.__views.shopName);
    $.__views.like = Ti.UI.createLabel({
        id: "like"
    });
    $.__views.iconContainer.add($.__views.like);
    $.__views.distance = Ti.UI.createLabel({
        id: "distance"
    });
    $.__views.iconContainer.add($.__views.distance);
    $.__views.viewSwitcher = Ti.UI.createView({
        id: "viewSwitcher"
    });
    $.__views.scrollView.add($.__views.viewSwitcher);
    $.__views.b1 = Ti.UI.createView({
        id: "b1"
    });
    $.__views.viewSwitcher.add($.__views.b1);
    $.__views.info = Ti.UI.createImageView({
        width: 30,
        height: 30,
        backgroundColor: "black",
        id: "info"
    });
    $.__views.b1.add($.__views.info);
    $.__views.b2 = Ti.UI.createView({
        id: "b2"
    });
    $.__views.viewSwitcher.add($.__views.b2);
    $.__views.list = Ti.UI.createImageView({
        width: 30,
        height: 30,
        backgroundColor: "black",
        id: "list"
    });
    $.__views.b2.add($.__views.list);
    $.__views.b3 = Ti.UI.createView({
        id: "b3"
    });
    $.__views.viewSwitcher.add($.__views.b3);
    $.__views.grid = Ti.UI.createImageView({
        width: 30,
        height: 30,
        backgroundColor: "black",
        id: "grid"
    });
    $.__views.b3.add($.__views.grid);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, punchApi = require("punchAPI"), margin = 5, barTop = 180, contentTop = 230 + margin * 2, cellHeight, WIDTH = Ti.Platform.displayCaps.platformWidth;
    $.content.layout = "vertical";
    $.content.top = 0;
    $.win.addEventListener("focus", function() {
        $.win.winName = "shopFeed";
        $.win.navBarHidden = !0;
        Alloy.Globals.currentWindow = $.win;
    });
    $.navbar.height = Alloy.CFG.navbarHeight;
    $.navbar.width = WIDTH;
    $.navbar.backgroundColor = Alloy.CFG.colors.red;
    $.title.text = args.name;
    $.title.width = WIDTH - 100;
    $.backContainer.addEventListener("click", function() {
        Alloy.Globals.currentTabGroup.activeTab.close($.win, {
            animated: !0
        });
    });
    console.log("[shopFeed.js]" + JSON.stringify(args));
    Ti.API.info("in shop feed");
    $.win.title = args.name;
    $.shopLogo.image = args.cover_image || "/images/area_default_cover.jpg";
    $.shopLogo.width = WIDTH;
    $.shopLogo.height = "auto";
    var iconHeight = 40;
    console.log(JSON.stringify(args));
    $.shopImage.left = margin;
    $.shopImage.width = iconHeight;
    $.shopImage.height = iconHeight;
    $.shopName.text = args.name;
    $.shopName.left = iconHeight + margin;
    $.shopName.top = 0;
    $.shopName.height = 20;
    $.like.text = "いいね！";
    $.like.bottom = 0;
    $.like.left = iconHeight + margin;
    $.distance.text = "-- m";
    $.distance.bottom = 0;
    $.distance.right = 0;
    $.iconContainer.height = iconHeight;
    $.scrollView.layout = "vertical";
    $.scrollView.scrollable = !0;
    var grid = Ti.UI.createImageView({
        enabled: !1,
        title: "grid",
        left: 27,
        image: "/images/grid_on.png",
        width: 30,
        height: 30
    }), list = Ti.UI.createImageView({
        enabled: !1,
        title: "list",
        left: 97,
        image: "/images/listView_off.png",
        width: 30,
        height: 30
    }), detail = Ti.UI.createImageView({
        enabled: !1,
        title: "info",
        left: 165,
        image: "/images/tenpo_info.png",
        width: 120,
        height: 30
    }), buttons = {
        grid: $.grid,
        list: $.list,
        info: $.info
    };
    $.info.image = "/images/listView_off.png";
    $.info.title = "info";
    $.list.image = "/images/listView_off.png";
    $.list.title = "list";
    $.grid.image = "/images/listView_off.png";
    $.grid.title = "grid";
    $.viewSwitcher.top = 10;
    $.viewSwitcher.bottom = 10;
    $.viewSwitcher.height = 50;
    $.viewSwitcher.width = WIDTH - 20;
    $.viewSwitcher.layout = "horizontal";
    $.viewSwitcher.border = 1;
    $.viewSwitcher.borderColor = "black";
    $.viewSwitcher.backgroundRepeat = !0;
    $.b1.width = $.viewSwitcher.getWidth() / 3;
    $.b2.width = $.viewSwitcher.getWidth() / 3;
    $.b3.width = $.viewSwitcher.getWidth() / 3;
    var gridView = Ti.UI.createView(), listView = Ti.UI.createView();
    listView.layout = "vertical";
    listView.height = Ti.UI.SIZE;
    var infoView = Ti.UI.createView();
    infoView.height = Ti.UI.SIZE;
    var param = {
        shop_id: args.shop_id,
        limit: 21,
        page: 0
    }, path = "shop/detail/" + args.shop_id;
    punchApi.sendRequest(path, {}, "GET", function(args) {
        $.shopImage.image = args.resBody.shop_image_url;
        console.log("[shopFeed.js] in detail" + JSON.stringify(args));
        var shopDetail = Alloy.createController("paper/shopFeed/shopDetail", args.resBody);
        infoView.add(shopDetail.getView());
        var desc = Alloy.createController("paper/shopFeed/shopTop", {
            desc: args.resBody.about
        });
        gridView.add(desc.getView());
    });
    var listLoaded = !1, getListView = function() {
        punchApi.sendRequest("feed/shop", param, "POST", function(args) {
            var listLoaded = !0, order = 0;
            args.resBody.length != 0 && _.each(args.resBody, function(feed) {
                var content = Alloy.createController("paper/main/mainFeedContent", {
                    feed: feed,
                    order: order++,
                    from: "shopFeed"
                }), created_at = feed.created_at - 57600000, date = new Date(created_at);
                console.log(JSON.stringify(feed));
                listView.add(Alloy.createController("paper/shopFeed/listView", feed).getView());
            });
        });
    };
    $.scrollView.scrollingEnable = !0;
    _.each(buttons, function(button) {
        button.enabled = !0;
    });
    $.scrollView.add(infoView);
    var contents = {
        grid: gridView,
        list: listView,
        info: infoView
    }, active = "info", switchContent = function(e) {
        console.log(JSON.stringify(this));
        !listLoaded && this.title == "list" && getListView();
        this.image.match("off") && (this.image = this.image.replace("off", "on"));
        this.title != active && (buttons[active].image = buttons[active].image.replace("on", "off"));
        $.scrollView.remove(contents[active]);
        $.scrollView.add(contents[this.title]);
        active = this.title;
    };
    _.each(buttons, function(button) {
        button.addEventListener("click", switchContent);
    });
    $.win.addEventListener("swipe", function(e) {
        e.direction == "right" && Alloy.Globals.currentTabGroup.activeTab.close(this, {
            animated: !0
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;