/*
Thanks, Mark a ziesemer
http://blogger.ziesemer.com/2008/05/javascript-namespace-function.html
*/
var eaf = {};
eaf.util = {};

eaf.util.namespace = function (name, separator, container) {
    var ns = name.split(separator || '.'),
    o = container || window,
    i,
    len;
    for (i = 0, len = ns.length; i < len; i++) {
        o = o[ns[i]] = o[ns[i]] || {};
    }
    return o;
};


//; (function ($) { // secure $ jQuery alias

//    // jquery method
//    $.fn.wheel = function (fn) {
//        return this[fn ? "bind" : "trigger"]("wheel", fn);
//    };

//    // special event config
//    var wheel = $.event.special.wheel = {
//        events: "DOMMouseScroll mousewheel" // IE, opera, safari, firefox
//		+ ($.browser.mozilla && $.browser.version < "1.9" ? " mousemove" : ""), // firefox 2
//        setup: function () {
//            $.event.add(this, wheel.events, wheel.handler, {});
//        },
//        teardown: function () {
//            $.event.remove(this, wheel.events, wheel.handler);
//        },
//        handler: function (event) {
//            switch (event.type) {
//                case "mousewheel": // IE, opera, safari
//                    event.delta = event.wheelDelta / 120;
//                    if (window.opera) {
//                        event.delta *= -1;
//                    }
//                    break;
//                case "DOMMouseScroll": // firefox
//                    $.extend(event, event.data); // fix event properties in FF2
//                    event.delta = -event.detail / 3;
//                    break;
//                case "mousemove": // FF2 has incorrect event positions
//                    return $.extend(event.data, { // store the correct properties
//                        clientX: event.clientX, pageX: event.pageX,
//                        clientY: event.clientY, pageY: event.pageY
//                    });
//            }
//            event.type = "wheel"; // hijack the event	
//            return $.event.handle.call(this, event, event.delta);
//        }
//    };

//})(jQuery); // confine scope

eaf.util.namespace('eaf.communications');

eaf.Environment = new JS.Singleton({
    //see becu_org.communication.serviceConfig
    initialize: function () {
        var $window = $(window);
        var self = this;
        var $self = $(self);
        //properties
        this.window = {};
        this.window.width = $window.width();
        this.window.height = $window.height();


        $window.resize(function () {
            self.window.width = $window.width();
            self.window.height = $window.height();
            $self.trigger("resize", { width: self.window.width, height: self.window.height });
        });
    }


});


eaf.util.namespace('eaf.core');

eaf.core.createDelegate = function (obj, method) {
    return function () {
        method.apply(obj, arguments);
    }
};

eaf.util.namespace('eaf.util');

eaf.util.isDefined = function (obj, prop) {
    if ('undefined' != typeof obj[prop]) return true;

    for (f in obj)
        if (f == prop)
            return true;

    return false;
};

eaf.util.isDefinedAndAssigned = function (obj, prop) {
    if ('undefined' != typeof obj[prop]) return true;

    return false;
};

eaf.util.isAssigned = function (obj, prop) {
    if ('undefined' != typeof obj[prop]) return true;

    return false;
};
