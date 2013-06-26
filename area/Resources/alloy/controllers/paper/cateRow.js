function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.category = Ti.UI.createTableViewRow({
        id: "category"
    });
    $.addTopLevelView($.__views.category);
    $.__views.btn = Ti.UI.createImageView({
        top: 5,
        bottom: 5,
        right: 5,
        width: 40,
        height: 40,
        id: "btn"
    });
    $.__views.category.add($.__views.btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {
        categoryName: "test"
    }, index = args.index;
    $.category.title = args.cate.name;
    args.cate.check == 1 ? $.btn.image = "/images/grid_on.png" : $.btn.image = "/images/grid_off.png";
    $.btn.addEventListener("click", function(e) {
        if (this.image.match("off")) {
            this.image = this.image.replace("off", "on");
            Alloy.Globals.categories[index].check = !0;
        } else if (this.image.match("on")) {
            this.image = this.image.replace("on", "off");
            Alloy.Globals.categories[index].check = !1;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;