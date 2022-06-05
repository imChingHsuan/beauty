// layout accordion jsfunction
var accordion = {
    normal: function() {

        console.log('o normalAccordion setting')

        var a = {};
        a.block = '._normalAccordion';
        a.cover = '._accordionCover';
        a.nav = '._accordionNav';
        a.content = '._accordionContent';
        a.activeCss = '_active';
        a.attrOpen = 'accordion-open';
        a.attrContent = 'accordion-target';
        a.attrSpeed = 'accordion-speed';
        a.attrClose = 'accordion-close';
        a.defaultSpeed = 500; // 預設設定開啟與關閉動畫時間
        a.defaultClose = 'on';

        $(a.block).each(function() {

            var $navs = $(this).find(a.nav);

            $navs.each(function() {

                var $nav = $(this),
                    $cover = $nav.parent(a.cover),
                    $block = $nav.parents(a.block),
                    thisOpen = $nav.attr(a.attrOpen);

                // 判斷是否設定為預設開啟
                if (thisOpen === 'on') {
                    $block.find($nav.attr(a.attrContent)).slideToggle();
                    $cover.addClass(a.activeCss);
                }

                // Click 事件綁定
                $nav.on('click', function() {
                    var $this = $(this),
                        content = $this.attr(a.attrContent),
                        speed = parseInt($this.attr(a.attrSpeed)) || a.defaultSpeed,
                        close = $this.attr(a.attrClose) || a.defaultClose,
                        $block = $this.parents(a.block),
                        $cover = $this.parents(a.cover),
                        $covers = $block.find(a.cover),
                        $content = $block.find(content);

                    //判斷 accordion target 物件物否存在
                    if (typeof $content !== 'undefined' && $content.length >= 1) {

                        // 判斷是否已經開啟
                        if (!$cover.hasClass(a.activeCss)) {

                            //判斷是否設定要再開啟前關閉其他 accordion target 
                            close === a.defaultClose ? $block.find(a.content).slideUp(a.defaultSpeed) : undefined

                            $content.slideToggle(speed);
                            $covers.removeClass(a.activeCss);
                            $cover.addClass(a.activeCss);

                            // 判斷是否已經開啟
                        } else if ($cover.hasClass(a.activeCss)) {
                            $cover.removeClass(a.activeCss);
                            $content.slideToggle(speed);
                        }
                    }
                })


            })
        })
    },
    normalAjax: function() {},
    common: function() {
        accordion.normal();
        // accordion.checkBox();
    }
}