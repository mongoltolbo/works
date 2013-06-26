var args = arguments[0] || {};
var shop = args.shop;
var punchApi = require('punchAPI');
// console.log(JSON.stringify(args));

$.imageView.image = shop.shop_image_url;
$.shopName.text = shop.name;
$.about.text = shop.about;

// var param = {
//     "shop_id": shop.shop_id,
//     "limit": Alloy.Globals.limit,
//     "page": 0
// };
var path = "shop/detail/" + shop.sid;
var shopFeedArg = {
    name: shop.name,
    shop_image_url: shop.shop_image_url,
    shop_id: shop.sid
};

$.tableViewRow.addEventListener('click', function() {
    Alloy.Globals.currentWindow.close();
    setTimeout(Alloy.Globals.map.close, 500);
//     Alloy.Globals.map.hide();
    Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
//     Alloy.createController("paper/shopFeed", shopFeedArg).getView().open();

//     args.map();
});
