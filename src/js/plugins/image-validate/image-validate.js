export class ImageValidate {
  constructor() {
    this.init();
  }
  init() {
    const images = document.querySelectorAll('img');
    const noImageDom = (width, height) => {
      const div = document.createElement('div');
      const slash1 = document.createElement('span');
      const slash2 = document.createElement('span');
      const slashWidth = Math.sqrt(width ** 2 + height ** 2);
      const theta = (Math.asin(height / slashWidth) * 180) / Math.PI;
      div.className = 'no-image';
      slash1.className = 'slash1';
      slash1.style.cssText = `
          width: ${slashWidth}px;
          transform: rotate(${theta}deg);
        `;
      slash2.className = 'slash2';
      slash2.style.cssText = `
          width: ${slashWidth}px;
          transform: rotate(${-theta}deg);
        `;
      div.appendChild(slash1);
      div.appendChild(slash2);
      return div;
    };
    images.forEach((img) => {
      let src;
      const wrapWidth = img.parentElement.clientWidth;
      const wrapHeight = img.parentElement.clientHeight;
      if (img.classList.contains('lazy') || img.classList.contains('swiper-lazy')) {
        src = img.getAttribute('data-src');
      } else {
        src = img.getAttribute('src');
      }
      if (src === '') {
        img.parentElement.style.position = 'relative';
        img.parentElement.appendChild(noImageDom(wrapWidth, wrapHeight));
      }
    });
    function imageResize() {
      const noImage = document.querySelectorAll('.no-image');
      if (noImage.length <= 0) return;
      noImage.forEach((item) => {
        const wrapWidth = item.parentElement.clientWidth;
        const wrapHeight = item.parentElement.clientHeight;
        const slashWidth = Math.sqrt(wrapWidth ** 2 + wrapHeight ** 2);
        const theta = (Math.asin(wrapHeight / slashWidth) * 180) / Math.PI;
        item.querySelector('.slash1').style.cssText = `
          width: ${slashWidth}px;
          transform: rotate(${theta}deg);
        `;
        item.querySelector('.slash2').style.cssText = `
          width: ${slashWidth}px;
          transform: rotate(${-theta}deg);
        `;
      });
    }
    window.addEventListener('resize', imageResize);
  }
  reValidate() {
    this.init();
  }
}
