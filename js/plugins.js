/* jshint devel:true */

// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {
  };
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.

var BrowserDetect = {
  init: function() {
    BrowserDetect.MOBILE = BrowserDetect.checkMobile();
    BrowserDetect.IPHONE = BrowserDetect.checkIphone();
    BrowserDetect.ANDROID = BrowserDetect.checkAndroid();
    BrowserDetect.TABLET = BrowserDetect.checkTablet();
    BrowserDetect.DESKTOP = !BrowserDetect.MOBILE && !BrowserDetect.TABLET;
    BrowserDetect.BROWSER_NAME = BrowserDetect.checkBrowser();
    BrowserDetect.BROWSER_VERSION = BrowserDetect.checkIphone();
    BrowserDetect.OS = BrowserDetect.checkIphone();
  }
};

BrowserDetect.checkMobile = function () {
  return navigator.userAgent.match(/iphone|ipod|kindle|android|blackberry|opera mini|opera mobi|nexus 4|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i) ? 1 : 0;
};

BrowserDetect.checkIphone = function () {
  return navigator.userAgent.match(/iphone|ipod/i);
};

BrowserDetect.checkAndroid = function () {
  return navigator.userAgent.match(/android/i);
};

BrowserDetect.checkTablet = function () {
  return navigator.userAgent.match(/ipad|sch-i800|playbook|xoom|tablet|gt-p1000|gt-p7510|sgh-t849|nexus 7|nexus 10|shw-m180s|a100|dell streak|silk/i);
};

BrowserDetect.checkBrowser = function () {
  return navigator.userAgent.match(/chrome|omniweb|safari|opera|icab|konqueror|firefox|camino|netscape|explorer|mozilla|netscape|/i);
};


BrowserDetect.BROWSER_NAME = null;
BrowserDetect.BROWSER_VERSION = null;
BrowserDetect.OS = null;
BrowserDetect.MOBILE = !1;
BrowserDetect.TABLET = !1;
BrowserDetect.init();

var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
var isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
var isSafari = navigator.userAgent.indexOf("Safari") > -1;
var isOpera = navigator.userAgent.indexOf("Presto") > -1;
if ((isChrome) && (isSafari)) { isSafari = false; }

console.log('Chrome', isChrome);
console.log('Internet Explorer', isExplorer);
console.log('Firefox', isFirefox);
console.log('Safari', isSafari);
console.log('Opera', isOpera);

/*
function isFirefox() {
  return window.navigator.userAgent.match(/firefox/gi);
}

function isWebkit() {
  return window.navigator.userAgent.match(/chrome|safari/gi);
}

function whichBrowser() {
  var browser = null;

  if (isFirefox()) {
    browser = isFirefox();
  } else if (isWebkit()) {
    browser = isWebkit();
  } else

    return browser;
}*/
