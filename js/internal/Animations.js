
eaf.util.namespace('littleUmbrella.circleverse.ui.Animation');
littleUmbrella.circleverse.ui.Animation = {
    popInOut: function (settings) {
        if (!settings.element)
            throw new Error('settings.element cannot be null');

        var defaults = {
            startingPos: { x: 0, y: 0 },
            delay: 0,
            length: 1,
            ease: Elastic.easeOut.config(8.5, 5),
            onComplete: function () { },
            popOut: true,
            additionalAnimationValues: {}
        };

        var opts = $.extend(defaults, settings),
            element = settings.element,
            animating = $.extend({ top: opts.startingPos.y, left: opts.startingPos.x, opacity: 0, ease: opts.ease }, defaults.additionalAnimationValues, settings.additionalAnimationValues);

        var tl = new TimelineLite({ onComplete: opts.onComplete, delay: opts.delay });

        if (opts.popOut) {
            $(element).show();

            ////debug
            //var $centerDiv = $("<div></div>");
            //$centerDiv.css({ left: startingPos.x, top: startingPos.y, width: 4 + 'px', height: 4 + 'px', 'background-color': '#000', position: 'absolute' });
            //$element.parent().append($centerDiv);

            tl.from(element, opts.length, animating);
        }
        else {
            tl.to(element, opts.length, animating);
        }
    }
}
