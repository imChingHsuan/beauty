import Swiper from 'swiper/bundle';

(function ($) {
  /*
   *  WDD FESD article4
   *  version: 2.5
   *  Update: 2020.07.29
   *  Last Coding: Wade, 2020.07.29
   *
   *  use plugin :
   *  jquery-3.4.1.js, jquery-easy.js, swiper.js, FESD1.0.js
   *
   */
  ('use strict');
  fesdDB.ver.component.article4 = {};
  fesdDB.ver.component.article4.ver = '2.5';
  fesdDB.ver.component.article4.update = '2020.07.29';
  fesdDB.ver.component.article4.plugin = 'FESD 1.0';

  var $basic_rwd = 900;

  // article4 物件 attr & class 設定
  // take article Data
  var $article = {};

  // mySwiper
  window.mySwiper = [];

  // 從fesdDB 取預設參數與設定
  $.extend({
    article4: function (options) {
      //take option
      var $o = {};
      $o = $.extend(
        {
          video4: {
            youtube: fesdDB.video4.youtube.setting,
            youtubeAPI: fesdDB.article4.video4.youtubeAPI.setting,
            youku: fesdDB.article4.video4.youku.setting,
            videojs: fesdDB.article4.video4.videojs.setting,
            setting: fesdDB.article4.video4.setting,
            // layout: fesdDB.article4.video4.layout
          },
          swiper4: fesdDB.article4.swiper4.setting,
        },
        options
      );

      return articleInit($o);
    },
  });

  // 取得 article4 所有物件及屬性
  var getArticleData = function (el) {
    $article = {};
    $article.this = $(el);

    // 父層元件
    $article.$backgroundWrap = $article.this.find('._backgroundWrap');
    $article.$contentWrap = $article.this.find('._contentWrap');
    $article.$wordCover = $article.this.find('._wordCover');
    $article.$buttonCover = $article.this.find('._buttonCover');
    $article.$imgCover = $article.this.find('._imgCover');
    $article.$cover = $article.this.find('._cover');
    $article.$swiper = $article.this.find('.swiper');
    $article.$swiperButtonCover = $article.this.find('.swiper-button-cover');

    // 子層元件
    $article.$h = $article.this.find('._H');
    $article.$subH = $article.this.find('._subH');
    $article.$p = $article.this.find('._P');
    $article.$button = $article.this.find('._button');
    $article.$photo = $article.this.find('._photo');
    $article.$description = $article.this.find('._description');

    // 父層設定
    $article.typeFullColor = $article.this.attr('typeFull-color');
    $article.typeFullBoxColor = $article.this.attr('typeFull-boxcolor');

    // 子層設定
    $article.hColor = $article.this.attr('h-color');
    $article.subHColor = $article.this.attr('subh-color');
    $article.pColor = $article.this.attr('p-color');
    $article.buttonColor = $article.this.attr('button-color');
    $article.buttonColorHover = $article.this.attr('button-color-hover');
    $article.buttonTextColor = $article.this.attr('button-textcolor');
    $article.descriptionColor = $article.this.attr('description-color');
    $article.videoId = $article.$photo.attr('video-id');

    return true;
  };

  // 回傳 feadDB article4 active 數量
  var setFesdDBActive = function (blockNum, articleNum) {
    fesdDB.active.article4 = blockNum + ' Block objects, ' + articleNum + ' article objects';
  };

  // 儲存 fesdDB.article4.e 紀錄
  var saveFesdDBEvent = function (obj) {
    fesdDB.article4.e = obj;
  };

  // 取得所有物件啟動總數量
  var setFesdDBActiveTotalObjs = function (obj) {
    obj.articles = $('._articleBlock').find('[data-article4-active="on"');
  };

  // 判斷影片物件是否沒有 data-video4-active=on
  var isActive = function (obj) {
    return $(obj).attr('data-article4-active') === 'on' ? true : false;
  };

  // 設定物件啟動
  var setActive = function (obj) {
    return $(obj).attr('data-article4-active', 'on');
  };

  // 判斷為哪一種 article
  var isType = function (classArray) {
    for (var index in classArray) {
      if ($article.this.hasClass(classArray[index])) {
        return true;
      }
    }
  };

  // 判斷物件是否存在
  var isObj = function (obj) {
    return obj === '' || typeof obj === 'undefined' || !obj.length ? false : true;
  };

  // article 共用設定
  var setCommon = function () {
    // article ._H
    $article.$h.css({
      color: $article.hColor,
    });

    // article ._subH
    $article.$subH.css({
      color: $article.subHColor,
    });

    // article ._P
    $article.$p.css({
      color: $article.pColor,
    });

    // imgCover ._description
    $article.$description.css({
      color: $article.descriptionColor,
    });

    // button background-color && text color
    $article.$button.css({
      'background-color': $article.buttonColor,
      color: $article.buttonTextColor,
    });

    // button hover color
    if ($article.buttonColorHover) {
      $article.$button.append('<span></span>');
      $article.$button.find('span').css({
        'background-color': $article.buttonColorHover,
      });
    }

    // typeFull background-color
    $article.$backgroundWrap.css({
      'background-color': $article.typeFullColor,
    });

    // typeFull box background-color
    $article.$contentWrap.css({
      'background-color': $article.typeFullBoxColor,
    });

    // swiper navigation
    if (!$article.this.attr('swiper-arrow') || $article.this.attr('swiper-arrow') !== 'off') {
      $article.$swiperButtonCover.append('<div class="swiper-button-next"></div>');
      $article.$swiperButtonCover.append('<div class="swiper-button-prev"></div>');
    }

    // swiper pagination
    if (!$article.this.attr('swiper-nav') || $article.this.attr('swiper-nav') !== 'off') {
      $article.$swiper.append('<div class="swiper-pagination"></div>');
    }

    return true;
  };

  // 設置 swiper 設定
  var setSwiper = function () {
    // 判斷是否擁有 swiper4 結構
    if (!isObj($article.$swiper)) return;
    var typeF = ['typeF', 'typeFL', 'typeFR', 'typeFBox', 'typeFBoxL', 'typeFBoxR'];
    typeF.forEach(function (el) {
      if ($article.this.hasClass(el)) return;
    });

    // set id
    var $id = Math.random().toString(36).substring(7);
    // set swiper
    var $swiperSet = {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next.swiper-' + $id,
        prevEl: '.swiper-button-prev.swiper-' + $id,
      },
      pagination: {
        el: `.swiper-${$id} .swiper-pagination.swiper-${$id}`,
        clickable: true,
      },
      breakpoints: {},
    };

    $article.this.attr('img-swiper', 'on');
    $article.$swiper.addClass('swiper-' + $id);
    $article.$swiperButtonCover.find('.swiper-button-next').addClass('swiper-' + $id);
    $article.$swiperButtonCover.find('.swiper-button-prev').addClass('swiper-' + $id);
    $article.$swiper.find('.swiper-pagination').addClass('swiper-' + $id);

    // slidesPerView
    if ($article.this.attr('swiper-num') && Number.parseInt($article.this.attr('swiper-num'))) {
      $swiperSet.breakpoints[$basic_rwd] = {
        slidesPerView: $article.this.attr('swiper-num')
          ? Number.parseInt($article.this.attr('swiper-num')) > 5
            ? 5
            : Number.parseInt($article.this.attr('swiper-num'))
          : 1,
        spaceBetween: 0,
      };
    }

    // navigation
    if ($article.this.attr('swiper-arrow') === 'off') {
      $swiperSet.navigation = false;
      $article.this.find('.swiper-button-cover').hide();
    }

    // pagination
    if ($article.this.attr('swiper-nav') === 'off') {
      $swiperSet.pagination = false;
      $article.this.find('.swiper-pagination').hide();
    }

    // autoplay
    if ($article.this.attr('swiper-autoplay') === 'off') {
      $swiperSet.autoplay = false;
    }

    // loop
    if ($article.this.attr('swiper-loop') === 'off') {
      $swiperSet.loop = false;
    }

    // speed
    if ($article.this.attr('swiper-speed')) {
      $swiperSet.speed = parseInt($article.this.attr('swiper-speed'));
    }

    // parallax
    if ($article.this.attr('swiper-parallax') === 'on') {
      $swiperSet.parallax = true;
    }

    // 若 swiper 只有一筆輪播則隱藏 navigation 及 pagination
    var gate = function () {
      if ($(window).innerWidth() > $basic_rwd) {
        var num = 1;
        if (Number($article.this.attr('swiper-num'))) {
          num = Number($article.this.attr('swiper-num'));
        }
        return num;
      } else {
        return 1;
      }
    };
    if ($article.$swiper.find('.swiper-slide').length <= gate()) {
      $swiperSet.navigation = false;
      $swiperSet.pagination = false;
      $swiperSet.autoplay = false;
      $swiperSet.loop = false;

      $article.this.find('.swiper-button-cover').hide();
      $article.this.find('.swiper-pagination').hide();
      $article.$swiper.addClass('swiper-no-swiping');
    }
    var $swiper = new Swiper($article.$swiper[0], $swiperSet);

    setTimeout(function () {
      mySwiper.push($swiper);
    }, 200);
  };

  // set video4
  var setVideo4 = function (obj) {
    $article.this.find('[video-id]').video4(obj.video4);
  };

  // 啟動 article4
  var activeArticle = function (el, obj) {
    if (getArticleData(el)) {
      setCommon();
      setSwiper();
      setVideo4(obj);
    }
  };

  // article4 init
  var articleInit = function (obj) {
    var blockNum = 0;
    var articleNum = 0;
    var target = obj.selector;

    saveFesdDBEvent();

    if (!$(target).hasClass('_articleBlock')) return;

    $(target).each(function (index, _block) {
      if (!isActive(_block)) {
        blockNum++;

        $(_block)
          .find('article')
          .each(function (index, _article) {
            if (!isActive(_article)) {
              activeArticle(_article, obj);
              setActive(_article);
              articleNum++;
            }
          });
        setActive(_block);
      }
    });

    setFesdDBActiveTotalObjs(obj);
    setFesdDBActive(blockNum, articleNum);
  };

  $.fn.article4 = function (options) {
    var option = options || {};
    option.selector = this;
    $.article4(option);
  };
})(jQuery);
