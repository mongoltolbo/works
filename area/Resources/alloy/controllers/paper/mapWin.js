function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.mapWin = Ti.UI.createWindow({
        tabBarHidden: !0,
        barColor: "#000000",
        id: "mapWin"
    });
    $.addTopLevelView($.__views.mapWin);
    var __alloyId1 = [];
    $.__views.mapView = Ti.Map.createView({
        annotations: __alloyId1,
        ns: Ti.Map,
        id: "mapView"
    });
    $.__views.mapWin.add($.__views.mapView);
    $.__views.control = Ti.UI.createView({
        id: "control"
    });
    $.__views.mapWin.add($.__views.control);
    $.__views.cancel = Ti.UI.createView({
        id: "cancel"
    });
    $.__views.control.add($.__views.cancel);
    $.__views.search = Ti.UI.createTextField({
        top: 0,
        id: "search"
    });
    $.__views.control.add($.__views.search);
    $.__views.apply = Ti.UI.createView({
        id: "apply"
    });
    $.__views.control.add($.__views.apply);
    $.__views.leftPart = Ti.UI.createView({
        id: "leftPart"
    });
    $.__views.control.add($.__views.leftPart);
    $.__views.rightPart = Ti.UI.createView({
        id: "rightPart"
    });
    $.__views.control.add($.__views.rightPart);
    $.__views.footer = Ti.UI.createView({
        id: "footer"
    });
    $.__views.mapWin.add($.__views.footer);
    $.__views.current = Ti.UI.createButton({
        id: "current"
    });
    $.__views.mapWin.add($.__views.current);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.map = $.mapWin;
    var args = arguments[0] || {}, punchApi = require("punchAPI"), pins = [], scale = 1, loading = !0, WIDTH = Ti.Platform.displayCaps.platformWidth, preLatDelta, preLngDelta, frameWidth = Ti.Platform.displayCaps.platformWidth * scale, frameHeight = frameWidth, pinNum = {
        10: {
            label: "",
            num: 0
        },
        20: {
            label: "",
            num: 0
        },
        30: {
            label: "",
            num: 0
        },
        40: {
            label: "",
            num: 0
        },
        50: {
            label: "",
            num: 0
        }
    }, pinImages = {
        10: "/images/pins/blue@2x.png",
        20: "/images/pins/pink@2x.png",
        30: "/images/pins/purple@2x.png",
        40: "/images/pins/red@2x.png",
        50: "/images/pins/yellow@2x.png",
        off: "/images/pins/inactive@2x.png"
    }, sLatDelta = Alloy.Globals.distance * 2 / 111000, sLngDelta = Alloy.Globals.distance * 2 / 111000;
    $.mapWin.navBarHidden = !0;
    $.mapView.userLocation = !1;
    $.mapWin.addEventListener("open", function() {
        loading = !1;
        $.mapView.addEventListener("regionchanged", regionChanged);
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
        console.log("distanceA:: " + e.source.latitudeDelta * (WIDTH / $.mapView.toImage().height) * 111000 / 2);
        preLatDelta = e.latitudeDelta;
        preLngDelta = e.longitudeDelta;
        console.log("distanceLng:: " + preLngDelta * 111000 / 2);
        var distance = preLatDelta / 2 * 111000;
        console.log("distance: " + distance);
        Alloy.Globals.distance = distance;
        Alloy.Globals.location.lat = e.latitude;
        Alloy.Globals.location.lng = e.longitude;
        if (!loading) {
            loading = !0;
            var param = {
                lat: e.latitude,
                lng: e.longitude,
                distance: distance,
                category: Alloy.Globals.category
            };
            getShops(param);
            loading = !1;
        }
    }, sids = [], getShops = function(param) {
        punchApi.sendRequest("map/shop", param, "POST", function(res) {
            var newPins, newSids = [], rmSids, addSids;
            _.each(pinNum, function(item) {
                item.num = 0;
            });
            var rightGeo = Alloy.Globals.location.lng + preLngDelta / 2 * scale, leftGeo = Alloy.Globals.location.lng - preLngDelta / 2 * scale, topGeo = Alloy.Globals.location.lat + preLatDelta / 2, bottomGeo = Alloy.Globals.location.lat - preLatDelta / 2;
            console.log("right: " + rightGeo);
            console.log("left: " + leftGeo);
            console.log("top: " + topGeo);
            console.log("bottom: " + bottomGeo);
            _.each(res.resBody.shops, function(shop) {
                newSids.push(shop.sid);
                pins[shop.sid] || (pins[shop.sid] = Ti.Map.createAnnotation({
                    latitude: shop.lat,
                    longitude: shop.lng,
                    title: shop.name
                }));
                if (shop.lng < leftGeo || rightGeo < shop.lng || shop.lat < bottomGeo || topGeo < shop.lat) pins[shop.sid].image = pinImages.off; else {
                    pins[shop.sid].image = pinImages[shop.cid];
                    pinNum[shop.cid].num += 1;
                }
                var shopFeedArg = {
                    name: shop.name,
                    shop_image_url: null,
                    shop_id: shop.sid
                };
                pins[shop.sid].addEventListener("click", function(e) {
                    if (e.clicksource == "title") {
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
            _.each(addSids, function(sid) {
                $.mapView.addAnnotation(pins[sid]);
            });
            _.each(rmSids, function(sid) {
                console.log("rm: " + JSON.stringify(pins[sid]));
                $.mapView.removeAnnotation(pins[sid]);
                delete pins[sid];
            });
        });
    };
    $.current.left = 10;
    $.current.bottom = 50;
    $.current.title = "現在地";
    $.current.addEventListener("click", function() {
        $.mapView.userLocation = !0;
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
        Ti.Geolocation.purpose = "Required!!";
        Ti.Geolocation.getCurrentPosition(function(e) {
            if (e.error) {
                Ti.API.error(e.error);
                return;
            }
            var location = {
                lat: e.coords.latitude,
                lng: e.coords.longitude
            };
            Alloy.Globals.location = location;
            Ti.API.info(JSON.stringify(location));
            $.mapView.setLocation({
                latitude: Alloy.Globals.location.lat,
                longitude: Alloy.Globals.location.lng,
                latitudeDelta: preLatDelta,
                longitudeDelta: preLngDelta,
                animate: !0
            });
        });
    });
    console.log("size: " + JSON.stringify($.mapView.toImage().height));
    console.log("map win:" + JSON.stringify(Alloy.Globals.location));
    var searchCancel = function() {
        this.blur();
    };
    $.search.addEventListener("cancel", searchCancel);
    $.search.addEventListener("return", function(e) {
        var LocalSearch = require("LocalSearch"), localSearch = new LocalSearch;
        if (e.value.length == 0) return;
        localSearch.search(e.value, function(res) {
            res = JSON.parse(res);
            if (res.error) {
                Titanium.Network.online == 0 ? Ti.UI.createAlertDialog({
                    title: "ネットワークがオフラインのようです。",
                    message: "",
                    ok: "OK"
                }).show() : Ti.UI.createAlertDialog({
                    title: "データを取得できませんでした。",
                    message: "",
                    ok: "OK"
                }).show();
                return;
            }
            if (res["results"].length == 0) {
                Ti.UI.createAlertDialog({
                    title: "見つかりませんでした。",
                    message: "",
                    ok: "OK"
                }).show();
                return;
            }
            var results = res.results;
            results.sort(function(a, b) {
                return a.distance - b.distance;
            });
            console.log(results[0].lat);
            console.log(results[0].lng);
            $.mapView.setLocation({
                latitude: results[0].lat,
                longitude: results[0].lng,
                latitudeDelta: preLatDelta,
                longitudeDelta: preLngDelta,
                animate: !0
            });
        });
        this.blur();
    });
    var delta = {};
    $.mapView.addEventListener("complete", function(e) {
        console.log("[mapWin] in complete" + JSON.stringify(e));
        delta.latD = e.latitudeDelta;
        delta.lngD = e.longitudeDelta;
    });
    console.log("test: " + _.difference([ {
        title: "aa"
    } ], {
        title: "aa"
    }));
    $.control.width = WIDTH * 0.95;
    $.control.height = 40;
    $.control.backgroundColor = "white";
    $.control.top = 9;
    $.control.shadow = {
        shadowRadius: 2,
        shadowOpacity: 0.8,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowColor: "#000000"
    };
    var cancel = function() {
        $.mapWin.close();
    }, apply = function() {
        $.mapWin.close();
        console.log(JSON.stringify(Alloy.Globals));
        Alloy.Globals.reloadMainFeed();
    };
    $.search.width = $.control.getWidth() - $.control.getHeight() * 2;
    $.search.height = $.control.getHeight();
    $.search.borderColor = "white";
    $.search.borderStyle = Ti.UI.INPUT_BORDERSTYLE_LINE;
    $.cancel.backgroundColor = "white";
    $.cancel.width = $.control.height;
    $.cancel.left = 0;
    $.cancel.addEventListener("click", cancel);
    $.apply.backgroundColor = "white";
    $.apply.width = $.control.height;
    $.apply.right = 0;
    $.apply.addEventListener("click", apply);
    var btHeight = $.control.getHeight();
    console.log("btHeight: " + btHeight);
    $.leftPart.width = 1;
    $.leftPart.height = $.control.getHeight() * 0.8;
    $.leftPart.left = btHeight;
    $.leftPart.backgroundColor = "black";
    $.rightPart.width = 1;
    $.rightPart.height = $.control.getHeight() * 0.8;
    $.rightPart.right = btHeight;
    $.rightPart.backgroundColor = "black";
    $.footer.height = 40;
    $.footer.bottom = 0;
    $.footer.backgroundColor = "white";
    $.footer.layout = "horizontal";
    var list = Ti.UI.createView({
        width: 20,
        height: 20,
        backgroundColor: "red"
    });
    list.addEventListener("click", function() {
        Alloy.Globals.clickFlag = !0;
        var param = {
            lat: Alloy.Globals.location.lat,
            lng: Alloy.Globals.location.lng,
            distance: Alloy.Globals.distance
        };
        punchApi.sendRequest("shop/list", param, "POST", function(args) {
            Alloy.createController("paper/shopList", {
                shop: args.resBody
            }).getView().open({
                modal: !0
            });
        });
    });
    $.footer.add(list);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;