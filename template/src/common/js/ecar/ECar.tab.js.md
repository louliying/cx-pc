##  ECar.tab.js
商城PC端 弹层组件

### 源码
http://git01.dds.com/cs/saic-mall/blob/master/saic-ebiz-carmall-web/src/main/webapp/resources/pc/js/mall/public/ECar.tab.js

### 实例地址
小图切换大图片
http://car.sit.com/product/1010003064.htm

### 展示效果

![image](D:\整车商城\carmall组件整理_0307\ECar.easyDialog.jpg)
![image](D:\03.Work\05.Manage\整车前端代码整理\d02.jpg)


### 参数
- **navNode**：string							//导航节点，格式为jQuery selector(比如：.tab-nav) 
- **curNavCls**： string					      //当前选中的导航class name
- **pannelNode**：string						//内容块节点，格式为jQuery selector(比如：.tab-nav)
- **curPannelCls**: string				   //当前内容块class name
- **preNode**:string				   		//上一个节点，格式为jQuery selector(比如：.tab-nav)	
- **nextNode**: string					//下一个节点，格式为jQuery selector(比如：.tab-nav)
- **duration**: number		  	  		//自动播放的时间间隔,<=0表示不自动播放
- **event**: string		  			   //事件 hover,click
- **navMaskNode**: string 		  	  //导航节点蒙板层，默认为空
- **curNavMaskNode**: string 		 //当前选中导航节点蒙板层，默认为空
- **navMaskCssObject**: object 		 //当前选中导航节点Css键值对，主要针对透明度之类的，格式为{"opacity":50},默认为{}
- **curNavMaskNode**: string 		 //前选中导航节点Css键值对，主要针对透明度之类的，格式为{"opacity":50},默认为{}

### 使用说明
js部分 #模块初始化
	
   
	var options= {
	    navNode: '.car-tabs li',
	    curNavCls:'cur',
	    pannelNode: '.car-photos li',
	    curPannelCls:'cur',
	    preNode: '',
	    nextNode: '',
	    duration: 5000,
	    event: 'mouseenter',
	    navMaskNode: 'em',
	    navMaskCssObject:{"opacity":0.5},
	    curMaskNavCssObject:{"opacity":0.12}
	};
	ECar.tab(options);

css部分
    
    依赖样式，但样式写在各自的.css文件中

html部分

    <ul class="car-tabs clearfix">
		<li class="cur"><img src="images/mall/detail/car-small-1.png" /><em></em></li>
		<li><img src="images/mall/detail/car-small-1.png" /><em></em></li>
		<li><img src="images/mall/detail/car-small-1.png" /><em></em></li>
		<li><img src="images/mall/detail/car-small-1.png" /><em></em></li>
		<li><img src="images/mall/detail/car-small-1.png" /><em></em></li>
	</ul>

### 注意点
使用过程中，应该注意的地方

### 个人建议
对这个组件的个人看法，做参考和备案用