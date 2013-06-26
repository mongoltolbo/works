module.exports = {
    getDiffTime: function(date) {
        var now = new Date();
        var sub = now.getTime() - date;
        if (sub < 0) {
            return "負";
        } else if (sub < 1000 * 60 * 60) {
            // 一時間以内
            return (Math.floor(sub / (1000 * 60)) + " 分前");
        } else if (sub < 1000 * 60 * 60 * 24) {
            // 一日以内
            return (Math.floor(sub / (1000 * 60 * 60)) + " 時間前");
        } else if (sub < 1000 * 60 * 60 * 24 * 7) {
            // 一週間以内
            return (Math.floor(sub / (1000 * 60 * 60 * 24)) + " 日前");
        } else if (sub < 1000 * 60 * 60 * 24 * 30) {
            return (Math.floor(sub / (1000 * 60 * 60 * 24 * 7)) + " 週間前");
        } else if (sub < 1000 * 60 * 60 * 24 * 365) {
            return (Math.floor(sub / (1000 * 60 * 60 * 24 * 30)) + " ヶ月前");
        } else {
            return (Math.floor(sub / (1000 * 60 * 60 * 24 * 365)) + " 年前");
        }
    }
};
