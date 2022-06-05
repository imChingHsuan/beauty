import { ajaxCallback } from './../../includes/_ajaxFunction'
    
/**
 *  WDD Front-End Ajax JQ Plugin
 *  @version: 1.2.0
 *  @author: Wade
 *  Update: 2021.02.02
 *  Last Coding: Eric, 2021.02.02
 *  
 *  use plugin : 
 *  jquery-3.4.1.js, jquery-easy.js
 */

;
(function($,ajaxCallback) {

    //  從按鈕觸發載入ajax
    //  ex: $('').ajax4()
    //
    //  <a href="javascript:;" 
    //  data-ajax-route="載入路徑" 
    //  data-ajax-container="容器，請填寫 CLASS 名稱，ex: .className"
    //  data-ajax-block="容器外層的區塊，預設為body，字串不需要$()，可使用.#[]各種DON方式輸入" 
    //  data-ajax-backready="ajax執行前呼叫後端程式呼叫，字串不需()，可留空" 
    //  data-ajax-backloaded="ajax完成後後呼叫後端程式呼叫，字串不需()，可留空“
    //  data-ajax-callback="ajax完成後的程市呼叫，字串不需()，可留空" 
    //  data-ajax>ajax article</a>
    //


    //  直接呼叫函式載入ajax
    //  ex :  $.ajax4({
    //        Route: '載入路徑'
    //        Container: '容器，請填寫 CLASS 名稱，字串不需要$()，ex: .className',
    //        Block: '容器外層的區塊，預設為body，字串不需要$()，可使用.#[]各種DON方式輸入
    //        Callback: 'ajax執行前呼叫後端程式呼叫，字串不需()，可留空'
    //        Backready: 'ajax完成後後呼叫後端程式呼叫，字串不需()，可留空'
    //        Backloaded: 'ajax完成後的程式呼叫，字串不需()，可留空'
    //        });


    "use strict";

    fesdDB.ver.library.ajax4 = {};
    fesdDB.ver.library.ajax4.ver = '1.1.2';
    fesdDB.ver.library.ajax4.update = '2020.03.26';

    /**
     * Set route data by preparing params & expression.
     * @param {object} $ajax
     * @param {object} $a
     */

    var $ajax = {},
        $a = {};


    /**
     * get ajax click object data
     * @param {object} $thisClick
     */

    function getAjaxData($thisClick) {

        //按下按鈕之後擷取要載入的ajax資訊
        var ajaxClickObj = $thisClick;

        //擷取載入容器中的物件
        $a.ClickObj = ajaxClickObj;
        $a.Data = ajaxClickObj.data();
        $a.Container = $a.Data.ajaxContainer;
        $a.Block = $a.Data.ajaxBlock;
        $a.Route = $a.Data.ajaxRoute;

        $a.Callback = $a.Data.ajaxCallback;
        $a.Backready = $a.Data.ajaxBackready;
        $a.Backloaded = $a.Data.ajaxBackloaded;

        //將 click 蒐集的值回存到全域 ajax $ajaxController 資訊容器
        $ajax = $a;

        if (typeof $ajax.Backready !== 'undefined' && $ajax.Backready !== '') {

            return eval($ajax.Backready + '($ajax)');
            // console.log('ajax Backready');

        } else {
            return $.ajax4($ajax);
        }
    };



    /**
     * check ajax container
     * @param {object} $ajax
     */
    function getAjaxContainer($ajax) {
        let $ajaxBlock = typeof $ajax.Block == 'undefined' || $ajax.Block == '' ? 'body' : $ajax.Block,
            ajaxContainerClass = typeof $ajax.Container !== 'undefined' && $ajax.Container !== '' ? $ajax.Container.replace('.', '') : undefined

        function creatContainer() {
            $($ajaxBlock).append('<div class="' + ajaxContainerClass + '"></div>');
        }

        if ($($ajaxBlock).length) {
            // if (!$($ajaxBlock).find($ajax.Container).length) {
            //     creatContainer();
            // } else if ($($ajaxBlock).find($ajax.Container).length) {
            //     $($ajaxBlock).find($ajax.Container).remove();
            //     creatContainer();
            // }
            if ($($ajaxBlock).find($ajax.Container).length) {
                $($ajaxBlock).find($ajax.Container).remove();
                creatContainer();
            }
            else {
                creatContainer();
            }
            return true
        } else {
            return false
        }
    };

    /**
     * ajax done callback
     * @param {object} $ajax
     */
    function doneCallback($ajax) {
        typeof $ajax.Backloaded !== 'undefined' && $ajax.Backloaded !== '' ? eval($ajax.Backloaded + '($ajax)') : undefined;
        typeof $ajax.Callback !== 'undefined' && $ajax.Callback !== '' ? ajaxCallback[$ajax.Callback]($ajax) : undefined;
    }

    $.extend({
        ajax4: function($ajax) {

            $.ajax({
                url: $ajax.Route,
                data: "{}",
                timeout: function() { console.log('ajax > timeout'); },
                parsererror: function() { console.log('ajax > parsererror'); },
                notmodified: function() { console.log('ajax > notmodified'); },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log('ajax > error');
                    console.log('ajax > error > ' + $ajax.Route + ' : ' + XMLHttpRequest.status);
                    console.log('ajax > error > XMLHttpRequest ReadyState : ' + XMLHttpRequest.readyState);
                    console.log('ajax > error > textStatus : ' + textStatus);

                },
                success: function(data) {
                    getAjaxContainer($ajax) ? $($ajax.Container).html(data) : $($ajax.Block).html(data);
                    // getAjaxContainer($ajax) ? $($ajax.Container).html(data) : undefined;
                    // console.log('ajax > success');

                },
                complete: function() {
                    // console.log('ajax > complete');

                }

            }).done(function() {

                fesdDB.ajax4.e = $ajax;

                doneCallback($ajax);
                // console.log('ajax > done');
            })
        }
    });


    $.fn.ajax4 = function() {

        // console.log('o ajax4 : active ' + this.length + ' objects')

        fesdDB.active.ajax4 = this.length + ' objects';

        return this.each(function() {

            if ($(this).attr('data-ajax4-active') !== 'on') {

                $(this).off().on('click', function() {
                    return getAjaxData($(this));
                })

                $(this).attr('data-ajax4-active', 'on');
            }
        });
    };

})(jQuery,ajaxCallback)