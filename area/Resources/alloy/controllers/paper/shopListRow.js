function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.tableViewRow = Ti.UI.createTableViewRow({
        id: "tableViewRow"
    });
    $.addTopLevelView($.__views.tableViewRow);
    $.__views.imageView = Ti.UI.createImageView({
        top: 5,
        bottom: 5,
        left: 5,
        height: 64,
        width: 64,
        id: "imageView"
    });
    $.__views.tableViewRow.add($.__views.imageView);
    $.__views.shopName = Ti.UI.createLabel({
        top: 5,
        height: 30,
        left: 74,
        id: "shopName"
    });
    $.__views.tableViewRow.add($.__views.shopName);
    $.__views.about = Ti.UI.createLabel({
        bottom: 5,
        left: 74,
        height: 30,
        font: {
            fontSize: 12
        },
        id: "about"
    });
    $.__views.tableViewRow.add($.__views.about);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, shop = args.shop, punchApi = require("punchAPI");
    $.imageView.image = shop.shop_image_url;
    $.shopName.text = shop.name;
    $.about.text = shop.about;
    var path = "shop/detail/" + shop.sid, shopFeedArg = {
        name: shop.name,
        shop_image_url: shop.shop_image_url,
        shop_id: shop.sid
    };
    $.tableViewRow.addEventListener("click", function() {
        Alloy.Globals.currentWindow.close();
        setTimeout(Alloy.Globals.map.close, 500);
        Alloy.Globals.currentTabGroup.activeTab.open(Alloy.createController("paper/shopFeed", shopFeedArg).getView());
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;