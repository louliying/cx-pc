##  ECar.timezone.js
商城PC端 倒计时功能

### 源码
http://git01.dds.com/cs/saic-mall/blob/master/saic-ebiz-carmall-web/src/main/webapp/resources/pc/js/mall/public/ECar.timezone.js

### 实例地址
商品详情页，倒计时


### 展示效果

![image](D:\整车商城\carmall组件整理_0307\ECar.easyDialog.jpg)
![image](D:\03.Work\05.Manage\整车前端代码整理\d02.jpg)


### 参数
- **serverTime**：date							//当前系统时间(单位毫秒数),默认null
- **startTime**： date					      //倒计时开始时间(单位毫秒数),默认null
- **stopTime**：date						//倒计时结束时间(单位毫秒数),默认null
- **notStartCallBack**: fn				   //未开始回调函数
- **startCallBack**:fn				   		//开始时回调函数
- **stopCallBack**: fn					//结束时回调函数

### 使用说明
js部分 #模块初始化	
   
	var options= {
	    serverTime: window.g_config.serverTime || 0,
	    startTime: window.g_config.startTime || 0,
	    stopTime: window.g_config.stopTime || 0,
	    notStartCallBack: function(){
	    	// $(".submit_preorder").removeClass("btn-submit").addClass("btn-submit-nostart").unbind("click").html("未开始");
	    },
	    startCallBack: function(timeStampObj){
	    	// if(!self.submitBtnBindEventFlag){
	    	// 	$(".btn-submit-nostart").removeClass("btn-submit-nostart").addClass("btn-submit").unbind("click").html("立即下定");
		    // 	self.addOrderButtonClickEvent();
		    // 	self.submitBtnBindEventFlag = true;
	    	// }	    	
	    	var timtInfoText="剩余"+ timeStampObj.day + "天"
	    						+ timeStampObj.hour +"时"
	    						+ timeStampObj.minute + "分"
	    						+ timeStampObj.second + "秒";
	    	timeInfoNode.html(timtInfoText);
	    	if(timeStampObj.day>=7){			    		
		    	timeInfoNode.hide();
	    	}else{
		    	timeInfoNode.show();
	    	}
	    },
	    //结束时回调函数
	    stopCallBack: function(){
	    	timeInfoNode.html("剩余0天0时0分0秒");
	    	// $(".submit_preorder").removeClass("btn-submit submit_preorder").addClass("btn-submit-sellout").unbind("click").html("已结束");
	    }
	};
	ECar.timeZone(options);

css部分
    
    依赖样式，但样式写在各自的.css文件中

html部分

    <div class="summary-price">
		上路价
		<strong>&yen;23.56万</strong>
		<span class="zd-price">&yen;23.82万</span>
		<a href="">降价通知</a>
		<span class="time-info" style="display:none"></span>
	</div>

### 注意点
使用过程中，应该注意的地方

### 个人建议
对这个组件的个人看法，做参考和备案用