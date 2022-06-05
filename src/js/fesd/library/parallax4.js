/**
 * Parallax4 3.0
 * @version: 3.0
 * @author: Wilson Wu
 * Released on: 2021.01.19
 * Last Coding: Wilson, 2021.02.05
 * 
 * use plugin:
 * jquery-3.4.1.js
 */

;
(function(factory) {
  'use strict';
  // execute
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals. Register Parallax4 on window
    factory(jQuery);
  }
})(function($) {
  'use strict';

  fesdDB.ver.library.parallax4 = {};
  fesdDB.ver.library.parallax4.ver = '3.0';
  fesdDB.ver.library.parallax4.update = '2021.02.05';

  // set default options
  const defaults = fesdDB.parallax4;

  // get initial viewport status
  function getViewHeight(options) {
    return $(options.scroller).innerHeight();
  }

  function getViewTop(options) {
    return $(options.scroller).scrollTop();
  }

  function getViewBot(options) {
    return $(options.scroller).scrollTop() + $(options.scroller).innerHeight();
  }

  function getViewOffset(options) {
    return options.scroller === window ? 0 : $(options.scroller).offset().top;
  }

  // private functions
  // add class and style
  function addStyle(el, options) {
    const container = options.container === '' ? el.parent() : options.container,
          visible = options.containerVisible,
          elHeight = options.height;
    container.css('position', 'relative'); // container
    if (!visible) container.css('overflow', 'hidden'); // container
    if (elHeight !== 120) el.css({'height': `${elHeight}%`, 'top': `${(100 - elHeight) * 2}%`}); // el
  }

  // detect targets(container) in which status
  function isInView(el, options) {
    const target = options.container === '' ? el.parent() : options.container,
          targetHeight = target.innerHeight(),
          targetTop = options.scroller === window ? target.offset().top : target.offset().top + getViewTop(options) - getViewOffset(options, options),
          targetBot = targetTop + targetHeight;
    if (getViewBot(options) <= targetTop) return 'outOfView';
    else if (getViewBot(options) > targetTop && getViewBot(options) <= targetBot) return 'enterView';
    else if (getViewBot(options) > targetBot && getViewTop(options) <= targetBot) return 'onView';
    else return 'leaveView';
  }

  // translate els when scrolling
  function translate(el, options) {
    const target = options.container === '' ? el.parent() : options.container,
          targetHeight = target.innerHeight(),
          targetTop = options.scroller === window ? target.offset().top : target.offset().top + getViewTop(options) - getViewOffset(options),
          targetBot = targetTop + targetHeight,
          elHeight = el.innerHeight(),
          settingHeight = options.height,
          viewDiff = getViewBot(options) - targetTop,
          viewDist = getViewBot(options) - targetBot,
          elDiff = elHeight - targetHeight,
          elDist = ((settingHeight - 100) / 100) * targetHeight,
          proportion = getViewHeight(options) / targetHeight,
          fixPara = (targetHeight - (getViewHeight(options) / 2)) / getViewHeight(options) + 1, //correction parameter
          enterArg = (viewDiff * elDiff) / getViewHeight(options), // enterView formula
          onArg = targetHeight < (getViewHeight(options) / 2) ? (viewDist * elDiff) / (getViewHeight(options) - targetHeight) : (viewDist * elDiff) / (getViewHeight(options) - (targetHeight / fixPara)); //onView formula
    if (isInView(el, options) === 'enterView') el.css({'transform': `translateY(${enterArg * proportion}px)`});
    else if (isInView(el, options) === 'onView') el.css({'transform': `translateY(${elDist + onArg}px)`});
    else return;
  }

  // set unique event
  function getEventType(type, code) {
    return `${type}.${code}`
  }


  // Parallax4 prototype
  class Parallax4 {
    constructor(el) {
      // define settings
      const scope = this,
            settings = {};

      // set properties
      scope.el = $(el);

      if (scope.el.closest('[data-parallax-scroller]').length) settings.scroller = scope.el.closest('[data-parallax-scroller]');
      if (scope.el.closest('[data-parallax-container]').length) settings.container = scope.el.closest('[data-parallax-container]');
      if (scope.el.attr('data-parallax-visible') === 'true') settings.containerVisible = true;
      if (scope.el.attr('data-parallax-height') && parseInt(scope.el.attr('data-parallax-height'))>=110 && parseInt(scope.el.attr('data-parallax-height'))<=130) settings.height = parseInt(scope.el.attr('data-parallax-height'));
      
      scope.options = $.extend({}, defaults, settings);
      scope.uniqueCode = Math.random().toString(36).substring(7);

      // init
      scope.init();
    }

    init() {
      const scope = this;

      // init data
      scope.el.attr('data-parallax-active', '');

      // page loaded
      addStyle(scope.el, scope.options);
      translate(scope.el, scope.options);

      // on scroll
      $(scope.options.scroller).on(getEventType('scroll', scope.uniqueCode), function() {
        translate(scope.el, scope.options);
      });
    }

  }


  $.fn.parallax4 = function() {
    const vm = this;

    // set active number to fesdDB
    fesdDB.active.parallax4 = `${$(vm).length} objects`

    for (let i = 0; i < $(vm).length; i++) {
      if ($($(vm)[i]).attr('data-parallax-active')) return;
      let newParallax = new Parallax4($(vm)[i]);
    }
  };

});
