(function ($) {

    // A private property.
    var some_var;

    // A public property.
    $.myeventOptions = {};

    var $fn = $.fn;

    // add the jquery instance method
    $fn.dragx = function (str, arg, opts) {
        // figure out the event type
        var type = typeof str == "string" ? str : "",
        // figure out the event handler...
	fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
        // fix the event type
        if (type.indexOf("drag") !== 0)
            type = "drag" + type;
        // were options passed
        opts = (str == fn ? arg : opts) || {};
        // trigger or bind event handler
        return fn ? this.bind(type, opts, fn) : this.trigger(type);
    };

    var $fndragx = $fn.dragx, $fndragxprototype = $fndragx.prototype;


    // local refs (increase compression)
    var $event = $.event,
            $special = $event.special,
    // Special event definition. 
            dragx = $special.dragx = {




                setup: function (data, namespaces) {
                    //                    var $this = $(this); //, settings = $.extend({}, defaults, opts);
                    //                    var data = handleObj.data == undefined ? {} : handleObj.data;
                    //                    var settings = $.extend({}, $fndragxprototype.defaults, data);
                    //                    //var settings = $.metadata ? $.extend({}, mergedOpts, $this.metadata()) : mergedOpts;

                    //                    if (!$.hasEventListener(this, $fndragxprototype.clickHandler)) {
                    //                        $this.click(settings, $fndragxprototype.clickHandler);
                    //                    }





                    //Event code.
                    init(this, true);
                }
                //        ,
                //        teardown: function (namespaces) {
                //            // Event code.
                //            init(this, false);
                //        }
                ,
                add: function (handleObj) {
                    // Event code.
                    var $el = $(this);

                    var data = handleObj.data == undefined ? {} : handleObj.data;
                    var settings = $.extend({}, $fndragxprototype.defaults, data);

                    switch (handleObj.type) {
                        case $fndragxprototype.eventNames.dragxselect:
                            $el.click(settings, $fndragxprototype.clickHandler);
                            break;


                        case $fndragxprototype.eventNames.dragxinit:
                            $el.drag("draginit", function (ev, dd) {
                                //log('draginit:' + this.id);
                                var _this = this;
                                var $this = $(_this), selfArguments = arguments;


                                //support multi drag by returning set
                                if ('undefined' !== typeof (settings.multiSelector) && settings.multiSelector != null && settings.multiSelector != '' && $this.is(settings.multiSelector)) {
                                    //log("selected");
                                    var selecteds = $(settings.multiSelector);

                                    selecteds.each(function () {
                                        $(this).triggerHandler($fndragxprototype.eventNames.dragxinit, selfArguments, settings);
                                    });

                                    return selecteds;
                                }

                                $this.triggerHandler($fndragxprototype.eventNames.dragxinit, selfArguments, settings);
                            });


                            break;

                        case $fndragxprototype.eventNames.dragxstart:
                            $el.drag("dragstart", function (ev, dd) {
                                //log('dragstart:' + this.id);
                                var _this = this;
                                var $this = $(_this), selfArguments = arguments;
                                $this.data("dragdata").isDragging = true;


                                var dragdata = $(dd.drag).data('dragdata');

                                if (settings.dragWithParent) {
                                    dd.moveWithDrag = true;
                                    $(dd.drag).parents().each(function () {
                                        var parentNode = this;

                                        var parentData = $(parentNode).data('dragdata');

                                        if ('undefined' !== typeof parentData) {
                                            dd.moveWithDrag = !parentData.isDragging;
                                        }
                                        //stop loop, if found parent dragging
                                        if (!dd.moveWithDrag) return false;
                                    });
                                }

                                //reset z-index
                                //$this.appendTo(this.parentNode);


                                $this.triggerHandler($fndragxprototype.eventNames.dragxstart, selfArguments, settings);
                            });
                            break;

                        case $fndragxprototype.eventNames.dragx:
                            $el.drag(function (ev, dd) {
                                //log('drag:' + this.id);
                                var $this = $(this);

                                //seems like the cache of drop locations makes it so quick drags/drops
                                //messes up and you get containers triggering children and vice versa, 
                                //but taking out for now to improve performance
                                //dd.update();

                                var dragdata = $(dd.drag).data('dragdata'), selfArguments = arguments;







                                if (!settings.multiDragDrop) {

                                    if (!dragdata.dragging) {

                                        $this.triggerHandler($fndragxprototype.eventNames.dragx, selfArguments, settings);
                                        return;
                                    }
                                }

                                var $ddDrop = $(dd.drop);

                                //if any of the drop targets contains another drop target, eliminate the container in favor of its
                                //child. 
                                //special case: dragging a container and its child is a drop target. This seems to happen when the 
                                //container is within tolerance of the child (as is usually the case 
                                var realDrop = [];
                                $ddDrop.each(function () {
                                    var isDropContainer = false;
                                    var isContainedByActiveDrag = false;
                                    var outer = this;
                                    var $outer = $(outer);
                                    $ddDrop.each(function () {
                                        if (this == outer) return;
                                        if ($.contains(outer, this)) {
                                            isDropContainer = true;
                                        }
                                    });

                                    $(outer).parents().each(function () {
                                        if (this == dd.drag) {
                                            isContainedByActiveDrag = true;
                                        }
                                    });

                                    //this is all to handle the issue of a drag going into a drop
                                    //container, and then going into a drop within the container
                                    //the container will remain active without the below code.
                                    //can't simply call the event when current leaves active range
                                    //as another drag element might be still on the target.
                                    //However, can if not allowing multi-drag actives
                                    //todo: consider whether to simply call drop end in this case
                                    //calling new dropout to be safe
                                    if (isDropContainer || isContainedByActiveDrag) {
                                        if (settings.multiDragDrop) {

                                            var activeOb = $outer.data('activeArr');
                                            if (activeOb) {
                                                var idx = $.inArray(dd.drag, activeOb.activators);

                                                if (idx != -1) {
                                                    //if this is the only one in the activator list, trigger the event
                                                    if (activeOb.activators.length == 1) {

                                                        $(this).triggerHandler("dropxout", selfArguments, settings);
                                                        //log('removed');
                                                    }
                                                    //remove from list
                                                    activeOb.activators.splice(idx, 1);
                                                }

                                            }
                                        }
                                        else {
                                            $(this).triggerHandler("dropxout", selfArguments, settings);
                                        }
                                    }
                                    else {
                                        realDrop.push(outer);
                                        if (settings.multiDragDrop) {

                                            var activeOb = $outer.data('activeArr');
                                            if (activeOb) {
                                                var idx = $.inArray(dd.drag, activeOb.activators);
                                                if (idx == -1) {
                                                    activeOb.activators.push(dd.drag);
                                                }
                                            }
                                            else {
                                                var activators = [dd.drag];
                                                $outer.data('activeArr', { activators: activators });
                                            }
                                        }
                                    }
                                });

                                $(realDrop).each(function () {
                                    //$(this).addClass("active");
                                    if ($.fn.dropx)
                                        $(this).triggerHandler($.fn.dropx.prototype.eventNames.dropxover, selfArguments);
                                });
                                //todo: if drag leaves drop, and is part of multi drag, dropend may not fire, and there will be no drops on dd.drag to remove active class
                                //if not allowing multi drags to multi drops, dropend should fire
                                //consider attaching to drag element so can truly track 

                                //log('dd.added = ' + dd.added);
                                $this.triggerHandler($fndragxprototype.eventNames.dragx, selfArguments, settings);
                            });
                            break;

                        case $fndragxprototype.eventNames.dragxend:
                            $el.drag("dragend", function (ev, dd) {
                                //log('dragend:' + this.id);


                                var _this = this;
                                var $this = $(_this);
                                var dragdata = $(dd.drag).data('dragdata');



                                if (!settings.multiDragDrop) {
                                    //only active (mouse doing the action) one seems to be technically dragging
                                    if (!dragdata.dragging) {

                                        $this.triggerHandler($fndragx.prototype.eventNames.dragxend, selfArguments, settings);
                                        dragdata.isDragging = false;
                                        return;
                                    }
                                }

                                var $ddDrop = $(dd.drop);

                                //if any of the drop targets contains another drop target, eliminate the container in favor of its
                                //child. 
                                //special case: dragging a container and its child is a drop target. This seems to happen when the 
                                //container is within tolerance of the child (as is usually the case) 
                                var realDrop = [];
                                $ddDrop.each(function () {
                                    var isDropContainer = false;
                                    var isDropContainedByActiveDrag = false;
                                    var isDragInDropAndDropDragging = false;
                                    var outer = this;
                                    $ddDrop.each(function () {
                                        if (this == outer) return;
                                        if ($.contains(outer, this)) {
                                            isDropContainer = true;
                                        }
                                    });


                                    if (isDropContainer || isDropContainedByActiveDrag) {// || isDragInDropAndDropDragging || x) {
                                    }
                                    else {
                                        realDrop.push(outer);
                                    }
                                });

                                var consumers = [];
                                var winningConsumer;
                                $(realDrop).each(function () {
                                    if ($(this).is(settings.consumerSelector) && dd.drag != this) {
                                        consumers.push(this);
                                        winningConsumer = this;
                                    }
                                });

                                var callbackObjects = [];
                                //var dragDetails = [];


                                if (settings.multiDragDrop) {
                                    var callbackConvenience = new CallbackConvenience();
                                    callbackConvenience.element = dd.drag;
                                    callbackConvenience.callback = dd;
                                    callbackObjects.push(callbackConvenience);
                                }
                                else {
                                    $(dragdata.interactions).each(function () {
                                        var callbackConvenience = new CallbackConvenience();
                                        callbackConvenience.element = this.drag;
                                        callbackConvenience.callback = this.callback;
                                        callbackObjects.push(callbackConvenience);

                                    });
                                }


                                $(callbackObjects).each(function () {
                                    var dragDetail = new DragDetail();
                                    var thisCallbackObj = this;
                                    var target = thisCallbackObj.element;
                                    var $target = $(target);

                                    var parentNode = target.parentNode;
                                    if ((!($(realDrop).length) || $(realDrop).length == 0)) {
                                    }
                                    else if (consumers.length > 0) {

                                        //join or leave consumer?
                                        //if (contains($(winningConsumer).data('dropdata').location, $(dd.drag).data('dropdata').location)) {
                                        //already is consumer
                                        var needToAdjust = (target.parentNode != winningConsumer);


                                        if (needToAdjust) {
                                            needToAdjust = thisCallbackObj.callback.moveWithDrag;
                                        }


                                        if (needToAdjust) {
                                            //get shared parent and add that to the values

                                            //                                            var getSharedParent = function (el1, el2) {
                                            //                                                var shared = null;
                                            //                                                var $el2Parents = $(el2).parents();

                                            //                                                $(el1).parents().each(function () {
                                            //                                                    var parent = this;
                                            //                                                    $el2Parents.each(function () {
                                            //                                                        if (this == parent) {
                                            //                                                            shared = this;
                                            //                                                            return false;
                                            //                                                        }
                                            //                                                    }
                                            //                                        );
                                            //                                                    if (shared !== null) return false;
                                            //                                                }
                                            //                                    );

                                            //                                                return shared;
                                            //                                            };

                                            //                                            var sharedParentLocation = { left: 0, top: 0 };
                                            //                                            var sharedParent = getSharedParent(target, winningConsumer);
                                            //                                            if (sharedParent !== null) {
                                            //                                                sharedParentLocation = $(sharedParent).offset();
                                            //                                            }



                                            dragDetail.newParent = winningConsumer;
                                            var winningConsumerOffset = $(winningConsumer).offset();
                                            dragDetail.dndposition = {
                                                //                                    left: thisCallbackObj.callback.offsetX - ($(winningConsumer).position().left - $(parentNode).position().left),
                                                //                                    top: thisCallbackObj.callback.offsetY - ($(winningConsumer).position().top - $(parentNode).position().top)


                                                //                                    left: ((thisCallbackObj.callback.offsetX - $(parentNode).offset().left) - ($(winningConsumer).offset().left)) + sharedParentLocation.left,
                                                //                                    top: ((thisCallbackObj.callback.offsetY - $(parentNode).offset().top) - ($(winningConsumer).offset().top)) + sharedParentLocation.top
                                                //                                    left: (thisCallbackObj.callback.startX - sharedParentLocation.left) - ($(winningConsumer).offset().left),
                                                //                                    top: (thisCallbackObj.callback.startY - sharedParentLocation.top) - ($(winningConsumer).offset().top)

                                                left: $target.offset().left - winningConsumerOffset.left, //(($(parentNode).offset().left - sharedParentLocation.left) + (thisCallbackObj.callback.deltaX - sharedParentLocation.left)) - $(winningConsumer).offset().left, 
                                                top: $target.offset().top - winningConsumerOffset.top
                                                //                                    left: (thisCallbackObj.callback.deltaX - $(parentNode).offset().left) - ($(winningConsumer).offset().left),
                                                //                                    top: (thisCallbackObj.callback.deltaY - $(parentNode).offset().top) - ($(winningConsumer).offset().top)
                                            };
                                            dragDetail.element = target;

                                        }
                                    }
                                    else {
                                        dragDetail.dndposition = {
                                            top: thisCallbackObj.callback.originalY,
                                            left: thisCallbackObj.callback.originalX
                                        };
                                        dragDetail.element = target;



                                    }


                                    if (realDrop.length == 0) {

                                        //var parentNode = this.parentNode;
                                        var parentData = $(parentNode).data('dropdata');
                                        var targetData = $target.data('dropdata');
                                        if (parentData && targetData && !isOverlapping(parentData.location, targetData.location)) {
                                            dragDetail.newParent = document.body;
                                            dragDetail.dndposition = {
                                                left: thisCallbackObj.callback.offsetX + $(parentNode).offset().left,
                                                top: thisCallbackObj.callback.offsetY + $(parentNode).offset().top
                                            };
                                            dragDetail.element = target;

                                        }
                                    }

                                    $target.data("dragdata").isDragging = false;
                                    //this.filter(function (i) { return !(a.indexOf(i) > -1); }); 
                                    $(realDrop).each(function () {
                                        var $thisDrop = $(this);

                                        //                            var origColor = $thisDrop.css('backgroundColor') || "";
                                        //                            var aniColor = "#d00";
                                        //                            //log(origColor);
                                        //                            $thisDrop.stop().animate({
                                        //                                backgroundColor: aniColor
                                        //                            }, 200, function () {
                                        //                                $thisDrop.animate({ backgroundColor: origColor }, 300,
                                        //                                                            function () { $thisDrop.css("background-color", ""); }
                                        //                                                            )
                                        //                            });

                                        $thisDrop.triggerHandler("dropx", [ev, $.extend(true, thisCallbackObj.callback, dragDetail), settings]);

                                    });

                                    //dragDetails.push(dragDetail);

                                    if (dragDetail.dndposition.top == null) {
                                        $target.triggerHandler($fndragx.prototype.eventNames.dragxend, [ev, thisCallbackObj.callback, settings]);
                                    }
                                    else {
                                        $target.triggerHandler($fndragx.prototype.eventNames.dragxend, [ev, $.extend(true, thisCallbackObj.callback, dragDetail), settings]);
                                    }
                                }
                    );

                                //                    $(dragDetails).each(function () {
                                //                        var $detailElement = $(this.element);

                                //                        //                        if (this.newParent) {
                                //                        //                            $detailElement.appendTo(this.newParent);
                                //                        //                            $detailElement.css(this.position);
                                //                        //                        }
                                //                        //                        else {
                                //                        //                            $detailElement.animate(this.position, 420);
                                //                        //                        }

                                //                        //$detailElement.triggerHandler("dragxend", [ev, $.extend(thisCallbackObj, dragDetail), settings]);
                                //                    }
                                //                    );

                                

                                //return false;


                            }, settings //, { not: '#draginner' }
                );
                            break;
                        default:

                    }


                    // Save a reference to the bound event handler.
                    //                    var old_handler = handleObj.handler;

                    //                    handleObj.handler = function (event) {
                    //                        // Modify event object here!

                    //                        // Call the originally-bound event handler and return its result.
                    //                        return old_handler.apply(this, selfArguments);
                    //                    };
                }
            };

    // A private method.
    function init(elem, state) {
        // Do something to `elem` based on `state`

    };


    function DragDetail() {
        this.element = undefined;
        this.dndposition = { left: null, top: null };
        this.newParent = undefined;
    }

    function CallbackConvenience() {
        this.element = undefined;
        this.callback = undefined;
    }


    function contains(target, test) { // target { location } contains test [x,y] or { location }
        return ((test[0] || test.left) >= target.left && (test[0] || test.right) <= target.right
                          && (test[1] || test.top) >= target.top && (test[1] || test.bottom) <= target.bottom);
    }

    //        function isOverlapping(elm1, elm2) {
    //        function isOverlapping(target, test) {
    ////            var pos_elm1 = AJS.absolutePosition(elm1);
    ////            var pos_elm2 = AJS.absolutePosition(elm2);
    ////            var top1 = pos_elm1.y;
    ////            var left1 = pos_elm1.x;
    ////            var right1 = left1 + elm1.offsetWidth;
    ////            var bottom1 = top1 + elm1.offsetHeight;
    ////            var top2 = pos_elm2.y;
    ////            var left2 = pos_elm2.x;
    ////            var right2 = left2 + elm2.offsetWidth;
    ////            var bottom2 = top2 + elm2.offsetHeight;
    //            var getSign = function (v) {
    //                if (v > 0) return "+";
    //                else if (v < 0) return "-";
    //                else return 0;
    //            }

    //            if ((getSign(target.top - test.bottom) != getSign(target.bottom - test.top)) &&
    //      (getSign(target.left - test.right) != getSign(target.right - test.left)))
    //                return true;
    //            return false;
    //        }

    //thanks: http://stackoverflow.com/questions/2355208/how-can-i-stop-elements-overlapping-using-javascript-and-the-raphael-javascript-l
    function isOverlapping(circleLocation1, circleLocation2) {
        var proxy = circleLocation1;
        var target = circleLocation2;
        return Math.max(0, Math.min(target.bottom, proxy.bottom) - Math.max(target.top, proxy.top))
				* Math.max(0, Math.min(target.right, proxy.right) - Math.max(target.left, proxy.left));

        //            var attrs = ["cx", "cy", "r"];
        //            var c1 = circ1.attr(attrs);
        //            var c2 = circ2.attr(attrs);
        //            var dist = Math.sqrt(Math.pow(c1.cx - c2.cx, 2) + Math.pow(c1.cy - c2.cy, 2));
        //            return (dist < (c1.r + c2.r));
        //var circ1 = $.data(circle1, 'circle'), circ2 = $.data(circle2, 'circle');
        var $circle1 = circleLocation1;
        var $circle2 = circleLocation2;

        var circ1 = {
            x: $circle1.left + ($circle1.width / 2),
            y: $circle1.top + ($circle1.height / 2),
            r: $circle1.width / 2
        };

        var circ2 = {
            x: $circle2.left + ($circle2.width / 2),
            y: $circle2.top + ($circle2.height / 2),
            r: $circle2.width / 2
        };

        //if ('undefined' !== typeof (circ1) && 'undefined' !== typeof (circ2)) {
        var dist = Math.sqrt(Math.pow(circ1.x - circ2.x, 2) + Math.pow(circ1.y - circ2.y, 2));
        return (dist < (circ1.r + circ2.r));
        //}

    }

    $fndragx.prototype.clickHandler = function (e) {
        var $this = $(this);
        var _this = this;

        var settings = e.handleObj.data;

        if ('undefined' == typeof (settings))
            return;

        var $selecteds = $(settings.multiSelector);
        var toggle = true;
        if ($selecteds.length > 0) {
            if ($.specialKeys(settings.multiSelectorKey)) {
                $this.triggerHandler($fndragx.prototype.eventNames.dragxselect, [e, { toggle: true}, settings]);
            }
            else {
                $selecteds.each(function () {
                    if (_this == this) {
                        $this.triggerHandler($fndragx.prototype.eventNames.dragxselect, [e, { toggle: true}, settings]);
                        toggle = false;
                    }
                    else {
                        $(this).triggerHandler($fndragx.prototype.eventNames.dragxselect, [e, { selected: false}, settings]);
                    }
                });
                if (toggle) {
                    $this.triggerHandler($fndragx.prototype.eventNames.dragxselect, [e, { toggle: true}, settings]);
                }
            }
        }
        else {
            $this.triggerHandler($fndragx.prototype.eventNames.dragxselect, [e, { toggle: true}, settings]);
        }


        return settings.click;
        //return false;
    };



    //    $fndragx.prototype.dragxinitHandler =;
    //    $fndragx.prototype.dragxstartHandler =;
    //    $fndragx.prototype.dragxHandler =;
    //    $fndragx.prototype.dragxendHandler =;

    //$fndragx.prototype.defaults = 

    $fndragx.prototype.eventNames = { dragxselect: "dragxselect",
        dragxinit: "dragxinit",
        dragxstart: "dragxstart",
        dragx: "dragx",
        dragxend: "dragxend"
    };

    // these are the default settings
    //see jquery.event.drag/drop for more defaults
    $fndragx.prototype.defaults = {
        which: 1, // mouse button pressed to start drag sequence
        distance: 0, // distance dragged before dragstart
        not: ':input', // selector to suppress dragging on target elements
        handle: null, // selector to match handle target elements
        relative: false, // true to use "position", false to use "offset"
        drop: true, // false to suppress drop events, true or selector to allow
        click: false, // false to suppress click events after dragend (no proxy)
        multiDragDrop: false, //true; //
        movementWithinCausesDrop: false, //true; //
        canBeDropWhileDrag: false, //true; //
        multiSelector: '.selected', //selector for the objects to multi-drag
        multiSelectorKey: 'ctrl',
        consumerSelector: '.consumer',
        dragWithParent: true //if true, is moved along with parent, otherwise is moved double parent
    },

    // share the same special event configuration with related events...
    $special.dragxselect = $special.dragxinit = $special.dragxstart = $special.dragxend = dragx;

})(jQuery);
