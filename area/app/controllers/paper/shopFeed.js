var args = arguments[0] || {};
var punchApi = require('punchAPI');
var margin = 5;
var barTop = 180;
var contentTop = 230 + margin * 2;
var cellHeight;
var WIDTH = Ti.Platform.displayCaps.platformWidth;

$.content.layout = 'vertical';
$.content.top = 0;
$.win.addEventListener('focus', function() {
    $.win.winName = "shopFeed";
    $.win.navBarHidden = true;
    Alloy.Globals.currentWindow = $.win;
});

$.navbar.height = Alloy.CFG.navbarHeight;
$.navbar.width = WIDTH;
$.navbar.backgroundColor = Alloy.CFG.colors.red;
// $.backButton.image = "/images/back_arrow.png";
// $.backButton.left = 10;
// $.backButton.height = 22;
// $.backButton.width = 34;
$.title.text = args.name;
$.title.width = WIDTH - 100;
$.backContainer.addEventListener('click', function() {
    Alloy.Globals.currentTabGroup.activeTab.close($.win, {animated:true});
});
console.log("[shopFeed.js]" + JSON.stringify(args));

Ti.API.info("in shop feed");

// $.win.navBarHidden = false;
$.win.title = args.name;
$.shopLogo.image = args.cover_image || "/images/area_default_cover.jpg";
$.shopLogo.width = WIDTH;
$.shopLogo.height = 'auto';
// $.icon.height = 50;
// $.icon.width = 50;
// $.icon.top = 30;
// $.icon.image = args.shop_image_url;

var iconHeight = 40;
console.log(JSON.stringify(args));
// $.shopImage.image = args.shop_image_url;
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
// $.iconContainer.backgroundColor = "red";
$.scrollView.layout = 'vertical';
$.scrollView.scrollable = true;

// var nextView = Ti.UI.createView({
//     height: 40,
//     width: 100,
//     backgroundColor: "#e2e7ed"
// });
// nextView.hide();

var grid = Ti.UI.createImageView({
    enabled: false,
    title: "grid",
    left: 27,
    image: "/images/grid_on.png",
    width: 30,
    height: 30
});

var list = Ti.UI.createImageView({
    enabled: false,
    title: "list",
    left: 97,
    image: "/images/listView_off.png",
    width: 30,
    height: 30
});

var detail = Ti.UI.createImageView({
    enabled: false,
    title: "info",
    left: 165,
    image: "/images/tenpo_info.png",
    width: 120,
    height: 30
});

// var buttons = {grid: grid, list: list, info: detail};
var buttons = {grid: $.grid, list: $.list, info: $.info};

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
$.viewSwitcher.layout = 'horizontal';
$.viewSwitcher.border = 1;
$.viewSwitcher.borderColor = 'black';
$.viewSwitcher.backgroundRepeat = true;

$.b1.width = $.viewSwitcher.getWidth() / 3;
$.b2.width = $.viewSwitcher.getWidth() / 3;
$.b3.width = $.viewSwitcher.getWidth() / 3;

var gridView = Ti.UI.createView();

// gridView.top = contentTop;
var listView = Ti.UI.createView();
listView.layout = 'vertical';
listView.height = Ti.UI.SIZE;
// listView.top = contentTop;
// listView.scrollable = false;
// listView.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;

var infoView = Ti.UI.createView();
infoView.height = Ti.UI.SIZE;
// infoView.top = contentTop;

var param = {
    "shop_id": args.shop_id,
    "limit": 21,
    "page": 0
};

var path = "shop/detail/" + args.shop_id;
punchApi.sendRequest(path, {}, "GET", function(args) {
    $.shopImage.image = args.resBody.shop_image_url;
    console.log("[shopFeed.js] in detail" + JSON.stringify(args));
    var shopDetail = Alloy.createController('paper/shopFeed/shopDetail', args.resBody);
    infoView.add(shopDetail.getView());
    var desc = Alloy.createController('paper/shopFeed/shopTop', {desc: args.resBody.about});
    gridView.add(desc.getView());
});

var listLoaded = false;
var getListView = function() {
    punchApi.sendRequest("feed/shop", param, "POST", function(args) {
        var listLoaded = true;
        var order = 0;
        if (args.resBody.length != 0) {
            _.each(args.resBody, function(feed) {
                var content = Alloy.createController('paper/main/mainFeedContent', {feed: feed, order: order++, from: 'shopFeed'});
                var created_at = feed.created_at - 57600000; // 何故か16時間引くと上手くいく
                var date = new Date(created_at);
                console.log(JSON.stringify(feed));
                listView.add(Alloy.createController('paper/shopFeed/listView', feed).getView());
            });
        }
    });
};

$.scrollView.scrollingEnable = true;
_.each(buttons, function(button) {
    button.enabled = true;
});

$.scrollView.add(infoView);
// gridView.add(nextView);

var contents = {grid: gridView, list: listView, info: infoView};
var active = "info";

var switchContent = function(e) {
    console.log(JSON.stringify(this));
    if (!listLoaded && this.title == "list")
        getListView();
    if (this.image.match("off") ){
        this.image = this.image.replace("off", "on");
    }
    if (this.title != active) {
        buttons[active].image = buttons[active].image.replace("on", "off");
    }
    $.scrollView.remove(contents[active]);
    $.scrollView.add(contents[this.title]);
    active = this.title;
};

_.each(buttons, function(button) {
    button.addEventListener('click', switchContent);
});

$.win.addEventListener('swipe', function(e) {
    if (e.direction == 'right') {
        Alloy.Globals.currentTabGroup.activeTab.close(this, {animated:true});
    }    
});

// $.scrollView.addEventListener('scroll', function(e) {
//     if (0 < e.y && e.y < Alloy.CFG.navbarHeight) {
//         $.navbar.animate = {top: 0 - e.y, duration: e.y};
//     }
// });
