import Swiper, { Navigation, Pagination, Autoplay, Grid, EffectFade, Lazy } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Grid, EffectFade, Lazy]);
//其他Methods
import { CategorySlider } from '../plugins/category-slider/category-slider.js';
import { form } from '../includes/_form';
import { methods } from '../includes/_methods';


form.all();

const home = {}

home.swiper = function(){
  const swiper = new Swiper(".bannerSwiper", {
    autoplay: {
      delay: 6000,
    },
    loop: true,
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: {
      loadPrevNext: true
    },     
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: ".bannerSwiper .swiper-pagination",
      clickable: true,
    },
  });

  const swiper2 = new Swiper(".course .swiper", {
    on:{
      slideChangeTransitionStart:function(){
        console.log(this)
        console.log(this.realIndex)
        const index = this.realIndex
        $('.bg-wrap img').removeClass('show')
        $('.bg-wrap img').eq(index).addClass('show')        
      }
    },
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      1170:{
        spaceBetween: 105
      },
    }
  }
  );
}

const swiper = new Swiper(".courseURLSwiper", {
  slidesPerView: "auto",
  // spaceBetween: 0,
  pagination: {
    el: ".courseURLSwiper .swiper-pagination",
    clickable: true,
  }
});

const courseSlider = new CategorySlider('.category-course .category-slider',{
  breakpoint: 1199
});

const course2Slider = new CategorySlider('.category-course2 .category-slider',{
  breakpoint: 1199
});

const footerSlider = new CategorySlider('.category-footer .category-slider',{
  breakpoint: 1199
});

const articleSlider = new CategorySlider('.category-article .category-slider',{
  breakpoint: 768,
});

const spotSwiper = new Swiper(".category-spot .spotSwiper",{
  slidesPerView: 3,
  grabCursor: true,
  // pagination: {
  //   el: ".spot-pagination",
  //   clickable: true
  // },
  breakpoints:{
    600:{
      slidesPerView: 4,
    },
    700:{
      slidesPerView: 5,
    },
    1000:{
      slidesPerView: 3,
    },
    1100:{
      slidesPerView: 4,
    },
    1500:{
      slidesPerView: 5,
    }
  }
});

let countdown = () =>{
  const time = $('.countDown').attr('data-countdown')
  let countDownDate = new Date(time).getTime();
  let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);       
    if(hours < 10){
      hours = "0" + hours
    };
    if(minutes < 10){
      minutes = "0" + minutes
    };
    if(seconds < 10){
      seconds = "0" + seconds
    };
    document.getElementById('countDay').innerHTML = days;
    document.getElementById('countHour').innerHTML = hours;
    document.getElementById('countMin').innerHTML = minutes;
    document.getElementById('countSec').innerHTML = seconds;
  }, 1000);
};

home.about = function(){

}

home.swiper()
countdown()
