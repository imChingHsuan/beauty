/**
 *  WDD FESD scroll4
 *  @version: 1.0
 *  @author: Wade
 *  Update: 2020.04.04
 *  Last Coding: kevin, 2020.04.04
 */

;
(function($, Global) {


    "use strict";

    fesdDB.ver.library.scroll4 = {};
    fesdDB.ver.library.scroll4.ver = '1.0';
    fesdDB.ver.library.scroll4.update = '2020.04.06';

    var $r;

    // 從fesdDB 取預設參數與設定
    $.extend({

        scroll4: function(options) {

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
        return $r.$selector.attr('data-scroll4-active') === 'on' ? true : false
    };

    //這定物件啟動
    var setActive = function() {
        $($r.selector).attr('data-scroll4-active', 'on');
        return true
    };

    //回傳feadDB video4 active 數量
    var setFesdDBActive = function() {
        fesdDB.active.scroll4 =
            $('[data-scroll4-active="on"]').length + ' objects'
        return true
    };

    //儲存 fesdDB.video4.e 紀錄
    var saveFesdDBEvent = function() {
        fesdDB.scroll4.e = $r;
    }


    var scroll = function() {

        $r.$selector.on('scroll', function() {

            var selector = this;
            var $selector = $(this);

            if ($selector.data('scrollTimeout')) { clearTimeout($selector.data('scrollTimeout')); }
            $selector.data('scrollTimeout', setTimeout(function() {

                $r.selector = selector;
                $r.$selector = $selector;
                $r.scrollTimeout = $selector.data('scrollTimeout')
                $r.scrollTop = $selector.scrollTop();
                $r.time = $r.time;
                $r.callback = $r.callback;

                saveFesdDBEvent();
                var callback = eval($r.callback);
                callback($r);


            }, $r.time));

        });
    }


    var init = function() {
        if (getSelector() && !isActive() && setActive() && setFesdDBActive()) { scroll(); }
    }


    $.fn.scroll4 = function(callback, time) {

        return this.each(function() {

            $.scroll4({ selector: this, time: time, callback: callback });

        })


    };

})(jQuery, window);