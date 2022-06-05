//fesd
import './fesd/fesd';
//全域變數
import './includes/_global';
//轉場
import './includes/_cgpagechange';
//套件樣式
//animate(動畫庫)
import 'animate.css';
//Swiper(輪播套件)
import 'swiper/css/bundle';
//flatpickr(日期套件)
import 'flatpickr/dist/flatpickr.min.css';
//OverlayScrollbars(卷軸套件)
import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import Swiper, { Navigation, Pagination, Autoplay, Grid, EffectFade, Lazy } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Grid, EffectFade, Lazy]);
//LazyLoad
import LazyLoad from 'vanilla-lazyload';
import { ImageValidate } from './plugins/image-validate/image-validate.js';
import { methods } from './includes/_methods';


const navbar = {}
const footer = {}
navbar.scrollHandler = function(){
  $(window).on('scroll',function(){
    const scrollTop = $(this).scrollTop()
    const navbarHeight = $('.main-nav').innerHeight()
    const bannerHeight = $('.banner').innerHeight()
    if (scrollTop >= bannerHeight - navbarHeight) {
      $('nav.main-nav').addClass('navfix');
      $('.navContainer').addClass('navfix');
    } else {
      $('nav.main-nav').removeClass('navfix');
      $('.navContainer').removeClass('navfix');
    }
  })
}



footer.swiper = function(){
  //footer swiper
  const footerSwiper = new Swiper(".footerSwiper", {
    slidesPerView: 'auto',
    spaceBetween: 52,
    freeMode: true,
  });
}
$(function () {
  jQuery.easing['jswing'] = jQuery.easing['swing'];
  jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',

    easeOutQuad: function (x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
      return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
  });

  if (fesdDB.is.isOs4 === 'isMacOS') {
    $('html').addClass('isMac');
    if (methods.detectMacOSVersion().BigSurUP) {
      $('html').addClass('isMacBigSurUp');
    }
  }
  //除Mac系統 & IE瀏覽器外套用卷軸樣式
  if (fesdDB.is.isOs4 !== 'isMacOS' && fesdDB.is.isBrowser4 !== 'isIE') {
    $('html').addClass('scrollbarStyle');
  }

  const imageValidate = new ImageValidate();
  _g.lazy = new LazyLoad({});
  methods.appleDebug();
  methods.fixMobile100vh();
  $('.anchor-btn').anchor4()
  navbar.scrollHandler()
  footer.swiper()
  });