function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView"
    });
    $.addTopLevelView($.__views.scrollView);
    $.__views.navbar = Ti.UI.createView({
        height: Alloy.CFG.navbarHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "navbar"
    });
    $.__views.scrollView.add($.__views.navbar);
    $.__views.list = Ti.UI.createImageView({
        id: "list"
    });
    $.__views.navbar.add($.__views.list);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo"
    });
    $.__views.navbar.add($.__views.logo);
    $.__views.navbarRight = Ti.UI.createView({
        right: 0,
        width: 48,
        height: Alloy.CFG.nabvarHeight,
        id: "navbarRight"
    });
    $.__views.navbar.add($.__views.navbarRight);
    $.__views.refresh = Ti.UI.createImageView({
        id: "refresh"
    });
    $.__views.navbarRight.add($.__views.refresh);
    $.__views.verticalView = Ti.UI.createView({
        id: "verticalView"
    });
    $.__views.scrollView.add($.__views.verticalView);
    $.__views.sub = Ti.UI.createView({
        id: "sub"
    });
    $.__views.scrollView.add($.__views.sub);
    $.__views.left = Ti.UI.createView({
        id: "left"
    });
    $.__views.sub.add($.__views.left);
    $.__views.right = Ti.UI.createView({
        id: "right"
    });
    $.__views.sub.add($.__views.right);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, punchApi = require("punchAPI"), WIDTH = Ti.Platform.displayCaps.platformWidth;
    console.log("[mainFeed.js]" + JSON.stringify(args));
    var loading = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.Platform.displayCaps.platformHeight,
        backgroundColor: "black",
        opacity: 0.7
    }), actInd1 = Titanium.UI.createActivityIndicator({
        width: 50,
        height: 50
    });
    $.scrollView.backgroundColor = "#EEEEEE";
    $.scrollView.layout = "vertical";
    $.verticalView.layout = "vertical";
    $.verticalView.height = Ti.UI.SIZE;
    $.sub.layout = "horizontal";
    $.sub.width = WIDTH;
    $.sub.height = Ti.UI.SIZE;
    $.left.width = WIDTH / 2;
    $.left.layout = "vertical";
    $.left.height = Ti.UI.SIZE;
    $.left.top = 0;
    $.right.width = WIDTH / 2;
    $.right.layout = "vertical";
    $.right.height = Ti.UI.SIZE;
    $.right.top = 0;
    var nextView = Ti.UI.createView({
        height: 40,
        width: 100,
        backgroundColor: "#e2e7ed"
    }), nextLabel = Ti.UI.createLabel({
        text: "次へ"
    }), actInd = Titanium.UI.createActivityIndicator({
        width: 30,
        height: 30,
        style: Ti.Platform.osname == "ios" ? Titanium.UI.iPhone.ActivityIndicatorStyle.DARK : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
    }), infoPanel = Ti.UI.createView({
        backgroundColor: Alloy.CFG.colors.orange,
        left: Alloy.CFG.margin.middle,
        bottom: 10,
        width: WIDTH * 0.7,
        height: 80,
        layout: "vertical"
    }), location = Ti.UI.createLabel({
        text: Alloy.Globals.searchedBy
    });
    location.color = "white";
    location.font = {
        fontSize: 30,
        fontWeight: "bold"
    };
    location.left = 3;
    location.addEventListener("click", function() {
        Alloy.createController("paper/mapWin").getView().open({
            modal: !0
        });
    });
    var time = Ti.UI.createLabel({});
    time.font = {
        fontSize: 30,
        fontWeight: "bold"
    };
    time.color = "white";
    time.left = 3;
    infoPanel.add(location);
    infoPanel.add(time);
    var order = -1, cellHeight, topCellHeight, getMainFeedContents = function(feeds) {
        _.each(feeds, function(feed) {
            var content = Alloy.createController("paper/main/mainFeedContent", {
                feed: feed,
                order: order++,
                from: "main"
            }).getView();
            if (order == 0) {
                topCellHeight = content.height;
                $.verticalView.add(content);
                $.verticalView.add(infoPanel);
                $.left.add(catePanel);
            } else if (order % 2 == 0) {
                console.log(content.toImage().height);
                $.left.add(content);
            } else {
                order == 1 && (content.top = 0);
                $.right.add(content);
            }
        });
        $.scrollView.add(actInd);
    }, param = {
        lat: Alloy.Globals.location.lat,
        lng: Alloy.Globals.location.lng,
        distance: Alloy.Globals.distance,
        category: Alloy.Globals.category,
        limit: Alloy.Globals.limit,
        page: 0
    }, path = "feed/geoFeed", nextLimit = param.limit - 1, responsed = !1;
    punchApi.sendRequest(path, param, "POST", function(args) {
        responsed = !0;
        console.log("[mainFeed.js] distance:" + Alloy.Globals.distance);
        getMainFeedContents(args.resBody);
        nextView.show();
    });
    var nextLoading = !1, changeNextView = function(state) {
        if (state == "loading") {
            nextLoading = !0;
            nextLabel.hide();
            actInd.show();
            nextView.backgroundColor = "#B0B5BB";
        } else if (state == "unloading") {
            nextLoading = !1;
            nextLabel.show();
            actInd.hide();
            nextView.backgroundColor = "#e2e7ed";
        }
    };
    setTimeout(function() {
        responsed || Alloy.Globals.reloadMainFeed();
    }, 5000);
    setInterval(function() {
        var d = new Date, t = {};
        t.month = d.getMonth() + 1;
        t.date = d.getDate();
        t.hour = ("0" + d.getHours()).slice(-2);
        t.minute = ("0" + d.getMinutes()).slice(-2);
        t.second = ("0" + d.getSeconds()).slice(-2);
        time.text = t.month + "/" + t.date + " " + t.hour + ":" + t.minute + ":" + t.second;
    }, 1000);
    var catePanel = Ti.UI.createView();
    catePanel.height = WIDTH / 2 - Alloy.CFG.margin.large;
    catePanel.width = WIDTH / 2 - Alloy.CFG.margin.large;
    catePanel.bottom = 5;
    var cateView = Ti.UI.createView();
    cateView.height = WIDTH / 2 - Alloy.CFG.margin.large;
    cateView.width = WIDTH / 2 - Alloy.CFG.margin.large;
    cateView.top = 0;
    cateView.backgroundColor = Alloy.CFG.colors.grey;
    var cateLabel = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 26,
            fontWeight: "bold"
        },
        top: 3,
        left: 3,
        text: "カテゴリ"
    });
    cateLabel.addEventListener("click", function() {
        Alloy.createController("paper/cateWin").getView().open({
            modal: !0
        });
    });
    catePanel.add(cateView);
    catePanel.add(cateLabel);
    $.navbar.height = 44;
    $.navbar.width = WIDTH;
    $.navbar.backgroundColor = Alloy.CFG.colors.blue;
    $.list.image = "/images/top_bar/slide_list.png";
    $.list.left = 10;
    $.list.height = 22;
    $.list.width = 22;
    $.logo.image = "/images/top_bar/logo.png";
    $.logo.height = 30;
    $.refresh.image = "/images/top_bar/refresh.png";
    $.refresh.right = 10;
    $.refresh.height = 22;
    $.refresh.width = 22;
    var refreshAct = Titanium.UI.createActivityIndicator({
        width: 22,
        height: 22
    });
    $.navbarRight.add(refreshAct);
    $.navbarRight.addEventListener("click", function() {
        $.refresh.hide();
        refreshAct.show();
        Alloy.Globals.reloadMainFeed();
    });
    var isTopScroll = !0;
    $.scrollView.addEventListener("scroll", function(e) {
        e.y <= 10 ? isTopScroll = !0 : isTopScroll = !1;
    });
    var nextLoad = function() {
        if (nextLoading) return;
        nextLoading = !0;
        param.page += 1;
        actInd.show();
        punchApi.sendRequest(path, param, "POST", function(res) {
            $.scrollView.remove(actInd);
            getMainFeedContents(res.resBody);
            nextLoading = !1;
        });
    };
    $.scrollView.addEventListener("scrollend", function(e) {
        isTopScroll || nextLoad();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;