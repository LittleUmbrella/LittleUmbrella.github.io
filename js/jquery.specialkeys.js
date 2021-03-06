﻿; (function ($) {
    /*
    * jquery.event.extendedclick.js
    * Version: 1.0
    *
    * Copyright (c) 2008, Minus Creative (http://minuscreative.com)
    * Dual licensed under the MIT (MIT-LICENSE.txt)
    * and GPL (GPL-LICENSE.txt) licenses.
    *
    * Created: 2008-10-01
    */

    // jquery methods
    $.fn.ctrlclick = function (fn) { return this[fn ? "bind" : "trigger"]("ctrlclick", fn); };
    $.fn.shiftclick = function (fn) { return this[fn ? "bind" : "trigger"]("shiftclick", fn); };
    $.fn.altclick = function (fn) { return this[fn ? "bind" : "trigger"]("altclick", fn); };
    $.fn.ctrlaltclick = function (fn) { return this[fn ? "bind" : "trigger"]("ctrlaltclick", fn); };
    $.fn.ctrlshiftclick = function (fn) { return this[fn ? "bind" : "trigger"]("ctrlshiftclick", fn); };
    $.fn.altshiftclick = function (fn) { return this[fn ? "bind" : "trigger"]("altshiftclick", fn); };
    $.fn.ctrlaltshiftclick = function (fn) { return this[fn ? "bind" : "trigger"]("ctrlaltshiftclick", fn); };

    // all event clicks share the same config
    $.event.special.ctrlclick =
$.event.special.altclick =
$.event.special.shiftclick =
$.event.special.ctrlaltclick =
$.event.special.ctrlshiftclick =
$.event.special.altshiftclick =
$.event.special.ctrlaltshiftclick = {
    setup: function () {
        $.event.add(this, extendedClickEvents, extendedClickHandler, {});
    },
    teardown: function () {
        $.event.remove(this, extendedClickEvents, extendedClickHandler);
    }
};

    var extendedClickEvents = "click";


    // Big shared event handler
    function extendedClickHandler(event) {
        if (event.ctrlKey) {
            if (event.shiftKey) {
                if (event.altKey || event.originalEvent.altKey) {
                    event.type = "ctrlaltshiftclick"; // set to trigger
                }
                else
                    event.type = "ctrlshiftclick"; // set to trigger
            }
            else if (event.altKey || event.originalEvent.altKey) {
                event.type = "ctrlaltclick"; // set to trigger
            }
            else
                event.type = "ctrlclick"; // set to trigger
        }
        else if (event.altKey || event.originalEvent.altKey) {
            if (event.shiftKey) {
                event.type = "altshiftclick"; // set to trigger
            }
            else
                event.type = "altclick"; // set to trigger
        }
        else if (event.shiftKey) {
            event.type = "shiftclick"; // set to trigger
        }
        return $.event.handle.call(this, event);
    }
})(jQuery);

/**
* JQuery SpecialKeys plugin
* You can use this plugin to determine if any special keys are 
* pressed within any of you Javascript code.
* 
* @author Amjad Mohamed
* @version 0.1.1
* 
*/

(function ($) {

    var specialKeys_pressed = {};
    var specialKeys_keyshort = {
        'ctrl': 17,
        'control': 17,
        'alt': 18,
        'shift': 16,
        'enter': 13,
        'return': 13
    };

    jQuery.specialKeys = function (key) {
        key = $.trim(key).toLowerCase();

        if (specialKeys_keyshort[key] != undefined) {
            return specialKeys_pressed[specialKeys_keyshort[key]];
        } else {
            return specialKeys_pressed[key];
        }
    };

    $(document).bind('keydown', function (e) {
        specialKeys_pressed[e.keyCode] = true;
    });

    $(document).bind('keyup', function (e) {
        delete specialKeys_pressed[e.keyCode];
    });

    $(document).bind('blur', function (e) {
        for (var i in specialKeys_pressed) {
            delete specialKeys_pressed[i];
        }
    });

})(jQuery);