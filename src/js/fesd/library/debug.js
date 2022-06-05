/*!
 * wdddebugs.js v1.5.5
 *
 * Pulgin : https://code.jquery.com/jquery-2.1.4.min.js
 *
 * Copyright Wade Digital Design Co. Ltd.
 * Date: 2019-09-16
 */

// navigator.vendorSub = 
// navigator.productSub = 20030107
// navigator.vendor = Google Inc.
// navigator.maxTouchPoints = 0
// navigator.hardwareConcurrency = 8
// navigator.cookieEnabled = true
// navigator.appCodeName = Mozilla
// navigator.appName = Netscape
// navigator.appVersion = 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
// navigator.platform = Win32
// navigator.product = Gecko
// navigator.userAgent = Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
// navigator.language = zh-TW
// navigator.languages = zh-TW,zh,en-US,en,zh-CN,ja
// navigator.onLine = true
// navigator.doNotTrack = null
// navigator.geolocation = [object Geolocation]
// navigator.mediaCapabilities = [object MediaCapabilities]
// navigator.connection = [object NetworkInformation]
// navigator.plugins = [object PluginArray]
// navigator.mimeTypes = [object MimeTypeArray]
// navigator.webkitTemporaryStorage = [object DeprecatedStorageQuota]
// navigator.webkitPersistentStorage = [object DeprecatedStorageQuota]
// navigator.sendBeacon = function sendBeacon() { [native code] }
// navigator.getGamepads = function getGamepads() { [native code] }
// navigator.javaEnabled = function javaEnabled() { [native code] }
// navigator.vibrate = function vibrate() { [native code] }
// navigator.requestMIDIAccess = function requestMIDIAccess() { [native code] }
// navigator.userActivation = [object UserActivation]
// navigator.mediaSession = [object MediaSession]
// navigator.permissions = [object Permissions]
// navigator.registerProtocolHandler = function registerProtocolHandler() { [native code] }
// navigator.unregisterProtocolHandler = function unregisterProtocolHandler() { [native code] }
// navigator.deviceMemory = 8
// navigator.clipboard = [object Clipboard]
// navigator.credentials = [object CredentialsContainer]
// navigator.keyboard = [object Keyboard]
// navigator.locks = [object LockManager]
// navigator.mediaDevices = [object MediaDevices]
// navigator.serviceWorker = [object ServiceWorkerContainer]
// navigator.storage = [object StorageManager]
// navigator.presentation = [object Presentation]
// navigator.bluetooth = [object Bluetooth]
// navigator.usb = [object USB]
// navigator.requestMediaKeySystemAccess = function () { [native code] }
// navigator.getUserMedia = function () { [native code] }
// navigator.webkitGetUserMedia = function () { [native code] }

$(document).ready(function() {

    var $debug_load = function() {

        var $debuglayout =
            "<div class='debug_mode'>" +
            "<div class='title'>Debug Mode</div>" +
            "<span class='spangroup'>" +
            "<span class='browser'></span>" +
            "<span class='body'></span>" +
            "<span class='userAgent'></span>" +
            "</span>" +
            "</div>";

        $("body").html($debuglayout);
        $debug_css();
        $debug_getsize();
        $debug_getbrowser();

    }

    var $debug_getsize = function() {

        var $browser_H = $(window).height();
        var $browser_W = $(window).width();
        var $body_W = $(document.body).width();
        var $body_H = $(document.body).height();


        $(".browser").html("Browser Size W:" + $browser_W + "px * " + "H:" + $browser_H + "px");
        $(".body").html("Body Size W:" + $body_W + "px * " + "H:" + $body_H + "px"); //"瀏覽器當前視窗可視區域寬度"


        $debug_resize();


    }
    var $debug_getbrowser = function() {

        var $broswerCodeName = navigator.appCodeName;
        var $broswerName = navigator.appName;
        var $userAgent = navigator.userAgent;



        $(".broswerCodeName").html("Broswer Code Name : " + $broswerCodeName);
        $(".broswerName").html("Broswer Name : " + $broswerName);
        $(".userAgent").html("userAgent : " + $userAgent);

    }

    var $debug_resize = function() {

        $(window).resize(function() {
            $debug_getsize();
        });
    }

    var $debug_css = function() {

        $(".debug_mode").css({
            "font-family": "sans-serif",
            "font-size": "10px",
            "color": "#fff",
            "width": "auto",
            "max-width": "300px",
            "min-width": "100px",
            "background-color": "#ff0089",
            "margin": "0",
            "padding": "2px 10px",
            "position": "fixed",
            "z-index": "99999999",
            "bottom": "0",
            "left": "0"
        });

        $(".debug_mode span").css({
            "color": "fff",
            "display": "block",
            "padding": "10px 0"
        });
        $(".debug_mode .spangroup").css({
            "display": "none"
        });

        $(".debug_mode .title").css({
            "color": "fff",
            "display": "block",
            "padding": "10px 0",
            "padding": "5px 0"
        });

        $(".debug_mode").click(function() {

            $(".debug_mode .spangroup").toggle();
        });

    }

    $debug_load();
});