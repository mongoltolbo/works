function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.__alloyId0 = Alloy.createController("paper/main", {
        id: "__alloyId0"
    });
    $.__views.tab = Ti.UI.createTab({
        window: $.__views.__alloyId0.getViewEx({
            recurse: !0
        }),
        id: "tab"
    });
    $.addTopLevelView($.__views.tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;