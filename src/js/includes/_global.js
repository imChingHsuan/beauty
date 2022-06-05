import { ajax, ajaxCallback } from './_ajaxFunction';
import { lock, unlock } from 'tua-body-scroll-lock';

window._g = {};
_g.scrollLock = (elements) => {
  const elementArr = [];
  if (elements) {
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        elementArr.push(element);
      } else if (typeof element === 'string') {
        elementArr.push(...document.querySelectorAll(`${element}`));
      }
    });
  }
  if (fesdDB.is.isMobile4) {
    lock(elementArr);
  } else {
    $('body').css('overflow', 'hidden');
  }
};
_g.scrollUnlock = (elements) => {
  const elementArr = [];
  if (elements) {
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        elementArr.push(element);
      } else if (typeof element === 'string') {
        elementArr.push(...document.querySelectorAll(`${element}`));
      }
    });
  }
  if (fesdDB.is.isMobile4) {
    unlock(elementArr);
  } else {
    $('body').attr('style', '');
  }
};
_g.loading = () => {
  const LoadingDOM = `<div class="loading-wrapper"><div class="icon-box"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#ffffff" stroke="none"><animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform></path></svg></div></div>`;
  $('body').append(LoadingDOM);
  $('.loading-wrapper')
    .fadeIn(300)
    .promise()
    .done(function () {
      _g.scrollLock();
    });
};
_g.loaded = () => {
  $('.loading-wrapper')
    .fadeOut(300)
    .promise()
    .done(function () {
      $('.loading-wrapper').remove();
      _g.scrollUnlock();
    });
};
_g.getFormValue = (target) => {
  // 參數 -
  // 在對應的地方 加上 [form-field] --> 欄位名稱 [field-type] --> 欄位格式
  // isFile(取檔案數值物件)
  // isRadio(要放在對應父層)
  // isCheckBox(要放在對應父層)
  // isSelect(要放在對應父層)
  let data = {}
  const formAll = document.querySelectorAll(`${target} [form-field]`)
  formAll.forEach(el => {
    const field = el.getAttribute('form-field')
    const type = el.getAttribute('field-type')
    switch (type) {
      case 'isRadio':
        const radioChecked = el.querySelector('input:checked')
        data[field] = {
          id: radioChecked.closest('.option-item').querySelector('.text').getAttribute('data-id'),
          value: radioChecked.closest('.option-item').querySelector('.text').textContent
        }
        break

      case 'isCheckBox':
        const checkBoxChecked = el.querySelectorAll('input:checked')
        data[field] = []
        checkBoxChecked.forEach(v => {
          data[field].push({
            id: v.closest('.option-item').querySelector('.text').getAttribute('data-id'),
            value: v.closest('.option-item').querySelector('.text').textContent
          })
        })
        break

      case 'isSelect':
        const selectType = el.getAttribute('select-type')
        if(selectType === 'single') {
          data[field] = {
            id: el.querySelector('.dropdown .active')?.getAttribute('data-id'),
            value: el.querySelector('.dropdown .active')?.textContent
          }
        } else if(selectType === 'multiple') {
          const multipleSelected = el.querySelectorAll('.dropdown .active')
          data[field] = []
          multipleSelected?.forEach(v => {
            data[field].push({
              id: v.getAttribute('data-id'),
              value: v.textContent
            })
          })
        }
        break

      case 'isFile':
        data[field] = el.files
        break

      default:
        data[field] = el.value
        break
    }
  })

  console.log('資料===>', data)
  return JSON.stringify(data)
}
_g.ajaxCallback = ajaxCallback;
