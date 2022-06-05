// layout accordion jsfunction
var tabs = {
    normal: function() {

        console.log('o normalTabs setting')

        var t = {};
        t.block = '._normalTabs';
        t.navCover = '._tabsNavCover';
        t.nav = '._tabsNav';
        t.contentCover = '._tabsContentCover';
        t.content = '._tabsContent';
        t.activeCss = '_active';
        t.attrOpen = 'tabs-open';
        t.attrContent = 'tabs-target';
        t.attrSpeed = 'tabs-speed';
        t.attrClose = 'tabs-close';
        t.defaultSpeed = 500; // 預設設定開啟與關閉動畫時間
        t.defaultClose = 'on';

        $(t.block).each(function() {

            var $navs = $(this).find(t.nav);

            $navs.each(function() {

                var $nav = $(this),
                    $navCover = $nav.parent(t.navCover),
                    $block = $nav.parents(t.block),
                    thisOpen = $nav.attr(t.attrOpen);

                // 判斷是否設定為預設開啟
                if (thisOpen === 'on') {
                    $block.find($nav.attr(t.attrContent)).slideToggle();
                    $nav.addClass(t.activeCss);
                }

                // Click 事件綁定
                $nav.on('click', function() {
                    var $this = $(this),
                        content = $this.attr(t.attrContent),
                        speed = parseInt($this.attr(t.attrSpeed)) || t.defaultSpeed,
                        close = $this.attr(t.attrClose) || t.defaultClose,
                        $block = $this.parents(t.block),
                        $cover = $this.parents(t.navCover),
                        $navs = $block.find(t.nav),
                        $content = $block.find(content);

                    //判斷 accordion target 物件物否存在
                    if (typeof $content !== 'undefined' && $content.length >= 1) {

                        // 判斷是否已經開啟
                        if (!$cover.hasClass(t.activeCss)) {

                            //判斷是否設定要再開啟前關閉其他 accordion target 
                            close === t.defaultClose ? $block.find(t.content).slideUp(t.defaultSpeed) : undefined

                            $content.slideToggle(speed);
                            $navs.removeClass(t.activeCss);
                            $this.addClass(t.activeCss);

                            // 判斷是否已經開啟
                        } else if ($cover.hasClass(t.activeCss)) {
                            $navs.removeClass(t.activeCss);
                            $content.slideToggle(speed);
                        }
                    }
                })


            })
        })
    },
    normalAjax: function() {},
    common: function() {
        tabs.normal();
        tabs.normalAjax();
    }
}