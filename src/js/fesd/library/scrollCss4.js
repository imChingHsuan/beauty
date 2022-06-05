/**
 *  WDD FESD scrollCss4
 *  @version: 1.0
 *  @author: Wade
 *  Update: 2020.03.18
 *  Last Coding: Wade, 2020.03.18
 *  
 *  use plugin : 
 *  jquery-3.4.1.js, jquery-easy.js
 */

;
(function($) {


    //scrollFixed4
    //
    //  if use JQuery scrollbar()
    //
    //  <div class="scrollbody" data-scrollBody>
    //    <div class="contentCover">
    //      <nav class="fixednav">
    //      </nav>
    //    </div>
    //  </div>
    //
    //
    //  $('fixednav').scrollFixed4({ 
    //    scrollObj: 'scrollObj DOM',
    //    scrollObjCover: 'Scroll Content Cover DOM',
    //    upClass: 'scroll up Class',
    //    downClass: 'scroll down Class',
    //    topClass: 'go top Class',
    //    bottomClass: 'go bottom Class',
    //    marginTop: go top delay time,
    //    marginBottom: go bottom delay time
    //  });
    //

    "use strict";

    fesdDB.ver.library.scrollCss4 = {};
    fesdDB.ver.library.scrollCss4.ver = '1.0';
    fesdDB.ver.library.scrollCss4.update = '2020.03.18';

    var activeLen = 0;

    $.fn.scrollCss4 = function(options) {

        activeLen += this.length;
        fesdDB.active.scrollCss4 = activeLen + ' objects'

        var $fixedObj = $(this),
            settings = $.extend({
                scrollObj: '[data-scrollBody]',
                scrollObjCover: '.contentCover',
                upClass: 'upClass',
                downClass: 'downClass',
                topClass: 'topClass',
                bottomClass: 'bottomClass',
                marginTop: 500,
                marginBottom: 300
            }, options);


        return this.each(function() {

            if ($(this).attr('data-scrollCss4-active') !== 'on') {

                var $scrollObj = $(settings.scrollObj),
                    $scrollObjCover = $scrollObj.find(settings.scrollObjCover),
                    margintop = parseInt(settings.margintop),
                    scrollAfter = 0;


                $scrollObj.on('scroll', function(e) {

                    var $scrollObj = $(this),
                        scrollObj_scrollTop = $scrollObj.scrollTop(),
                        scrollObj_Height = $scrollObj.height(),
                        scrollObjCover_Height = $scrollObjCover.height();

                    // console.log('scrollObj_Height:' + scrollObj_Height)
                    // console.log('scrollObj_scrollTop: ' + scrollObj_scrollTop)

                    //視窗到頂部
                    scrollObj_scrollTop - parseInt(settings.marginTop) <= 0 ? $fixedObj.addClass(settings.topClass) : $fixedObj.removeClass(settings.topClass); /* // console.log("Stop Up"); */
                    //視窗到底部
                    scrollObjCover_Height - scrollObj_scrollTop - parseInt(settings.marginBottom) <= scrollObj_Height ? $fixedObj.addClass(settings.bottomClass) : $fixedObj.removeClass(settings.bottomClass);
                    //視窗往上滾
                    scrollAfter > scrollObj_scrollTop ? $fixedObj.addClass(settings.upClass) : $fixedObj.removeClass(settings.upClass);
                    //視窗往下滾
                    scrollAfter < scrollObj_scrollTop ? $fixedObj.addClass(settings.downClass) : $fixedObj.removeClass(settings.downClass);

                    setTimeout(function() { scrollAfter = scrollObj_scrollTop }, 0)
                });

                $(this).attr('data-scrollCss4-active', 'on');

            }

        }); //end return
    };

})(jQuery)