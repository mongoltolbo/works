Alloy.Globals.map = $.mapWin;
/*
1. Map の緯度経度を設定 (Globals.location)
2. 縮尺率を半径から設定 (Globals.distance)
3. 枠を生成 (比で計算)
*/
var args = arguments[0] || {};
var punchApi = require('punchAPI');
var pins = [];
var scale = 1; // 0.8;
var loading = true;
var WIDTH = Ti.Platform.displayCaps.platformWidth;
var preLatDelta;
var preLngDelta;
var frameWidth = Ti.Platform.displayCaps.platformWidth * scale;
var frameHeight = frameWidth;

var pinNum = {
    "10": {label: "", num: 0},
    "20": {label: "", num: 0},
    "30": {label: "", num: 0},
    "40": {label: "", num: 0},
    "50": {label: "", num: 0}
};

var pinImages = {
    "10": "/images/pins/blue@2x.png",
    "20": "/images/pins/pink@2x.png",
    "30": "/images/pins/purple@2x.png",
    "40": "/images/pins/red@2x.png",
    "50": "/images/pins/yellow@2x.png",
    "off" : "/images/pins/inactive@2x.png"
};

var sLatDelta = Alloy.Globals.distance * 2 / 111000;
var sLngDelta = Alloy.Globals.distance * 2 / 111000;

$.mapWin.navBarHidden = true;
$.mapView.userLocation = false;
$.mapWin.addEventListener('open', function() {
// setTimeout(function() {
    loading = false;
    $.mapView.addEventListener('regionchanged', regionChanged);
// }, 2000);
$.mapView.setLocation({
    latitude: Alloy.Globals.location.lat,
    longitude: Alloy.Globals.location.lng,
    latitudeDelta: sLatDelta / scale,
    longitudeDelta: sLngDelta / scale
});

});

var regionChanged = function(e) {
    console.log(JSON.stringify("latitude delta: " + e.latitudeDelta));
    console.log(JSON.stringify("longitude delta: " + e.longitudeDelta));
    console.log("Distance of edge top to bottom: " + e.latitudeDelta * 111000 + " m");
    console.log("e: " + JSON.stringify(e));
    console.log("e.lat   : " + e.latitudeDelta * 111000 / 2);
    console.log("distanceA:: " + e.source.latitudeDelta  * (WIDTH / $.mapView.toImage().height) * 111000 / 2);
    preLatDelta = e.latitudeDelta;
    preLngDelta = e.longitudeDelta;
    console.log("distanceLng:: " + preLngDelta * 111000 / 2);
    var distance = preLatDelta / 2 * 111000;
    console.log("distance: " + distance);
    Alloy.Globals.distance = distance;
    Alloy.Globals.location.lat = e.latitude;
    Alloy.Globals.location.lng = e.longitude;
    if (!loading) {
        loading = true;
        var param = {lat: e.latitude, lng: e.longitude, distance: distance, category: Alloy.Globals.category};
        getShops(param);
        loading = false;
    }
};

/*
1. 枠の半径距離の2倍で店を取りに行く (2倍だと無駄が多いので要最適化)
2. 枠の上下左右の緯度経度を算出 (西経と南緯の場合分けが必要)
3. 枠内のピンの数を数える
4. ピンを表示
*/
var sids = [];
var getShops = function(param) {
    punchApi.sendRequest('map/shop', param, 'POST', function(res) {
        var newPins;
        var newSids = [], rmSids, addSids;
        _.each(pinNum, function(item) {
            item.num = 0;
        });
        var rightGeo = Alloy.Globals.location.lng + preLngDelta / 2 * scale;
        var leftGeo = Alloy.Globals.location.lng - preLngDelta / 2 * scale;
        var topGeo = Alloy.Globals.location.lat + preLatDelta / 2;//* frameHeight / $.mapView.toImage().height;
        var bottomGeo = Alloy.Globals.location.lat - preLatDelta / 2;//* frameHeight / $.mapView.toImage().height;
        console.log("right: " + rightGeo);
        console.log("left: " + leftGeo);
        console.log("top: " + topGeo);
        console.log("bottom: " + bottomGeo);
        _.each(res.resBody.shops, function(shop) {
            newSids.push(shop.sid);
            if (!pins[shop.sid]) {
                pins[shop.sid] = Ti.Map.createAnnotation({
                    latitude: shop.lat,
                    longitude: shop.lng,
                    title: shop.name
                });
            }
            if (shop.lng < leftGeo || rightGeo < shop.lng || shop.lat < bottomGeo || topGeo < shop.lat) {
                pins[shop.sid].image = pinImages["off"];
            } else {
                pins[shop.sid].image = pinImages[shop.cid];
                pinNum[shop.cid].num += 1;
            }
            var shopFeedArg = {
                name: shop.name,
                shop_image_url: null,
                shop_id: shop.sid
            };
            pins[shop.sid].addEventListener('click', function(e) {
                if (e.clicksource == 'title') {
                    Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
                    $.mapWin.close();                    
                }
            });
        });
        _.each(pinNum, function(item) {
            item.label.text = item.num;
        });
        console.log("current: " + sids.join(","));
        console.log("new:     " + newSids.join(","));
        addSids = _.difference(newSids, sids);
        rmSids = _.difference(sids, newSids);
        sids = newSids;
        console.log("add:     " + addSids.join(","));
        console.log("remove:  " + rmSids.join(","));
        //         console.log(_.uniq(sids).join(","));
        //         $.num.text = pinNum + " 件";
        // $.mapView.addAnnotations(_.map(pins, function(pin) {
        //     if (_.contains(sids, pin.sid))
        //         return pin.pin;
        // }));
        _.each(addSids, function(sid) {
            $.mapView.addAnnotation(pins[sid]);
        });
        _.each(rmSids, function(sid) {
            console.log("rm: " + JSON.stringify(pins[sid]));
            $.mapView.removeAnnotation(pins[sid]);
            delete pins[sid];
        });
//         $.mapView.removeAnnotations(_.map(pins, function(pin) {return pin.pin.title;}));
    });
};
// $.num.color = 'red';
// $.num.bottom = 5;
// $.num.left = 5;
$.current.left = 10;
$.current.bottom = 50;
$.current.title = "現在地";
$.current.addEventListener('click', function() {
    $.mapView.userLocation = true;
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
    Ti.Geolocation.purpose = "Required!!";

    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.error){
            Ti.API.error(e.error);
            return;
        } else {
            var location = {lat: e.coords.latitude, lng: e.coords.longitude};
        }
        Alloy.Globals.location = location;

        Ti.API.info(JSON.stringify(location));

        $.mapView.setLocation({
            latitude: Alloy.Globals.location.lat,
            longitude: Alloy.Globals.location.lng,
            latitudeDelta: preLatDelta,
            longitudeDelta: preLngDelta,
            animate:true
        });
    });
});
console.log("size: " + JSON.stringify($.mapView.toImage().height));

// $.frame.borderWidth = 2;
// $.frame.borderColor = 'red';
// $.frame.width = Ti.Platform.displayCaps.platformWidth * 0.8;
// $.frame.height = Ti.Platform.displayCaps.platformWidth * 0.8;
// $.frame.touchEnable = false;
// $.frame.zIndex = 10;

// var b = Titanium.UI.createButton({
//     title:'Close',
//     style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
// });
// $.mapWin.setLeftNavButton(b);

// b.addEventListener('click', 


// var ok = Titanium.UI.createButton({
//     title:'OK',
//     style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
// });
// $.mapWin.setRightNavButton(ok);

// // ok.addEventListener('click', 

console.log("map win:" + JSON.stringify(Alloy.Globals.location));

var searchCancel = function() {
    this.blur();
};

$.search.addEventListener('cancel', searchCancel);

$.search.addEventListener('return', function(e) {
    var LocalSearch = require('LocalSearch');
    var localSearch = new LocalSearch();
    if (e.value.length==0)
        return;
    localSearch.search(e.value ,function(res){
        res = JSON.parse(res);
        if (res.error) {
            if (Titanium.Network.online==false)
                Ti.UI.createAlertDialog({title:'ネットワークがオフラインのようです。',message:'',ok:'OK'}).show();
            else
                Ti.UI.createAlertDialog({title:'データを取得できませんでした。',message:'',ok:'OK'}).show();
            return;
        }
        if (res['results'].length==0) {
            Ti.UI.createAlertDialog({title:'見つかりませんでした。',message:'',ok:'OK'}).show();
            return;
        }
        var results = res['results'];
        // for (var i=0;i<results.length;i++) {
        //     Ti.API.info("Search Result; " + JSON.stringify(results));
        //     results[i].distance =  Math.pow(results[i].lat-parent.currentRegion.latitude,2)+Math.pow(results[i].lng-parent.currentRegion.longitude,2);;
        //     results[i].distance = results[i].distance + 10000*Math.abs(results[i].name.length - res['keyword'].length);
        // }
        results.sort(function(a,b){return (a.distance - b.distance);});
//         Ti.API.info("latitude: " + results[0].lat + "  longitude: " + results[0].lng);
        console.log(results[0].lat);
        console.log(results[0].lng);

//         Alloy.Globals.searchedBy = e.value + "周辺";
        // punchApi.sendRqeuest("path", {latitude: results[0].lat, longitude: results[0].lng}, function(resBody) {
        //     var osname = Ti.Platform.osname;
        //     var tg = Alloy.createController('topPage/topPage', resBody.topPage).getView();
        //     if (osname === 'iphone' || osname === 'ipad') {
        //         tg.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
        //     } else {
        //         tg.open();
        //     }
        //     Alloy.Globals.currentTabGroup = tg;
        // });
        $.mapView.setLocation({
            latitude:results[0].lat,
            longitude:results[0].lng,
            latitudeDelta: preLatDelta,
            longitudeDelta: preLngDelta,
            animate:true            
        });
    });
    this.blur();
});

var delta = {};
$.mapView.addEventListener('complete', function(e) {
    console.log("[mapWin] in complete" + JSON.stringify(e));
    delta.latD = e.latitudeDelta;
    delta.lngD = e.longitudeDelta;
});

console.log("test: " + _.difference([{title: "aa"}], {title: "aa"}));

$.control.width = WIDTH * 0.95;
$.control.height = 40;
$.control.backgroundColor = 'white';
$.control.top = 9;
$.control.shadow = {
    shadowRadius:2,
    shadowOpacity:0.8,
    shadowOffset:{x:5, y:5},
    shadowColor:"#000000"
};
var cancel = function() {
    $.mapWin.close();
};

var apply = function() {
    $.mapWin.close();
    console.log(JSON.stringify(Alloy.Globals));
    Alloy.Globals.reloadMainFeed();
};

$.search.width = $.control.getWidth() - $.control.getHeight() * 2;
$.search.height = $.control.getHeight();
$.search.borderColor = 'white';
$.search.borderStyle = Ti.UI.INPUT_BORDERSTYLE_LINE;

$.cancel.backgroundColor = 'white';
$.cancel.width = $.control.height;
$.cancel.left = 0;
$.cancel.addEventListener('click', cancel);

$.apply.backgroundColor = 'white';
$.apply.width = $.control.height;
$.apply.right = 0;
$.apply.addEventListener('click', apply);

var btHeight = $.control.getHeight();
console.log("btHeight: " + btHeight);
$.leftPart.width = 1;
$.leftPart.height= $.control.getHeight() * 0.8;
$.leftPart.left = btHeight;
$.leftPart.backgroundColor = 'black';

$.rightPart.width = 1;
$.rightPart.height = $.control.getHeight() * 0.8;
$.rightPart.right = btHeight;
$.rightPart.backgroundColor = 'black';

$.footer.height = 40;
$.footer.bottom = 0;
$.footer.backgroundColor = "white";
$.footer.layout = "horizontal";
// _.each(pinImages, function(v,k) {
//     if (k == 'off') return;
//     console.log("k = " + k + " v = " + v);
//     var img = Ti.UI.createImageView({
//         image: v,
//         width: 24
//     });
//     var label = Ti.UI.createLabel({
//         width: 36,
//         text: 0
//     });
//     $.footer.add(img);
//     $.footer.add(label);
//     pinNum[k].label = label;
// });

var list = Ti.UI.createView({
    width: 20,
    height: 20,
    backgroundColor: "red"
});
list.addEventListener('click', function() {
    Alloy.Globals.clickFlag = true;
    var param = {
        "lat": Alloy.Globals.location.lat,
        "lng": Alloy.Globals.location.lng,
        "distance": Alloy.Globals.distance
    };
    punchApi.sendRequest("shop/list", param, "POST", function(args) {
        // var shopList = Alloy.createController('paper/shopList', {shop: args.resBody});
        // shopList.getView('win').top = 600;// Ti.Platform.displayCaps.platformHeight;
        // $.mapWin.add(shopList.getView());
        // var animate = Ti.UI.createAnimation();
        // animate.top = 0;
        // animate.duration = 300;
        // shopList.getView('win').animate(animate);

        Alloy.createController('paper/shopList', {shop: args.resBody}).getView().open({modal: true});
    });
});
$.footer.add(list);
