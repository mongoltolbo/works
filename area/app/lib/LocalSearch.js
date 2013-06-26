//Application Window Component Constructor
function LocalSearch() {
	return this;
}
LocalSearch.prototype.search = function(keyword ,callback) {
	if (keyword.length>1 && keyword.slice(-1)=='駅')
		keyword = keyword.slice(0,keyword.length-1);
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'localdata.txt');
	var lines = file.read().text.split('\n');
	var res = {'keyword':keyword ,'results' : []};
	for (var i=0;i<lines.length;i++) {
		var data = lines[i].split(',');
		if (data.length!=4)
			continue;
		if (data[1].indexOf(keyword,0)>=0) {
			res.results.push({name:data[1] ,long_name:data[1] + ' (' + data[0] + ')' ,lng:data[2] ,lat:data[3]});
		}
	}
	callback.call(null,JSON.stringify(res));
	file = null;
	res = null;
};
// var areaAnnotation = new Array();
// LocalSearch.prototype.addAreaAnnotations = function(currentRegion,mapview){
	
// 	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'localdata.txt');
// 	var lines = file.read().text.split('\n');
// 	var results = [];
// 	for (var i=0;i<lines.length;i++) {
// 		var data = lines[i].split(',');
// 		if (data.length!=4)
// 			continue;
// 		if (Math.abs(data[2]-currentRegion.longitude)<0.02 && Math.abs(data[3]-currentRegion.latitude)<0.02) {//中心から2.22Km範囲
// 			results.push({name:data[1] ,long_name:data[0] ,lng:data[2] ,lat:data[3]});
// 		}
// 	}
// 	for (var i=0;i<results.length;i++) {
// 		areaAnnotation[i] = Titanium.Map.createAnnotation({
//         	latitude:results[i].lat,
//         	longitude:results[i].lng,
//         	title:results[i].name,
//         	subtitle:results[i].long_name,
//         	image:'/images/r_train3b_3r_20x20.png'});
// 	}
// 	mapview.addAnnotations(areaAnnotation);
// 	file = null;
// 	res = null;
// }

// LocalSearch.prototype.removeAreaAnnotations = function(mapview){
// 	for(var i=0;i<areaAnnotation.length;i++){
// 		mapview.removeAnnotation(areaAnnotation[i]);
// 	}	
// 	areaAnnotation = new Array();
// }

// LocalSearch.prototype._search = function(keyword ,callback) {
// 	var httpc = Ti.Network.createHTTPClient();
// 	httpc.setTimeout(12*1000);
// 	httpc.open('GET','http://ajax.googleapis.com/ajax/services/search/local?v=1.0&q=' + encodeURIComponent(keyword));
// 	httpc.setRequestHeader('Accept-Encoding', 'gzip, deflate');
// 	httpc.setRequestHeader('Accept-Language', 'ja, en-us');
// 	httpc.onload = function() {
// 		if (this.status=='200') {
// 			callback.call(null, this.responseText);
// 		} else {
// 			callback.call(null,JSON.stringify({'error':'データを取得できませんでした。'}));
// 		}
// 		httpc.onreadystatechange = null;
// 		httpc.ondatastream = null;
// 		httpc.onerror = null;
// 		httpc = null;
// 	}
// 	httpc.onerror = function(e) {
// 		if (Titanium.Network.online==false) {
// 			callback.call(null,JSON.stringify({'error':'ネットワークがオフラインのようです。'}));
// 		} else {
// 			callback.call(null,JSON.stringify({'error':'データを取得できませんでした。'}));
// 		}
// 	};
// 	httpc.send();
// }
//make constructor function the public component interface
module.exports = LocalSearch;
