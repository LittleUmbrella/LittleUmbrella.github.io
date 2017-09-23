//define('eaf.util', ['js!JS.Class!order'], function () {

    /*
    Thanks, Mark a ziesemer
    http://blogger.ziesemer.com/2008/05/javascript-namespace-function.html
    */
    window.eaf = {}; //var eaf = {};
    eaf.util = {};

    eaf.util.namespace = function (name, separator, container) {
        var ns = name.split(separator || '.'),        
    o,
    i,
    len;
        if (ns.length == 0) return;
        o = container || window

        for (i = 0, len = ns.length; i < len; i++) {
            o = o[ns[i]] = o[ns[i]] || {};
        }
        return o;
    };


    //eaf.util.namespace('eaf.util');


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

    //eaf.util.namespace('eaf.communications');

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

    eaf.util.isNullOrWhitespace = function ( input ) {
        return !input || !input.trim();
    }

    eaf.util.isDefinedAndNotNull = function (obj) {
        if ('undefined' != typeof obj && obj != null)  return true;

        return false;
    };

    eaf.util.isAssigned = function (obj, prop) {
        if ('undefined' != typeof obj[prop]) return true;

        return false;
    };


    //return eaf.util;
//});

//define('eaf.core', ['eaf.util'], function () {
    eaf.util.namespace('eaf.core');

    eaf.core.createDelegate = function (obj, method) {
        return function () {
            method.apply(obj, arguments);
        }
    };


    eaf.util.indexOf = function (list, item) {
        if (list.indexOf) return list.indexOf(item);
        var i = list.length;
        while (i--) {
            if (list[i] === item) return i;
        }
        return -1;
    };



    /**
* Returns a random number between min (inclusive) and max (exclusive)
*/
    eaf.util.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    eaf.util.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    (function(){
        var counter = 0;
        eaf.util.getUniqueId = function(){
            return 'myid-' + counter++;
        }
    })();

    eaf.util.asyncEach = function (arr, iterator, finished) {
        var list = arr,
      n = list.length,
      i = -1,
      calls = 0,
      looping = false;

        var iterate = function () {
            calls -= 1;
            i += 1;
            if (i === n)
                return finished.apply(list);
            iterator(list[i], resume);
        };

        var loop = function () {
            if (looping) return;
            looping = true;
            while (calls > 0) iterate();
            looping = false;
        };

        var resume = function () {
            calls += 1;
            if (typeof setTimeout === 'undefined') loop();
            else setTimeout(iterate, 0);
        };
        resume();
    };


//    return eaf.core;
//}); 