
;(function (ECar) {
    ECar.carouselFigure = function (options) {
        if (options && typeof options !== 'object') return;
        new carouselFigure(options);
    }
})(window.ECar || (window.ECar = {}))

function carouselFigure(options) {
    
    var defaults = {
        container: '.js_carousel-figure',
        imagesWrap: '.js_images-wrap',
        paginationWrap: '.js_pagination',
        paginationActive: '.js_pagination-active',
        paginationList: '.js_pagination-list',
        imgLis: '.js_img-lis',
        paginationTriggerType: 'hover'
    }
    
    this.config = $.extend({}, defaults, options)
    
    this.containerNode = $(this.config.container);
    
    this.init();
}

carouselFigure.prototype = {
    
    init: function () {
        
        this.isBnnerLisLenOne();
        this.event();
        
    },
    
    isBnnerLisLenOne:function() {
        /* 如果banner轮播图只有一张图片 */
    
        this.imagesLis = this.containerNode.find(this.config.imgLis);
        this.imagesLisLen = this.imagesLis.length;
        
        // if
        if (this.imagesLisLen === 1) {
            
            var $a = this.imagesLis.children();
            $a.attr('href', $a.data('href'));
            
            return;
        }
        
        // else
        this.paginationActive = this.containerNode.find(this.config.paginationActive);
        this.pagination = this.containerNode.find(this.config.paginationWrap);
        this.setBottom = 15;
        this.initPositions = [
            {
                left: -54,
                width: 976,
                height: 338
            },
            {
                left: 0,
                width: 1080,
                height: 374
            },
            {
                left: 159,
                width: 976,
                height: 338
            },
            {
                left: 54,
                width: 976,
                height: 338,
                bottom: -(this.setBottom)
            },
            {
                left: 0,
                width: 1080,
                height: 374,
                bottom: 0
            },
        ];
        this.positions = this.imagesLisLen < 3 ?
            [this.initPositions[4], this.initPositions[3]] :
            [this.initPositions[0], this.initPositions[1], this.initPositions[2]]
        this.imageNum = this.imagesLisLen - 3;
        this.paginationFlag = false;
        this.clickFlag = true;
        this.timeFlag = 0;
        
        this.imagesLisLen === 2 &&
        this.pagination.css('bottom', '-'+ (31 + this.setBottom) +'px');
        
        this.addPosition();
        this.move(this.imagesLis, this.positions, [3, 3]);
        this.createPagination();
        this.autoPlay();
        
    },
    
    event: function () {
        
       if (this.imagesLisLen > 1) {
           //  轮播 next click
           $(this.containerNode)
               .on('click', '.js_next', this.handler('switchNext'));
    
           //  轮播 prev click
           $(this.containerNode)
               .on('click', '.js_prev', this.handler('switchPrev'));
    
           //  imagesWrap hover
           this.containerNode.find('.js_images-wrap')
               .hover(this.handler('imagesWrapIn'),
                   this.handler('imagesWrapOut'));
    
           //  pagination switch
           this.containerNode.find('.pagination-lis')[this.config.paginationTriggerType](this.handler('paginationLis'));
       }
        
    },
    
    handler: function (eventTarget, zIndexArr) {
        
        var _this = this;
        
        return {
            
            //  switchNext click
            switchNext: function () {
                
                // 节流阀
                if (_this.clickFlag || _this.paginationFlag) {
                    
                    zIndexArr = zIndexArr || [4, 3];
                    
                    // 关闭节流阀
                    _this.clickFlag = false;
                    
                    // 循环位置
                    _this.positions.unshift(_this.positions.pop());
                    
                    // 开始轮播
                    _this.move(_this.imagesLis, _this.positions, zIndexArr);
                    
                }
                
                return false;
                
            },
            
            //  switchPrev click
            switchPrev: function () {
                
                // 节流阀
                if (_this.clickFlag || _this.paginationFlag) {
                    
                    zIndexArr = zIndexArr || [3, 4];
                    
                    // 关闭节流阀
                    _this.clickFlag = false;
                    
                    // 循环位置
                    _this.positions.push(_this.positions.shift());
                    
                    // 开始轮播
                    _this.move(_this.imagesLis, _this.positions, zIndexArr);
                    
                }
                
                return false;
                
            },
            
            //  imagesWrap hoverIn
            imagesWrapIn: function () {
                clearInterval(_this.timer);
            },
            
            //  imagesWrap hoverOut
            imagesWrapOut: function () {
                _this.autoPlay();
            },
            
            //  pagination switch
            paginationLis: function () {
                
                var number = $(this).index() - _this.containerNode.find('.js_active').index();
                
                if (number === 0) {
                    
                    return;
                    
                }
                else if (number > 0) {
                    
                    clearInterval(_this.timer);
                    _this.paginationFlag = true;
                    
                    for (var i = 0; i < number; i++) {
                        
                        (number - 1) === i && (_this.timeFlag = 1);
                        _this.handler('switchNext', number === _this.imagesLisLen - 1 ? [3, 4] : null)();
                        
                    }
                    
                    _this.paginationFlag = false;
                    
                }
                else if (number < 0) {
                    
                    clearInterval(_this.timer);
                    number = Math.abs(number);
                    
                    _this.paginationFlag = true;
                    
                    for (var i = 0; i < number; i++) {
                        
                        (number - 1) === i && (_this.timeFlag = 1);
                        _this.handler('switchPrev', number === _this.imagesLisLen - 1 ? [4, 3] : null)();
                        
                    }
                    
                    _this.paginationFlag = false;
                    
                }
                
            },
            
        }[eventTarget]
        
    },
    
    addPosition: function () {
        /* 根据图片数量  添加 位置 数据 */
        
        for (var i = 0; i < this.imageNum; i++) {
            this.positions.push({
                // zIndex: 2,
                left: 54,
                width: 976,
                height: 338
            })
        }
    },
    
    createPagination: function () {
        /* 创建 pagination lis */
        
        var htmlStr = '',
            width = 186 / this.imagesLisLen;
        
        this.activeWidth = width;
        
        this.paginationActive.css({left: this.imagesLisLen < 3 ? 0 : width + 'px', width: width + 'px'})
        
        this.imagesLis.each(function () {
            
            htmlStr += '<li class="pagination-lis" style="width:' + width + 'px;"></li>'
            
        });
        
        this.containerNode
            .find(this.config.paginationWrap).show()
            .find(this.config.paginationList).append(htmlStr);
        
    },
    
    move: function (imagesLis, positions, zIndexArr) {
        /* 轮播切换*/
        
        var _this = this;

        imagesLis.each(function (i, item) {
            
            var t = $(item);
            
            // 处理active状态
            positions[i].left === 0 &&
            (t.addClass('js_active').css('z-index', 5).siblings().removeClass('js_active'),
                // paginationActive 位置 active高亮
                _this.paginationActive.stop().animate({left: i * _this.activeWidth}, 200))
            
            // 处理 上一张 和 下一张 状态
            positions[i].left === -54 &&
            t.addClass('js_prev').css('z-index', zIndexArr[0]).siblings().removeClass('js_prev');
            positions[i].left === 159 &&
            t.addClass('js_next').css('z-index', zIndexArr[1]).siblings().removeClass('js_next');
            
            positions[i].left === 54
            && t.css('z-index', 2)
            && _this.imagesLisLen === 2
            && t
                .addClass('js_next')
                .siblings()
                .removeClass('js_next');
            
            t.stop().animate(positions[i], 400, function () {
                
                var $active = _this.containerNode.find('.js_active a');
                
                $active
                    .attr('href', $active.data('href'))
                    .parent()
                    .siblings()
                    .children()
                    .attr('href', 'javascript:void(0)');
                
                // 打开节流阀
                _this.clickFlag = true;
                
                // 处理 pagination 切换 移动结束后的状态
                (_this.timeFlag === 1) && (_this.autoPlay(), _this.timeFlag = 0);
                
            });
            
        })
        
    },
    
    autoPlay: function () {
        /* 自动轮播 */
        
        var _this = this;
        
        this.timer && clearInterval(this.timer);
        
        this.timer = setInterval(function () {
            
            _this.handler('switchNext')();
            
        }, 2000)
        
    }
    
}