jQuery(function ($) {
    var fixOurTeamIntroductionSize = function () {
        var $ourTeamIntroductionContainer = $('.our-team-introduction-container');
        $ourTeamIntroductionContainer.height($ourTeamIntroductionContainer.width() * 415 / 1213);
    };
    $(window).on('resize', fixOurTeamIntroductionSize);
    $('.our-team-introduction-container .swiper-slide').on('load', fixOurTeamIntroductionSize);
    var ourTeamIntroductionSwiper = new Swiper('.our-team-introduction-container', {
        centeredSlides: true,
        slideToClickedSlide: true,
        prevButton: '.our-team-arrow.left',
        nextButton: '.our-team-arrow.right',
        loop: true,
        loopedSlides: 2,
        onSlideChangeEnd: function (swiper) {
            var teamName = swiper.slides.filter('[data-swiper-slide-index="' + swiper.realIndex + '"]').data('name');
            $('.our-team-name').attr('data-name', teamName);
            swiper.fixLoop();
        }
    });
    $('.our-team-department').on('click', function () {
        var teamName = $(this).data('name');
        var slides = ourTeamIntroductionSwiper.slides;
        var activeIndex = ourTeamIntroductionSwiper.activeIndex;
        var minDistance = slides.length, minIndex;
        for (var i = 0; i < slides.length; ++i) {
            if (slides[i].dataset.name === teamName) {
                var distance = Math.abs(i - activeIndex);
                if (distance < minDistance) {
                    minDistance = distance;
                    minIndex = i;
                }
            }
        }
        ourTeamIntroductionSwiper.slideTo(minIndex);
    });
});
jQuery(function ($) {
    var translateY = function (el, offset) {
        var translate = 'translate(0, ' + offset + 'px)';
        el.style.webkitTransform = translate;
        el.style.mozTransform = translate;
        el.style.msTransform = translate;
        el.style.oTransform = translate;
        el.style.transform = translate;
    };
    var $items = $('.project-item.scale');
    $(window).on('scroll', function () {
        var lastItemTop = $items.last().offset().top;
        var firstItemHeight = $items.first().height();
        var reset = false;
        if (window.innerWidth > 640 || lastItemTop <= window.scrollY) {
            reset = true;
        }
        $items.each(function () {
            var $item = $(this);
            var $wrapper = $item.find('.project-item-wrapper');
            var offset = window.scrollY - $item.offset().top;
            if (offset < 0 || reset) {
                offset = 0;
            }
            translateY($wrapper[0], .5 * offset);
            $wrapper.css('opacity', (1 - .6 * offset / firstItemHeight))
        });
    });
    $(window).on('resize', function () {
        $(window).trigger('scroll');
    })
});
