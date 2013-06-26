var args = arguments[0] || {};
var feed = args.feed, order = args.order, from = args.from;

var calcTime = require('calcTime');
var COL = 3;
var width;
var height;
var largeWidth = Ti.Platform.displayCaps.platformWidth - Alloy.CFG.margin.large;
var largeHeight = largeWidth + 100;
var margin = (order == -1) ? 10 : 5;
var smallWidth = Ti.Platform.displayCaps.platformWidth / 2 - Alloy.CFG.margin.large;
var smallHeight = Ti.Platform.displayCaps.platformWidth / 2 - Alloy.CFG.margin.large;
var topHeight;
var topWidth;
var iconWidth = (order == -1) ? 40 : 20;
var iconHeight = iconWidth;
if(order  == -1) {
    width = largeWidth;
    height = largeHeight;
    topHeight = height + 10;
    topWidth = largeWidth;
    $.view.top = 0;
} else {
    COL = 2;
    width = smallWidth; // - margin;
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

if (order % 2 == 0 && order != -1) {
//     $.view.left = 5;
//     $.verticalContainer.left = 0;
} else if (order != -1){
//     $.view.right = 5;
//     $.verticalContainer.right = 0;
}
// $.shopName.right = 5;
$.shopName.left = 5;
$.view.backgrouncColor = 'black';

$.feedImage.image = feed.feed_image_urls[0];
$.feedImage.top = 0;
$.feedImage.opacity = 0;
// $.feedImage.hide();
$.feedImage.addEventListener('load', function(e) {
    var blob = this.toBlob();
    var w = blob.width;
    var h = blob.height;

    if (h > w) {
        this.width = width;
        this.height = (width) * (h / w);
    } else {
        this.height = width;
        this.width = (width) * (w / h);
    }
    this.animate({opacity: 1.0, duration: 200});
//    $.feedImage.show();
});

var text = feed.text.replace(/\n/g, " ").replace(/http:\/\/t.co\/[a-zA-Z0-9]{10}/g, "");
// console.log(text);
$.shopName.text = feed.shop_name;
// $.shopName1.height = 12;
// $.shopName1.top = 0;
$.shopName.color = '#000';
$.shopName.bottom = 0;
$.shopName.width = Ti.UI.FILL;
$.shopName.height = iconHeight;
$.shopName.font = {
//    fontSize: (order == -1) ? 14 : 10,
    fontSize: (order == -1) ? 16 : 12,
    fontWeight: 'bold'
};
var openShopFeed = function() {
    var shopFeedArg = {
        name: feed.shop_name,
        shop_image_url: feed.shop_img_url,
        shop_id: feed.shop_id
    };
    Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
};
$.shopName.addEventListener('click', openShopFeed);

// $.shopName.shadowColor = '#000';
// $.shopName.shadowOffset = {x:1, y:1};

$.activate.opacity = 0.5;
$.activate.width = width;
$.activate.height = width;
$.activate.top = 0;
// $.activate.left = margin;
// $.activate.top = margin;
$.activate.backgroundColor = 'black';

$.activate.hide();

$.imgContainer.addEventListener('click', function() {
//    Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/feedDetail", {feed: feed, from: from}).getView());
    // Alloy.createController("paper/feedDetail", {feed: feed, from: from}).getView().open({opacity: 1.0, duration: 1000});
    var v = Alloy.createController("paper/feedDetail", {feed: feed, from: from}).getView();
    var anim = Ti.UI.createAnimation({opacity: 1.0, duration: 1000});
    Alloy.Globals.currentWindow.add(v);// Alloy.createController("paper/feedDetail", {feed: feed, from: from}).getView().open({opacity: 1.0, duration: 1000}));
    v.animate(anim);

//     Ti.UI.createWindow({backgroundColor: 'black', opacity: 0.0}).open({opacity: 1.0, duration: 1000});

});

$.labelContainer.top = Alloy.CFG.margin.middle;
$.labelContainer.height = (order == -1) ? 40 : 20;
$.labelContainer.layout = 'horizontal';
$.shopImage.width = iconWidth;
$.shopImage.height = iconHeight;
$.shopImage.image = feed.shop_img_url;
$.shopImage.left = 0; //margin;
$.shopImage.backgroundColor = "blue";
$.shopImage.addEventListener('click', openShopFeed);

$.feedContainer.top = Alloy.CFG.margin.middle;
$.feedContainer.height = Ti.UI.SIZE;
$.feedContainer.layout = "vertical";
$.feedContainer.backgroundColor = "white";
$.feedText.text = text;
$.feedText.font = {
    fontSize: 10
};

var created_at = feed.created_at - 57600000; // 何故か16時間引くと上手くいく
var date = new Date(created_at);

$.time.text = calcTime.getDiffTime(created_at);
$.time.right = 0;
$.time.top = 0;

$.border.height = 1;
$.border.top = Alloy.CFG.margin.middle;
$.border.backgroundColor = '#333333';
$.footer.height = 20;

$.verticalContainer.height = Ti.UI.SIZE;
$.verticalContainer.layout = 'vertical';

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
// $.likeIcon.backgroundColor = "blue";

// $.footer.backgroundColor = "red";
// $.gradient.layout = 'vertical';
// for (var i = 0; i < 70; i++) {
//     var v = Ti.UI.createView({
//         height: '1px',
//         width: width,
//         backgroundColor: 'black',
//         opacity: 0.7 - i * 0.01
//     });
//     $.gradient.add(v);
// }
// for (var i = 0; i < 50; i++) {
//     var v = Ti.UI.createView({
//         height: '2px',
//         width: width,
//         backgroundColor: 'black',
//         opacity: 0.5 - i * 0.01
//     });
//     $.gradient.add(v);
// }

// $.feedContainer.layout = 'vertical';
