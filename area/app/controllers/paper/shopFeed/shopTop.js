var args = arguments[0] || {};

// $.descHeadContainer.top;
$.view.layout = 'vertical';
$.descHeadContainer.height = 30;
$.descHeadContainer.backgroundColor = Alloy.CFG.colors.lightblue;
$.descHead.text = "紹介文";
console.log(JSON.stringify($.descHead));
$.descContainer.height = Ti.UI.SIZE;
$.desc.text = args.desc;
