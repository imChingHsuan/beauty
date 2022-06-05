import Swiper from 'swiper/js/swiper.js'
    
;(function ($) {
    /*
     *  WDD FESD swiper4
     *  version: 1.3
     *  Update: 2020.08.25
     *  Last Coding: Wade, 2020.08.25
     *
     *  use plugin : 
     *  jquery-3.4.1.js, jquery-easy.js, swiper.min.js
     * 
     */

    //  swiper4 => Swiper 5.3.6
    //
    //  <div class="swiper-container" 

    //    data-swiper-id="name＋number, ex: clone1，必須加入按鈕物件class"
    //    data-swiper-name=".swiperClassName"
    //    data-swiper-num="1" 
    //    data-swiper-numgroup="1" 
    //    data-swiper-arrow="on: 自己建構 arrow 結構, off: 隱藏, 不宣告將自動產生結構" 
    //    data-swiper-arrow-name=".arrowVlassName"
    //    data-swiper-arrow-common="on: 物件需擁有 class 'common'"

    //    data-swiper-nav="on: 自己建構 nav 結構, off: 隱藏, 不宣告將自動產生結構" 
    //    data-swiper-nav-name=".navClassName"
    //    data-swiper-nav-common="on: 物件需擁有 class 'common'"

    //    data-swiper-scrollbar="on: 自己建構 scrollbar 結構, off: 隱藏, 不宣告將自動產生結構" 
    //    data-swiper-scrollbar-name=".scrollbarClassName"

    //    data-swiper-effect="slide" 
    //    data-swiper-autoplay="on" 
    //    data-swiper-loop="on" 

    //    斷點判定 : Swiper4.x版本為小於，Swiper5.X以上為大於
    //    data-swiper-breakpoints="{375: { slidesPerView: 2, spaceBetween: 0 },768: { slidesPerView: 4, spaceBetween: 0 }}"
    //   >
    //       <div class="swiper-wrapper">
    //          <div class="swiper-slide">
    //              <-- your content -->
    //          </div>
    //       <d/iv>
    //  <d/iv>
    //
    //  $('.swiper-container').swiper4( { option } )
    //

    "use strict";

    fesdDB.ver.plugin.swiper4 = {};
    fesdDB.ver.plugin.swiper4.ver = '1.2';
    fesdDB.ver.plugin.swiper4.update = '2020.08.25';
    fesdDB.ver.plugin.swiper4.plugin = 'Swiper 5.3.6';

    var $a = {};

    var $s = {};

    window.mySwiper = [];


    $.fn.swiper4 = function(options) {

        //load fesdDB swiper4 Setting
        $s = $.extend(fesdDB.swiper4.setting, options);

        $a.container = '.swiper-container';
        $a.slide = '.swiper-slide';
        $a.pagination = '.swiper-pagination';
        $a.paginationNext = '.swiperNext';
        $a.paginationPrev = '.swiperPrev';
        $a.scrollbar = '.swiper-scrollbar';

        //HTML data
        $a.dataID = 'swiperId';
        $a.dataName = 'swiperName';
        $a.dataSlidesPerview = 'swiperNum';
        $a.dataslidesPerGroup = 'swiperNumgroup';
        $a.direction = 'swiperDirection';
        $a.dataEffect = 'swiperEffect';
        $a.dataAutoPlay = 'swiperAutoplay';
        $a.dataLoop = 'swiperLoop';
        $a.dataArrow = 'swiperArrow';
        $a.dataArrowName = 'swiperArrowName';
        $a.dataArrowCommon = 'swiperArrowCommon';
        $a.dataNav = 'swiperNav';
        $a.dataNavName = 'swiperNavName';
        $a.dataNavCommon = 'swiperNavCommon';
        $a.dataScrollBar = 'swiperScrollbar';
        $a.dataScrollBarName = 'swiperScrollbarName';
        $a.dataBreakpoints = 'swiperBreakpoints';

        return init(this)
    };



    $.extend({})

    function init(obj) {

        fesdDB.active.swiper4 = obj.length + ' objects';

        obj.each(function(index) {

            if ($(this).attr('data-swiper4-active') == 'on') { return }
            if ($(this).find($a.slide).length <= 1 && $(this).find(".swiper-lazy").length == 0) { return }

            var Num = parseInt(index) == 0 ? '' : parseInt(index) + 1;
            var swiperNewName = $(this).data($a.dataName) || $s.newName + '-' + Math.random().toString(36).substring(7);
            var swiperName = $(swiperNewName).length >= 1 ? swiperNewName + '-' + Math.random().toString(36).substring(7) : swiperNewName;
            var swiperObj = $a.container + '.' + swiperName;
            var swiperPagination = $a.pagination + '-' + swiperName;
            var swiperNext = $a.paginationNext + '-' + swiperName;
            var swiperPrev = $a.paginationPrev + '-' + swiperName;
            var swiperScrollbar = $a.scrollbar + '-' + swiperName;
            var slidesID = $(this).data($a.dataID);
            var direction = $(this).data($a.direction);
            var slidesPerview = $(this).data($a.dataSlidesPerview);
            var slidesPerGroup = $(this).data($a.dataslidesPerGroup);
            var effect = $(this).data($a.dataEffect);
            var autoplay = $(this).data($a.dataAutoPlay);
            var loop = $(this).data($a.dataLoop);
            var arrow = $(this).data($a.dataArrow);
            var arrowName = $(this).data($a.dataArrowName);
            var arrowCommon = $(this).data($a.dataArrowCommon);
            var nav = $(this).data($a.dataNav);
            var navName = $(this).data($a.dataNavName);
            var navCommon = $(this).data($a.dataNavCommon);
            var scrollBar = $(this).data($a.dataScrollBar);
            var scrollBarName = $(this).data($a.dataScrollBarName);
            var breakpoints = $(this).data($a.dataBreakpoints);
            var isArticle4 = $(this).parents('.article4');

            //往父層尋找 swiper4-outside 改變選單輸出的位置至.swiper-container外面
            var isOutside = $(this).parents().hasClass('swiper4-outside');

            if ($('.' + swiperName).length >= 1 || $(this).hasClass(swiperName)) {
                console.log($('.' + swiperName).length + 'x Swiper4 :' + swiperName + ' not active');
                return
            }

            $(this).addClass(swiperName);
            $(this).find('.swiper-slide').attr('data-swiper', swiperName);
            $(this).attr('data-swiper-myswiper', index);

            $(this).attr('data-swiper4-active', 'on');


            if (slidesPerview !== '' && slidesPerview !== 0 && typeof slidesPerview !== 'undefined') { $s.slidesPerView = slidesPerview; }
            if (direction !== '' && typeof direction !== 'undefined') { $s.direction = direction; } else { $s.direction = 'horizontal'; }
            if (effect !== '' && typeof effect !== 'undefined') { $s.effect = effect; } else { $s.effect = autoplay; }
            if (autoplay !== 'off') { $s.autoplay = true; } else { $s.autoplay = false; }
            if (slidesPerGroup !== '' && typeof slidesPerGroup !== 'undefined') {
                $s.slidesPerGroup = parseInt(slidesPerGroup);
                $s.loop = false;
            } else {
                $s.slidesPerGroup = 1;
                if (loop !== 'off') { $s.loop = true; } else { $s.loop = false; }
            }


            //swiperNext + swiperPrev Button
            if (arrow === 'off') {
                $s.navigation.nextEl = '';
                $s.navigation.prevEl = '';

            } else if (arrow === 'on') {

                if (arrowCommon === 'on') {
                    $s.navigation.nextEl = arrowName + '-Next.common';
                    $s.navigation.prevEl = arrowName + '-Prev.common';

                } else {
                    $s.navigation.nextEl = arrowName + '-Next.' + slidesID;
                    $s.navigation.prevEl = arrowName + '-Prev.' + slidesID;
                }


            } else if ($(swiperNext).length <= 0) {
                $s.navigation.nextEl = swiperNext;
                $s.navigation.prevEl = swiperPrev;

                if (isOutside) {
                    $(this).after('<div class="swiper-button-prev ' + swiperPrev.substring(1) + '"></div>');
                    $(this).after('<div class="swiper-button-next ' + swiperNext.substring(1) + '"></div>');
                } else {
                    $(this).append('<div class="swiper-button-prev ' + swiperPrev.substring(1) + '"></div>');
                    $(this).append('<div class="swiper-button-next ' + swiperNext.substring(1) + '"></div>');
                }

            };

            //nav
            if (nav === 'off') {
                $s.pagination.el = '';

            } else if (nav === 'on') {

                if (navCommon === 'on') {
                    $s.pagination.el = navName + '.common';

                } else {
                    $s.pagination.el = navName + '.' + slidesID;

                }

            } else if ($(swiperPagination).length <= 0) {
                $s.pagination.el = swiperPagination;

                if (isOutside) {
                    $(this).after('<div class="swiper-pagination ' + swiperPagination.substring(1) + '"></div>');
                } else {
                    $(this).append('<div class="swiper-pagination ' + swiperPagination.substring(1) + '"></div>');
                }

            };

            //scrollBar
            if (scrollBar === 'off') {
                $s.scrollbar.el = '';

            } else if (scrollBar === 'on') {
                $s.scrollbar.el = scrollBarName;

            } else if ($(swiperScrollbar).length <= 0) {
                // $(this).append('<div class="swiper-scrollbar ' + scrollBarName.substring(1) + '"></div>');
            };

            //breakpoints
            if (breakpoints !== '' && typeof breakpoints !== 'undefined' && typeof breakpoints === 'string') {
                $s.breakpoints = eval('(' + breakpoints + ')');

            } else if (isArticle4 && slidesPerview !== '' && slidesPerview !== 0 && typeof slidesPerview !== 'undefined') {
                $s.breakpoints = {
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: slidesPerview,
                        spaceBetween: 0
                    }
                };

            };
            // swiper active
            mySwiper[index] = new Swiper(swiperObj, $s);


        })
    }
})(jQuery)