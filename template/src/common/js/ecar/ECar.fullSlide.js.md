##  ECar.dialog.js
商城PC端 弹层组件

### 源码
http://git01.dds.com/cs/saic-mall/blob/master/saic-ebiz-carmall-web/src/main/webapp/resources/pc/js/mall/public/ECar.fullSlide.js

### 实例地址
http://car.chexiang.com

### 展示效果

![image](D:\整车商城\carmall组件整理_0307\ECar.easyDialog.jpg)
![image](D:\03.Work\05.Manage\整车前端代码整理\d02.jpg)


### 参数
- **ele**：string							//fullSlide容器ID 
- **width**： string					      //fullSlide容器宽度，默认100%
- **height**：Number						//fullSlide容器高度， 默认365
- **animtype**: string				   //动画方式(slide:左右滚动;fade:渐隐渐现)
- **animduration**:number				   //动画时长					
- **animspeed**: number					//动画间隔时长
- **showcontrols**: boolean		  	  //是否显示左右控制,默认为true
- **controinit**: boolean		  //左右控制显示方式 (false:一直显示;true:默认不显示,鼠标移动到根节点上显示)
- **autoplay**: boolean 		  	  //是否自动播放,默认为true
- **showmarkers **: 				 //是否显示数字标签,默认为true

### 使用说明
js部分 #模块初始化
	
   
	ECar.fullSlide({
		'ele':'banner-wrap',
		'showmarkers':false,
		'showcontrols':true,
		'autoplay':true,
		'animspeed':'7000'}
	);

css部分
    
    不依赖CSS样式

html部分

    <div class="banner-wrapper"  id="banner-wrap">
    	<div class="banner-wrap">
    		<ul class="slideList">
    			<li>
    				<a lazyimg = "images/mall/index/banner_img1.jpg" imgsrc = "images/mall/index/blank.gif" target="_blank" href="#" class="img"></a>
    			</li>
    			<li>
    				<a lazyimg = "http://i1.cximg.com/images/1920x365/1/4/46a20372e15d47a7928b3bcbb2a51649.jpg" imgsrc = "images/mall/index/blank.gif" target="_blank" href="#" class="img"></a>
    			</li>
    			<li>
    				<a lazyimg = "http://i2.cximg.com/images/1920x365/1/4/b71c667a8773440caff2b4f076bae63d.jpg" imgsrc = "images/mall/index/blank.gif" target="_blank" href="#" class="img"></a>
    			</li>
    		</ul>
    	</div>
    </div>

### 注意点
使用过程中，应该注意的地方

### 个人建议
对这个组件的个人看法，做参考和备案用