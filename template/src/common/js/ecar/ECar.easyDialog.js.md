##  ECar.easyDialog.js
商城PC端 “弹层” 组件

### 源码
http://git01.dds.com/cs/saic-mall/blob/master/saic-ebiz-carmall-web/src/main/webapp/resources/pc/js/common/ECar.easyDialog.js

### 实例地址
商品详情页 点击"免费咨询”
http://car.chexiang.com/product/1023364.htm

### 展示效果

![image](D:\整车商城\carmall组件整理_0307\ECar.easyDialog.jpg)
![image](D:\03.Work\05.Manage\整车前端代码整理\d02.jpg)


### 参数
- **container**： 弹层内容 
	- 方法一		

			container:
				{
 					header : '弹出层标题',				
					content : '弹出层内容',
					yesFn : function(){},	         // 确定按钮的回调函数
					noFn : function(){} / true, 	// 取消按钮的回调函数
					yesText : '确定',		        // 确定按钮的文本，默认为‘确定’
					noText : '取消'                 // 取消按钮的文本，默认为‘取消’
				}

		
	- 方法二	

		`container:  “#jspopcontainer”		     //弹出层内容的id`

- **overlay**：boolean					//是否添加遮罩层
- **drag**：boolean					    //是否绑定拖拽事件
- **fixed**：boolean					//是否静止定位
- **follow**: string|| object			//是否跟随自定义元素来定位
- **followX**: number					//相对于自定义元素的X坐标的偏移
- **followY**: number					//相对于自定义元素的Y坐标的偏移
- **autoClose**: number				//自动关闭弹出层的时间
- **lock**: Boolean					//是否允许ESC键来关闭弹出层
- **success**: function					//填充完内容后执行的回调函数
- **callback**: function				//关闭弹出层后执行的回调函数

### 使用说明
js部分 #模块初始化
	   
    ECar.easyDialog.open({
		container : {
			header : hearTitle,
			content : '<div style="text-align:center; padding:20px 50px;"><input type="text" id="fcode" style="width:250px; height:36px;" placeholder="请输入邀请码"/></div>',
			yesFn : function(){
				var fcode = $("#fcode").val();
				$("#hidden_data").attr("verifyCode",$.trim(fcode));
				goSubscribe(self);
			},
			noFn : function(){
				return;
			},
			yesText : '确定',	
			noText : '取消'
		}
	});

	// 简单点的
	ECar.easyDialog.open({
		container : {
			header : "免费咨询",
			content:$freeConsultation
		}
	});


css部分

    <link href=".../css/mall/global.css" />

<link type="text/css" rel="stylesheet" href="css/components/dialog.css" />
html部分
```
依赖html
```

### 注意点
使用过程中，应该注意的地方

### 个人建议
对这个组件的个人看法，做参考和备案用