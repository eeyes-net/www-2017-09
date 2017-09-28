jQuery(function ($) {
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