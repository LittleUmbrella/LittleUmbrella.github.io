(function ($) {

    // A private property.
    var some_var;

    // A public property.
    $.myeventOptions = {};

    // add the jquery instance method
    $.fn.dropx = function (str, arg, opts) {
        // figure out the event type
        var type = typeof str == "string" ? str : "",
        // figure out the event handler...
	fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
        //      // fix the event type
        //      if (type.indexOf("drag") !== 0)
        //          type = "drag" + type;
        // were options passed
        opts = (str == fn ? arg : opts) || {};
        // trigger or bind event handler
        return fn ? this.bind(type, opts, fn) : this.trigger(type);
    };

    var $fndropx = $.fn.dropx;

    // local refs (increase compression)
    var $event = $.event,
    $special = $event.special,
    // Special event definition. 
    dropx = $special.dropx = {
        defaults: {
            multiDragDrop: false, //true; //
            movementWithinCausesDrop: false, //true; //
            canBeDropWhileDrag: false,
            canDragBeDrop: false,
            movingChildCanTriggerMovingParent: false,
            movingParentCanTriggerMovingChild: false,
            draggableSelector: '.draggableSelector'
        }, //true; //

        setup: function (data, namespaces) {


            // Event code.
            init(this, true);
        },
        //        ,
        //        teardown: function (namespaces) {
        //            // Event code.
        //            init(this, false);
        //        },
        add: function (handleObj) {
            // Event code.
            data = handleObj.data == undefined ? {} : handleObj.data;
            var $el = $(this), settings = $.extend({}, dropx.defaults, data);


            switch (handleObj.type) {
                case $fndropx.prototype.eventNames.dropxinit:
                    $el.drop("init", function (ev, dd) {
                        //avoid doing a lot of logic here, as this fires for every
                        //element that's droppable for every drag init

                        //log('dropinit:' + this.id);
                        //don't do this check here, as when multiple are dragging all but the primary drag are drop and drag
                        //if (this == dd.drag) return false;
                        //                    var dragdata = $(dd.drag).data('dragdata');

                        //                    if (!dragdata.dragging)
                        //                        return false;
                        var retVal = $(this).triggerHandler($fndropx.prototype.eventNames.dropxinit, arguments);
                        return retVal;
                    })
                    break;

                case $fndropx.prototype.eventNames.dropxstart:
                    $el.drop("start", function (ev, dd) {//only fires when first element enters drop element, so can't be used
                        //avoiding for now - seems to fire quite a bit
                        //log('dropstart:' + this.id);
                        //return false;
                        var _this = this;
                        var $this = $(_this);
                        if ($(dd.proxy).is(settings.draggableSelector)) {
                            $this.triggerHandler($fndropx.prototype.eventNames.dropxselect, [ev, dd, { selected: true}]);
                            return;
                        }

                        if (!settings.multiDragDrop) {
                            var dragdata = $(dd.drag).data('dragdata');

                            if (!dragdata.dragging)
                                return false;

                            if (!settings.canBeDropWhileDrag && dd.isDragging)
                                return false;
                        }

                        if (!settings.canDragBeDrop) {
                            //if drag and drop are the same, cancel
                            if (this == dd.drag) return false;
                        }

                        //if any parent is the drag (and I'm the drop by virtue of this
                        //event being invoked), cancel
                        //var elem = $this.data('dropdata').elem;

                        if (!settings.movingChildCanTriggerMovingParent) {
                            //when child is drop target, parent should not trigger
                            var retVal = true;
                            $this.parents().each(function () {
                                var parentNode = this;

                                if (dd.drag == parentNode) {
                                    retVal = false;
                                }
                                //stop loop
                                if (!retVal) return false;


                            });
                        }


                        if (!settings.movingParentCanTriggerMovingChild) {
                            if (retVal) {
                                //when parent is drop target, child should not trigger 
                                //(unless parent is not moving and movementWithinCausesDrop is true?)
                                $(dd.drag).parents().each(function () { //child is drag in this case
                                    var parentNode = this;



                                    if (_this == parentNode) {
                                        var dragdata = $(parentNode).data('dragdata');

                                        if (settings.movementWithinCausesDrop) {
                                            if ('undefined' !== typeof (dragdata)) {
                                                if (dragdata.isDragging) {
                                                    retVal = false;
                                                }
                                            }
                                        }
                                        else {
                                            retVal = false;
                                        }
                                    }
                                    //stop loop
                                    if (!retVal) return false;


                                });


                                //stop loop
                                if (!retVal) return false;
                            }
                        }

                        if (!retVal)
                            return retVal;
                        //log('dropstart:' + this.id);
                        retVal = $(this).triggerHandler($fndropx.prototype.eventNames.dropxstart, arguments);
                        return retVal;
                    });
                    break;

                case $fndropx.prototype.eventNames.dropx:
                    $el.drop(function (ev, dd) {
                        //log('drop:' + this.id);
                        var $this = $(this);
                        //todo: need this?  also present in drop start
//                        if (dd.proxy && dd.proxy.id == "draggableselector") {
//                            //$this.triggerHandler("dropxselect", [ev, dd, { selected: true}]);
//                            return;
//                        }

                        if (!settings.canDragBeDrop) {
                            //if drag and drop are the same, cancel
                            if (this == dd.drag) return false;
                        }

                        if (!settings.multiDragDrop) {
                            var dragdata = $(dd.drag).data('dragdata');

                            if (!dragdata.dragging)
                                return false;

                            if (!settings.canBeDropWhileDrag && dd.isDragging)
                                return false;
                        }
                        //log('drop:' + this.id);

                        //todo: decide if we want to trigger this (we are triggering it in dragend right now)
                        //$(this).triggerHandler("drop", arguments);
                    })
                    break;

                case $fndropx.prototype.eventNames.dropxend:
                    $el.drop("end", function (ev, dd) {
                        //log('dropend:' + this.id);
                        var $this = $(this);

                        var activeOb = $this.data('activeArr');

                        if (activeOb) {

                            activeOb.activators = [];
                        }
                        //                    $this.removeClass("active");

                        $(this).triggerHandler($fndropx.prototype.eventNames.dropxend, arguments);
                    })
                    break;
            }
            // Save a reference to the bound event handler.
            //                    var old_handler = handleObj.handler;

            //                    handleObj.handler = function (event) {
            //                        // Modify event object here!

            //                        // Call the originally-bound event handler and return its result.
            //                        return old_handler.apply(this, arguments);
            //                    };
        }
    };

    // A private method.
    function init(elem, state) {
        // Do something to `elem` based on `state`

    };

    $fndropx.prototype.eventNames = { dropxselect: "dropxselect",
        dropxinit: "dropxinit",
        dropxstart: "dropxstart",
        dropx: "dropx",
        dropxend: "dropxend",
        dropxover: "dropxover",
        dropxout: "dropxout"
    };


    // share the same special event configuration with related events...
    $special.dropxselect = $special.dropxinit = $special.dropxstart = $special.dropxend = dropx;


})(jQuery);
