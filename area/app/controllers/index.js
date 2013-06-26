var currentLocation = null;
var punchApi = require('punchAPI');
Alloy.Globals.location = {lat: 35.671482, lng: 139.7088};  // default location is area Shibuya office.
Alloy.Globals.distance = 3000; // default distance is 3000.
Alloy.Globals.limit = 10;
Alloy.Globals.clickFlag = false;
Alloy.Globals.category = [10, 20, 30, 40, 50]; // 10:買物 20:飲食 30:サービス 40:イベント 50:地域情報
Alloy.Globals.categories = [{check: true, name: "買物", cid: 10}, {check: true, name: "飲食", cid: 20}, {check: true, name: "サービス", cid: 30}, {check: true, name: "イベント", cid: 40}, {check: true, name: "地域情報", cid: 50}];
// Alloy.Globals.categories = [{check: true, name: "オトコムケ", cid: 10}, {check: true, name: "オンナムケ", cid: 20}, {check: true, name: "コドモムケ", cid: 30}, {check: true, name: "カイモノ", cid: 40}, {check: true, name: "ノミクイ", cid: 50}, {check: true, name: "アソビ", cid: 60}, {check: true, name: "シゲキ", cid: 70}, {check: true, name: "マナビ", cid: 80}, {check: true, name: "イヤシ", cid: 90}, {check: true, name: "その他", cid: 99}];

Alloy.Globals.searchedBy = "渋谷区";

Alloy.Globals.back = function() {
    Alloy.Globals.currentTabGroup.activeTab.close(Alloy.Globals.currentWindow, {animated:true});
};

// Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
// Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
Ti.Geolocation.purpose = "Required!!";

// Ti.Geolocation.getCurrentPosition(function(e) {
//     if (e.error){
//         Ti.API.error(e.error);
//         return;
//     } else {
//         var location = {lat: e.coords.latitude, lng: e.coords.longitude};
//     }

//     Alloy.Globals.location = location;

//     Ti.API.info(JSON.stringify(location));
// //    Alloy.createController('customTabWin').getView().open();

// //     punchApi.sendRequest(path, data, "POST", function(args) {
// //         Alloy.Globals.searchedBy = "現在地周辺";

// // //         console.log("index.js" + JSON.stringify(args));        
// // //        var tg = Alloy.createController('topPage/topPage', args).getView(); // , resBody).getView();

// //         Alloy.Globals.currentTabGroup = tg;
// //         Alloy.createController('customTabWin').getView().open();
// //     });
// });

var data = {
    "lat": Alloy.Globals.location.lat,
    "lng": Alloy.Globals.location.lng,
    "distance": Alloy.Globals.defaultDistance,
    "category": 10,
    "limit": Alloy.Globals.limit,
    "page": 0
};

var path = "feed/geoFeed";
var tg = Ti.UI.createTabGroup();
tg.addTab(Alloy.createController('paper').getView());
var osname = Ti.Platform.osname;
if (osname === 'iphone' || osname === 'ipad') {
    tg.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
} else {
    tg.open();
}
Alloy.Globals.currentTabGroup = tg;
