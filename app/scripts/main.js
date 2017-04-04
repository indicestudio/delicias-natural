$(document).ready(function () {

  $('.box').click(function (e) {
    $('section').addClass('filter-backdrop');
  });

  $('.modal.fade').click(function () {
    $('section').removeClass('filter-backdrop');
  });

  $('.button-box ul li').click(function () {
    console.log(this);
  });

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

  /* -----------   Instagram Feed ----------------- */
  var userId = '3860040881';
  var appToken = '3860040881.a12c878.26faa4846d984563a59c9b23aa846447';
  $.getJSON({
    url: 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + appToken,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: function (e) {
      var images = e.data[0].images.standard_resolution.url;
      var post = e.data;
      post.forEach(function (el, index, array) {
        var imgURL = el.images.standard_resolution.url;
        $('section').append('<img src=' + imgURL + '>')
        console.log(imgURL);
      });

    }
  });
});