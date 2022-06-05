//flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/l10n/zh.js';

//卷軸
import 'overlayscrollbars';
import { cityData } from './_cityData.js';
export const form = {
  // 下拉
  formSelect() {
    const closeDropdown = (dropdown) => {
      const $select = dropdown.parents('.form-select');
      $select.removeClass('active');
      dropdown
        .slideUp(500)
        .promise()
        .done(function () {
          $select.parents('.wdd-form').find('.dropdown .filter-input').val('');
          $select.parents('.wdd-form').find('.dropdown ul > li').attr('style', '');
        });
    };
    const toggleList = (vm) => {
      const $select = $(vm);
      const dropdown = $select.children('.dropdown');
      if (!$select.hasClass('active')) {
        const all = $select.parents('form').find('.form-select');
        const scrollContent = $select.addClass('active').find('.dropdown-scrollbar');
        $select.addClass('active');
        dropdown
          .slideDown(500)
          .promise()
          .done(function () {
            if (scrollContent.hasClass('os-host')) return;
            scrollContent.overlayScrollbars({});
          });
        all.not(vm).removeClass('active');
        closeDropdown(all.not(vm).find('.dropdown'));
      } else {
        closeDropdown(dropdown);
      }
    };
    const unSelect = (option) => {
      const id = option.attr('data-id');
      const selectEl = option.parents('.form-select');
      const placeholder = selectEl.attr('data-default');
      const onChange = selectEl.attr('data-onchange');
      const selected = selectEl.find('.selected');
      const dropdown = selectEl.find('.dropdown');
      dropdown.find(`li[data-id="${id}"]`).removeClass('active');
      selected.find(`.option-btn[data-id="${id}"]`).remove();
      if (selected.find('.option-btn').length <= 0) {
        selected.removeClass('is-select').text(placeholder);
      }
      if (onChange) eval(onChange + '();');
    };
    $('.wdd-form .form-select').each((index, element) => {
      // 塞入縣/市資料
      if ($(element).hasClass('city')) {
        Object.keys(cityData).forEach((city) => {
          const li = `<li>${city}</li>`;
          $(element).find('.dropdown ul').append(li);
        });
      }
      $(element)
        .find('.dropdown li')
        .each((index, element) => {
          $(element).attr('data-id', index);
        });
      // 篩選功能
      if ($(element).hasClass('filter')) {
        const filterInput = '<input class="filter-input" type="text" />';
        $(element).find('.dropdown').prepend(filterInput);
      }
    });
    $('.form-select').on('click', '.dropdown .filter-input', function (e) {
      e.stopPropagation();
    });
    $('.form-select').on('input', '.dropdown .filter-input', function (e) {
      const val = $(this).val().toUpperCase();
      $(this)
        .parents('.dropdown')
        .find('ul > li')
        .each((index, el) => {
          if (!$(el).text().toUpperCase().includes(val)) $(el).hide();
          else $(el).show();
        });
    });
    $('.form-select').on('click', '.dropdown li', function (e) {
      const $this = $(this);
      const id = $this.attr('data-id');
      const selectEl = $this.parents('.form-select');
      const selectType = selectEl.attr('select-type'); //下拉選單類型(單選/多選)
      const onChange = selectEl.attr('data-onchange');
      const word = $this.text();
      const selected = $this.parents('.dropdown').siblings('.selected');
      switch (selectType) {
        case 'single':
          if ($this.hasClass('active')) $this.removeClass('active');
          else {
            $this.siblings('li').removeClass('active');
            $this.addClass('active');
          }
          selected.addClass('is-select').text(word);
          // 選擇縣/市
          if (selectEl.hasClass('city')) {
            const city = $this.text().trim();
            const distSelectEl = selectEl.next('.dist'); // 地區下拉選單
            const distSelectDefaultText = distSelectEl.attr('data-default'); // 地區下拉選單預設文字
            const addressInputEl = distSelectEl.next('.address'); // 地址輸入欄位
            distSelectEl.find('.selected').removeClass('is-select').text(distSelectDefaultText); // 恢復預設文字
            distSelectEl.find('.dropdown').html('<div class="dropdown-scrollbar"><ul></ul></div>'); // 清空選單
            cityData[city].forEach((dist) => {
              const li = `<li>${dist[0]}</li>`;
              distSelectEl.find('.dropdown ul').append(li);
            });
            distSelectEl.removeClass('disabled');
            addressInputEl.removeClass('disabled');
          }
          break;
        case 'multiple':
          e.stopPropagation();
          const optionEl = `<div class="option-btn" data-id="${id}"><div class="text">${word}</div><div class="remove-icon"></div></div>`;
          if (!selected.hasClass('is-select')) selected.addClass('is-select').text('');
          if ($this.hasClass('active')) {
            unSelect($this);
          } else {
            $this.addClass('active');
            selected.append(optionEl);
            $('.form-select .selected').on('click', `.option-btn[data-id="${id}"]`, function (e) {
              e.stopPropagation();
            });
            if (onChange) eval(onChange + '();');
          }
          break;
      }
    });
    $('.form-select .selected').on('click', '.option-btn .remove-icon', function (e) {
      e.stopPropagation();
      const $this = $(this);
      const dropdownEl = $this.parents('.form-select').find('.dropdown');
      const otherDropdownEl = $this.parents('.wdd-form').find('.dropdown').not(dropdownEl);
      const options = $(this).parents('.option-btn');
      closeDropdown(otherDropdownEl);
      unSelect(options);
    });
    $('.form-select').on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      toggleList(this);
      $('.picker').removeClass('picker--opened picker--focused');
      $('.picker__input').removeClass('picker__input--active picker__input--target');
    });
    $(document).on('click', function () {
      const dropdown = $('.wdd-form .form-select .dropdown');
      closeDropdown(dropdown);
    });
  },
  // 日曆
  datepicker() {
    flatpickr('.datepicker-input', {
      locale: 'zh',
    });
    flatpickr('.timepicker-input', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
    });
  },
  // 更換檔名
  updateFiles() {
    $('.wdd-form .file-wrap input[type="file"]').on('change', function (e) {
      if (e.target.files.length <= 0) return;
      const vm = $(this);
      const defaultText = vm.siblings('.fake-file-upload').attr('data-default');
      const $fileName = vm.siblings('.fake-file-upload').find('.file-name');
      const fileLimit = Number(vm.attr('data-limit'));
      const file = e.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      const originalName = file.name;
      if (fileSize > fileLimit) {
        //超過檔案大小限制
        vm.parents('.form-group').removeClass('is-upload').addClass('over-limit');
        $fileName.text(defaultText);
      } else {
        //符合檔案大小限制
        vm.parents('.form-group').addClass('is-upload').removeClass('over-limit');
        $fileName.text(originalName);
      }
    });
  },
  // 清除全部選項
  clear() {
    $('.form-clear').on('click', function () {
      $('.wdd-form input').val('');
      $('.wdd-form textarea').val('');
      $('.wdd-form input[type="checkbox"]').prop('checked', false);
      $('.fake-file-upload').each(function (index, el) {
        let defaultText = $(el).attr('data-default');
        $(el).find('.file-name').removeClass('is-upload').text(defaultText);
      });
      $('.form-select').each(function (index, el) {
        let defaultText = $(el).attr('data-default');
        $(el).find('.selected').removeClass('is-select').text(defaultText);
      });
    });
  },
  all() {
    form.formSelect();
    form.datepicker();
    form.updateFiles();
    form.clear();
    $('textarea.textarea-scrollbar').overlayScrollbars({});
  },
};
