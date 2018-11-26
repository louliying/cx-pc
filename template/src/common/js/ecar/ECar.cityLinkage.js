/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   张卫明
 * Date:     2016-3
 * Description: 三级联动
 */

;(function(root,factory) {

     if(root.$){
        var _$ = root.$;
    }
    if (typeof define === 'function') {
        if(define.cmd){
            define("ECar.cityLinkage",['$'], function(require,exports,module){
                "define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
                var $ = require('$');
                return factory(root,$);
            });
        }else{
            define(['$'],function(){
                "define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
                return factory(root,$);
            });
        }
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        var $ = require('$');
        module.exports = factory(root,$);
    } else {
        factory(root,_$);
    }

})(window,function(root,$){

    "use strict";

    root.ECar = root.ECar || {};

    if(ECar.cityLinkage){
        return ECar.cityLinkage;
    }

    ECar.cityLinkage = function(target, options){

        var settings = {
            selects: [],            // 下拉选框组
            required: false,        // 是否为必选
            changeTitle : false,    // 选项下级菜单不为空
            changeCur:function(){},
            complete:function(){},  // select change 时触发 回调
            resetShow:null,         // 重置 初始默认值
            data:""                 // 列表数据文件路径（json格式）
        };

        var config = $.extend({},settings,options||{});

        return new cityLinkage(target, config);

    }

    function cityLinkage(target, config){

        var _this = this;

        this.nodeParent = $(target);
        this.config = config;
        this.selectSum = config.selects.length;
        this.selectArr = [];
        this.initVal = [];
        this.dataJson = {};

        this.selData = {};          //三级联动选择的实时数据
        this.returnData = false;    //三级联动状态，是否选完


        if(Object.prototype.toString(config.data) == '[object Object]'){

            this.dataJson=config.data;
            this.init();

        } else if(typeof config.data == 'string'){
            $.getJSON(settings.url,function(json){
                this.dataJson=json;
                _this.init();
            });
        };


    };

    cityLinkage.prototype = {

        constructor : cityLinkage,

        init:function(){

            //主流程
            this.createSelect();

            //为select 添加事件处理方法
            this.addEvent();

            //重置方法
            this.addReset();

        },

        createSelect:function(){

            var tempHtml,
                _this = this,
                config = this.config;

            for(var i = 0; i < _this.selectSum ; i++){
                _this.selectArr.push(_this.nodeParent.find("select." + config.selects[i]));
                _this.selectArr[i].html("<option value='0'>"+ (_this.selectArr[i].data("title") || "请选择")+"</option>");
            };

            tempHtml =  _this.getNewOption(_this.dataJson,_this.selectArr[0].data("title"));
            _this.selectArr[0].html(tempHtml);


            for(var j = 0; j < _this.selectSum ; j++){
                if(_this.selectArr[j].data('val')){
                    _this.initVal.push(j);
                }
            };
            _this.initSelect();

        },

        addEvent:function(){

            var _this = this;

            _this.nodeParent.on("change", "select", function() {
                _this.selectChange(this);
                if( typeof  _this.config.changeCur == 'function'){
                    _this.config.changeCur.apply(this);
                }
            });

        },
        //添加重置按钮方法
        addReset:function(){

            var _this = this,
                config = _this.config;

            if(!config.resetShow || Object.prototype.toString(config.resetShow) != '[object Object]'){

                return false;

            }

            for(var i in config.resetShow){
                $(config.resetShow[i]).on(i,function(){

                    var serData ={},
                        objKey;

                    for(var ii = 0 ; ii< config.selects.length ; ii++){
                        objKey = config.selects[ii].replace(/^[a-z]{1}/,function(m){
                            return m.toUpperCase();
                        });
                        serData['series' + objKey] = $(this).data('series' + objKey);
                    };

                    var testReg = /^series/,
                        testString,
                        n;

                    for(var j in serData){

                        if(!testReg.test(j)){
                            break;
                        }
                        testString = j.replace(testReg,'').toLowerCase();

                        for(n=0;n<config.selects.length;n++){
                            if(config.selects[n] == testString){

                                _this.selectArr[n].data("val",serData[j]);

                            }
                        }

                    };

                    //初始化原始值
                    _this.initVal = [];
                    _this.selectArr = [];
                    _this.selData = {};         //三级联动选择的实时数据
                    _this.returnData = false;   //三级联动状态，是否选完

                    _this.createSelect();

                });
            }

        },
        //change 事件触发函数
        selectChange:function(ele){

            var _this = this,
                className = $(ele).attr('class'),
                getVal = $(ele).val(),
                config = _this.config,
                selectIndex,
                selectNext,
                selectVal = [],
                addNextType = true,
                selectData = _this.dataJson,
                tempHtml,
                nextHtml;

            //获取当前select,清空后续select值
            for(var i = 0;i < _this.selectSum; i ++){

                selectVal.push(getIndex(_this.selectArr[i].get(0).selectedIndex,config));

                if(selectIndex || i> selectIndex){

                    nextHtml = _this.getNewOption({}, _this.selectArr[i].data("title")) || "<option value='0'>请选择</option>";

                    if(config.changeTitle){
                        _this.selectArr[i].html(nextHtml).attr("disabled", true);
                    } else {
                        _this.selectArr[i].empty().attr("disabled", true);
                    }

                    delete _this.selData[i];
                }

                if(className.indexOf(config.selects[i]) >-1){
                    selectIndex = i;
                }

            }


            if(getVal != 0){
                _this.selData[selectIndex] = getVal;
            } else {
                delete _this.selData[selectIndex];
            }

            //获取是否选完
            if(_this.selData[_this.selectSum-1]){
                _this.returnData = true;
            } else {
                _this.returnData = false;
            }

            //获取下级列表值
            selectNext = selectIndex + 1;
            for (var i = 0; i < selectNext; i++) {
                if (typeof(selectData[selectVal[i]]) == "undefined" || !selectData[selectVal[i]].children || !selectData[selectVal[i]].children.length) {
                    addNextType = false;
                    break;
                };
                selectData = selectData[selectVal[i]].children;
            };

            if(!addNextType){
                // 选择完单选 事件后执行函数
                config.complete.apply();

                return;
            };

            // 遍历数据写入下拉选框
            if (_this.selectArr[selectNext]) {
                tempHtml = _this.getNewOption(selectData,_this.selectArr[selectNext].data("title"));
                _this.selectArr[selectNext].html(tempHtml).removeAttr("disabled");
            };

            // 选择完单选 事件后执行函数
            config.complete.apply(this,[ele]);

        },

        getNewOption:function(selectData,title){

            var _title = title || "请选择",
                _this = this,
                _html;

            if (!_this.config.required) { // 0?
                _html = "<option value='0'>" + _title + "</option>";
            };

            $.each(selectData, function(i, val) {
                if (!val.value) {
                    _html += "<option value='" + val.text + "'>" + val.text + "</option>";
                } else {
                    _html += "<option value='" + val.value + "'>" + val.text + "</option>";
                };
            });

            return _html;

        },
        //初始化select 触发后续 select
        initSelect:function(n){

            var _this = this,
                _n = n || 0;

            if(_n < _this.initVal.length){
                setTimeout(function() {
                    var defaultVal=_this.selectArr[_n].data("val");
                    _this.selectArr[_n].val(defaultVal);
                    if(_this.selectArr[_n].val()==defaultVal){
                        _this.selectArr[_n].trigger("change");
                    }
                    _n++;
                    _this.initSelect(_n);
                }, 1);
            }
        }


    }

    var getIndex = function(n,settings) {
            return (settings.required) ? n : n - 1;
        };

    return ECar.cityLinkage;

});