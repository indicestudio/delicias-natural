$(document).ready(function () {

  /* /////////////////////BARBA JS//////////////// */
  Barba.Pjax.start();
  Barba.Prefetch.init();

  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      return $(this.oldContainer).animate({
        opacity: 0
      }).promise();
    },

    fadeIn: function () {

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: 0
      });

      $el.animate({
        opacity: 1
      }, 400, function () {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
    }
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function () {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
  };


  Barba.Dispatcher.on('linkClicked', function(currentStatus, oldStatus, container) {
    //console.log(container);
  });

  function loadTime() {
    $('.box:lt(3), .button-box').css("margin-top", 0);
    $('.box:last-child()').css("margin-bottom", 0);
  }

  var arrow = $('.up-arrow');
  $('.box').click(function (e) {
    $('section').addClass('filter-backdrop');
  });

  $('.modal.fade').click(function () {
    $('section').removeClass('filter-backdrop');
  });

  $('.button-box ul li').click(function () {
    //console.log(this);
  });


  var links = document.querySelectorAll('a[href]');
  var cbk = function(e) {
  if(e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
  };

  for(var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }



  /* -----------   Instagram Feed ----------------- */
  var userId = '4991088147';
  var appToken = '3860040881.ab8fe28.2ddb545fa3f74b73b9099dd118d17435';

  $.ajax({
      url: 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + appToken,
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      success: function (e) {
        var images = e.data[0].images.standard_resolution.url;
        var post = e.data;
        //console.log(e);
        post.forEach(function (el, index, array) {
          var imgURL = el.images.standard_resolution.url;
          var instaURL = el.link;
          var likes = el.likes.count; 
          $('#instagram-feed .container')
            .append('<div class="col-sm-3 insta-img no-gutters"><a href="' 
              + instaURL 
              + '" target="_blank"><img src=' 
              + imgURL 
              + '><span>' + likes + ' <i class="fa fa-heart" aria-hidden="true"></i></span></a>'
              + '</div>');
        });
      }
  });

  /**
   * Smooth scrolling jquery support
   */
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  /**
   * Scroll position
   */

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    if (scroll == 0) {
      arrow.css({
        opacity: '0',
        transform: 'translateY(-100%)'
      })
    }
    if (scroll > 100) {
      arrow.css({
        opacity: '1',
        transform: 'translateY(0)'
      })
    }
  });



});