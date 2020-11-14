"use strict";

$(document).ready(function () {
  svg4everybody({});

  var menuDesktop = function menuDesktop() {
    $(document).on('click', '.sandwich', function () {
      $(this).parent().toggleClass('header-main__menu--open');
    });
  };

  menuDesktop();
  /* Меню-Слайдер */

  var menuSlider = function menuSlider() {
    $('.header-bottom__list').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      infinite: false,
      prevArrow: '.header-slider__nav--prev',
      nextArrow: '.header-slider__nav--next',
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    });
  };

  menuSlider();
  /* Меню-Слайдер */

  var BannerSlider = function BannerSlider() {
    $('.slider__inner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false
    });
  };

  BannerSlider();
  /* Бренд-Слайдер */

  var brendsSlider = function brendsSlider() {
    $('.brands__list').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      infinite: false,
      prevArrow: '.brands-slider__nav--prev',
      nextArrow: '.brands-slider__nav--next',
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    });
  };

  brendsSlider();
  /* Новости-Слайдер */

  var newsSlider = function newsSlider() {
    $('.news__body').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    });
  };

  newsSlider();
  /* Cтатьи-Слайдер */

  var articlesSlider = function articlesSlider() {
    $('.articles__body').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    });
  };

  articlesSlider();

  var sandwichToggle = function sandwichToggle() {
    var sandwichElements = document.querySelectorAll('.sandwich');
    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      var targetId = this.getAttribute('data-target-id'),
          targetClassToggle = this.getAttribute('data-target-class-toggle');
      this.classList.toggle('is-active');

      if (targetId && targetClassToggle) {
        document.getElementById(targetId).classList.toggle(targetClassToggle);
      }
    }
  };

  sandwichToggle();
}); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}