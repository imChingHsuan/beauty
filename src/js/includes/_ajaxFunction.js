//卷軸
import 'overlayscrollbars';

export const ajax = {
  //打開Ajax
  openAjax(route, container, callback) {
    $.ajax4({
      Route: route,
      Container: container,
      Block: '',
      Callback: callback,
      Backready: '',
      Backloaded: '',
    });
  },
  //關閉Ajax
  closeAjax(container) {
    $(container).removeClass('show');
    _g.scrollUnlock([`${container} .os-viewport`]);
    $(container).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
      //ajax關掉之後要做的事寫在這
      //....
      $(container).remove();
      $(container).off('transitionend webkitTransitionEnd oTransitionEnd');
    });
  },
  //ajax共用
  ajaxCommon(data) {
    const container = data.Container;
    const scrollWrap = $(`${container} .modal-scroll-wrap`);
    $(container).addClass('ajax_close').delay4({ time: '100', add: 'show' });
    if (scrollWrap) {
      $(scrollWrap).overlayScrollbars({});
    }
    $(container)
      .find('.modal-dialog')
      .on('click', function (e) {
        e.stopPropagation();
      });
    $('.ajax_close').on('click', function (e) {
      e.stopPropagation();
      ajax.closeAjax(container);
    });
    _g.scrollLock([`${container} .os-viewport`]);
  },
};

export const ajaxCallback = {
  //一般訊息燈箱
  normalLightbox(data) {
    ajax.ajaxCommon(data);
    $('.video-box').video4();
  },
};
