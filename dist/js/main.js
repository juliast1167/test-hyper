document.addEventListener("DOMContentLoaded", preloader);
function preloader() {
	document.querySelector('body').classList.add('loading');
}
(function () {

	"use strict";

	var body = document.querySelector('body'),
	isMobile = false,
	scrollTopPosition,
	browserYou,
	_winWidth = window.innerWidth;
	var genFunc = {

		initialized: false,

		initialize: function () {

			if (this.initialized) return;

			this.initialized = true;

			this.build();
		},

		build: function () {
      browserYou = this.getBrowser();
      if (browserYou.platform == 'mobile') {
        isMobile = true;
        document.documentElement.classList.add('mobile');
      } else {
        document.documentElement.classList.add('desktop');
      }
      if (document.querySelector('.yearN') !== null) {
        this.copyright();
      }
      //mobileMenu
      // this.mobileMenu();
      //timer
      this.timerFunction('02/14/2019 8:00:00 AM');
    },
    appearFunction: function () {
        if (isMobile === false) {
            $('.animated').appear(function () {
                var elem = $(this);
                var animation = elem.data('animation');
                if (!elem.hasClass('visible')) {
                    var animationDelay = elem.data('animation-delay');
                    if (animationDelay) {
                        setTimeout(function () {
                            elem.addClass(animation + " visible");
                        }, animationDelay);
                    } else {
                        elem.addClass(animation + " visible");
                    }
                }
            }, {accX: 0, accY: -400});
        } else {
            $('.animated').each(function () {
                var animation = $(this).data('animation');
                $(this).addClass(animation + " visible");
            });
        }
    },
    timerFunction: function (end) {
      function countdown(endDate) {
        var days, hours, minutes, seconds;
        
        endDate = new Date(endDate).getTime();
        
        if (isNaN(endDate)) {
        return;
        }
        
        setInterval(calculate, 1000);
        
        function calculate() {
          var startDate = new Date();
          startDate = startDate.getTime();
          
          var timeRemaining = parseInt((endDate - startDate) / 1000);
          
          if (timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);
            
            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);
            
            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);
            
            seconds = parseInt(timeRemaining);
            
            document.getElementById("days").innerHTML = parseInt(days, 10);
            document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
            document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
            document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
          } else {
            return;
          }
        }
      }
      countdown(end);

      // (function () { 
      //   countdown('02/14/2019 8:00:00 AM'); 
      // }());
    },
    copyright: function () {
      var yearBlock = document.querySelector('.yearN'),
      yearNow = new Date().getFullYear().toString();
      if (yearNow.length) {
        yearBlock.innerText = yearNow;
      }
    },
    getBrowser: function () {
      var ua = navigator.userAgent;
      var bName = function () {
        if (ua.search(/Edge/) > -1) return "edge";
        if (ua.search(/MSIE/) > -1) return "ie";
        if (ua.search(/Trident/) > -1) return "ie11";
        if (ua.search(/Firefox/) > -1) return "firefox";
        if (ua.search(/Opera/) > -1) return "opera";
        if (ua.search(/OPR/) > -1) return "operaWebkit";
        if (ua.search(/YaBrowser/) > -1) return "yabrowser";
        if (ua.search(/Chrome/) > -1) return "chrome";
        if (ua.search(/Safari/) > -1) return "safari";
        if (ua.search(/maxHhon/) > -1) return "maxHhon";
      }();

      var version;
      switch (bName) {
        case "edge":
        version = (ua.split("Edge")[1]).split("/")[1];
        break;
        case "ie":
        version = (ua.split("MSIE ")[1]).split(";")[0];
        break;
        case "ie11":
        bName = "ie";
        version = (ua.split("; rv:")[1]).split(")")[0];
        break;
        case "firefox":
        version = ua.split("Firefox/")[1];
        break;
        case "opera":
        version = ua.split("Version/")[1];
        break;
        case "operaWebkit":
        bName = "opera";
        version = ua.split("OPR/")[1];
        break;
        case "yabrowser":
        version = (ua.split("YaBrowser/")[1]).split(" ")[0];
        break;
        case "chrome":
        version = (ua.split("Chrome/")[1]).split(" ")[0];
        break;
        case "safari":
        version = ua.split("Safari/")[1].split("")[0];
        break;
        case "maxHhon":
        version = ua.split("maxHhon/")[1];
        break;
      }
      var platform = 'desktop';
      if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
      var browsrObj;
      try {
        browsrObj = {
          platform: platform,
          browser: bName,
          versionFull: version,
          versionShort: version.split(".")[0]
        };
      } catch (err) {
        browsrObj = {
          platform: platform,
          browser: 'unknown',
          versionFull: 'unknown',
          versionShort: 'unknown'
        };
      }
      return browsrObj;
    }
};


  genFunc.initialize();
  window.addEventListener('scroll', function () {
    scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    if (scrollTopPosition > 200) {

    }
  });
  window.addEventListener('load', function () {
      document.querySelector('.navigate').addEventListener('click',function(e) {
        e.preventDefault();
        var element = e.target;
        if (element.getAttribute('href')) {
          var offset = document.getElementById(element.getAttribute('href').slice(1)).offsetTop - document.querySelector('.header').clientHeight;
          scrollTo(document.documentElement,offset,1000);
          document.querySelector('.navigate').classList.remove('visible');
        }
        return false;
      });
      document.querySelector('.logo a').addEventListener('click',function(e) {
        e.preventDefault();
        scrollTo(document.documentElement,0,1000);
        return false;
      });
      document.querySelector('.menu-button').addEventListener('click', function() {
        document.querySelector('.navigate').classList.toggle('visible');
      })
    });
    function scrollTo(element, to, duration) {
      var start = element.scrollTop ;
      if(browserYou.browser === 'firefox'  || browserYou.browser === 'ie11') {
          start = document.documentElement.scrollTop
      }
      var change = to - start,
          currentTime = 0,
          increment = 20,
          scrollTopPosition = document.documentElement.scrollTop ;
      var animateScroll = function(){
          currentTime += increment;
          var val = Math.easeInOutExpo(currentTime, start, change, duration);
          element.scrollTop = val;
          if(browserYou.browser === 'firefox' || browserYou.browser === 'ie11') {
              document.documentElement.scrollTop = val;
          }
          if(currentTime < duration) {
              setTimeout(animateScroll, increment);
          }
      };
      animateScroll();
  }
  Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  };
  Math.easeInOutExpo = function (t, b, c, d) {
      if (t===0) return b;
      if (t===d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
})();
