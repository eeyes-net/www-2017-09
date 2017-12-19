jQuery(function ($) {
    var ChristmasTheme = function () {
        return {};
    };

    /**
     * 添加圣诞节依赖库
     */
    ChristmasTheme.script = function () {
        $("head").append('<script src="./christmas/dist/js/jquery.color-2.1.2.min.js"></script>')
            .append('<script src="./christmas/dist/js/snowfall.jquery.min.js"></script>');
    };

    /**
     * 添加圣诞节样式表
     */
    ChristmasTheme.styles = function () {
        $("head").append('<link rel="stylesheet" href="./christmas/css/christmas.css" type="text/css">');
    };

    /**
     * 缓存图片
     * @param callback
     */
    ChristmasTheme.cache = function (callback) {
        var images = [
            './christmas/images/banner/bg.png',
            './christmas/images/banner/snow.png',
            './christmas/images/department/house.png',
            './christmas/images/department/group/snow/1.png',
            './christmas/images/department/group/snow/2.png',
            './christmas/images/department/group/snow/3.png',
            './christmas/images/department/group/snow/4.png',
            './christmas/images/items/flake.gif',
            './christmas/images/member/bg.png',
            './christmas/images/project/dear.png',
            './christmas/images/project/hat.png',
            './christmas/images/project/snowman.png',
            './christmas/images/project/tree.png'
        ];
        var cachedImageCount = 0;
        var $cacheContainer = $('<div class="christmas-cache-container" style="display: none;"></div>');
        for (var i = 0; i < images.length; ++i) {
            var $cacheImage = $('<img class="christmas-cache-image">');
            $cacheImage.on('load', function () {
                ++cachedImageCount;
                if (cachedImageCount >= images.length) {
                    callback && callback();
                }
            });
            $cacheImage.attr('src', images[i]);
            $cacheContainer.append($cacheImage);
        }
        $('body').append($cacheContainer);
    };

    /**
     * 下雪特效
     */
    ChristmasTheme.snowfall = function () {
        $(document).snowfall({
            deviceorientation: true,
            image: "./christmas/images/items/flake.gif",
            minSize: 1,
            maxSize: 10,
            flakeCount: 100
        });
    };

    /**
     * 转换主题动画
     */
    ChristmasTheme.animate = function () {
        // 背景变色，文字变色
        $('body').css('background-color', '#fff');
        $('body').animate({
            color: '#eee',
            backgroundColor: '#335'
        }, 1000);
        $('.project h2').animate({
            color: '#eee',
            borderColor: '#eee'
        }, 1000);

        // Banner换图
        $('.banner-bg').after('<img class="banner-bg christmas-banner-bg" src="./christmas/images/banner/bg.png" style="opacity: 0;">');
        $('.christmas-banner-bg').animate({
            opacity: 1
        }, 1000);
        setTimeout(function () {
            $('.banner-bg').not('.christmas-banner-bg').animate({
                opacity: 0
            }, 500);
        }, 500);

        // Banner积雪
        setTimeout(function () {
            $('.banner-body .container').prepend('<div class="christmas-theme-element christmas-banner-snow" style="opacity: 0"><img src="./christmas/images/banner/snow.png"></div>');
            $('.christmas-banner-snow').animate({
                opacity: 1
            }, 1000);
        }, 1000);
    };

    /**
     * 使用圣诞节主题
     */
    ChristmasTheme.changeTheme = function () {
        // 使用圣诞节主题
        $('body').addClass('christmas');

        // 产品展示第1块左上角的帽子
        $('.project-item').eq(0).prepend('<div class="christmas-theme-element christmas-project-hat"><img src="./christmas/images/project/hat.png"></div>');
        // 产品展示第4块左边的鹿
        $('.project-item').eq(3).prepend('<div class="christmas-theme-element christmas-project-snowman"><img src="./christmas/images/project/snowman.png"></div>');
        // 产品展示第9块左边的鹿
        $('.project-item').eq(8).prepend('<div class="christmas-theme-element christmas-project-dear"><img src="./christmas/images/project/dear.png"></div>');
        // 产品展示第12块右下角的树
        $('.project-item').eq(11).prepend('<div class="christmas-theme-element christmas-project-tree"><img src="./christmas/images/project/tree.png"></div>');

        // 我们的团队各部门下方积雪
        $('.our-team-group').each(function (index) {
            $(this).append('<div class="christmas-theme-element christmas-team-group-snow"><img src="./christmas/images/department/group/snow/' + (index + 1) + '.png"></div>');
        });
        // 我们的团队各部门下方房子
        $('.our-team').append('<div class="christmas-theme-element christmas-team-house"><img src="./christmas/images/department/house.png"></div>');
    };

    /**
     * 向Canvas中画原始图片
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLImageElement} img
     */
    ChristmasTheme.canvasDrawOriginalImage = function (canvas, img) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };

    /**
     * 向Canvas中画雪
     * @param {HTMLCanvasElement} canvas
     * @param {number} density
     * @param {number} maxSize
     */
    ChristmasTheme.canvasDrawSnow = function (canvas, density, maxSize) {
        density = density || 10;
        maxSize = maxSize || 10;
        var circleCount = 1 + canvas.width * canvas.height / 10000 * density;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        for (var i = 0; i < circleCount; ++i) {
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            var r = Math.random() * maxSize;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            if (Math.random() > .5) {
                ctx.stroke();
            } else {
                ctx.fill();
            }
        }
    };

    /**
     * 画雪
     */
    ChristmasTheme.drawSnow = function () {
        // 图片中的白点
        $('.banner-container img, .project-item.scale a img').each(function () {
            var canvas = document.createElement('canvas');
            ChristmasTheme.canvasDrawOriginalImage(canvas, this);
            ChristmasTheme.canvasDrawSnow(canvas, 1, 5);
            this.src = canvas.toDataURL();
        });
        // 我们的团队背景的白点
        (function () {
            var canvas = document.createElement('canvas');
            var $ourTeamBody = $('.our-team-body');
            canvas.width = $ourTeamBody.outerWidth();
            canvas.height = $ourTeamBody.outerHeight();
            ChristmasTheme.canvasDrawSnow(canvas, 1, 5);
            $ourTeamBody.css('background-image', 'url(' + canvas.toDataURL() + ')');
        })();
    };

    /**
     * 开始转换主题
     */
    ChristmasTheme.start = function () {
        setTimeout(function () {
            ChristmasTheme.animate();
        }, 1000);
        setTimeout(function () {
            ChristmasTheme.changeTheme();
            // ChristmasTheme.snowfall();
        }, 2000);
        setTimeout(function () {
            ChristmasTheme.drawSnow();
        }, 2500);
    };

    /**
     * 初始化：加载脚本、加载样式、缓存图片
     */
    ChristmasTheme.init = function () {
        ChristmasTheme.script();
        ChristmasTheme.styles();
        var loadedCount = 0;
        var callback = function () {
            ++loadedCount;
            if (loadedCount >= 2 || document.readyState === 'complete') {
                ChristmasTheme.start();
            }
        };
        ChristmasTheme.cache(callback);
        $(window).on('load', callback);
    };

    (function () {
        /**
         * @link https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
         * @param name
         * @param url
         * @returns {*}
         */
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var now = new Date();
        var begin = new Date('2017-12-24 00:00:00');
        var end = new Date('2017-12-25 23:59:59');
        // 24日、25日全天开放，或者通过?christmas=1访问
        if (begin < now && now < end || getParameterByName('christmas')) {
            ChristmasTheme.init();
        }
    })();
});