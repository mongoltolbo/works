var args = arguments[0] || {};
var punchApi = require("punchAPI");
var WIDTH = Ti.Platform.displayCaps.platformWidth;

console.log("[mainFeed.js]" + JSON.stringify(args));

var loading = Ti.UI.createView({
    width: Ti.Platform.displayCaps.platformWidth,
    height: Ti.Platform.displayCaps.platformHeight,
    backgroundColor: 'black',
    opacity: 0.7
});
var actInd1 = Titanium.UI.createActivityIndicator({
    width:50,
    height:50
});
// $.scrollView.add(loading);

$.scrollView.backgroundColor = "#EEEEEE";
$.scrollView.layout = 'vertical';
$.verticalView.layout = 'vertical';
$.verticalView.height = Ti.UI.SIZE;
$.sub.layout = 'horizontal';
$.sub.width = WIDTH;
$.sub.height = Ti.UI.SIZE;
$.left.width = WIDTH / 2;
$.left.layout = 'vertical';
$.left.height = Ti.UI.SIZE;
$.left.top = 0;
// $.left.backgroundColor = 'blue';
$.right.width = WIDTH / 2;
$.right.layout = 'vertical';
$.right.height = Ti.UI.SIZE;
$.right.top = 0;
// $.right.backgroundColor = 'red';

// $.scrollView.layout = 'horizontal';
// $.scrollView.contentWidth = Ti.Platform.displayCaps.platformWidthm;

var nextView = Ti.UI.createView({
    height: 40,
    width: 100,
    backgroundColor: "#e2e7ed"
});
var nextLabel = Ti.UI.createLabel({
    text: "次へ"
});
var actInd = Titanium.UI.createActivityIndicator({
    width:30,
    height:30,
    style: (Ti.Platform.osname == 'ios') ? Titanium.UI.iPhone.ActivityIndicatorStyle.DARK : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
// nextView.aad(nextLabel);
// nextView.add(actInd);
// nextView.borderRadius = "9px";

// $.scrollView.add(nextView);
var infoPanel = Ti.UI.createView({
    backgroundColor: Alloy.CFG.colors.orange,
    left: Alloy.CFG.margin.middle,
    bottom: 10,
    width: WIDTH * 0.7,
    height: 80,
    layout: 'vertical'
});
var location = Ti.UI.createLabel({
    text: Alloy.Globals.searchedBy
});
location.color = 'white';
location.font = {
    fontSize: 30,
    fontWeight: 'bold'
};
location.left = 3;
location.addEventListener('click', function() {
//     Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController('paper/mapWin').getView(), {modal: true});
    Alloy.createController('paper/mapWin').getView().open({modal: true});
});

var time = Ti.UI.createLabel({

});
time.font = {
    fontSize: 30,
    fontWeight: 'bold'
};
time.color = 'white';
time.left = 3;

infoPanel.add(location);
infoPanel.add(time);

var order = -1;
var cellHeight;
var topCellHeight;
var getMainFeedContents = function(feeds) {
//     var ret = [];
//     $.cateContainer.show();
    _.each(feeds, function(feed) {
        var content = Alloy.createController('paper/main/mainFeedContent', {feed: feed, order: order++, from: 'main'}).getView();
        if (order == 0) {
            topCellHeight = content.height;
            $.verticalView.add(content);
            $.verticalView.add(infoPanel);
            $.left.add(catePanel);
        } else if(order % 2 == 0) {
            console.log(content.toImage().height);
            $.left.add(content);
        } else {
            if (order == 1) content.top = 0;
            $.right.add(content);
        }
//         ret.push(content);
    });
    $.scrollView.add(actInd);
    // if (param.limit > ret.length){
    //     nextView.hide();
    // }
//     nextView.top = cellHeight * Math.ceil(feeds.length / 3) * (param.page + 1);
    // console.log(topCellHeight);
    // console.log(cellHeight);
    // nextView.top = cellHeight * Math.ceil(order / 2) + topCellHeight;
    // console.log(nextView.top);
//     $.scrollView.add(ret);
};

var param = {
    "lat": Alloy.Globals.location.lat,
    "lng": Alloy.Globals.location.lng,
    "distance": Alloy.Globals.distance,
    "category": Alloy.Globals.category,
    "limit": Alloy.Globals.limit,
    "page": 0
};
var path = "feed/geoFeed";
var nextLimit = param.limit - 1;

var responsed = false;
punchApi.sendRequest(path, param, "POST", function(args) {
    responsed = true;
//     Alloy.Globals.searchedBy = "現在地周辺";
    console.log("[mainFeed.js] distance:" + Alloy.Globals.distance);
    getMainFeedContents(args.resBody);
//     $.scrollView.add(getMainFeedContents(args.resBody));
    nextView.show();
//     $.scrollView.remove(loading);
});

var nextLoading = false;
// nextView.addEventListener('click', function() {
//     if (nextLoading) return;
//     changeNextView("loading");
//     param.page += 1;
//     param.limit = nextLimit;
//     punchApi.sendRequest(path, param, "POST", function(res) {
//         //    console.log("[index.js]" + JSON.stringify(args));
//         console.log(res.distance);
//         Alloy.Globals.distance = res.distance;
//         getMainFeedContents(res.resBody);
// //         $.scrollView.add(getMainFeedContents(res.resBody));
//         changeNextView("unloading");
//     });
// });

var changeNextView = function(state) {
    if (state == "loading") {
        nextLoading = true;
        nextLabel.hide();
        actInd.show();
        nextView.backgroundColor = "#B0B5BB";
    } else if (state == "unloading") {
        nextLoading = false;
        nextLabel.show();
        actInd.hide();
        nextView.backgroundColor = "#e2e7ed";
    }
};

// 自動再読み込み
setTimeout(function() {
    if(!responsed) {
        Alloy.Globals.reloadMainFeed();
    }
}, 5000);


setInterval(function(){
    var d = new Date();
    var t = {};
//     console.log(d.getMonth() + 1 + "/" + d.getDate());
    t.month = d.getMonth() + 1;
    t.date = d.getDate();
    t.hour =  ( "0" + d.getHours() ).slice(-2);
    t.minute = ( "0" + d.getMinutes() ).slice(-2);
    t.second = ( "0" + d.getSeconds() ).slice(-2);
    time.text = t.month + "/" + t.date + " " + t.hour + ":" + t.minute + ":" + t.second;
} , 1000 );

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
    fontWeight: 'bold'
    },
    top: 3,
    left: 3,
    text: "カテゴリ"
});
cateLabel.addEventListener('click', function() {
    Alloy.createController('paper/cateWin').getView().open({modal: true});
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
    width:22,
    height:22
});
$.navbarRight.add(refreshAct);

$.navbarRight.addEventListener('click', function() {
    $.refresh.hide();
    refreshAct.show();
    Alloy.Globals.reloadMainFeed();
});

var isTopScroll = true;
$.scrollView.addEventListener('scroll', function(e) {
    if (e.y <= 10)
        isTopScroll = true;
    else
        isTopScroll = false;
});

var nextLoad = function() {
    if (nextLoading) return;
    nextLoading = true;
    param.page += 1;
    actInd.show();
    punchApi.sendRequest(path, param, "POST", function(res) {
        $.scrollView.remove(actInd);
        getMainFeedContents(res.resBody);
        nextLoading = false;
    });
};        

$.scrollView.addEventListener('scrollend', function(e) {
    if (!isTopScroll) {
        nextLoad();
    }
});
