module.exports = {
    getDiffTime: function(date) {
        var now = new Date, sub = now.getTime() - date;
        return sub < 0 ? "負" : sub < 3600000 ? Math.floor(sub / 60000) + " 分前" : sub < 86400000 ? Math.floor(sub / 3600000) + " 時間前" : sub < 604800000 ? Math.floor(sub / 86400000) + " 日前" : sub < 2592000000 ? Math.floor(sub / 604800000) + " 週間前" : sub < 31536000000 ? Math.floor(sub / 2592000000) + " ヶ月前" : Math.floor(sub / 31536000000) + " 年前";
    }
};