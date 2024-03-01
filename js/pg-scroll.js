$(function () {
    const ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
        // スマートフォン
        $('#pg-scroll-top').click(function () {
            //id名#pg-scroll-topがクリックされたら、以下の処理を実行
            $("html,body").animate({
                scrollTop: 0
            }, 100);
        });
        $('#pg-scroll-bottom').click(function () {
            //id名#pg-scroll-bottomがクリックされたら、以下の処理を実行
            $("html,body").animate({
                scrollTop: $(document).height()
            }, 100);
        });
        $(function () {
            $('a[href^="#"]').click(function () {
                let speed = 100;
                let href = $(this).attr("href");
                let target = $(href == "#" || href == "" ? 'html' : href);
                let position = target.offset().top;
                $("html, body").animate({
                    scrollTop: position
                }, speed, "swing");
                return false;
            });
        });
    } else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
        // タブレット
        $('#pg-scroll-top').click(function () {
            //id名#pg-scroll-topがクリックされたら、以下の処理を実行
            $("html,body").animate({
                scrollTop: 0
            }, 100);
        });
        $('#pg-scroll-bottom').click(function () {
            //id名#pg-scroll-bottomがクリックされたら、以下の処理を実行
            $("html,body").animate({
                scrollTop: $(document).height()
            }, 100);
        });
        $(function () {
            $('a[href^="#"]').click(function () {
                let speed = 100;
                let href = $(this).attr("href");
                let target = $(href == "#" || href == "" ? 'html' : href);
                let position = target.offset().top;
                $("html, body").animate({
                    scrollTop: position
                }, speed, "swing");
                return false;
            });
        });
    } else {
        // PC
        $('#pg-scroll-top').click(function () {
            //id名#pg-scroll-topがクリックされたら、以下の処理を実行
            $("html,body").animate({
                scrollTop: 0
            }, 0);
        });
        $('#pg-scroll-bottom').click(function () {
            //id名#pg-scroll-bottomがクリックされたら、以下の処理を実行
            $("html,body").animate({
                scrollTop: $(document).height()
            }, 0);
        });
        $(function () {
            $('a[href^="#"]').click(function () {
                let speed = 0;
                let href = $(this).attr("href");
                let target = $(href == "#" || href == "" ? 'html' : href);
                let position = target.offset().top;
                $("html, body").animate({
                    scrollTop: position
                }, speed, "swing");
                return false;
            });
        });
    }
});
