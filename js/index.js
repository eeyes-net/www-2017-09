jQuery(function ($) {
    var swiper = new Swiper('.our-team-introduction-window', {
        centeredSlides: true,
        slideToClickedSlide: true,
        prevButton: '.our-team-arrow.left',
        nextButton: '.our-team-arrow.right',
        loop: true,
        loopedSlides: 2,
        onSlideChangeEnd: function (swiper) {
            var teamName = swiper.slides.filter('[data-swiper-slide-index="' + swiper.realIndex + '"]').data('name');
            var $ourTeamName = $('.our-team-name');
            $ourTeamName.attr('src', $ourTeamName.data('src-prefix') + teamName + $ourTeamName.data('src-suffix'));
            swiper.fixLoop();
        }
    });
    $('.our-team-department').on('click', function () {
        var teamName = $(this).data('name');
        var slides = swiper.slides;
        var minDistance = slides.length, minIndex;
        for (var i = 0; i < slides.length; ++i) {
            if (slides[i].dataset.name === teamName) {
                var distance = Math.abs(i - swiper.activeIndex);
                if (distance < minDistance) {
                    minDistance = distance;
                    minIndex = i;
                }
            }
        }
        swiper.slideTo(minIndex);
    });
});