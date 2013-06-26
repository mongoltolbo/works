// $.win.hide();

var tabs = [
    {index: 0, isCenter: false, image: "images/tab/account_off.png"},
    {index: 1, isCenter: false, image: "images/tab/coupon_off.png"},
    {index: 2, isCenter: true, image: "images/tab/generate_off.png"},
    {index: 3, isCenter: false, image: "images/tab/fav_off.png"},
    {index: 4, isCenter: false, image: "images/tab/setting_off.png"}
];

$.img.image = "images/tab/tabbar_bg.png";
$.img.bottom = 0;
$.img.layout = "horizontal";

_.each(tabs, function(tabConf) {
    $.img.add(Alloy.createController('customTab', tabConf).getView());
});
