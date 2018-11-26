##  ECar.dialog.js
商城PC端 弹层组件

### 源码
http://git01.dds.com/cs/saic-mall/blob/master/saic-ebiz-carmall-web/src/main/webapp/resources/pc/js/Fastlogin/ECar.dialog.js

### 实例地址
快速登录

### 展示效果

![image](D:\整车商城\carmall组件整理_0307\ECar.easyDialog.jpg)
![image](D:\03.Work\05.Manage\整车前端代码整理\d02.jpg)


### 参数
- **callback**：fun						//finshCallback 
- **closeFunction**：fn					//closeCallback
- **title**：string						//标题 
- **bottom**：string					   //底部文字
- **content**:   					   //主体的内容
- **width**:  						   //dialog的宽度					
- **height**: 						  //dialog的高度
- **top**:  					  	  //dialog的top属性
- **mode**: 						  //ajax, text, id, iframe,
- **url**: 						  	  //为iframe模式下用
- **css **: 						  //添加到container上的class名
- **height**: 						  //dialog的高度
- **supportESC**:boolean			  //是否支持ESC键退出	

### 使用说明
js部分 #模块初始化
	
    ECar.dialog.alert({message:'保存成功！',   
		closeCallback:function(){
			window.location.reload();
		},callback:function(){
			window.location.reload();
		}
	});
	//alert, confirm, prompt三种已封装好的
	

	ECar.dialog.open({
		title: dialogTitle,
		width: dialogWidth,
		height:dialogHeight,
		content: '<iframe  id="inneriframe" name="inneriframe" class="dialog-iframe" frameborder="no" border="0" scrolling="no" src="' + path +'/simple/toSimple.htm?simple_pagetype=' + checktype + '"></iframe>'
	});


css部分

    <link href=".../css/mall/global.css" />

html部分
```
依赖html
```

### 注意点
使用过程中，应该注意的地方

### 个人建议
对这个组件的个人看法，做参考和备案用