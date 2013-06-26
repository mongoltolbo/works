var args = arguments[0] || {};
var shop = args.shop;
// console.log(JSON.stringify(args));

$.win.navBarHidden = true;
$.win.layout = 'vertical';
$.win.addEventListener('focus', function() {
    $.win.winName = "shopList";
    Alloy.Globals.currentWindow = $.win;
});

$.navbar.backgroundColor = Alloy.CFG.colors.orange;
$.navbarLeft.backgroundColor = "white";
$.navbarLeft.addEventListener('click', function() {
    $.win.close();
});

$.tableView.data = _.map(shop, function(item) {
    return Alloy.createController('paper/shopListRow', {shop: item}).getView();
});

$.navbar.addEventListener('swipe', function(e) {
    if (e.direction == 'down') {
        this.close();
    }
});
