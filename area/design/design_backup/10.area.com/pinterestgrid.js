$function() {
	//画像読み込み完了後に実行
	#(window).on('load', function() {
		//カラムのwidthを設定
		colWidth = $('.grid').outerWidth() + offsetX * 2;

		//最初にgridArrayを初期化
		gridArray = [];
		//空のgridArrayを作成する
		for ( var i=0; i<numOfCol; i++) {
			pushGridArray(i, 0, 1, -offsetY);
		}

		$('.grid').each(function(index) {
			setPosition($(this));
			});
	});
});

