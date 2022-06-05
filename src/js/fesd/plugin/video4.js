(function ($, Global) {
  /*
   *  WDD FESD video4
   *  version: 2.2
   *  Update: 2021.11.04
   *  Last Coding: Ryan, 2021.11.04
   *
   *  use plugin :
   *  https://www.youtube.com/player_api
   *
   */

  'use strict';

  fesdDB.ver.plugin.video4 = {};
  fesdDB.ver.plugin.video4.ver = '2.2';
  fesdDB.ver.plugin.video4.update = '2021.11.04';
  fesdDB.ver.plugin.video4.plugin = 'videojs 7.5, youtubeAPI, youkuAPI';

  var $v = {};

  // 從fesdDB 取預設參數與設定
  $.extend({
    video4: function (options) {
      $v = $.extend(
        {
          youtube: fesdDB.video4.youtube.setting,
          youtubeAPI: fesdDB.video4.youtubeAPI.setting,
          youku: fesdDB.video4.youku.setting,
          youkuAPI: fesdDB.video4.youkuAPI.setting,
          vimeo: fesdDB.video4.vimeo.setting,
          videojs: fesdDB.video4.videojs.setting,
          setting: fesdDB.video4.setting,
          layout: fesdDB.video4.layout,
        },
        options
      );

      return init();
    },
  });

  //取得影片物件 Data
  var selectorData = function (selector) {
    var selector = selector || $v.setting.selector;

    $v.$selector = $(selector);
    $v.videoId = $v.$selector.attr('video-id') || $v.setting.videoId;
    $v.videoType = $v.$selector.attr('video-type') || $v.setting.videoType;
    $v.playerType = $v.$selector.attr('video-player-type') || $v.setting.playerType || 'onBox';
    $v.playerPlayType =
      $v.$selector.attr('video-player-playtype') || $v.setting.playerPlayType || 'click';
    $v.playerLayoutNo =
      $v.$selector.attr('video-player-layout-no') || $v.setting.playerLayoutNo || 0;
    $v.playerLayout =
      $v.$selector.attr('video-player-layout') || $v.setting.playerLayout || '.video4-player';
    $v.playerPlayButton =
      $v.$selector.attr('video-player-layout-playbutton') ||
      $v.setting.playerPlayButton ||
      'playButton';
    $v.playerCloseButton =
      $v.$selector.attr('video-player-layout-closebutton') ||
      $v.setting.playerCloseButton ||
      '.closeButton';
    $v.playerFixedBody =
      $v.$selector.attr('video-player-fixedbody') ||
      $v.setting.playerFixedBody ||
      '.video4FixedBody';
    $v.coverLayoutNo = $v.$selector.attr('video-cover-layout-no') || $v.setting.coverLayoutNo || 0;
    $v.youtubeAPI.events.onReady =
      $v.$selector.attr('video-youtubeapi-ready') ||
      $v.youtubeAPI.events.onReady ||
      'video4_onPlayerReady';
    $v.youtubeAPI.events.onStateChange =
      $v.$selector.attr('video-youtubeapi-statechange') ||
      $v.youtubeAPI.events.onStateChange ||
      'video4_onPlayerStateChange';
    $v.callback = $v.$selector.attr('video-callback') || $v.setting.callback;

    return true;
  };

  //判斷影片物件是否不存在
  var isSelector = function () {
    return $v.$selector === '' || typeof $v.$selector === 'undefined' || !$v.$selector.length
      ? false
      : true;
  };

  //判斷影片物件是否沒有 video-id
  var isVideoID = function () {
    return $v.videoId === '' || typeof $v.videoId === 'undefined' ? false : true;
  };

  //判斷影片物件是否沒有 data-video4-active=on
  var isActive = function () {
    return $v.$selector.attr('data-video4-active') === 'on' ? true : false;
  };

  // 判斷是否自行設定 Player Close Button，同時尋找 Player Close Button 物件儲存至 $v 中
  var isPlayerCloseButton = function () {
    var $closeButton = ($v.$playerCloseButton = $v.$player.find($v.playerCloseButton));
    return $v.playerCloseButton === '' ||
      typeof $v.playerCloseButton === 'undefined' ||
      !$closeButton.length
      ? false
      : true;
  };

  //判斷是否為onBox
  var isBox = function () {
    return $v.playerType === 'onBox' ? true : false;
  };

  //判斷是否為onPage
  var isPage = function () {
    return $v.playerType === 'onPage' ? true : false;
  };

  //判斷是否為off，完成cover直接callback
  var isOff = function () {
    return $v.playerType === 'off' ? true : false;
  };

  //判斷是否為 youtubeAPI
  var isYoutubeAPI = function () {
    return $v.videoType === 'youtubeAPI' ? true : false;
  };

  //判斷是否為 youtube
  var isYoutube = function () {
    return $v.videoType === 'youtube' ? true : false;
  };

  //判斷是否為 youtkuAPI
  var isYoukuAPI = function () {
    return $v.videoType === 'youkuAPI' ? true : false;
  };

  //判斷是否為 youtku
  var isYouku = function () {
    return $v.videoType === 'youku' ? true : false;
  };

  //判斷是否為 vimeo
  var isVimeo = function () {
    return $v.videoType === 'vimeo' ? true : false;
  };

  //判斷是否為 videojs
  var isVideojs = function () {
    return $v.videoType === 'videojs' ? true : false;
  };

  //判斷是否為 isPlayerAutoPlay
  var isPlayerAutoPlay = function () {
    return $v.playerPlayType === 'auto' ? true : false;
  };

  //取得判斷 layout cover selector 是否擁有 src
  var isCoverLayoutSelector = function (event) {
    $v.$coverLayoutSelector = $v.$selector.find('img');
    $v.$coverLayoutSelectorSrc = $v.$coverLayoutSelector.attr('src');
    $v.$coverLayoutNo = $v.layout.cover[$v.coverLayoutNo];

    if (event === 'isObj') {
      return $v.$coverLayoutSelector;
    }
    return $v.$coverLayoutSelectorSrc === '' || typeof $v.$coverLayoutSelectorSrc === 'undefined'
      ? true
      : false;
  };

  //取得player play按鈕 isPlayerAutoPlay
  var getPlayerPlayButton = function () {
    var playButton = $v.playerPlayButton;

    if (playButton === 'off' || playButton === '' || typeof playButton === 'undefined') {
      return ($v.$playerPlayButton = $v.$selector);
    } else {
      var $playButton = $v.$selector.find(playButton);
      return ($v.$playerPlayButton = $playButton.length >= 1 ? $playButton : $v.$selector);
    }
  };

  //判斷影片物件是否沒有 data-video4-active=on
  var setSelectorPlayerTypeClass = function () {
    return $v.$selector.addClass($v.playerType);
  };

  var setSelectorClass = function () {
    return $v.$selector.addClass('video4-cover');
  };

  //判斷 video obj 所有條件
  var runCallback = function () {
    return $v.callback === '' || typeof $v.callback === 'undefined'
      ? undefined
      : eval($v.callback + '($v)');
  };

  //這定物件啟動
  var setActive = function () {
    return $v.$selector.attr('data-video4-active', 'on');
  };

  //回傳feadDB video4 active 數量
  var setFesdDBActive = function () {
    fesdDB.active.video4 =
      $('[data-video4-active="on"][video-type="youtube"]').length +
      ' youtube objects, ' +
      $('[data-video4-active="on"][video-type="youtubeAPI"]').length +
      ' youtubeAPI objects, ' +
      $('[data-video4-active="on"][video-type="youku"]').length +
      ' youku objects, ' +
      $('[data-video4-active="on"][video-type="youkuAPI"]').length +
      ' youkuAPI objects, ' +
      $('[data-video4-active="on"][video-type="vimeo"]').length +
      ' vimeo objects, ' +
      $('[data-video4-active="on"][video-type="player"]').length +
      ' player objects';
    return true;
  };

  //儲存 fesdDB.video4.e 紀錄
  var saveFesdDBEvent = function () {
    fesdDB.video4.e = $v;
  };

  var setActiveEventGroup = function () {
    return (function () {
      setActive();
      setFesdDBActive();
      setSelectorPlayerTypeClass();
    })();
  };

  //清除 fesdDB.video4.e 紀錄
  var clearFesdDBEvent = function () {
    fesdDB.video4.e = {};
  };

  //cover
  var cover = {};

  //  設定player play按鈕click事件，用來開啟player
  cover.isClickPlay = function () {
    // 重要 click 之後，必須將在綁定 click 事件之前的 $v 記錄下來
    var data = $v;

    var s = this;
    var $playerPlayButton = getPlayerPlayButton();

    $playerPlayButton.on('click', function () {
      // click 後將資料作為 click $v 的預設值
      // 因為不這麼做，$v 會記錄 each 最後物件的 $v
      $v = data;

      var thisVideoID = $(this).attr('video-id');
      var thisSelector = $(this).parent('[video-id]');
      var selector =
        thisVideoID === '' || typeof thisVideoID === 'undefined' ? thisSelector : $(this);

      // click 將資料作為 click $v 的預設值之後
      // 再針對 video-id 物件進行 data 資料的取得，用來覆蓋剛剛從 data 取得的 $v
      // 因為從綁定事件之後到click之間有可能會因為需要而改變 video-id 物件的 data 資料
      // 所以必須在click的時候再取得一次data，覆蓋 data 取得的 $v 不同的資料
      return selectorData(selector) ? player.create() : undefined;
    });
    //若play type為auto，將自動click按鈕
    return isPlayerAutoPlay() ? $playerPlayButton.click() : undefined;
  };

  // img src為空值，覆蓋img為youtubne cover，同時append按鈕物件
  cover.replaceSelectorObjs = function () {
    var s = this;
    var type = $v.videoType;
    switch (type) {
      case 'vimeo':
        $v.$coverLayoutSelector.replaceWith(
          '<img class="' +
            $v.videoId +
            '"  src = "https://vumbnail.com/' +
            $v.videoId +
            '.jpg" >' +
            $v.$coverLayoutNo
        );
        break;
      default:
        $v.$coverLayoutSelector.replaceWith(
          '<img class="' +
            $v.videoId +
            '"  src = "http://img.youtube.com/vi/' +
            $v.videoId +
            '/hqdefault.jpg" >' +
            $v.$coverLayoutNo
        );
        break;
    }
    $v.$coverLayoutSelector = $v.$selector.find('img' + '.' + $v.videoId);
    return s.isClickPlay();
  };

  // img src不為空值，append按鈕物件
  cover.afterObjs = function () {
    var s = this;
    $v.$coverLayoutSelector.after($v.$coverLayoutNo);
    return s.isClickPlay();
  };

  //判斷是否建立影片封面
  cover.create = function () {
    var s = this;
    return isCoverLayoutSelector() ? s.replaceSelectorObjs() : s.afterObjs();
  };

  //player
  var player = {};

  // 判斷要使用那些影片來源
  player.setVideoSource = function () {
    isYoutubeAPI()
      ? youtubeAPI()
      : isYoutube()
      ? youtube()
      : isYoukuAPI()
      ? youkuAPI()
      : isYouku()
      ? youku()
      : isVimeo()
      ? vimeo()
      : isVideojs()
      ? videojs()
      : undefined;
  };

  //開啟player鎖定body overflow
  player.setFixedBody = function (event) {
    if (
      $v.playerFixedBody === 'off' ||
      $v.playerFixedBody === '' ||
      typeof $v.playerFixedBody === 'undefined'
    ) {
      return;
    }

    var fixedBodyCSS = $v.playerFixedBody.replace('.', '');

    // event === '' || typeof event === 'undefined' ? $('body').addClass(fixedBodyCSS) : undefined
    // event === 'none' ? $('body').removeClass(fixedBodyCSS) : undefined
    event === '' || typeof event === 'undefined' ? _g.scrollLock() : undefined;
    event === 'none' ? _g.scrollUnlock() : undefined;
  };

  //關閉player的事件
  player.closePlayer = function () {
    var s = this;
    var $player = $v.$player;
    var $closeButton = $v.$playerCloseButton;

    var close = function () {
      $player.removeClass('open');

      setTimeout(function () {
        $player.remove();
        s.setFixedBody('none');
        clearFesdDBEvent();
      }, 600);
    };

    $closeButton.on('click', function () {
      close();
    });
    $player.on('click', function () {
      close();
    });
    $player.on('click', '.playerCover', function (e) {
      e.stopPropagation();
    });
  };

  //開啟player的事件
  player.openPlayer = function () {
    var s = this;
    var player = $v.$player;
    var videoType = $v.videoType;

    if (player.layout) {
      return;
    }

    isPlayerCloseButton() ? s.closePlayer() : undefined;
    s.setFixedBody();
    s.setVideoSource();

    setTimeout(function () {
      player.addClass('active open');
    }, 500);
  };

  //取得player layout
  player.getlayout = function () {
    // console.log($v.playerLayoutNo)
    return ($v.$playerLayout = $v.layout.onBox[$v.playerLayoutNo]);
  };

  //製作並回傳playerID
  player.getPlayerID = function () {
    return ($v.playerID = $v.videoId + '-' + Math.random().toString(36).substring(7));
  };

  //在頁面撥放影片的機制
  player.onPage = function () {
    var s = this;
    var playerID = s.getPlayerID();
    var videoObj = isCoverLayoutSelector('isObj');

    videoObj.attr('id', playerID);
    return s.setVideoSource();
  };

  //在lightBox撥放影片的機制
  player.onBox = function () {
    var s = this;
    var videoID = $v.videoId;
    var playerID = s.getPlayerID();
    var playerLayout = s.getlayout();
    var $playerLayout = $.parseHTML(playerLayout);
    var playerLayout = $v.playerLayout;

    if ($(playerLayout).length >= 1) {
      return;
    }

    $($playerLayout)
      .addClass(playerID + ' ' + videoID)
      .find('video')
      .attr('id', playerID);
    $('body').append($playerLayout);
    $v.$player = $(playerLayout + '.' + playerID);

    return s.openPlayer();
  };

  //判斷是否建立player
  player.create = function () {
    var s = this;
    isOff() ? runCallback() : isPage() ? s.onPage() : isBox() ? s.onBox() : undefined;
  };

  //
  function init() {
    if (selectorData() && isSelector() && isVideoID() && !isActive()) {
      // console.log('A : cover creat')
      setActiveEventGroup();
      setSelectorClass();

      return cover.create();
    }

    // onBox 模式進場開燈箱不需要設定 selector，onPage 為一進場直接撥放場上影片
    if (selectorData() && !isSelector() && isVideoID() && isPlayerAutoPlay() && isBox()) {
      // console.log('B : player.create')
      setActiveEventGroup();
      setSelectorClass();

      return player.create();
    }
  }

  //youtube iframe
  function youtube() {
    //<iframe width=”780″ height=”440″ src=”https://www.youtube.com/embed/AlmpV91w5qU?
    //rel=0&autoplay=1&loop=1&playlist=AlmpV91w5qU&amp;showinfo=0″ frameborder=”0″
    //allow=”autoplay; encrypted-media” allowfullscreen></iframe>

    var videoID = $v.videoId;
    var $selector = $('#' + $v.playerID);
    var autoplay = $v.playerPlayType === 'auto' || 1;
    var layout =
      '<iframe width="560" height="315" ' +
      'src="https://www.youtube.com/embed/' +
      videoID +
      '?rel=0&' +
      'autoplay=' +
      autoplay +
      '&' +
      'mute=1' +
      '&' +
      'loop=1' +
      'playlist=0"; ' +
      'showinfo="0";' +
      'frameborder="0";' +
      'allow="autoplay";' +
      'autoplay; ' +
      'encrypted-media; ' +
      'gyroscope; ' +
      'picture-in-picture" ' +
      'allowfullscreen="0" ' +
      'volumn="0">' +
      '</iframe>';

    $selector.replaceWith(layout);
    saveFesdDBEvent();
    runCallback($v);
  }

  //youtubeAPI
  function youtubeAPI() {
    var data = $v;
    var player;

    //check youtube API
    function checkYoutubeAPI() {
      return typeof YT === 'undefined' || typeof YT.Player === 'undefined'
        ? true
        : setYoutubePlayer();
    }

    //ajax youtube API
    (function loadYoutubeAPI() {
      if (checkYoutubeAPI()) {
        $.ajax({
          dataType: 'script',
          cache: false,
          url: 'https://www.youtube.com/player_api',
        }).done(function (script, textStatus) {
          // fesdDB.video4.e.youtubeAPI_ajaxStatus = textStatus;
          // console.log(textStatus);
          data.youtubeAPI_loaded ? setYoutubePlayer() : undefined;
        });
      }
    })();

    //set youtube player iframe
    function setYoutubePlayer() {
      // console.log('youtubeAPI > setYoutubePlayer')
      data.youtubeAPI.videoId = data.videoId;
      player = new YT.Player(data.playerID, data.youtubeAPI);
    }

    //youtube API ready 事件
    window.onYouTubeIframeAPIReady = function () {
      // console.log('youtubeAPI > onYouTubeIframeAPIReady')
      data.youtubeAPI_loaded = true;
      setYoutubePlayer();
    };
    //youtube player ready + video4 callback 事件
    window.video4_onPlayerReady = function (e) {
      // console.log('o youtube API : onPlayerRead');
      e.target.mute();
      saveFesdDBEvent();
      runCallback($v);

      fesdDB.video4.e.youtubeAPI_videoIframe = e.target.f;
      fesdDB.video4.e.youtubeAPI_onPlayerRead = true;
    };
    //youtube player status 事件
    window.video4_onPlayerStateChange = function (e) {
      // console.log('o youtube API : onPlayerStateChange');
      if (e.data === 1) {
        fesdDB.video4.e.youtubeAPI_onPlayerStateChange = 'play';
      }
      if (e.data === 2) {
        fesdDB.video4.e.youtubeAPI_onPlayerStateChange = 'stop';
      }
    };
  }

  //youku iframe
  function youku() {
    //<iframe height=498 width=510 src="https://player.youku.com/embed/' + videoID + '==?autoplay=true"
    //frameborder=0 "allowfullscreen"></iframe>

    var videoID = $v.videoId;
    var $selector = $('#' + $v.playerID);

    var layout =
      '<iframe height=498 width=510 src="https://player.youku.com/embed/' +
      videoID +
      '==?autoplay=true" frameborder=0 "allowfullscreen"></iframe>';

    $selector.replaceWith(layout);
    saveFesdDBEvent();
    runCallback($v);
  }

  //youkuAPI
  function youkuAPI() {
    var data = $v;
    var youkuPlayer;

    //check youku API
    function checkYoukuAPI() {
      return typeof YKU === 'undefined' || typeof YKU.youkuPlayer === 'undefined'
        ? true
        : setYoukuPlayer();
    }

    //ajax youku API
    (function loadYoukuAPI() {
      if (checkYoukuAPI()) {
        $.ajax({
          dataType: 'script',
          cache: false,
          url: 'https://player.youku.com/jsapi',
        }).done(function (script, textStatus) {
          // fesdDB.video4.e.youkuAPI_ajaxStatus = textStatus;
          // console.log(textStatus);
          setYoukuPlayer();
        });
      }
    })();

    //set youku player iframe
    function setYoukuPlayer() {
      var $player = $('#' + data.playerID);

      $player.replaceWith('<div id="' + data.playerID + '"></div>');

      $v.$player = $('#' + data.playerID);
      data.youkuAPI.vid = data.videoId;

      youkuPlayer = new YKU.Player(data.playerID, data.youkuAPI);
    }
  }

  //vimeo iframe
  function vimeo() {
    // <iframe src="https://player.vimeo.com/video/572113578?h=fec493346d" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

    var videoID = $v.videoId;
    var $selector = $('#' + $v.playerID);

    var layout =
      '<iframe height=498 width=510 src="https://player.vimeo.com/video/' +
      videoID +
      '?h=fec493346d" frameborder=0 "allowfullscreen"></iframe>';

    $selector.replaceWith(layout);
    saveFesdDBEvent();
    runCallback($v);
  }

  function videojs() {}

  $.fn.video4 = function (options) {
    return $(this).each(function () {
      var option = options || {};
      option.setting = {};
      option.setting.selector = this;

      $.video4(option);
    });
  };
})(jQuery, window);
