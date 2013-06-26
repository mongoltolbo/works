var args = arguments[0] || {};
var punchApi = require('punchAPI');
var calcTime = require('calcTime');
var feed = args.feed;
var width = Ti.Platform.displayCaps.platformWidth;
var height = width;
var HEIGHT = Ti.Platform.displayCaps.platformHeight;
var margin = 5;
var shopImageWidth = 36;
var titleWidth = width - 100;

// $.win.layout = 'vertical';
// $.win.addEventListener('focus', function() {
//     $.win.winName = "feedDetail";
//     Alloy.Globals.currentWindow = $.win;
// });
$.win.backgroundColor = 'black';
$.win.opacity = 0.0;

$.navbar.backgroundColor = Alloy.CFG.colors.grey;
$.navbar.top = 0;

$.title.text = feed.shop_name;
$.title.width = titleWidth;
$.title.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;

// $.win.title = "写真";

// if (args.from == 'shopFeed')
//     $.win.backButtonTitle = "戻る";

var created_at = feed.created_at - 57600000; // 何故か16時間引くと上手くいく
var date = new Date(created_at);

// $.scrollView.layout = 'vertical';
$.scrollView.top = Alloy.CFG.navbarHeight;

// $.time.text = calcTime.getDiffTime(created_at);
// $.time.right = margin;
// $.time.bottom = 0;

// $.shopInfo.top = margin;
// $.shopInfo.height = shopImageWidth;
// $.shopInfo.hide();

$.feedImage.image = feed.feed_image_urls[0];
$.feedImage.width = width;

// $.feedImage.hide();
// $.feedImage.addEventListener('load', function(e) {
//     var blob = $.feedImage.toBlob();
//     var w = blob.width;
//     var h = blob.height;

//     if (h > w) {
//         $.feedImage.width = width;
//         $.feedImage.height = width * (h / w);
//     } else {
//         $.feedImage.height = height;
//         $.feedImage.width = height * (w / h);
//     }
//     $.feedImage.show();
// });

// $.imgContainer.addEventListener('click', function() {
//     var w = Ti.UI.createWindow({
//         backgroundColor: "black"
//     });
//     w.add(Ti.UI.createImageView({image: feed.feed_image_urls[0]}));
//     w.open();
// });

// $.imgContainer.left = margin;
// $.imgContainer.right = margin;
// $.imgContainer.top = margin;
$.imgContainer.width = width;
$.imgContainer.height = Ti.UI.SIZE;// height;

// $.shopImage.image = feed.shop_img_url;
// $.shopImage.left = 50;
// $.shopImage.height = shopImageWidth;
// $.shopImage.width = shopImageWidth;

// $.shopName.font = {};
// $.shopName.top = 0; // width + margin;
// $.shopName.left = $.shopImage.getWidth() + 10;

// $.fullTime.top = shopImageWidth + width + margin + 20;
// $.fullTime.text = String.formatDate(date, "long") + "  " + String.formatTime(date, "short");
// $.fullTime.left = margin;
// $.fullTime.font = {
//     fontSize: 12
// };
// $.fullTime.color = "#999";

// $.labelContainer.top = 100;
// $.labelContainer.backgroundColor = "red";
// $.labelContainer.height = 100;
// $.labelContainer.contentHieght = 150;
// $.scrollView.scrollingEnabled = false;


// $.text.backgroundColor = "#e2e7ed";

// $.shopName.addEventListener('click', function(e) {
// //     this.color = "#dda0dd";
//     if (args.from == 'main') {
//         Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
//     } else {
//         Alloy.Globals.currentTabGroup.activeTab.close($.win, {animated:true});
//     }
// });

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

$.win.addEventListener('swipe', function(e) {
    if (e.direction == 'right') {
        $.win.animate({opacity: 0.0, duration: 1000});
    }
    // if (e.direction == 'left') {
    //     if (args.from == 'main') {
    //         Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
    //     }
    // }
});
// $.shopImage.addEventListener('click', function(){
//     Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
// });
$.title.addEventListener('click', function(){
    if (Alloy.Globals.clickFlag) return;
    Alloy.Globals.clickFlag = true;
    if (args.from == 'main') {
        Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
    } else {
        $.win.animate({opacity: 0.0, duration: 1000});
    }
    Alloy.Globals.clickFlag = false;
});

$.backContainer.addEventListener('click', function() {
    $.win.animate({opacity: 0.0, duration: 1000});
});

// $.gradient.layout = 'vertical';

// for (var i = 0; i < 50; i++) {
//     var v = Ti.UI.createView({
//         height: '2px',
//         width: width,
//         bottom: i * 2,
//         backgroundColor: 'black',
//         opacity: 0.5 - i * 0.01
//     });
//     $.gradient.add(v);
// }

// $.scrollView.addEventListener('pinch',function(e){
//     console.log("in pinch");
//     $.text.hide();
//     if (e.scale>1)
//     {
//         if (e.scale>$.scrollView.zoomScale)
//         {
//             $.scrollView.zoomScale=e.scale;
//         }
//         else
//         {
//             $.scrollView.zoomScale=$.scrollView.oldZoom + (e.scale-1);
//         }
//     }
//     else
//         if (e.scale<$.scrollView.zoomScale)
//             $.scrollView.zoomScale=$.scrollView.zoomScale - (1-e.scale);
// });

$.scrollView.minZoomScale = 1;
$.scrollView.maxZoomScale = 15;
$.scrollView.zoomScale = 1;
$.scrollView.oldZoom = 1;

$.scrollView.addEventListener('touchend',function(e){
    $.scrollView.oldZoom=$.scrollView.zoomScale;
});

// $.scrollView.addEventListener('scale',function(e){
//     $.text.show();
// });
var fadeOut = Ti.UI.createAnimation({opacity: 0.0, duration: 100});
var fadeIn = Ti.UI.createAnimation({opacity: 1.0, duration: 100});
var halfFadeIn = Ti.UI.createAnimation({opacity: 0.5, duration: 100});
var scrolling = false;
$.scrollView.addEventListener('scroll',function(e){
    if (!scrolling) {
        scrolling = true;
        console.log("not pinch");
        $.controller.animate(fadeOut);
    }
});
$.scrollView.addEventListener('scale', function(e) {
    scrolling = false;
    if (e.scale == 1.0) 
        $.controller.animate(fadeIn);
});
$.feedImage.addEventListener('load', function(e) {
    console.log("in load"+JSON.stringify(e));
});
$.imgContainer.addEventListener('doubletop', function() {
    console.log('doubletop');
});
var zoomScale = false;
$.scrollView.addEventListener('doubletap', function(e) {
    console.log(JSON.stringify(e));
    console.log("toImage: " + JSON.stringify($.scrollView.toImage()));
    var t = Titanium.UI.create2DMatrix();
    if (this.zoomScale == 1.0){
        // t = t.scale(2.0);
        // var newY = $.imgContainer.toImage().height - e.y;
        // var newX = width - e.x;

        // this.animate({transform:t,center:{y:newY,x:newX},duration:500});
        zoomScale = true;
        this.zoomScale = 2.0;
    } else {
        this.zoomScale = 1.0;
        // this.animate({transform:t,center:center1,duration:500});
        zoomScale = false;
    }
    Ti.API.info('Our event tells us the center is ' + e.x + ', ' + e.y );
});
$.scrollView.addEventListener('dragstart', function() {
    $.controller.animate(fadeOut);
    console.log("dg start");
});
$.scrollView.addEventListener('dragend', function() {
    if (this.zoomScale == 1.0) 
        $.controller.animate(fadeIn);
    console.log(this.zoomScale);
    console.log("dg end");
});

var scrollView3 = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    bottom: 0,
    width: width,
    height:150,
    borderRadius:10,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true,
    horizontalBounce:true,
    verticalBounce:true
});

var view3 = Ti.UI.createLabel({
    width: width,
    height:120,
    top:10,
    text: text
});

// scrollView3.add(view3);
// $.win.add(scrollView3);
$.scrollView.verticalBounce = true;
$.controller.horizontalBounce = false;
$.controller.verticalBounce = true;
$.controller.width = width;
$.controller.bottom = -50;
// $.controller.backgroundColor = 'red';
$.controller.addEventListener('dragstart', function() {
    $.overwrap.animate(halfFadeIn);
    this.height += HEIGHT;
    console.log("control dg start");
});
$.controller.addEventListener('dragend', function() {
    $.overwrap.animate(fadeOut);
    this.height -= HEIGHT;
    console.log("control dg end");
});

// $.labelContainer.hight = Ti.UI.SIZE;
// $.labelContainer.widht = width - 10;
// $.labelContainer.bottom = 0;
// $.labelContainer.top = 100;

var text = feed.text.replace(/\n\n/g, "\n").replace(/http:\/\/t.co\/[a-zA-Z0-9]{10}/g, "");
$.text.height = Ti.UI.SIZE;
// $.text.backgroundColor = "blue";
$.text.text = text;
$.text.bottom = 0;
$.text.width = width - 10;
$.text.color = "white";
$.text.left = margin;
// $.text.top = 0;
// $.text.bottom = margin;
$.controller.hide();
var footerHeight = 75;
setTimeout(function() {
    if ($.text.toImage().height < footerHeight) {
        $.controller.bottom = 0;
    } else {
        $.controller.bottom = footerHeight - $.text.toImage().height;
    }
    $.controller.height = $.text.toImage().height;
    $.controller.show();
}, 200);

console.log("imgContainerHeight: " + $.imgContainer.toImage().height);
console.log("imgContainerWidth:  " + $.imgContainer.toImage().width);
var center1 = {y:$.imgContainer.toImage().height / 2, x:160};

$.overwrap.height = $.imgContainer.toImage().height;
$.overwrap.width = $.imgContainer.toImage().width;
$.overwrap.opacity = 0.0;
$.overwrap.backgroundColor = 'black';
