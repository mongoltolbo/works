var args = arguments[0] || {categoryName: "test"};
var index = args.index;
$.category.title = args.cate.name;


// if (args.categoryName == "a") {
//     $.category.header = "test";
// }

if (args.cate.check == true) {
    $.btn.image = "/images/grid_on.png";
} else {
    $.btn.image = "/images/grid_off.png";
};

$.btn.addEventListener('click', function(e) {
    if (this.image.match("off")) {
        this.image = this.image.replace("off", "on");
        Alloy.Globals.categories[index].check = true;
    } else if (this.image.match("on")) {
        this.image = this.image.replace("on", "off");
        Alloy.Globals.categories[index].check = false;
    }
});
