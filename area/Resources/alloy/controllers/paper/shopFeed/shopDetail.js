function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.map = Ti.UI.createTableViewSection({
        id: "map"
    });
    var __alloyId2 = [];
    __alloyId2.push($.__views.map);
    $.__views.mapRow = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "mapRow"
    });
    $.__views.map.add($.__views.mapRow);
    var __alloyId3 = [];
    $.__views.mapView = Ti.Map.createView({
        top: 10,
        bottom: 10,
        annotations: __alloyId3,
        ns: Ti.Map,
        id: "mapView"
    });
    $.__views.mapRow.add($.__views.mapView);
    $.__views.openMap = Ti.UI.createView({
        id: "openMap"
    });
    $.__views.mapRow.add($.__views.openMap);
    $.__views.openMapLabel = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        id: "openMapLabel"
    });
    $.__views.openMap.add($.__views.openMapLabel);
    $.__views.info = Ti.UI.createTableViewSection({
        id: "info"
    });
    __alloyId2.push($.__views.info);
    $.__views.infoRow = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "infoRow"
    });
    $.__views.info.add($.__views.infoRow);
    $.__views.shopName = Ti.UI.createLabel({
        top: 10,
        width: "auto",
        height: "auto",
        left: "30dp",
        id: "shopName"
    });
    $.__views.infoRow.add($.__views.shopName);
    $.__views.postcode = Ti.UI.createLabel({
        top: 10,
        width: "auto",
        height: "auto",
        left: "30dp",
        id: "postcode"
    });
    $.__views.infoRow.add($.__views.postcode);
    $.__views.address = Ti.UI.createLabel({
        top: 10,
        width: "auto",
        height: "auto",
        left: "30dp",
        id: "address"
    });
    $.__views.infoRow.add($.__views.address);
    $.__views.tel = Ti.UI.createLabel({
        top: 10,
        width: "auto",
        height: "auto",
        left: "30dp",
        id: "tel"
    });
    $.__views.infoRow.add($.__views.tel);
    $.__views.mail = Ti.UI.createLabel({
        top: 10,
        width: "auto",
        height: "auto",
        left: "30dp",
        id: "mail"
    });
    $.__views.infoRow.add($.__views.mail);
    $.__views.hp = Ti.UI.createLabel({
        top: 10,
        width: "auto",
        height: "auto",
        left: "30dp",
        id: "hp"
    });
    $.__views.infoRow.add($.__views.hp);
    $.__views.tableView = Ti.UI.createTableView({
        data: __alloyId2,
        id: "tableView"
    });
    $.addTopLevelView($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, name = args.name || "", postcode = args.postcode || "", pre = args.prefecture || "", city = args.city || "", add1 = args.address1 || "", add2 = args.address2 || "", tel = args.tel || "", mail = args.mail || "", hp = args.homepage_url || "", open = args.open_time || "", close = args.close_day || "";
    $.tableView.scrollable = !1;
    var createHeader = function(headerTitle) {
        var header = Ti.UI.createView({
            height: 30,
            backgroundColor: Alloy.CFG.colors.lightblue
        }), label = Ti.UI.createLabel({
            text: headerTitle,
            color: "white",
            font: {
                fontSize: 18,
                fontWeight: "bold"
            }
        });
        header.add(label);
        return header;
    };
    $.info.headerView = createHeader("情報");
    $.infoRow.layout = "vertical";
    $.shopName.text = name;
    $.postcode.text = "〒" + postcode;
    $.address.text = pre + city + add1 + add2;
    $.tel.text = tel;
    $.mail.text = mail;
    $.hp.text = hp;
    $.hp.bottom = 10;
    $.hp.addEventListener("click", function(e) {
        Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed/webView", {
            url: e.source.text
        }).getView());
    });
    var pin = Ti.Map.createAnnotation({
        latitude: args.lat,
        longitude: args.lng,
        title: args.shopName
    });
    $.map.headerView = createHeader("地図");
    $.mapRow.layout = "vertical";
    $.mapView.setLocation({
        latitude: args.lat,
        longitude: args.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02
    });
    $.mapView.addAnnotation(pin);
    $.mapView.mapType = Ti.Map.STANDARD_TYPE;
    $.mapView.userLocation = !1;
    $.mapView.regionFit = !0;
    $.mapView.height = 150;
    $.mapView.width = 300;
    $.mapView.borderWith = 1;
    $.mapView.borderColor = "black";
    $.openMap.width = 300;
    $.openMap.height = 40;
    $.openMap.bottom = 10;
    $.openMap.addEventListener("click", function() {
        Ti.Platform.openURL("http://maps.google.com/maps?q=" + args.lat + "," + args.lng);
    });
    $.openMap.backgroundColor = Alloy.CFG.colors.orange;
    $.openMapLabel.text = "マップアプリで開く";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;