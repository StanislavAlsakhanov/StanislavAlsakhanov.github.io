$(function () {

    /* Скролл вверх */
    let scrollTop = function () {
        $('.scroll-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1000);
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                $('.scroll-top').addClass('active');
            }
            else {
                $('.scroll-top').removeClass('active');
            }
        });
    };

    /* Мобильное меню */
    let openMobile = function () {
        $(document).on('click', '.sandwich', function () {
            $(this).parent().toggleClass('mobile--open');
            $(this).toggleClass('is-active');
        });
    };

    /* Фильтр-Слайдер */
    var filterSlider = function () {
        $(".filter-slider__range").each(function () {
            let slider = $(this)[0],
                sliderFrom = $(this)
                    .parent()
                    .find(".filter-slider__value--from")[0],
                sliderTo = $(this)
                    .parent()
                    .find(".filter-slider__value--to")[0],
                inputs = [sliderFrom, sliderTo],
                type = $(this).data('range-type');

            if (type === "price") {
                noUiSlider.create(slider, {
                    start: [5000, 185000],
                    connect: true,
                    range: {
                        min: 5000,
                        max: 185000
                    },
                    format: wNumb({
                        decimals: 0,
                        thousand: ' ',
                    })
                });
            }
            slider.noUiSlider.on("update", function (values, handle) {
                inputs[handle].value = values[handle];
            });
            inputs.forEach(function (input, handle) {
                input.addEventListener('change', function () {
                    slider.noUiSlider.setHandle(handle, this.value);
                });
            });
        });
    };

    /* Перекидка фильтра */
    var filter = function () {
        var el = $('.filter');
        if (window.innerWidth < 768) {
            el.appendTo('.category__content');
        } else {
            el.appendTo('.category__aside')
        }
    };

    /* Перекидка блока */
    var goodsInfoBox = function () {
        var el = $('.goods-info__box');
        if (window.innerWidth < 568) {
            el.appendTo('.goods-info__hidden');
        } else {
            el.appendTo('.goods-info__col')
        }
    };

    /* Перекидка блока */
    var orderingAside = function () {
        var el = $('.ordering__aside');
        if (window.innerWidth < 992) {
            el.appendTo('.ordering__hidden');
        } else {
            el.appendTo('.ordering__top')
        }
    };

    /* Фильтр-мобайл */
    var filterMobile = function () {
        $(document).on('click', '.category__toggle', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).next().slideUp();
            } else {
                $(this).addClass('active');
                $(this).next().slideDown();
            }
        })
    };

    /* Рейтинг звезд */
    var ratingItem = function () {
        $(document).on('click', '.rating__item', function () {
            var ratingItem = $(this).data('star');
            $(this).addClass('rating__item--current').siblings().removeClass('rating__item--current');
            $(this).parent().siblings('.rating__text').html('<span>' + ratingItem + '</span>')
        })
    };

    /* Counter*/
    var counter = function () {
        $('.counter__btn--minus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.counter__btn--plus').click(function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
    };

    /* Удаление товара из корзины */
    var basketProductRemove = function () {
        $(document).on('click', '.basket__close', function () {
            if ($(this).closest('.basket__main').find('.basket__item').length === 1) {
                $(this).closest('.basket__main').remove();
            }
            $(this).closest('.basket__item').remove();
        })
    };

    /* Валидация форм */
    var formValidate = function () {

        jQuery.validator.addMethod("minlenghtphone", function (value) {
            return value.replace(/\D+/g, '').length > 10;
        });

        $('form').each(function () {
            $(this).on('submit', function () {
                $(this).validate({
                    rules: {
                        name: 'required',
                        email: 'required',
                        password: 'required',
                        message: 'required',
                        tel: {
                            required: true,
                            minlenghtphone: true
                        },
                    },
                    onkeyup: false,
                    messages: {
                        name: 'Введите ваше имя',
                        tel: 'Введите ваш телефон',
                        email: 'Введите адрес электронной почты',
                        password: 'Введите ваш пароль',
                        message: 'Заполните текст сообщения',
                    },
                });
                if ($(this).valid()) {
                    var wrap = $(this)[0].closest('.popup__sending');
                    if (wrap) {
                        $(wrap).siblings('.popup__success').show();
                        $(wrap).hide();
                    }
                }
                return false;
            })
        });
    };

    scrollTop();
    openMobile();
    filterSlider();
    filter();
    filterMobile();
    ratingItem();
    counter();
    goodsInfoBox();
    basketProductRemove();
    formValidate();
    orderingAside();
});

/* Перекидка фильтра */
var filter = function () {
    var el = $('.filter');
    if (window.innerWidth < 768) {
        el.appendTo('.category__content');
    } else {
        el.appendTo('.category__aside')
    }
};

/* Перекидка блока */
var goodsInfoBox = function () {
    var el = $('.goods-info__box');
    if (window.innerWidth < 568) {
        el.appendTo('.goods-info__hidden');
    } else {
        el.appendTo('.goods-info__col')
    }
};

/* Перекидка блока */
var orderingAside = function () {
    var el = $('.ordering__aside');
    if (window.innerWidth < 992) {
        el.appendTo('.ordering__hidden');
    } else {
        el.appendTo('.ordering__top')
    }
};

$(window).on('resize', function () {
    filter();
    goodsInfoBox();
    orderingAside()
});

/* Слайдер в шапке */
var swiper = new Swiper('.slider__container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    loop: true,
    speed: 800,
    grabCursor: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: true,
        disableOnInteraction: false,
    },
});

/* Слайдер в специальных ценах */
var swiper = new Swiper('.special-prices__container', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 27,
        },
    }
});

/* Слайдер в брендах */
var swiper = new Swiper('.brands__container', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: true,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
});

/* Слайдер в акциях */
var swiper = new Swiper('.actions__container', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 27,
        }
    }
});

/* Слайдер в инстаграме */
// var swiper = new Swiper('.instagram__container', {
//     slidesPerView: 2,
//     loop: true,
//     autoplay: {
//         delay: 3000,
//         stopOnLastSlide: true,
//         disableOnInteraction: false,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     breakpoints: {
//         480: {
//             slidesPerView: 3,
//         },
//         640: {
//             slidesPerView: 4,
//         },
//         768: {
//             slidesPerView: 5,
//         },
//         992: {
//             slidesPerView: 6,
//         },
//     }
// });

/* Слайдер Вас также заинтересует  */
var swiper = new Swiper('.interest__container', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 27,
        },
    }
});

/* Маска телефона */
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

/* Анимация */
const animItems = document.querySelectorAll('.anim-items');
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('is-active');
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('is-active');
                }
            }

        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}

/* Countdown */
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = "January 01 2018 00:00:00 GMT+0300";
var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('countdown', deadline);