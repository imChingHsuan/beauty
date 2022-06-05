/**
 * AOST4 2.5
 * @version: 2.5
 * @author: Eric Chen
 * Released on: 2021.01.22
 * Last Coding: Wilson, 2021.11.30
 * 
 * use plugin:
 * jquery-3.4.1.js
 */

;
(function($) {
  'use strict';

  fesdDB.ver.library.aost4 = {};
  fesdDB.ver.library.aost4.ver = '2.5';
  fesdDB.ver.library.aost4.update = '2021.11.30';

  const defaults = fesdDB.aost4;
  const unique_code = Math.random().toString(36).substring(7);

  // get initial viewport status
  function get_view_height(scroller) {
    return $(scroller).innerHeight();
  }

  function get_view_top(scroller) {
    return $(scroller).scrollTop();
  }

  function get_view_bot(scroller) {
    return $(scroller).scrollTop() + $(scroller).innerHeight();
  }

  function get_view_offset(scroller) {
    return scroller === window ? 0 : $(scroller).offset().top;
  }

  function transform_offset(options, el) {
    const target = el;
    const breakpoints = options.breakpoints
    let offset = Number(options.offset);

    Object.keys(breakpoints).every(function(obj) {
      if ($(window).innerWidth() > obj) return true
      else {
        offset = target.attr(breakpoints[obj]) ? Number(target.attr(breakpoints[obj])) : Number(options.offset)
        return false
      }
    })
    return get_view_height(options.scroller) / 100 * offset;
  }

  // detect targets(container) in which status
  function is_inview(el, options) {
    const target = el;
    const targetHeight = target.innerHeight();
    const targetTop = options.scroller === window ? target.offset().top : target.offset().top + get_view_top(options.scroller) - get_view_offset(options.scroller);
    const targetBot = targetTop + targetHeight;
    if (get_view_bot(options.scroller) > (targetTop + transform_offset(options, el)) && get_view_top(options.scroller) <= targetBot && target.is(':visible')) return true
    else return false
  }

  class onscroll {
    constructor(el) {
      const scope = this;
      const setting = {}

      scope.item = $(el);

      if (scope.item.parents('[data-aost-scroller]')) setting.scroller = scope.item.parents('[data-aost-scroller]')[0];
      if (scope.item.attr('data-aost-offset')) setting.offset = scope.item.attr('data-aost-offset');
      if (scope.item.attr('data-aost-class')) setting.class = scope.item.attr('data-aost-class');
      if (scope.item.attr('data-aost-repeat') && scope.item.attr('data-aost-repeat') == 'true') setting.repeat = true;
      if (scope.item.attr('data-aost-delay')) setting.delay = parseInt(scope.item.attr('data-aost-delay'))

      scope.options = $.extend({}, defaults, setting);
      scope.unique_code = unique_code;
      scope.init();
    }
    init() {
      const scope = this;

      // wait for page to be fully loaded
      const pageLoaded = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(pageLoaded);
          scope.render();
        }
      }, 10);
    }
    render() {
      const scope = this;

      // init mark
      scope.item.attr('data-aost-active', '');

      // hasScrolled
      if (fesdDB.aost4.hasScrolled) {
        const elBot = scope.item[0].getBoundingClientRect().bottom
        if (elBot < 0) scope.item.addClass(scope.options.class)
      }

      // page loaded
      if (is_inview(scope.item, scope.options)) {
        const delay = scope.options.delay
        if (!delay) scope.item.addClass(scope.options.class);
        else setTimeout(() => { scope.item.addClass(scope.options.class) }, delay);
      }

      scope.init_scroll();
      scope.init_resize();
    }
    init_scroll() {
      const scope = this;

      // on scroll
      $(scope.options.scroller).on(`scroll.${scope.unique_code}`, function() {
        const status = is_inview(scope.item, scope.options);
        if (status) {
          const delay = scope.options.delay
          if (!delay) scope.item.addClass(scope.options.class);
          else setTimeout(() => { scope.item.addClass(scope.options.class) }, delay);
        }
        else {
          if (scope.options.repeat) {
            scope.item.removeClass(scope.options.class);
          }
        }
      });
    }
    init_resize() {
      const scope = this;

      // on resize
      $(window).on(`resize.${scope.unique_code}`, function() {
        const w = window.innerWidth;
      });
    }
  }

  $.fn.aost4 = function() {
    const vm = this;

    // set active number to fesdDB
    fesdDB.active.aost4 = `${$(vm).length} objects`

    for (let i = 0; i < $(vm).length; i++) {
      if ($($(vm)[i]).attr('data-aost-active')) return
      let aost = new onscroll($(vm)[i]);
    }
  }

  $.fn.aost4Destroy = function() {
    $(window).off(`scroll.${unique_code}`);
    $(window).off(`resize.${unique_code}`);
  }

})(jQuery);
