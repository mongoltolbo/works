var args = arguments[0] || {};
var margin = 5;
// var feedImageWidth = 64;
var WIDTH = Ti.Platform.displayCaps.platformWidth;
var created_at = args.created_at - 57600000; // 何故か16時間引くと上手くいく
var date = new Date(created_at);
var height = WIDTH / 4;

console.log("[listView.js]" + JSON.stringify(args));

$.row.top = margin;
$.row.bottom = margin;
$.row.layout = 'horizontal';
$.view.layout = 'vertical';
$.view.width = WIDTH - height;

$.imgContainer.width = height - 10;
$.imgContainer.height = height - 10;
$.imgContainer.left = margin;

$.row.height = height; // WIDTH / 2 * 0.7;
// $.row.backgroundColor = '';
$.view.height = height - 10;
$.view.left = margin;
$.feedImage.image = args.feed_image_urls[0];
$.feedImage.top = 0;
$.feedImage.addEventListener('load', function(e) {
    var blob = $.feedImage.toBlob();
    var w = blob.width;
    var h = blob.height;

    if (h > w) {
        $.feedImage.width = height;
        $.feedImage.height = height * (h / w);
    } else {
        $.feedImage.height = height;
        $.feedImage.width = height * (w / h);
    }
    $.feedImage.show();
});


var text = args.text.replace(/http:\/\/t.co\/[a-zA-Z0-9]{10}/g, ""); //.replace(/\n/g, " ").
$.feedText.text = text;
$.feedText.font = Alloy.CFG.font.common;

// $.feedImage.top = margin;
// $.feedImage.left = margin;
// $.feedImage.height = feedImageWidth;
// $.feedImage.width = feedImageWidth;

$.feedText.top = 0;
$.feedText.height = height - 30;
$.feedText.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
$.feedText.width = Ti.UI.FILL;
$.feedText.backgroundColor = "white";
// $.text.left = $.feedImage.getWidth() + 10;

$.time.text = String.formatDate(date, "short") + "  " + String.formatTime(date, "short");
$.time.height = 20;
$.time.right = margin;
$.time.font = {
    fontSize: 10
};
// $.time.left = $.feedImage.getWidth() + 10;

$.imgContainer.addEventListener('click', function() {
    var v = Alloy.createController("paper/feedDetail", {feed: args, from: 'shopFeed'}).getView();
    var anim = Ti.UI.createAnimation({opacity: 1.0, duration: 1000});
    console.log("current win: " + JSON.stringify(Alloy.Globals.currentWindow));
    Alloy.Globals.currentWindow.add(v);
// Alloy.createController("paper/feedDetail", {feed: feed, from: from}).getView().open({opacity: 1.0, duration: 1000}));
    v.animate(anim);
    // var feedDetailContainer = Alloy.createController("paper/feedDetail", {feed: args, from: 'shopFeed'});
    // Alloy.Globals.currentTabGroup.activeTab.open(feedDetailContainer.getView());
});
