function LocalSearch() {
    return this;
}

LocalSearch.prototype.search = function(keyword, callback) {
    keyword.length > 1 && keyword.slice(-1) == "駅" && (keyword = keyword.slice(0, keyword.length - 1));
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "localdata.txt"), lines = file.read().text.split("\n"), res = {
        keyword: keyword,
        results: []
    };
    for (var i = 0; i < lines.length; i++) {
        var data = lines[i].split(",");
        if (data.length != 4) continue;
        data[1].indexOf(keyword, 0) >= 0 && res.results.push({
            name: data[1],
            long_name: data[1] + " (" + data[0] + ")",
            lng: data[2],
            lat: data[3]
        });
    }
    callback.call(null, JSON.stringify(res));
    file = null;
    res = null;
};

module.exports = LocalSearch;