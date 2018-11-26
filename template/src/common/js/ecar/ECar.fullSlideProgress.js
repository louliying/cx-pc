/*
 * Author:   张卫明
 * Description: 全屏轮播
 * Revision Time: 2015-4-27
 * Update: 2016-5-12 cindylou
 */

;(function($,window,ECar) {
	//"use strict";
	ECar.fullSlide = function(o) {
		// slider settings
		var defaults        = {
			ele             : 'fullslide',
			width           : '100%',
			height          : 365,
			linkwidth       : 730,
			animtype        : 'slide',      //动画方式(slide:左右滚动;fade:渐隐渐现)
			animduration    : 400,          //动画时长
			animspeed       : 4000,         //动画间隔时长
			showcontrols    : true,         //是否显示左右控制
			controinit      : true,         //左右控制显示方式 (false:一直显示;true:默认不显示,鼠标移动到根节点上显示)
			autoplay        : true,         //是否自动播放
			showmarkers     : true,         //是否显示数字标签
			fullwidth       : document.body.scrollWidth //全屏的宽度         
		};
		// create settings from defauls and user options
		var settings        = $.extend({}, defaults, o);
		settings.controlSpeed = parseInt(settings.animduration) + parseInt(settings.animspeed);
		// slider elements
		var $wrapper        = $('#'+settings.ele),
			$wrap           = $wrapper.find('.banner-wrap'),
			$slider         = $wrapper.find('ul.banner-img'),
			$slides         = $slider.children('li'),
			$slides_a = $slides.find('a'),
			$liLen = $slides.length,        //原li个数
			$liLenNew,                      //创建结构后li个数
			$firstLi = $slides.eq(0),       //第一个li
			$lastLi = $slides.eq($liLen-1), //最好一个li
			$marker,                        //标签div
			$markes,                        //标签
			$markesSel,                     //选中的标签
			$control,                       //控制按钮div
			$controlL,                      //左控制按钮
			$controlR,                      //右控制按钮
			$switch = true,                 //防止多次触发滚动
			$on = true,                     //动画开关
			$ctrlState;                     //控制模式 0为只有标签没有左右控制 1为 有左右控制 标签随意

		if(settings.animtype == 'slide' && settings.showcontrols == true){
			newIndexStep = -1;
		} else {
			newIndexStep = 0;
		}
		//num
		var num = $slides.length;
		var index = 0, triggleIndex = 0,timeoutId=-1;
		if(num == 0 || (settings.showmarkers == false && settings.showcontrols == false)) {
			return;
		};
		var init = function(){
			//只有一张图片时 不滚动
			if($liLen <= 1){
				_createList();
				lazeImg(0);
				return;
			}
			//创建目录结构
			createElement();
			//自动运行
			if(settings.autoplay == true && $on == true){
				timeoutId = setTimeout(start,settings.animspeed);
			}
			//添加触发事件
			event();
		};

		//创建图片
		var _createList = function(){

			$slides.css({'height':settings.height+'px'});

			$slides.each(function(_index){

				var 	bjImg = $(this).attr('imgsrc'),
					lazyImg = $(this).attr('lazyimg'),
					_slider = $(this),
					_link = _slider.find('a'),
					bjColor = $(this).attr('bgcolor') || '#ffffff';

				_slider.css({'background-color':bjColor});

				if(_index == 0){
					//$(this).css({'height':settings.height+'px','background':'url("'+lazyImg+'") no-repeat center 0','display':'block'});
					//$(this).attr({'src':lazyImg,'lazyimg':'done'});
					$(this).css({'background':'url('+lazyImg+') no-repeat center 0','lazyimg':'done'});
				} else {
					$(this).css({'background':'url('+bjImg+') no-repeat center 0'});
					//$(this).attr('src',bjImg);
					//$(this).css({'height':settings.height+'px','background':'url("'+bjImg+'") no-repeat center 0','display':'block'});
				}

				_link.css({'height':settings.height+'px','width':settings.linkwidth+'px','position':'absolute','left':'50%','top':'0px','margin-left':'-'+settings.linkwidth/2+'px','display':'block'});

			});
		};

		//创建目录结构
		var createElement = function(){
			_changeElement();
			//设置图片
			_createList();
			//设置图片结构
			_imgElement();
			$slides = $slider.children('li');
			$liLenNew = $slides.length;
			//设置标签结构
			//if(settings.showmarkers == true){
				$wrap.append('<ul class="banner-control"></ul>');
				$marker = $wrap.find('.banner-control');
				for(var i=0;i<num;i++){
					if(i==0){
						$marker.append('<li class="control-item cur"><span class="control-bg"></span><i class="control-per"></i></li>');
						$marker.find('i').animate({width:"100%"},settings.controlSpeed);
					} else {
						$marker.append('<li class="control-item"><span class="control-bg"></span><i class="control-per"></i></li>');
					}
				}
				$markes = $marker.children('li');
			//}

			//不显示标签
			if(settings.showmarkers != true){
				$marker.css({'display':'none'});
			}

			//设置左右控制结构
			if(settings.showcontrols == true){
				if(settings.controinit == true){
					var initControlShow = 'style="display:none"';
				} else {
					var initControlShow = 'style="display:block"';
				}

				$wrap.append('<div class="control-mod" '+initControlShow+'><span class="control-l"></span><span class="control-r"></span></div>');
				$control = $wrap.find('.control-mod');
				$controlL = $control.children('.control-l');
				$controlR = $control.children('.control-r');
			}

		};

		//设置图片结构
		var _imgElement = function(){

			if(settings.showcontrols != true && settings.showmarkers== true){ //只显示左右箭头
				$slider.append($firstLi.clone());
				$slider.css({'left':'0px'});
			} else {
				$slider.append($firstLi.clone());
				$slider.prepend($lastLi.clone());
				$slider.css({'left':-1*settings.fullwidth+'px'});
			};

		};

		var _changeElement = function(){

			if(settings.showcontrols != true){ //只显示标签
				$liLenNew = num+1;
			} else {            // 数字标签或左右控制都显示
				$liLenNew = num+2;
			}
			$wrap.css({'height':settings.height+'px','position':'relative','width':'100%','overflow':'hidden;'});
			$slider.css({'height':settings.height+'px','position':'absolute','width':$liLenNew*settings.fullwidth+100+'px','overflow':'hidden','top':'0px','left':newIndexStep*document.body.scrollWidth+'px'});
			$slides.css({'float':'left','width':settings.fullwidth+'px','text-align':'center','position':'relative'});

		};

		//动画开始
		var start = function(_index,_dire){
			$switch = false;

			if(timeoutId!=-1){
				window.clearTimeout(timeoutId);
			}
			timeoutId = -1;

			if(_index==null){ index = $marker.children('.cur').index(); };

			$markes.removeClass('cur');
			$markes.find('i').stop().width(0);
			$markes.eq(index+1).addClass('cur');
			index=index+1;

			if(index==num){
				$markes.removeClass('cur');
				$markes.eq(0).addClass('cur');
			}

			if(settings.showcontrols != true){ //只显示标签
				newIndexStep = -1*index;
			} else { // 数字标签或左右控制都显示
				newIndexStep = -1*(index+1);
			}

			//懒加载图片
			lazeImg(newIndexStep);

			$slider.animate({left: settings.fullwidth*newIndexStep + 'px'},{
				duration: settings.animduration,
				queue: false,
				done: function () {
					if(index==num){
						if(settings.showcontrols != true){  //只显示标签没有左右控制
							$slider.css({left:'0px'});
						} else {                // 左右控制显示
							$slider.css({left:settings.fullwidth*-1+'px'});
						}
						index = 0;
					//点击向左箭头 && 已经到第一个元素 定位到最后一个
					} else if(index==-1 && _dire == 'left'){
						lazeImg(-1*num);
						$slider.css({left:settings.fullwidth*-1*(num)+'px'});
					}
					$switch = true;
					if(settings.autoplay == true && $on == true){
						timeoutId = window.setTimeout(start, settings.animspeed);
					}
					$markes.eq(index-1).find("i").stop().width(0);
					$markes.eq(index).find('i').animate({width:"100%"},settings.controlSpeed,"linear");
				}
			});

		};

		//懒加载图片
		var lazeImg = function(_num){
			var aIndex = $slides.eq(-1*_num);
			if(aIndex.attr('lazyimg') != 'done'){
				//aIndex.css({'background':'url("'+aIndex.attr('lazyimg')+'") no-repeat center 0'});
				//aIndex.attr({'src':aIndex.attr('lazyimg'),'lazyimg':'done'});
				aIndex.css({'background':'url("'+aIndex.attr('lazyimg')+'") no-repeat center 0'});
			}
		};

		// 左右箭头调用
		var controlFun = function(_dire){

			if($switch == true){
				var cIndex = $marker.children('.current').index();

				if(_dire=='left'){
					index = cIndex-2;
				} else if(_dire=='right'){
					index = cIndex;
				}
				start(index,_dire);
			}
		};

		//给节点加事件
		var event = function(){
			$wrapper.hover(function(){
				if(settings.showcontrols == true && settings.controinit == true){
					$control.show();
				}
				$on = false;
				window.clearTimeout(timeoutId);
				$markes.eq(index).find('i').stop().width("100%");

			},function(){
				if(settings.showcontrols == true && settings.controinit == true){
					$control.hide();
				}
				$on = true;
				if(settings.autoplay == true && $switch == true && $on == true){
					timeoutId = window.setTimeout(start, settings.animspeed);
				}
			});
			$markes.on('mouseenter',function(){
				if($switch == true){
					var newIndex = $(this).index();
					index = newIndex-1;
					start(index);
					$markes.eq(index).find('i').stop().width("100%");
				}
			}).on("mouseout",function(){

			});
			/*$markes.delegate(".control-item",'mouseenter',function(){
				if($switch == true){
					var newIndex = $(this).index();
					index = newIndex-1;
					start(index);
					$markes.eq(index).find('i').stop().width("100%");
				}
			});
			$markes.delegate(".control-item",'mouseout',function(){
				if(settings.showcontrols == true && settings.controinit == true){
					$control.hide();
				}
				$on = true;
				if(settings.autoplay == true && $switch == true && $on == true){
					timeoutId = window.setTimeout(start, settings.animspeed);
				}
			});*/

			if(settings.showcontrols == true){

				$controlL.on('click',function(){
					controlFun('left');
				});

				$controlR.on('click',function(){
					controlFun('right');
				});
			}

			$(window).resize(function() {
				_changeElement();
			});
		};


		init();

	};

})(jQuery,window,window.ECar||(window.ECar={}));