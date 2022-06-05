/**
 *  WDD FESD anchor4
 *  @version: 2.2
 *  @author: Wade
 *  Update: 2021.01.21
 *  Last Coding: Wilson, 2021.01.28
 *  
 *  use plugin : 
 *  jquery-3.4.1.js, jquery-easy.js
 */

;
(function($) {


    "use strict";

    fesdDB.ver.library.anchor4 = {};
    fesdDB.ver.library.anchor4.ver = '2.2';
    fesdDB.ver.library.anchor4.update = '2021.01.28';

    var $a = {};

    var $scrollContainer;

    var $scrollTarget;

    var scrollContainer;

    var scrollTarget;

    var scrollType;

    var marginTop;

    var marginObj;

    var marginObjHeight;

    var speed;

    var easing;

    var finalScroll;

    var scrollTargetOffset;

    var scrollContainerOffset;

    var scrollContainerScrollTop;

    var callback;


    // 從fesdDB 取預設參數與設定
    $.extend({

        anchor4: function(options) {

            $a = $.extend({
                selector: '',
                target: '',
                marginTop: '',
                container: '',
                callback: null
            }, fesdDB.anchor4.setting, options);

            return init()

        }
    });


    //判斷 isSelector 物件是否存在
    var isSelector = function() {
        return $a.selector === '' || typeof $a.selector === 'undefined' ? false : true
    };

    //判斷 Container 物件是否存在
    var isContainer = function() {
        return scrollContainer === 'body' || scrollContainer === '' || typeof scrollContainer === 'undefined' ? false : true
    };

    //判斷 Target 物件是 “不” 否存在
    var isTarget = function() {
        return scrollTarget === '' || typeof scrollTarget === 'undefined' ? false : true
    };

    //判斷影片物件是否擁有 video-open-type
    var isActive = function(selector) {
        return $(selector).attr('data-anchor4-active') === 'on' ? true : false
    };

    //isMarginObj
    var isMarginObj = function(marginObj) {

        var obj = $(marginObj);
        return obj !== '' && typeof obj !== 'undefined' && obj.length >= 1 ? obj.innerHeight() : 0

    }

    //這定物件啟動
    var setActive = function(selector) {
        $(selector).attr('data-anchor4-active', 'on');
        return true
    };

    var setFesdDBActive = function() {
        return fesdDB.active.anchor4 = $('[data-anchor4-active]').length + ' objects';

    };

    //取得 Target 物件
    var getScrollTarget = function() {
        $scrollTarget = $(scrollTarget);
    };

    //取得 Body 錨點移動最終距離
    var getBodyFinalScrollTop = function() {
        scrollTargetOffset = Math.floor($scrollTarget.offset().top);
        finalScroll = Math.floor(scrollTargetOffset - marginTop);

        // console.log('///////////////////////////////////////////////////////////')
        // console.log('scrollTargetOffset > ' + scrollTargetOffset)
        // console.log('scrollContainerOffset > ' + scrollContainerOffset)
        // console.log('scrollContainerScrollTop > ' + scrollContainerScrollTop)
        // console.log('finalScroll > ' + finalScroll)

    };

    //取得容器錨點移動最終距離
    var getContainerFinalScrollTop = function() {

        scrollTargetOffset = Math.floor($scrollTarget.offset().top);
        scrollContainerOffset = Math.floor($scrollContainer.offset().top);
        scrollContainerScrollTop = Math.floor($scrollContainer.scrollTop());
        finalScroll = Math.floor(scrollTargetOffset - scrollContainerOffset + scrollContainerScrollTop - marginTop);

        // console.log('///////////////////////////////////////////////////////////')
        // console.log('scrollTargetOffset > ' + scrollTargetOffset)
        // console.log('scrollContainerOffset > ' + scrollContainerOffset)
        // console.log('scrollContainerScrollTop > ' + scrollContainerScrollTop)
        // console.log('finalScroll > ' + finalScroll)
    };

    //紀錄 $a 資料, 回傳 FesdDB.video4.e 事件紀錄
    var saveFesdDBEvent = function() {

        $a.$container = $scrollContainer;
        $a.$target = $scrollTarget;
        $a.container = scrollContainer;
        $a.target = scrollTarget;
        $a.marginObj = marginObj;
        $a.marginObjHeight = marginObjHeight;
        $a.marginTop = marginTop;
        $a.speed = speed;
        $a.easing = easing;
        $a.targetOffset = scrollTargetOffset;
        $a.containerScrollTop = scrollContainerScrollTop;
        $a.containerOffsetTop = scrollContainerOffset;
        $a.finalScroll = finalScroll;
        $a.callback = callback;

        return fesdDB.anchor4.e = $a;

    };


    var getClickScrollData = function() {

        var $this = $($a.selector);

        scrollContainer = $this.attr('data-anchor-container');
        scrollTarget = $this.attr('data-anchor-target');
        scrollType = $this.attr('data-anchor-scroll-type') || $a.scrollType;
        marginObj = $this.attr('data-anchor-marginobj');
        marginObjHeight = isMarginObj(marginObj);
        marginTop = parseInt($this.attr('data-anchor-margintop')) || $a.marginTop;
        speed = parseInt($this.attr('data-anchor-speed')) || $a.speed;
        easing = $this.attr('data-anchor-easing') || $a.easing;
        callback = $this.attr('data-anchor-callback') || $a.callback;

        if (marginObjHeight !== '' || typeof marginObjHeight !== 'undefined') {
            marginTop = marginTop + marginObjHeight || marginTop + marginObjHeight;
        }

        $a.$click = $($a.selector);
        $a.clickData = $($a.selector).data();
        $a.scrollType = scrollType;
        $a.anchorFunctionType = 'onClick';
        $a.functionData = '';

    };

    var getFunctionScrollData = function() {

        scrollContainer = $a.container;
        scrollTarget = $a.target;
        marginTop = $a.marginTop;
        marginObj = $a.anchorMarginobj;
        marginObjHeight = isMarginObj(marginObj);
        speed = $a.speed;
        easing = $a.easing;
        callback = $a.callback;

        if (marginObjHeight !== '' || typeof marginObjHeight !== 'undefined') {
            marginTop = marginTop + marginObjHeight;
        }

        $a.$click = '';
        $a.clickData = '';
        $a.anchorFunctionType = 'callFunction';
        $a.functionData = $a;
    };

    function setClickEvent(selector, options) {

        $(selector).off().on('click', function(e) {

            var options = options || {};
            options.selector = this;

            $.anchor4(options);

        });

    }


    function doBodyScroll(loop) {

        if (loop !== 'loop') {

            $scrollContainer = $('html, body')
            getScrollTarget();

        }
        isTarget() ? getBodyFinalScrollTop() : finalScroll = 0
    };


    function doContainerScroll(loop) {

        if (loop !== 'loop') {

            $scrollContainer = $(scrollContainer);
            getScrollTarget();

        }

        isTarget() ? getContainerFinalScrollTop() : finalScroll = 0;

    };


    // anchor4 主程式
    function doAnchor4($scrollContainer, endScroll, speed, easing, callback) {

        $scrollContainer.animate({ scrollTop: endScroll }, {
            duration: speed,
            easing: easing,
            step: function(now, fx) {
                // console.log('coco')

                if ($scrollContainer.attr('data-blazy4-active') === 'on' || $scrollContainer.find('.b-lazy').length >= 1) {

                    var newOffset = finalScroll;

                    if (fx.end !== newOffset) { fx.end = newOffset }
                    isContainer() ? doContainerScroll('loop') : doBodyScroll('loop');

                    // console.log('finalScroll :' + finalScroll)
                    // console.log('newOffset :' + newOffset)
                    // console.log('scroll blazy4')

                }

            }
        }).promise().then(function() {
            // Animation complete

            if (callback !== null && typeof callback === 'function') return callback();

            // if (callback === '' || typeof callback === 'undefined') {
            //     // console.log('x no anchor4 callback');

            // } else if (typeof eval(callback + '($a)') === 'function') {
            //     return eval(callback + '($a)');
            // };
        });

    }; //end function

    function init() {

        // selector 為空值，優先使用 getFunctionScrollData()
        isSelector() ? getClickScrollData() : getFunctionScrollData();

        //container 為空值，優先使用 bodyScroll()
        isContainer() ? doContainerScroll() : doBodyScroll();

        //紀錄 fesdDB.anchor4.e 事件
        saveFesdDBEvent();

        //呼叫主程式
        doAnchor4($scrollContainer, finalScroll, speed, easing, callback);

    };


    $.fn.anchor4 = function(options) {

        return this.each(function() {

            if (!isActive(this) && setActive(this)) {

                setFesdDBActive(this)
                setClickEvent(this, options);

            }

        }); //end return
    };


})(jQuery)