/* jshint devel:true */

(function ($, window) {

  /* VARIABLES */

  var colors = ['#ffffff', '#27ae60', '#f1c40f', '#e67e22', '#c0392b'];
  var desktop = '(min-width: 768px)';
  var mobile = '(max-width: 768px)';
  var easing = 'easeInOutQuint';
  var currentPosition = 0;
  var timer = 500;
  
  //var currentWidth = $(window).width();
  //var currentWidth = window.matchMedia(mobile).matches ? $(window).width() : $(window).width() + 15;
  //var currentWidth = getCurrentWidth();
  var currentWidth = window.innerWidth;
  var sections = $('.container > div');
  var navigation = $('.container #home ul li');
  var home = $('footer > span.icon-home');
  var footer = $('footer span.icon-breadcrumb');
  var menu = $('#home > div #menu');
  var mobileLeft = $('h1 i.fa-chevron-left');
  var mobileRight = $('h1 i.fa-chevron-right');
  var mobileBottomControls = $('.content > i');
  var backToHome = mobileBottomControls.eq(1);
  var backToTop = mobileBottomControls.eq(0);
  var browser = isFirefox ? 'html' : 'body';

  //var cursor = $('footer span.icon-cursor');

  console.log(currentWidth);

  /* FUNCTIONS */

  function clearActive() {
    footer.each(function () {
      $(this).removeClass('active');
    });
  }

  function getSectionLabel(_currentPosition) {
    var label = [];
    var position = [];

    sections.each(function () {
      label.push($(this).attr('id'));
      position.push($(this).offset().left);
    });

    if (_currentPosition < position[1]) {
      return label[0];
    }
    else if (_currentPosition >= position[1] && _currentPosition < position[2]) {
      return label[1];
    }
    else if (_currentPosition >= position[2] && _currentPosition < position[3]) {
      return label[2];
    }
    else if (_currentPosition >= position[3] && _currentPosition < position[4]) {
      return label[3];
    }
    else if (_currentPosition >= position[4]) {
      return label[4];
    }
  }

  function getSectionIndex(_currentPosition) {
    var position = [];

    sections.each(function () {
      position.push($(this).offset().left);
    });

    if (_currentPosition < position[1]) {
      return 0;
    }
    else if (_currentPosition >= position[1] && _currentPosition < position[2]) {
      return 1;
    }
    else if (_currentPosition >= position[2] && _currentPosition < position[3]) {
      return 2;
    }
    else if (_currentPosition >= position[3] && _currentPosition < position[4]) {
      return 3;
    }
    else if (_currentPosition >= position[4]) {
      return 4;
    }
  }

  function positionWatcher() {
    currentPosition = $(document).scrollLeft();

    var currentSection = getSectionLabel(currentPosition);

    switch (currentSection) {
      case 'home':
        clearActive();
        break;
      case 'about':
        clearActive();
        footer.eq(0).addClass('active');
        break;
      case 'technology':
        clearActive();
        footer.eq(1).addClass('active');
        break;
      case 'content':
        clearActive();
        footer.eq(2).addClass('active');
        break;
      case 'news':
        clearActive();
        footer.eq(3).addClass('active');
        break;
      default:
        clearActive();
        break;
    }
  }

  function setBackToTopColor(position) {
    var sectionIndex = getSectionIndex(position);

    if (sectionIndex) {
      /*backToTop.css({
        'background': colors[sectionIndex],
        'color': 'white'
      });*/
      mobileBottomControls.each(function() {
        $(this).css({
          'background': colors[sectionIndex],
          'color': 'white'
        });
      });
    } else {
      //backToTop.removeAttr('style');
      $(this).removeAttr('style');
    }
  }

  function moveLeft() {
    if (currentPosition > 0) {
      currentPosition -= currentWidth;
      $(browser).animate({scrollLeft: currentPosition}, timer, easing, positionWatcher);
      setBackToTopColor(currentPosition);
    }
  }

  function moveRight() {
    var totalWidth = (sections.length * currentWidth) - currentWidth;

    if (currentPosition < totalWidth) {
      currentPosition += currentWidth;
      $(browser).animate({scrollLeft: currentPosition}, timer, easing, positionWatcher);
      setBackToTopColor(currentPosition);
    }
  }

  function goHome() {
    currentPosition = 0;
    $(browser).animate({scrollLeft: currentPosition}, timer, easing, clearActive);
  }

  /* DOCUMENT READY */

  $(document).ready(function () {

// reset position

    window.setTimeout(function () {
      $(window).scrollLeft(0).scrollTop(0);
    }, 100);

// mobile navigation

    mobileLeft.on('click', moveLeft);

    mobileRight.on('click', moveRight);

    menu.on('click', function () {
      navigation.parent().slideToggle();
    });

// general navigation

    navigation.on('click', function () {
      var index = $(this).index() + 1;

      currentPosition = index * currentWidth;

      $(browser).animate({scrollLeft: currentPosition}, timer, easing, function () {
        positionWatcher();

        if (window.matchMedia(mobile).matches) {
          navigation.parent().slideUp();
          setBackToTopColor(currentPosition);
        }
      });
    });

// footer navigation

    footer.on('click', function () {
      var index = $(this).index();
      currentPosition = index * currentWidth;
      clearActive();
      $(this).addClass('active');
      $(browser).animate({scrollLeft: currentPosition}, timer, easing);
    });

    home.on('click', function () {
      currentPosition = 0;
      $(browser).animate({scrollLeft: 0}, timer, easing, clearActive);
    });

    backToTop.on('click', function () {
      $(browser).animate({scrollTop: 0}, timer, easing);
    });

    backToHome.on('click', function () {
      $(browser).fadeOut('fast').animate({scrollTop: 0, scrollLeft: 0}, 10, easing).fadeIn('fast');
    });



// toggles back to top button

    window.setInterval(function () {

      //console.log($(window).offsetLeft());

      if ($(window).scrollTop()) {
        //backToTop.fadeIn('fast');
        mobileBottomControls.each(function() {
          $(this).fadeIn('fast');
        });
      } else {
        //backToTop.fadeOut('fast');
        mobileBottomControls.each(function() {
          $(this).fadeOut('fast');
        });
      }
    }, 100);

// mousewheel handler

    if (window.matchMedia(desktop).matches) {
      $(browser).on('mousewheel', function (e, delta) {
        positionWatcher();
        this.scrollLeft -= (delta * 30);
        e.preventDefault();
      });
    }

// keyboard navigation

    $(browser).on('keydown', function (e) {
      e.preventDefault();
    });

    $(browser).on('keyup', function (e) {
      var direction = e.keyCode || e.which;

      switch (direction) {
        case 37:
          moveLeft();
          break;
        case 38:
          goHome();
          break;
        case 39:
          moveRight();
          break;
        case 40:
          goHome();
          break;
      }

      e.preventDefault();
    });

// mobile only events

    /*if (window.matchMedia(mobile).matches) {
     console.info('mobile');
     sections.children('h1').each(function (i) {
     $(this).css({
     'position': 'fixed',
     'top': 0,
     'left': (currentWidth * i) + 'px'
     });
     })
     }*/

    /* TODO: Reset position to home */

    /*$(window).offset({
     'top': 0,
     'left': 0
     });*/

    /* TODO: Drag cursor to section */

    /*cursor.draggable({
     axis: 'x',
     containment: "parent",

     drag: function(){
     var offset = $(this).offset();
     var xPos = offset.left - 104;
     var yPos = offset.top;
     //$('#posX').text('x: ' + xPos);
     //$('#posY').text('y: ' + yPos);

     // detect position
     var container = $('footer .breadcrumb-container');
     var fullWidth = container.width() * container.length;
     var elementWidth = container.width();

     if(xPos < container.width()) {
     console.log('small');
     }
     }
     });*/

    /* TODO: Fixed mobile header */

    /*
     $(window).on('scroll', function() {
     sections.children('h1').each(function (i) {
     $(this).css({
     '-webkit-transform': 'translateY('+$(browser).scrollTop()+'px)'
     });
     });
     });*/
  });

}(jQuery, window, undefined));