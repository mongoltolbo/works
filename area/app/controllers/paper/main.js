var punchApi = require("punchAPI");
var WIDTH = Ti.Platform.displayCaps.platformWidth;
$.win.navBarHidden = true;
// $.win.addEventListener('open', function() {
//     $.win.winName = "paper";

//     Alloy.Globals.currentWindow = $.win;
// });

$.win.addEventListener('focus', function() {
    $.win.winName = "paper";
    $.win.navBarHidden = true;
    Alloy.Globals.currentWindow = $.win;
});
$.win.backgroundImage = "null";
// $.win.backgroundRepeat = true;
$.win.backgroundColor = 'white';

$.win.title = Alloy.Globals.searchedBy;

// var toolbar = Alloy.createController('paper/main/toolbar');
// $.win.add(toolbar.getView());


// $.win.add(navbar);
var mainFeedContainer = Ti.UI.createView();
$.win.add(mainFeedContainer);
mainFeedContainer.top = 0;

mainFeedContainer.add(Alloy.createController('paper/main/mainFeed').getView());

var reloadInterval = 1;
var canReload = true;
Alloy.Globals.reloadMainFeed = function(e) {
    if (canReload) {
        reload();
        canReload = false;
        setTimeout(function() {
            canReload = true;
            console.log("You can reload!");
        }, reloadInterval);
    } else {
        console.log("You cannot reload");
    }
};

var reload = function() {
    $.win.remove(mainFeedContainer);
    mainFeedContainer = Ti.UI.createView();
    mainFeedContainer.top = 0;// toolbar.bar.getHeight();
    $.win.add(mainFeedContainer);

    mainFeedContainer.add(Alloy.createController('paper/main/mainFeed').getView());
};

// toolbar.getView('categoryButton').addEventListener('click', function() {
//     Alloy.createController('paper/cateWin').getView().open({modal: true});
// });

// toolbar.getView('areaButton').addEventListener('click', function() {

// });

// $.win.titleControl = toolbar.getView();
// $.win.barColor = Alloy.CFG.blue;
// $.win.titleControl = Ti.UI.createImageView({
//     image: "/images/top_bar/logo.png"
// });
// $.win.leftNavButton = Ti.UI.createButton({
//     backgroundImage: "/images/top_bar/slide_list.png"
// });
// $.win.rightNavButton = Ti.UI.createButton({
//     backgroundImage: "/images/top_bar/refresh.png"
// });
