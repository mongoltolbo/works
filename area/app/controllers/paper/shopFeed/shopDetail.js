var args = arguments[0] || {};
var name = args.name || "";
var postcode = args.postcode || "";
var pre = args.prefecture || "";
var city = args.city || "";
var add1 = args.address1 || "";
var add2 = args.address2 || "";
var tel = args.tel || "";
var mail = args.mail || "";
var hp = args.homepage_url || "";
var open = args.open_time || "";
var close = args.close_day || "";

$.tableView.scrollable = false;
var createHeader = function(headerTitle) {
    var header = Ti.UI.createView({
        height: 30,
        backgroundColor: Alloy.CFG.colors.lightblue
    });
    var label = Ti.UI.createLabel({
        text: headerTitle,
        color: 'white',
        font: {
            fontSize: 18,
            fontWeight: 'bold'
        }
    });
    header.add(label);
    return header;
};

$.info.headerView = createHeader("情報");

// .add(Ti.UI.createLabel({
//     text: "情報"
// }))
$.infoRow.layout = 'vertical';
// $.infoRow.add(Ti.UI.createLabel({
//     top: 10,
//     text: name
// }));
// $.infoRow.add(Ti.UI.createLabel({
//     top: 40,
//     text: "〒" + postcode
// }));
// $.infoRow.add(Ti.UI.createLabel({
//     top: 70,
//     text: pre + city + add1 + add2
// }));
// var telL = Ti.UI.createLabel();
// var mailL = Ti.UI.createLabel();
// var hpL = Ti.UI.createLabel();

// if (tel) {
//     telL = Ti.UI.createLabel({
//         top: top,
//         text: tel
//     });
// //     $.infoRow.add(telL);
//     top += 30;
// }
// if (mail) {
//     mailL = Ti.UI.createLabel({
//         top: top,
//         text: mail
//     });
// //     $.infoRow.add(mailL);
//     top += 30;
// }
// if (hp) {
//     hpL = Ti.UI.createLabel({
//         top: top,
//         text: hp
//     });
//     });
// //     $.infoRow.add(hpL);
//     top += 30;
// }

$.shopName.text = name;
$.postcode.text = "〒" + postcode;
$.address.text = pre + city + add1 + add2;
$.tel.text = tel;
$.mail.text = mail;
$.hp.text = hp;
$.hp.bottom = 10;
// var top = 140;
// if (!tel) {
//     $.infoRow.remove($.tel);
// }
// if (!mail) {
//     $.infoRow.remove($.mail);
// }
// if (!hp) {
//     $.infoRow.remove($.hp);
// }

$.hp.addEventListener('click', function(e) {
    Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController('paper/shopFeed/webView', {url: e.source.text}).getView());
});
// $.mail.addEventLitsener('click', function(e) {
//     var emailDialog = Ti.UI.createEmailDialog();
//     emailDialog.subject = "エリアから送信";
//     emailDialog.toRecipients = [e.source.text];
//     //    emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
//     //    var f = Ti.Filesystem.getFile('cricket.wav');
//     //    emailDialog.addAttachment(f);
//     emailDialog.open();
// });
// $.tel.addEventListener('click', function(e) {
//     Ti.Platform.openURL('tel:' + e.source.text);
// });

// $.about.text = args.about;
// $.about.left = 30;
// $.about.top = 10;

// $.openTime.text = "開店時間: " + args.openTime;
// $.closeDay.text = "定休日: " + args.closeDay;

var pin = Ti.Map.createAnnotation({
    latitude: args.lat,
    longitude: args.lng,
    title: args.shopName
});

$.map.headerView = createHeader("地図");
$.mapRow.layout = 'vertical';

$.mapView.setLocation({
    latitude: args.lat,
    longitude: args.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02
});
$.mapView.addAnnotation(pin);
$.mapView.mapType =  Ti.Map.STANDARD_TYPE;
$.mapView.userLocation = false;
$.mapView.regionFit = true;
$.mapView.height = 150;
$.mapView.width = 300;
$.mapView.borderWith = 1;
$.mapView.borderColor = 'black';

$.openMap.width = 300;
$.openMap.height = 40;
$.openMap.bottom = 10;
$.openMap.addEventListener('click', function () {
    Ti.Platform.openURL('http://maps.google.com/maps?q='+args.lat+','+args.lng);
});
$.openMap.backgroundColor = Alloy.CFG.colors.orange;
$.openMapLabel.text = "マップアプリで開く";
