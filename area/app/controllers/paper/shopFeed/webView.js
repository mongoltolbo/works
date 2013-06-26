var args = arguments[0] || {};

$.win.backButtonTitle = "戻る";
$.webView.url = args.url;

$.backContainer.addEventListener('click', function() {
    Alloy.Globals.currentTabGroup.activeTab.close($.win, {animated:true});
});
