/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* 
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
* Toby Farris: added delta to event obj 5/17/2011
*/
(function ($, h, c) { var a = $([]), e = $.resizeExt = $.extend($.resizeExt, {}), i, k = "setTimeout", j = "resizeExt", d = j + "-special-event", b = "delay", f = "throttleWindow"; e[b] = 250; e[f] = true; $.event.special[j] = { setup: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.add(l); $.data(this, d, { w: l.width(), h: l.height() }); if (a.length === 1) { g() } }, teardown: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.not(l); l.removeData(d); if (!a.length) { clearTimeout(i) } }, add: function (l) { if (!e[f] && this[k]) { return false } var n; function m(s, o, p, delta) { var q = $(this), r = $.data(this, d); r.w = o !== c ? o : q.width(); r.h = p !== c ? p : q.height(); n.apply(this, arguments) } if ($.isFunction(l)) { n = l; return m } else { n = l.handler; l.handler = m } } }; function g() { i = h[k](function () { a.each(function () { var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d); if (m !== o.w || l !== o.h) { var p = {width: (m !== o.w) ? m - o.w : 0, height: (l !== o.h)?l - o.h:0}; n.trigger(j, [o.w = m, o.h = l, p]) } }); g() }, e[b]) } })(jQuery, this);
