function debug4(bugEvent) {

    /*
     *  WDD FESD debug4
     *  version: 1.0
     *  Update: 2020.03.06
     *  Last Coding: Kevin, 2020.03.06
     *
     *  use plugin : 
     *  jquery-3.4.1.js, jquery-easy.js, swiper.js
     * 
     */

    //debug4
    //
    // 使用說明
    //

    switch (bugEvent) {
        //簡易版
        case 'appleBack':
            appleBack();
            break;

        case 'otherEvent':
            other();
            break;

        default:
            appleBack();
            otherEvent();
            console.log('debug4:' + all);

    };

    //蘋果回上頁debug
    function appleBack() {
        window.onpageshow = function(event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
        console.log('debug4:' + bugEvent);
    };

    //其他debug程式
    function otherEvent() {};

}