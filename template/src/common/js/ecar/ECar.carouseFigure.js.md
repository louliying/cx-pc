仿京东轮播图  依赖jquery  示例效果可查看金融首页bannner


<link rel="stylesheet" href="carousel-figure.css">
<script src='ECar.carouseFigure.js'></script>

/** html **/

<div class="carousel-figure js_carousel-figure">
    <div class="images-wrap js_images-wrap">
        <ul>
            <li class='img-lis js_img-lis'>
                <a href="javascript:void(0)" data-href='www.baidu.com'>
                    <img src="./finance/5.jpg" alt=""/>
                </a>
            </li>
        </ul>
    </div>
    <div class="pagination js_pagination">
        <ol class='pagination-list js_pagination-list'></ol>
        <span class="pagination-active js_pagination-active"></span>
    </div>
</div>


/** js **/

$(function () {

   /* 页面中可存在多实例 */
   ECar.carouselFigure( {paginationTriggerType:'click'} );

})

/* var defaults = {
            container:'.js_carousel-figure',
            imagesWrap:'.js_images-wrap',
            paginationWrap:'.js_pagination',
            paginationActive:'.js_pagination-active',
            paginationList:'.js_pagination-list',
            imgLis:'.js_img-lis',
            paginationTriggerType:'mouseenter'
        }*/