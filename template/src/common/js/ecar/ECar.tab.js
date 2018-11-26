/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-4-24
 * Description: tab切换，支持mouseover、click，支持上一个、下一个  修正出现展示区域没有当前选中的bug2016.8.8 amanda
 */
;(function($,ECar){
	if(ECar.tab) return;
	ECar.tab = function(options){
		// 默认配置
		var defaultCfg = {
		    //导航节点，格式为jQuery selector(比如：.tab-nav)
		    navNode: '',
		    //当前选中的导航class name
		    curNavCls:'',
		    //内容块节点，格式为jQuery selector(比如：.tab-nav)
		    pannelNode: '',
		    //当前内容块class name
		    curPannelCls:'',
		    //上一个节点，格式为jQuery selector(比如：.tab-nav)
		    preNode: '',
		    //下一个节点，格式为jQuery selector(比如：.tab-nav)
		    nextNode: '',
		    //自动播放的时间间隔,<=0表示不自动播放
		    duration: 0,
		    //事件 hover,click
		    event: 'click',
		    //导航节点蒙板层
		    navMaskNode: '',
		    //当前选中导航节点蒙板层
		    curNavMaskNode: '',
		    //当前选中导航节点Css键值对，主要针对透明度之类的，格式为{"opacity":50}
		    navMaskCssObject:{},
		    //当前选中导航节点Css键值对，主要针对透明度之类的，格式为{"opacity":50}
		    curMaskNavCssObject:{}
		};
		options.event != "click" && (options.event="mouseenter");
	    // 构造配置
	    config = $.extend({}, defaultCfg, options||{});
		return new Tab(config);
	};
	function Tab(options) {
	    this.cfg = options;
	    this.intInterval = -1;
	    this.init();
	}
	Tab.prototype = {
	    init: function() {
	        var self = this,
	            cfg = self.cfg,
	            curIndex = 0;
	        var navNode = $(cfg.navNode);
	        var navMaskNode;
	        if(navNode.length > 0  && $.trim(cfg.navMaskNode) != ""){
		        navMaskNode = $(cfg.navNode + " " + cfg.navMaskNode);
		        var curNavMaskNode = $(cfg.navNode + "." + cfg.curNavCls + " "+ cfg.navMaskNode);
		        navMaskNode.css(cfg.navMaskCssObject);
		        curNavMaskNode.css(cfg.curMaskNavCssObject);
		    }
	        var pannelNode = $(cfg.pannelNode);
	        //1个的话没必要执行tab动作
	        if(pannelNode.length<=1){
	        	return;
	        }
	        var preNode = $(cfg.preNode);
	        var nextNode = $(cfg.nextNode);
	        var count=pannelNode.length;
		    function start(){
		    	if(cfg.duration>0){
		    		self.intInterval = setTimeout(function(){
		    			clearTimeout(self.intInterval);
				    	var nextIndex = curIndex == count -1 ? 0 :curIndex + 1;
		        		swip(nextIndex,true);
		        		start();
		        	},cfg.duration);
		    	}
		    }
		    function stop(){
	        	if(self.intInterval != -1){
	        		clearTimeout(self.intInterval);
	        		self.intInterval = -1;
	        	}
		    }
		    function swip(index,isAutoPlay){
	        	curIndex = index;
	        	if(navNode.length>0){
	        		$(cfg.navNode+"."+cfg.curNavCls).removeClass(cfg.curNavCls);
	        	}
	        	if(navNode.length > 0  && $.trim(cfg.navMaskNode) != ""){
		        	navMaskNode.css(cfg.navMaskCssObject);
		        	navMaskNode.eq(curIndex).css(cfg.curMaskNavCssObject);
	        	}
	        	navNode.eq(curIndex).addClass(cfg.curNavCls);
	        	//$(cfg.pannelNode+"."+cfg.curPannelCls).removeClass(cfg.curPannelCls);
	        	//pannelNode.eq(curIndex).addClass(cfg.curPannelCls);
				pannelNode.eq(curIndex).addClass(cfg.curPannelCls).siblings().removeClass(cfg.curPannelCls);
		    }
	        start();
	        navNode.on(cfg.event,function(){
	        	swip($(this).index(),false);
	        });
	        preNode.on(cfg.event,function(){
	        	var preIndex = curIndex == 0 ? count-1 :curIndex - 1;
        		swip(preIndex,false);
	        });
	        nextNode.on(cfg.event,function(){
	        	var nextIndex = curIndex == count -1 ? 0 :curIndex + 1;
        		swip(nextIndex,false);
	        });
	        pannelNode.on("mouseenter",function(){
	        	stop();
	        });
	        pannelNode.on("mouseleave",function(){
	        	stop();
	        	start();
	        });
	    }
	};
})(jQuery,window.ECar||(window.ECar={}));

