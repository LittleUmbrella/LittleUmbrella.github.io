; (function ($) {

    $.fn.jCircle = function (options) {
        var defaults = {
            size: 40,
            cssClass: 'color'
        },
			settings = $.extend({}, defaults, options);

        settings.size = parseInt(settings.size) || 40;
        //settings.backgroundColor = settings.backgroundColor 
        //var $jCircle = $(this);

        return this.each(function () {
            var $this = $(this);
            var o = $.metadata ? $.extend({}, settings, $this.metadata()) : settings;
            //o.radius = (o.size / 2) + 'px';

            //o.class = o.backgroundColor || "";

            $this.css({
                display: 'block'
            });

            if ('undefined' !== typeof (o.cssClass)) {
                $this.addClass(o.cssClass);
            }

            //                    $this.css({ 
            //                        width: (o.size) + 'px',
            //                        height: (o.size) + 'px'
            //                    });

            var radiusCssName1 = ($.support.cssProperty('borderTopLeftRadius', true));
            var radiusCssName2 = ($.support.cssProperty('borderTopRightRadius', true));
            var radiusCssName3 = ($.support.cssProperty('borderBottomLeftRadius', true));
            var radiusCssName4 = ($.support.cssProperty('borderBottomRightRadius', true));

            //                alert($this.css(radiusCssName1));

            if ('undefined' !== typeof (radiusCssName1)) {
                $this.css(radiusCssName1, '50% 50%');
                $this.css(radiusCssName2, '50% 50%');
                $this.css(radiusCssName3, '50% 50%');
                $this.css(radiusCssName4, '50% 50%');
            }
            else {
                $this.css({ 'border-radius': '50%' });
                $this.css({ '-moz-border-radius': '50%' });
                //$this.html("<div class='dot'>•</div>");
            }


            $.fn.jCircle.adjust($this, o.size, 0);

            //                    jQuery.resizeExt.delay = 100;
            //                    $this.bind( 'resizeExt', function (e, w, h, delta){
            //                        if ('undefined' !== typeof(delta)){
            //                            
            //                            $.fn.jCircle.adjust($(this), Math.max(w, h), Math.max(delta.width, delta.height), true);
            //                        }
            //                    });

            //                    $this.trigger('resizeExt');


            //$this.data('circle', {o
            //$this.css('behavior', 'url(/Styles/PIE.htc)');
        });

    };

    //var once = false;

    $.fn.jCircle.adjust = function (el, size, amount, positionToo) {
        var $this = el || $(this);


        var actualSize = size + amount;

        if ('undefined' !== typeof (positionToo)) {
            $this.css({ left: $this.position().left - (amount / 2),
                top: $this.position().top - (amount / 2),
                width: (actualSize) + 'px',
                height: (actualSize) + 'px'
            });
        }
        else {
            $this.css({
                width: (actualSize) + 'px',
                height: (actualSize) + 'px'
            });
        }

        //                if ('undefined' == typeof ($.support.cssProperty('borderTopLeftRadius', true))) {
        //                    $this.css({
        //                        'font-size': ((actualSize * 2)) * 17 + '%'
        //                        ,
        //                        'line-height': (actualSize * 2)/20 + '%'
        //                        ,
        //                        'text-indent': -1 * ((actualSize / 2) / 4) + '%'
        //                    });
        //                }
        //                : 40em; 
        // :20%;
        // : -20%;

        //                var r = ($this.width() / 2) + 'px';

        //                //will return undefined if not supported
        //                //var radiusCssName = $.support.cssProperty('borderRadius', true);

        //                var radiusCssName1 = ($.support.cssProperty('borderTopLeftRadius', true));
        //                var radiusCssName2 = ($.support.cssProperty('borderTopRightRadius', true));
        //                var radiusCssName3 = ($.support.cssProperty('borderBottomLeftRadius', true));
        //                var radiusCssName4 = ($.support.cssProperty('borderBottomRightRadius', true));

        //                //                alert($this.css(radiusCssName1));

        //                if (!once && 'undefined' !== typeof (radiusCssName1)) {
        //                    $this.css(radiusCssName1, '50% 50%');
        //                    $this.css(radiusCssName2, '50% 50%');
        //                    $this.css(radiusCssName3, '50% 50%');
        //                    $this.css(radiusCssName4, '50% 50%');
        //                }

        //                once = true;
        //                $this.css(
        //                    {
        //                        radiusCssName1: '50% 50%'
        ////                        'border-radius': r
        ////                        ,
        ////                        '-moz-border-radius': r
        ////                        ,
        ////                        '-webkit-border-radius': r
        //                    });

    };
})(jQuery);