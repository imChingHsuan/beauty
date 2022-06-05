/**
 * Sticky4 1.2
 * @version: 1.2
 * @author: Eric Chen
 * Released on: 2021.01.22
 * Last Coding: Eric, 2021.01.25
 * 
 * use plugin:
 * jquery-3.4.1.js
 */

;
(function($) {
  'use strict';

  fesdDB.ver.library.sticky4 = {};
  fesdDB.ver.library.sticky4.ver = '1.2';
  fesdDB.ver.library.sticky4.update = '2021.01.25';

  // if is position: absolute or fixed will return true
  function position_type(target) {
    if (target.css('position') === 'absolute' || target.css('position') === 'fixed') return true
    return false
  }

  function get_container_h(container) {
    const length = container.parents('[data-sticky-container]').length;
    let ct = 0;

    if (position_type(container)) {
      ct = container.position().top;
      if (length) {
        for (let i = 0; i < length; i ++) {
          ct = ct + container.parents('[data-sticky-container]')[i].position().top;
        }
      }
    }
    else {
      ct = container.offset().top;
      if (length) {
        for (let i = 0; i < length; i ++) {
          ct = ct + container.parents('[data-sticky-container]')[i].offset().top;
        }
      }
    }
    return ct
  }

  function get_end_h(end, container, item, gap) {
    let e = 0;

    if (end.length) e = (end.position().top + get_container_h(container)) - item.innerHeight() - gap;
    else e = (get_container_h(container) + container.innerHeight()) - item.innerHeight() - gap;
    return e;
  }

  class onscroll {
    constructor(element) {
      const scope = this;

      scope.item = $(element);
      scope.container = scope.item.closest('[data-sticky-container]');
      // scope.offset = container.attr('[data-sticky-offset]') || 0;
      scope.end = scope.container.find('[data-sticky-end]');
      scope.gap = scope.item.attr('data-sticky-top')?Number(scope.item.attr('data-sticky-top')):0;
      scope.scroller = (scope.item.parents('[data-sticky-scroll]').length > 0)?$(scope.item.parents('[data-sticky-scroll]')):$(window);

      scope.options = {};
      scope.options.active = false;
      scope.options.rect = scope.get_clientRects();
      scope.options.wrap = scope.item.attr('data-sticky-wrap')?`<div class="sticky-wrap ${scope.item.attr('data-sticky-wrap')}"></div>`:`<div class="sticky-wrap"></div>`;
      scope.options.position_type = position_type(scope.item);
      scope.options.sticky_top = get_container_h(scope.container);
      scope.options.sticky_end = get_end_h(scope.end, scope.container, scope.item, scope.gap);
      scope.options.break_point = scope.item.attr('data-sticky-for')?Number(scope.item.attr('data-sticky-for')):0;
      scope.options.unique_code = Math.random().toString(36).substring(7);

      scope.init();
    }

    init() {
      // wait for page to be fully loaded
      const pageLoaded = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(pageLoaded);
          this.render();
        }
      }, 10);
    }
    render() {
      const scope = this;

      scope.options.active = true
      scope.wrap_element();
      scope.init_scroll();
      scope.init_resize();
    }
    wrap_element() {
      const scope = this;

      // not absolute or fixed
      if (!scope.options.position_type) {
        scope.item.wrap(scope.options.wrap);
        $('.sticky-wrap').css('flex', '1');
      }
    }
    init_scroll() {
      const scope = this;
      const w = window.innerWidth;
      scope.container.css('position', 'relative');
      if (w <= scope.options.break_point) return
      scope.scroller.on(`scroll.${scope.options.unique_code}`, function() {
        let scroll_top = $(this).scrollTop();
        scope.options.sticky_top = get_container_h(scope.container);
        scope.options.sticky_end = get_end_h(scope.end, scope.container, scope.item, scope.gap);

        if (scope.options.position_type) {
          if (scroll_top >= scope.options.sticky_top - scope.gap) {
            // console.log(scope.options.sticky_top)
            if (scroll_top > scope.options.sticky_end) {
              let top = scope.end.length ? scope.end.position().top - scope.item.innerHeight() : scope.container.innerHeight() - scope.item.innerHeight();
              scope.item.css({'position': 'absolute', 'top': top, 'left': '', 'width': scope.options.rect.width});
              return;
            }
            scope.item.css({'position': 'fixed', 'top': 0 + scope.gap, 'left': scope.options.rect.left, 'width': scope.options.rect.width});
          }
          else if (scroll_top > 0 && scroll_top < scope.options.sticky_top) {
            scope.item.css({'position': 'absolute', 'top': scope.options.rect.top, 'left': '', 'width': scope.options.rect.width});
          }
        }
        else {
          if (scroll_top >= scope.options.sticky_top - scope.gap) {
            if (scroll_top > scope.options.sticky_end) {
              let top = scope.end.length ? scope.end.position().top - scope.item.innerHeight() : scope.container.innerHeight() - scope.item.innerHeight();
              scope.item.css({'position': 'absolute', 'top': top, 'left': '', 'width': scope.options.rect.width});
              return;
            }
            scope.item.css({'position': 'fixed', 'top': 0 + scope.gap, 'left': scope.options.rect.left, 'width': scope.options.rect.width});
          }
          else if (scroll_top > 0 && scroll_top < scope.options.sticky_top - scope.gap) {
            scope.item.css({'position': 'static', 'top': '', 'left': '', 'width': ''});
          }
        }
      });
    }
    destroy_scroll() {
      const scope = this;

      scope.scroller.off(`scroll.${scope.options.unique_code}`)
      scope.item.attr('style', '');
    }
    init_resize() {
      const scope = this;

      $(window).on(`resize.${scope.options.unique_code}`, function() {
        let w = window.innerWidth

        // get rect, sticky_top, sticky_end after resize
        scope.options.rect = scope.get_clientRects();

        if (w <= scope.options.break_point) {
          if (scope.options.active) {
            scope.options.active = false;
            scope.destroy_scroll();
          }
        }
        else {
          if (!scope.options.active) {
            scope.options.active = true;
            scope.init_scroll();
          }
        }
      });
    }
    get_clientRects() {
      const scope = this;

      let rect = {'top': '', 'left': '', 'width': '', 'height': ''};
      scope.item.attr('style', '');

      // rect.top = scope.item.offset().top + scope.container.scrollTop() - scope.container.offset().top;
      rect.top = scope.item.position().top;
      // console.log(scope.item.position().left)
      // console.log(scope.container.offset().left)
      // rect.left = scope.item.position().left + scope.container.offset().left;
      rect.left = scope.item.offset().left;
      rect.width = scope.item.outerWidth();
      rect.height = scope.item.outerHeight();
      return rect
    }
  }

  $.fn.sticky4 = function() {
    const vm = this;

    // set active number to fesdDB
    fesdDB.active.sticky4 = `${$(vm).length} objects`

    for (let i = 0; i < $(vm).length; i++) {
      let sticky = new onscroll($(vm)[i]);
    }
  }

})(jQuery);
