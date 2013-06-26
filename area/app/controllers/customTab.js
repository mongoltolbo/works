var args = arguments[0] || {};
var tabNum = 5;
var centerFlag = args.isCenter ? 1 : 0;
var width = Ti.Platform.displayCaps.platformWidth / tabNum;

$.imgContainer.width = width;
$.img.width = width - centerFlag * 10;
// $.button.height = 45;
// $.button.bottom = 0;
// $.button.left = args.index * width;
$.imgContainer.addEventListener('click', function(e) {
    if (centerFlag) {
        if (Alloy.Globals.currentWindow.winName == "paper") {
            Alloy.Globals.reloadMainFeed();
        } else {
            Alloy.Globals.currentTabGroup.setActiveTab(args.index);
        }
    } else {
        Alloy.Globals.currentTabGroup.setActiveTab(args.index);
    }
});

$.img.image = args.image;
$.img.bottom = 2;
