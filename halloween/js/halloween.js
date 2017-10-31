jQuery(function ($) {
    var now = new Date();
    var halloweenAnimate = function (t) {
        // 背景变黑
        if (t > 1000) {
            if (t <= 2000) {
                var gray = 255 - parseInt(255 * (t - 1000) / 1000);
                $('body').css('background-color', 'rgb(' + gray + ', ' + gray + ', ' + gray + ')');
            } else {
                $('body').css('background-color', '#000');
            }
        }

        // 标题图消失
        if (t > 2000) {
            if (t <= 3000) {
                var opacity = 1 - (t - 2000) / 1000;
                $('.banner').css('opacity', opacity);
            } else {
                $('.banner').css('opacity', '0');
            }
        }

        // 全屏变黑
        if (t > 4000) {
            var $halloweenCover = $('.halloween-cover');
            if (!$halloweenCover.length) {
                $halloweenCover = $('<div class="halloween-cover"></div>');
                $halloweenCover.css('background-color', '#000');
                $halloweenCover.css('opacity', '0');
                $halloweenCover.css('position', 'fixed');
                $halloweenCover.css('left', '0');
                $halloweenCover.css('top', '0');
                $halloweenCover.css('right', '0');
                $halloweenCover.css('bottom', '0');
                $halloweenCover.css('z-index', '99999');
                $('body').append($halloweenCover);
            }
            if (t <= 5000) {
                var opacity = (t - 4000) / 1000;
                $halloweenCover.css('opacity', opacity);
            } else {
                $halloweenCover.css('opacity', '1');
            }
        }

        // 出现文字
        if (t > 6000) {
            var $halloweenTitle = $('.halloween-title');
            if (!$halloweenTitle.length) {
                $halloweenTitle = $('<h1 class="halloween-title"></h1>');
                $halloweenTitle.css('position', 'absolute');
                $halloweenTitle.css('color', '#ccc');
                $halloweenTitle.css('left', '0');
                $halloweenTitle.css('right', '0');
                $halloweenTitle.css('bottom', '50%');
                $halloweenTitle.css('text-align', 'center');
                $halloweenCover.append($halloweenTitle);
            }
            if (t <= 6700) {
                $halloweenTitle.text('？'.repeat(1 + (t - 6000) / 100));
            } else {
                $halloweenTitle.text('？'.repeat(8));
            }
        }

        // 文字
        if (t > 7500) {
            if (t <= 8500) {
                $halloweenTitle.text('发生了什么' + '？'.repeat(1 + (t - 7500) / 250));
            } else {
                $halloweenTitle.text('发生了什么？？？？？');
            }
        }

        // 弹出图片
        if (t > 8500) {
            $halloweenTitle.text('');
            var $halloweenImage = $('.halloween-image');
            if (!$halloweenImage.length) {
                $halloweenImage = $('<img class="halloween-image" width="686" height="674" src="halloween/images/pumpkin.png">');
                $halloweenImage.css('position', 'absolute');
                $halloweenImage.css('left', '50%');
                $halloweenImage.css('top', '50%');
                $halloweenCover.append($halloweenImage);
                $halloweenImage.css('margin-left', -$halloweenImage.width() / 2);
                $halloweenImage.css('margin-top', -$halloweenImage.height() / 2);
            }
            var baseScale = 0.9 * Math.min(window.innerWidth / 686, window.innerHeight / 674);
            if (t <= 11000) {
                var x = (t - 8500) / 1000;
                var y = baseScale * (1 - 3 * Math.cos(8 * (x + 0.15)) * Math.exp(-5 * x));
                $halloweenImage.css('transform', 'scale(' + y + ')');
            } else {
                $halloweenImage.css('transform', 'scale(' + baseScale + ')');
            }
        }

        // 图片消失
        if (t > 10000) {
            if (t <= 11000) {
                var opacity = 1 - (t - 10000) / 1000;
                $halloweenImage.css('opacity', opacity);
            } else {
                $halloweenImage.css('opacity', '0');
            }
        }

        // 文字
        if (t > 11000) {
            $halloweenTitle.text('HAPPY HALLOWEEN!');
            if (t <= 12000) {
                var opacity = (t - 11000) / 1000;
                $halloweenTitle.css('opacity', opacity);
            } else {
                $halloweenTitle.css('opacity', '');
            }
        }

        // 版权
        if (t > 12000) {
            var $halloweenCopyright = $('.halloween-copyright');
            if (!$halloweenCopyright.length) {
                $halloweenCopyright = $('<h6 class="halloween-copyright">eeyes.net 2017-10-31 Halloween Special Page.</h6>');
                $halloweenCopyright.css('position', 'absolute');
                $halloweenCopyright.css('color', '#999');
                $halloweenCopyright.css('bottom', '0');
                $halloweenCopyright.css('right', '0');
                $halloweenCopyright.css('font-size', '10px');
                $halloweenCopyright.css('text-align', 'right');
                $halloweenCover.append($halloweenCopyright);
            }
            if (t <= 13000) {
                var opacity = (t - 12000) / 1000;
                $halloweenCopyright.css('opacity', opacity);
            } else {
                $halloweenCopyright.css('opacity', '');
            }
        }

        // 结束
        if (t > 14000) {
            $('body').css('background-color', '');
            $('.banner').css('opacity', '');
            if (t <= 15000) {
                var opacity = 1 - (t - 14000) / 1000;
                $halloweenCover.css('opacity', opacity);
            } else {
                $halloweenCover.css('opacity', '0');
            }
        }

        return t >= 15000;
    };
    var t0 = Date.now();
    if (t0 >= Date.parse('2017-10-30 12:00:00')
        && t0 < Date.parse('2017-11-01 12:00:00')) {
        // 预缓存图片
        $halloweenImageCache = $('<img class="halloween-image-cache" style="display: block; position: absolute; top: 0; left: 0; opacity: 0;" width="1" height="1" src="halloween/images/pumpkin.png">');
        $('body').append($halloweenImageCache);
        $halloweenImageCache.on('load', function () {
            var t0 = Date.now();
            var timer = setInterval(function () {
                var t = Date.now();
                t = t - t0;
                if (halloweenAnimate(t)) {
                    clearInterval(timer);
                    $('body').css('background-color', '');
                    $('.banner').css('opacity', '');
                    $('.halloween-cover').remove();
                    $('.halloween-image-cache').remove();
                }
            }, 16);
        });
    }
});
