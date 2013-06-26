var categories =  Alloy.Globals.categories;
// [{cid: 10, name: "買物"}, {cid: 20, name: "飲食"}, {cid: 30, name: "サービス"}, {cid: 40, name: "イベント"}, {cid: 50, name: "地域情報"}];
var b = Titanium.UI.createButton({
    title:'Close',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

$.win.navBarHidden = true;
$.win.layout = 'vertical';

$.win.setLeftNavButton(b);
var apply = function() {
    console.log(JSON.stringify(Alloy.Globals.categories));
    var result = [];
    _.each(Alloy.Globals.categories, function(cate) {
        if (cate.check == true) result.push(cate.cid);
    });
    Alloy.Globals.category = result;
    $.win.close();
    Alloy.Globals.reloadMainFeed();
};

b.addEventListener('click', apply);
$.navbar.backgroundColor = Alloy.CFG.colors.orange;
$.navbarLeft.add(b);

var i = 0;
_.each(categories, function(category) {
    var row = Alloy.createController('paper/cateRow', {cate: category, index: i++}).getView();
    $.cateTable.appendRow(row);
});

$.cateTable.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;

$.win.addEventListener('swipe', function(e) {
    if (e.direction == 'down') {
        this.close();
    }    
});
