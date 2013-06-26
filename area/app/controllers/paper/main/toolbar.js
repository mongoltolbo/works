var args = arguments[0] || {};
var punchApi = require('punchAPI');
var width = Ti.Platform.displayCaps.platformWidth / 3;
var height = width * (54 / 193);
$.bar.width = Ti.Platform.displayCaps.platformWidth;
$.bar.height = height;
console.log(JSON.stringify(args));

var sub = 1;

$.areaButton.width = width - sub;
$.categoryButton.width = width - sub;
$.shopList.width = width - sub;
$.areaButton.height = height;
$.categoryButton.height = height;
$.shopList.height = height;

$.shopList.addEventListener('click', function() {
    if (Alloy.Globals.clickFlag) return;
    Alloy.Globals.clickFlag = true;
    var param = {
        "lat": Alloy.Globals.location.lat,
        "lng": Alloy.Globals.location.lng,
        "distance": Alloy.Globals.distance
    };
    punchApi.sendRequest("shop/list", param, "POST", function(args) {
//         console.log(JSON.stringify(args.resBody));
        Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController('paper/shopList', args.resBody).getView());
    });
    Alloy.Globals.clickFlag = false;
});
