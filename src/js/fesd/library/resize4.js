/**
 *  WDD FESD resize4
 *  @version: 1.0
 *  @author: Wade
 *  Update: 2020.04.04
 *  Last Coding: kevin, 2020.04.04
 */

;
(function($, Global) {


    "use strict";

    fesdDB.ver.library.resize4 = {};
    fesdDB.ver.library.resize4.ver = '1.0';
    fesdDB.ver.library.resize4.update = '2020.04.06';

    var $r;

    // 從fesdDB 取預設參數與設定
    $.extend({

        resize4: function(options) {

            $r = $.extend({
                selector: '',
                time: 500,
                callback: ''
            }, options);

            return init()

        }
    });

    var getSelector = function() {
        $r.$selector = $($r.selector);
        return true
    }

    //判斷影片物件是否沒有 data-video4-active=on
    var isActive = function() {
        return $r.$selector.attr('data-resize4-active') === 'on' ? true : false
    };

    //這定物件啟動
    var setActive = function() {
        $($r.selector).attr('data-resize4-active', 'on');
        return true
    };

    //回傳feadDB video4 active 數量
    var setFesdDBActive = function() {
        fesdDB.active.resize4 =
            $('[data-resize4-active="on"]').length + ' objects'
        return true
    };

    //儲存 fesdDB.video4.e 紀錄
    var saveFesdDBEvent = function() {
        fesdDB.resize4 = {};
        fesdDB.resize4.e = $r;
    }


    var resize = function() {

        $r.$selector.on('resize', function() {

            var selector = this;
            var $selector = $(this);

            if ($selector.data('resizeTimeout')) { clearTimeout($selector.data('resizeTimeout')); }
            $selector.data('resizeTimeout', setTimeout(function() {

                $r.selector = selector;
                $r.$selector = $selector;
                $r.resizeTimeout = $selector.data('resizeTimeout')
                $r.width = $selector.width();
                $r.Height = $selector.height();
                $r.time = $r.time;
                $r.callback = $r.callback;

                saveFesdDBEvent();
                eval($r.callback + '($r)')

            }, $r.time));

        });
    }


    var init = function() {
        if (getSelector() && !isActive() && setActive() && setFesdDBActive()) { resize(); }
    }


    $.fn.resize4 = function(callback, time) {

        return this.each(function() {

            $.resize4({ selector: this, time: time, callback: callback });

        })


    };

})(jQuery, window);