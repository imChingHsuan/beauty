/**
 *  WDD FESD delay4
 *  @version: 1.0.1
 *  @author: Wade
 *  Update: 2021.01.21
 *  Last Coding: Wilson, 2021.01.21
 *  
 *  use plugin : 
 *  jquery-3.4.1.js, jquery-easy.js
 */

;
(function($) {


    //delay4
    //
    //  $('').delay4({ time: '5000'}, callback) > setTimeout(callback, time);
    //  $('').delay4({ time: '5000', add: 'class name' })
    //  $('').delay4({ time: '5000', remove: 'class name' })
    //  $('').delay4({ time: '5000', remove: 'class name' } ,callback)
    //

    "use strict";

    fesdDB.ver.library.delay4 = {};
    fesdDB.ver.library.delay4.ver = '1.0.1';
    fesdDB.ver.library.delay4.update = '2020.03.18';

    /**
     * Set route data by preparing params & expression.
     * @param {object} $a
     */

    var activeLen = 0;


    $.fn.delay4 = function(options, callback) {

        activeLen += this.length;
        fesdDB.active.delay4 = activeLen + ' objects';

        //load fesdDB delay4 Setting
        var $a = $.extend({}, fesdDB.delay4.setting, options);

        return this.each(function() {

            var $this = $(this);

            //addClass
            $a.add !== '' ? setTimeout(function() {
                $this.addClass($a.add);
                typeof callback === 'function' ? callback() : undefined
            }, parseInt($a.time)) : undefined

            //removeClass  
            $a.remove !== '' ? setTimeout(function() {
                $this.removeClass($a.remove);
                typeof callback === 'function' ? callback() : undefined
            }, parseInt($a.time)) : undefined

            //callbacks
            $a.remove == '' && $a.add == '' ? setTimeout(function() {
                typeof callback === 'function' ? callback() : undefined
            }, parseInt($a.time)) : undefined


        }); //end return
    };

})(jQuery)