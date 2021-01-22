$(function () {

    /* Скролл к секции */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("#nav li").removeClass("active");
        $this.addClass("active");

        $("html, body").animate({
            scrollTop: blockOffset - 50
        }, 700);
    });

    /* Мобильное меню */
    var menuOpen = function () {
        $(document).on('click', '.header__toggle', function () {
            $(this).parent().toggleClass('header--open');
            $('.sandwich').toggleClass('sandwich--active');
            $('.header__shadow').toggleClass('header__shadow--open');
        });
        $(document).on('click', '.nav__item', function () {
            $('.header').removeClass('header--open');
            $('.sandwich').removeClass('sandwich--active');
            $('.header__shadow').toggleClass('header__shadow--open');
        });
    };

    /* Slider */
    var disciplineSlider = function () {
        $('.discipline__top').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            swipe: false
        });
        $('.discipline__inner').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: false,
            nextArrow: false,
            focusOnSelect: true,
            asNavFor: '.discipline__top, .discipline__bottom',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '0px',
                        prevArrow: '.discipline__left',
                        nextArrow: '.discipline__right'
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '40px',
                        prevArrow: '.discipline__left',
                        nextArrow: '.discipline__right'
                    }
                },
                {
                    breakpoint: 568,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '0px',
                        prevArrow: '.discipline__left',
                        nextArrow: '.discipline__right'
                    }
                }
            ]
        });
        $('.discipline__bottom').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false,
            swipe: false
        });
        $('.discipline__inner .slick-slide').on('click', function (event) {
            $('.discipline__top, .discipline__bottom').slick('slickGoTo', $(this).data('slickIndex'));
        });
    };

    /* Slider */
    var projectSlider = function () {
        $('.project__top').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false,
            swipe: false,
            asNavFor: '.project__inner'
        });
        $('.project__inner').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '0px',
            focusOnSelect: true,
            prevArrow: '.project__left',
            nextArrow: '.project__right',
            asNavFor: '.project__top, .project__items',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        focusOnSelect: true,
                        centerMode: true,
                        centerPadding: '0px',
                    }
                },
                {
                    breakpoint: 568,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        focusOnSelect: true
                    }
                }
            ]
        });
        $('.project__items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false,
            swipe: false,
            asNavFor: '.project__inner'
        });
    };

    menuOpen();
    disciplineSlider();
    projectSlider();
});

/* Popup-окно */
var body = document.querySelector('body');

var closestItemByClass = function (item, className) {
    var node = item;

    while (node) {
        if (node.classList.contains(className)) {
            return node;
        }

        node = node.parentElement;
    }

    return null;
};

var closestAttr = function (item, attr) {
    var node = item;

    while (node) {
        var attrValue = node.getAttribute(attr);
        if (attrValue) {
            return attrValue;
        }

        node = node.parentElement;
    }

    return null;
};

var showPopup = function (target) {
    target.classList.add('is-active');
}

var closePopup = function (target) {
    target.classList.remove('is-active');
}

var toggleScroll = function () {
    body.classList.toggle('no-scroll');
}

body.addEventListener('click', function (e) {
    var target = e.target;
    var popupClass = closestAttr(target, 'data-popup');

    if (popupClass === null) {
        return;
    }

    e.preventDefault();
    var popup = document.querySelector('.' + popupClass);

    if (popup) {
        showPopup(popup);
        toggleScroll();
    }
});

body.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('popup__close') ||
        target.classList.contains('popup__inner')) {
        console.log(target);
        var popup = closestItemByClass(target, 'popup');

        closePopup(popup);
        toggleScroll();
    }
});

body.addEventListener('keydown', function (e) {
    if (e.keyCode !== 27) {
        return;
    }

    var popup = document.querySelector('.popup.is-active');

    if (popup) {
        closePopup(popup);
        toggleScroll();
    }
});