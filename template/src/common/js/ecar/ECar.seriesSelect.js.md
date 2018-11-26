##  ECar.seriesSelect.js
商城PC端 “三级联动” 组件

### 源码
http://git01.dds.com/cs/saic-mall/blob/master/saic-ebiz-carmall-web/src/main/webapp/resources/pc/js/common/ECar.seriesSelect.js

### 实例地址
商品详情页 点击"免费咨询”， 弹出层里的 “选择品牌”， “选择车系”，“选择车型”三级联动
http://car.chexiang.com/product/802.htm

### 展示效果

![image](D:\整车商城\carmall组件整理_0307\ECar.easyDialog.jpg)
![image](D:\03.Work\05.Manage\整车前端代码整理\d02.jpg)


### 参数
- **url**： //列表数据文件路径（json格式）弹层内容 
- **selects**：Array					//下拉选框组
- **changeTitle**：false				//下级菜单为空 
- 
- **nodata**：boolean					//是否静止定位
- **required**: false  					//是否为必选
- 
- **complete**:  $.noop					
- **data**: null

### 使用说明
js部分 #模块初始化
	   
    ECar.seriesSelect($("#compVotesel"), {
	  data: e_data,
	  changeTitle: true,
	  selects: ["car-brand", "car-series" ,"car-model"],
	  nodata: null
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