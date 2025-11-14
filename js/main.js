(function($) {
  "use strict";

  const stellarSettings = {
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  };

  const namespacedResizeEvent = 'resize.fullHeight';

  const ensureFullHeight = function() {
    $('.js-fullheight').css('height', $(window).height());
    if (!ensureFullHeight.bound) {
      $(window)
        .off(namespacedResizeEvent)
        .on(namespacedResizeEvent, function() {
          $('.js-fullheight').css('height', $(window).height());
        });
      ensureFullHeight.bound = true;
    }
  };

  const loader = function() {
    setTimeout(function() {
      if ($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show');
      }
    }, 1);
  };

  const initCarousel = function() {
    const settings = {
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    };

    $('.carousel-testimony').each(function() {
      const $carousel = $(this);
      if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel');
        const $stage = $carousel.find('.owl-stage-outer');
        if ($stage.length) {
          $stage.children().unwrap();
          $stage.remove();
        }
        $carousel.removeClass('owl-loaded');
        $carousel.find('.owl-nav, .owl-dots').remove();
      }
      $carousel.owlCarousel(settings);
    });
  };

  const bindDropdownHover = function() {
    if (bindDropdownHover.bound) {
      return;
    }

    $('nav .dropdown').hover(
      function() {
        const $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
      },
      function() {
        const $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
      }
    );

    $('#dropdown04').on('show.bs.dropdown', function() {
      console.log('show');
    });

    bindDropdownHover.bound = true;
  };

  const initMagnificPopup = function() {
    $('.image-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      },
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  };

  const initCounter = function() {
    if (!$.fn.waypoint) {
      return;
    }

    $('#section-counter').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
          const commaSeparator = $.animateNumber.numberStepFactories.separator(',');
          $('.number').each(function() {
            const $this = $(this);
            const num = $this.data('number');
            $this.animateNumber(
              {
                number: num,
                numberStep: commaSeparator
              },
              7000
            );
          });
        }
      },
      { offset: '95%' }
    );
  };

  const initContentWayPoint = function() {
    if (!$.fn.waypoint) {
      return;
    }

    let i = 0;
    $('.ftco-animate').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
          i++;
          $(this.element).addClass('item-animate');
          setTimeout(function() {
            $('body .ftco-animate.item-animate').each(function(k) {
              const el = $(this);
              setTimeout(
                function() {
                  const effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn ftco-animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft ftco-animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight ftco-animated');
                  } else {
                    el.addClass('fadeInUp ftco-animated');
                  }
                  el.removeClass('item-animate');
                },
                k * 50,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '95%' }
    );
  };

  const initPickers = function() {
    if ($.fn.datepicker) {
      $('.appointment_date').each(function() {
        const $this = $(this);
        if ($this.data('datepicker')) {
          $this.datepicker('destroy');
        }
        $this.datepicker({
          format: 'm/d/yyyy',
          autoclose: true
        });
      });
    }

    if ($.fn.timepicker) {
      $('.appointment_time').each(function() {
        const $this = $(this);
        if ($this.data('timepicker')) {
          $this.timepicker('remove');
        }
        $this.timepicker();
      });
    }
  };

  const initializeDynamicContent = function() {
    ensureFullHeight();
    initCarousel();
    initMagnificPopup();
    initCounter();
    initContentWayPoint();
    initPickers();
  };

  const bootstrapSite = function() {
    $(window).stellar(stellarSettings);
    ensureFullHeight();
    loader();
    bindDropdownHover();
    initializeDynamicContent();
  };

  $(bootstrapSite);

  window.reinitializeDynamicContent = initializeDynamicContent;
})(jQuery);
