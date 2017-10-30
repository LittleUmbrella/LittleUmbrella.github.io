JS.require('JS.Class', 'JSextend', 'JS.Module', function () {
    eaf.util.namespace('becu_org.ui.viewModel');
    //don't put ko props in modules: seems to be class, rather than instance, scoped
    becu_org.ui.viewModel.baseModule = new JS.Module('becu_org.ui.viewModel.baseModule', {
        canDeleteNow: function () {
            return true;
        }
        ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;

            self.dragPals = ko.observableArray();

            self.callSuper();
        }
        //extend: {
        //    included: function (klass) {
        //        var self = klass;

        //        self.dragPals = ko.observableArray();

        //    }
        //}
        ,

        __droppedOn: function (args, droppedFirst, prom) {//droppedFirst, 
            if (!args) throw new Error("args is undefined");
            //if (!fnName) throw new Error("fnName is undefined");

            droppedFirst = droppedFirst || true;

            //            var dragItem = $(args[2].drag).tmplItem();
            //            var dragModel = dragItem.data;
            //            var dragViewModel = dragItem.viewModel;

            //            var dropItem = $(args[0].target).tmplItem();
            //            var dropModel = dropItem.data;
            //            var dropViewModel = dropItem.viewModel;

            var dragItem = $(args[2].drag);
            var dragData = dragItem.data("dragdata");
            if ('undefined' == typeof dragData) //happens when dragged item is removed
                return; 
            var dragViewModel = dragData.viewModel;
            if ('undefined' == typeof dragViewModel)
                return;

            var dragModel = dragViewModel.model();

            var dropItem = $(args[0].target);
            var dropData = dropItem.data("dropdata");
            var dropViewModel = dropData.viewModel;
            if ('undefined' == typeof dropViewModel)
                return;

            var dropModel = dropViewModel.model();



            if (droppedFirst) {
                if (undefined != dragViewModel && dragViewModel.dropped) {
                    if (dragViewModel)
                        dragViewModel.dropped(dropModel, dropViewModel, args, prom);
                }

                if (undefined != dropViewModel && dropViewModel.droppedOn) {
                    if (dropViewModel)
                        dropViewModel.droppedOn(dragModel, dragViewModel, args, prom);
                }
            }
            else {
                if (undefined != dropViewModel && dropViewModel.droppedOn) {
                    if (dropViewModel)
                        dropViewModel.droppedOn(dragModel, dragViewModel, args, prom);
                }

                if (undefined != dragViewModel && dragViewModel.dropped) {
                    if (dragViewModel)
                        dragViewModel.dropped(dropModel, dropViewModel, args, prom);
                }
            }

            //this[fnName](model, args);
        }
        ,

        __dropStarted: function (args, droppedFirst) {//droppedFirst, 
            if (!args) throw new Error("args is undefined");
            //if (!fnName) throw new Error("fnName is undefined");

            droppedFirst = droppedFirst || true;

            //            var dragItem = $(args[2].drag).tmplItem();
            //            var dragModel = dragItem.data;
            //            var dragViewModel = dragItem.viewModel;

            //            var dropItem = $(args[0].target).tmplItem();
            //            var dropModel = dropItem.data;
            //            var dropViewModel = dropItem.viewModel;

            var dragItem = $(args[2].drag);
            var dragData = dragItem.data("dragdata");
            var dragViewModel = dragData.viewModel;
            if ('undefined' == typeof dragViewModel)
                return;

            var dragModel = dragViewModel.model();

            var dropItem = $(args[0].target);
            var dropData = dropItem.data("dropdata");
            var dropViewModel = dropData.viewModel;
            if ('undefined' == typeof dropViewModel)
                return;

            var dropModel = dropViewModel.model();



            if (droppedFirst) {
                if (undefined != dragViewModel && dragViewModel.draggingOverStarted) {
                    if (dragViewModel)
                        dragViewModel.draggingOverStarted(dropModel, dropViewModel, args);
                }

                if (undefined != dropViewModel && dropViewModel.draggedOverStarted) {
                    if (dropViewModel)
                        dropViewModel.draggedOverStarted(dragModel, dragViewModel, args);
                }
            }
            else {
                if (undefined != dropViewModel && dropViewModel.draggedOverStarted) {
                    if (dropViewModel)
                        dropViewModel.draggedOverStarted(dragModel, dragViewModel, args);
                }

                if (undefined != dragViewModel && dragViewModel.draggingOverStarted) {
                    if (dragViewModel)
                        dragViewModel.draggingOverStarted(dropModel, dropViewModel, args);
                }
            }

            //this[fnName](model, args);
        }
        ,
        
        __dropInit: function (args, droppedFirst) {//droppedFirst, 
            if (!args) throw new Error("args is undefined");
            //if (!fnName) throw new Error("fnName is undefined");

            droppedFirst = droppedFirst || true;

            //            var dragItem = $(args[2].drag).tmplItem();
            //            var dragModel = dragItem.data;
            //            var dragViewModel = dragItem.viewModel;

            //            var dropItem = $(args[0].target).tmplItem();
            //            var dropModel = dropItem.data;
            //            var dropViewModel = dropItem.viewModel;

            var dragItem = $(args[2].drag);
            var dragData = dragItem.data("dragdata");
            var dragViewModel = dragData.viewModel;
            if ('undefined' == typeof dragViewModel)
                return;

            var dragModel = dragViewModel.model();

            var dropItem = $(args[0].target);
            var dropData = dropItem.data("dropdata");
            var dropViewModel = dropData.viewModel;
            if ('undefined' == typeof dropViewModel)
                return;

            var dropModel = dropViewModel.model();



            //if (droppedFirst) {
                // if (undefined != dragViewModel && dragViewModel.draggingOverStarted) {
                //     dragViewModel.draggingOverStarted(dropModel, dropViewModel, args);
                // }

                if (undefined != dropViewModel && dropViewModel.dropInit) {
                    dropViewModel.dropInit(dragModel, dragViewModel, args);
                }
            //}
            // else {
            //     if (undefined != dropViewModel && dropViewModel.draggedOverStarted) {
            //         dropViewModel.dropInit(dragModel, dragViewModel, args);
            //     }

                // if (undefined != dragViewModel && dragViewModel.draggingOverStarted) {
                //     dragViewModel.draggingOverStarted(dropModel, dropViewModel, args);
                // }
            //}

            //this[fnName](model, args);
        }
        ,

        __dropEnded: function (args, droppedFirst) {//droppedFirst, 
            if (!args) throw new Error("args is undefined");
            //if (!fnName) throw new Error("fnName is undefined");

            droppedFirst = droppedFirst || true;

            //            var dragItem = $(args[2].drag).tmplItem();
            //            var dragModel = dragItem.data;
            //            var dragViewModel = dragItem.viewModel;

            //            var dropItem = $(args[0].target).tmplItem();
            //            var dropModel = dropItem.data;
            //            var dropViewModel = dropItem.viewModel;

            var dragItem = $(args[2].drag);
            var dragData = dragItem.data("dragdata");
            var dragViewModel = dragData.viewModel;
            if ('undefined' == typeof dragViewModel)
                return;

            var dragModel = dragViewModel.model();

            var dropItem = $(args[0].target);
            var dropData = dropItem.data("dropdata");
            var dropViewModel = dropData.viewModel;
            if ('undefined' == typeof dropViewModel)
                return;

            var dropModel = dropViewModel.model();



            if (droppedFirst) {
                if (undefined != dragViewModel && dragViewModel.draggingOverEnded) {
                    if (dragViewModel)
                        dragViewModel.draggingOverEnded(dropModel, dropViewModel, args);
                }

                if (undefined != dropViewModel && dropViewModel.draggedOverEnded) {
                    if (dropViewModel)
                        dropViewModel.draggedOverEnded(dragModel, dragViewModel, args);
                }
            }
            else {
                if (undefined != dropViewModel && dropViewModel.draggedOverEnded) {
                    if (dropViewModel)
                        dropViewModel.draggedOverEnded(dragModel, dragViewModel, args);
                }

                if (undefined != dragViewModel && dragViewModel.draggingOverEnded) {
                    if (dragViewModel)
                        dragViewModel.draggingOverEnded(dropModel, dropViewModel, args);
                }
            }

            //this[fnName](model, args);
        }

        ,

        __dragging: function (args, droppedFirst, location) {//droppedFirst, 
            if (!args) throw new Error("args is undefined");
            //if (!fnName) throw new Error("fnName is undefined");

            droppedFirst = droppedFirst || true;

            //            var dragItem = $(args[2].drag).tmplItem();
            //            var dragModel = dragItem.data;
            //            var dragViewModel = dragItem.viewModel;

            //            var dropItem = $(args[0].target).tmplItem();
            //            var dropModel = dropItem.data;
            //            var dropViewModel = dropItem.viewModel;

            var dd = args[2], dragItem = $(dd.drag);
            var dragData = dragItem.data("dragdata");
            if ('undefined' == typeof dragData) //happens when dragged item is removed
                return; 
            var dragViewModel = dragData.viewModel;
            if ('undefined' == typeof dragViewModel)
                return;

            var dragModel = dragViewModel.model();

            if (undefined != dragViewModel && dragViewModel.dragEnded) {
                if (dragViewModel) {
                    if (dragViewModel.location)
                        dragViewModel.location({
                            top: location.top,
                            left: location.left
                        });
                    //dragViewModel.dragEnded(dragModel, dragViewModel, args);
                }
            }

            //this[fnName](model, args);
        }

        ,

        __dragEnded: function (args, droppedFirst, location) {//droppedFirst, 
            if (!args) throw new Error("args is undefined");
            //if (!fnName) throw new Error("fnName is undefined");

            droppedFirst = droppedFirst || true;

            //            var dragItem = $(args[2].drag).tmplItem();
            //            var dragModel = dragItem.data;
            //            var dragViewModel = dragItem.viewModel;

            //            var dropItem = $(args[0].target).tmplItem();
            //            var dropModel = dropItem.data;
            //            var dropViewModel = dropItem.viewModel;

            var dd = args[2], dragItem = $(dd.drag);
            var dragData = dragItem.data("dragdata");
            if ('undefined' == typeof dragData) //happens when dragged item is removed
                return; 
            var dragViewModel = dragData.viewModel;
            if ('undefined' == typeof dragViewModel)
                return;

            var prom = dd.prom;
            var dragModel = dragViewModel.model();

            if (undefined != dragViewModel && dragViewModel.dragEnded) {
                if (dragViewModel) {
                    if (dragViewModel.location)
                        dragViewModel.location({
                            top: location.top,
                            left: location.left
                        });
                    prom.resolve();
                    dragViewModel.dragEnded(dragModel, dragViewModel, args);
                }
                else{
                    
                    prom.resolve();
                }
            }
            else{
                
                prom.resolve();
            }

            //this[fnName](model, args);

            var available = dd.available;
            var len = available.length;

            for (var i = 0; i < len; i++) { 
                var availableItem = available[i], $availableItem = $(availableItem);

                var dropData = $availableItem.data("dropdata");
                var dropViewModel = dropData.viewModel;
                // if ('undefined' == typeof dropViewModel)
                //     return;


                var dropModel = dropViewModel.model();
                
                if (undefined != dropViewModel && dropViewModel.othersDragEnded) {                    
                    dropViewModel.othersDragEnded(dragModel, dragViewModel, args);
                }
            }
        }
        ,

        draggedOverStarted: function (dragModel, dragViewModel) {

            var self = this;

            if (self != dragViewModel && dragViewModel.isA(self.klass))
                dragViewModel.dragPals.push(self);
        }
        ,

        dragEnded: function (dragModel, dragViewModel) {

            var self = this;

            self.dragPals.removeAll();
        }
    });

    becu_org.ui.viewModel.labelModule = new JS.Module('becu_org.ui.viewModel.labelModule', {
        initialize: function () {
            var self = this;
            
            self.callSuper();

            self.getLablePathData = function (width, height) {
                // adjust the radius a little so our text's baseline isn't sitting directly on the circle
                var radius = width/2;
                var r = radius * 0.95;
                var startX = width/2 - r;
                return 'm' + startX + ',' + (height/2) + ' ' +
                'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
            }

            self.label = ko.observable();
            self.showLabel = ko.observable(true);
            self.labelCss = ko.observable();


            self.labelData = ko.computed(function(){
                var label = self.label(), dims = self.dimensions;

                if (self.showLabel()){
                    width = dims? dims()? dims().width: 0: 0;
                    height = dims? dims()? dims().height: 0: 0;
                }
                else{          
                    width = 0;
                    height = 0;                  
                }
                return {
                    label: label, 
                    width: width, 
                    height: height,
                    showLabel: self.showLabel(),
                    path: self.getLablePathData(width, height),
                    id: eaf.util.getUniqueId(),
                    isReady: width != 0 && eaf.util.isDefinedAndNotNull(label),
                    css: self.labelCss()
                };
            }).bind(self);
        }
    });

    becu_org.ui.viewModel.circleModule = new JS.Module('becu_org.ui.viewModel.circleModule', {
        resize: function (event) {//{ backgroundColor: 'white' }
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = event.target;
            var $this = $(_this);

            if ($this.is('.selected')) {
                var factor = 10;
                //                    $this.width($this.width() + (event.delta * factor));
                //                    $this.height($this.height() + (event.delta * factor));
                //$.fn.jCircle.adjust($this, $this.width(), (event.delta * factor), true);
                this.size(this.size() + event.delta * factor);
            }
            if ('undefined' !== typeof (event.stopPropagation))
                event.stopPropagation();
            if ('undefined' !== typeof (event.preventDefault))
                event.preventDefault();
            if ('undefined' !== typeof (event.stopImmediatePropagation))
                event.stopImmediatePropagation();
            
        }
    });


    becu_org.ui.viewModel.draggableModule = new JS.Module('becu_org.ui.viewModel.draggableModule', {
        getSettings: function () {
            var self = this;
            var settings = {};
            // if (self.callSuper) {
            //     settings = self.callSuper();
            // }
            settings.relative = true;
            settings.click = false;
            settings.distance = 3;
            settings.not = ":input, .map, :has(.map)";
            return settings;
        }
        ,

        select: function (ev, e, dd) {
            //log('draginit:' + this.id);
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            var $this = $(_this);

            //weirdness
            return;
            if ('undefined' !== typeof (dd.toggle) && dd.toggle) {
                $this.finish(true, true);
                if (!$this.is('input') && $this.is('.drag'))
                    $this.toggleClass('selected');
            }

            if ('undefined' !== typeof (dd.selected)) {
                if (dd.selected) {
                    $this.finish(true, true);
                    if (!$this.is('input') && $this.is('.drag'))
                        $this.addClass('selected');
                }
                else {
                    $this.finish(true, true);
                    if (!$this.is('input') && $this.is('.drag'))
                        $this.removeClass('selected');
                }
            }


        }
        ,

        dragxinit: function (e, ddev, dd) {
            //log('draginit:' + this.id);
            var _this = e.target;
            var $this = $(_this);
            //$this.css({ 'zIndex': 900 });
            var dragdata = $this.data("dragdata");
            dragdata.viewModel = this;
            dd.prom = jQuery.Deferred();
            if (!dragdata.prom){
                dragdata.prom = jQuery.Deferred();
            }
        }
                ,

        dragxstart: function (e, ddev, dd) {
            //log('dragstart:' + this.id);
            var self = this;
            var _this = e.target;
            var $this = $(_this);
            //                    dd.attr = $(ddev.target).attr("className");
            //                    dd.width = $this.width();
            //                    dd.height = $this.height();
            //                    if (dd.attr.indexOf("E") > -1 || dd.attr.indexOf("S") > -1 || dd.attr.indexOf("W") > -1 || dd.attr.indexOf("N") > -1) {
            //                        return;
            //                    }

            //reset z-index
            //$this.appendTo(_this.parentNode);

            if (self.onTop)
                self.onTop(!self.onTop());

            var dragdata = $this.data("dragdata");
            if (!dragdata.prom){
                dragdata.prom = jQuery.Deferred();
            }
            //if (this.onTop) {
            //    var self = this;
            //    //this.onTop.valueHasMutated(); //
            //    //this.onTop(this.onTop() + '1'); //just change so that it's re-evaluated
            //    setTimeout(function () {
            //        self.onTop(self.onTop() + '1');
            //    }, 1);
            //}



            $this.css({
                opacity: .5
            });

            this.eventAggregator.publish('circleverse.ui.viewModel.draggableModule.dragStart', dd);
            

        }
,

        dragx: function (e, ddev, dd) {
            //log('drag:' + this.id);
            var self = this, $this = $(e.target), args = arguments;

            if (dd.moveWithDrag) {
                // $this.css({
                //     top: dd.offsetY,
                //     left: dd.offsetX
                // });
                if (this.dndposition) {
                    this.dndposition = {
                        top: dd.offsetY,
                        left: dd.offsetX
                    };
                }
                self.__dragging(args, true, { top: dd.offsetY, left: dd.offsetX });
            }

        }
,

        dragxend: function (e, ddev, dd) {
            //log('dragend:' + this.id);

            var self = this, data = dd, args = arguments;

            var _this = e.target;
            var $this = $(_this);

            $this.css('opacity', 1);


            if ('undefined' !== typeof (dd.newParent) && dd.newParent) {
                //$this.appendTo(dd.newParent);
                //$this.css(dd.dndposition);
                self.eventAggregator.publish('circleverse.ui.viewModel.draggableModule.dragEnd', data);

                self.__dragEnded(args, true, { top: dd.offsetY, left: dd.offsetX });
            }
            else {
                if ('undefined' !== typeof (dd.dndposition)) {
                    //$this.stop(true, true);
                    //$this.animate(dd.dndposition, 420);
                    if (dd.offsetX != dd.dndposition.left || dd.offsetY != dd.dndposition.top) {
                        //dd.offsetX = dd.dndposition.left;
                        //dd.offsetY = dd.dndposition.top;

                        TweenLite.killTweensOf(_this);
                        var tl = new TimelineLite();

                        tl.add(TweenLite.to(_this, .5, {
                            'left': dd.dndposition.left, 'top': dd.dndposition.top, ease: Elastic.easeOut.config(.5, 2), onComplete: function () {

                                self.eventAggregator.publish('circleverse.ui.viewModel.draggableModule.dragEnd', data);

                                self.__dragEnded(args, true, dd.dndposition);
                            }
                        }), 0);

                        var $lineEl = $this.nextAll(".line");
                        if ($lineEl.length > 0){
                            var lineEl = $lineEl[0];
                            var dragItem = $(dd.drag);
                            var dragData = dragItem.data("dragdata");
                            var dragViewModel = dragData.viewModel;
                            if ('undefined' != typeof dragViewModel){

                                var 
                                    childCircle = dragViewModel,
                                    parentDircle = childCircle.parent, top, left;

                                var startAt = ko.unwrap(childCircle.lineStartAt) || 'edge';

                                var childDims = childCircle.dimensions(), childLoc = {'left': dd.dndposition.left, 'top': dd.dndposition.top}, parentDims = parentDircle.dimensions();//, parentLoc = parentDircle.location();  
                                var childCircleCenter = {top: childLoc.top + (childDims.height/2), left: childLoc.left + (childDims.width/2)}
                                var parentCircleCenter = {top: 0+ (parentDims.height/2), left: 0+ (parentDims.width/2)}

                                //var rotation = getRotationInDegrees({top: childLoc.top, left: childLoc.left}, {top: 0, left: 0});
                                var rotation = getRotationInDegrees(parentCircleCenter, childCircleCenter);

                                //hypotenuse with child top and left as the two sides
                                var width = Math.hypot(childCircleCenter.left - parentCircleCenter.left, childCircleCenter.top - parentCircleCenter.top);

                                //http://www.mathportal.org/calculators/plane-geometry-calculators/right-triangle-calculator.php
                                

                                if (startAt == 'edge'){
                                    //on edge of parent
                                    var a = sind(rotation) * (parentDims.height/2);
                                    var c = cosd(rotation) * (parentDims.height/2);

                                    top = (a + (parentDims.height/2)) + 'px';
                                    left = (c + (parentDims.width/2))  + 'px';
                                    //end on edge of parent

                                    width = (width-(parentDims.width/2) );//minus radius to ensure line ends at the edge of the connected circle (-(childDims.width/2)) to stop at edge of child
                                }
                                else{
                                    top = parentCircleCenter.top + 'px';
                                    left = parentCircleCenter.left  + 'px';
                                    width = (width);

                                }

                                TweenLite.killTweensOf(lineEl);
                                tl.add(TweenLite.to(lineEl, .3, { rotationZ: rotation, left: left , top: top, width: (width), ease: Elastic.easeOut.config(.5, 2)}), 0);
                                
                                //lineEl.style.transform = 'rotateZ('+ rotation +'deg)';
                                
                            }
                        }
                    }
                }
                else {
                    self.eventAggregator.publish('circleverse.ui.viewModel.draggableModule.dragEnd', data);

                    self.__dragEnded(args, true, { top: dd.offsetY, left: dd.offsetX });
                }
            }


            if (dd.proxy && dd.proxy.id == "draggableselector") $(dd.proxy).remove();



            //$this.removeClass("active");
            //$this.stop(true, true);
            //$this.animate({ scale: '1' }, 400);
            if ('undefined' !== typeof (e.stopPropagation))
                e.stopPropagation();
            if ('undefined' !== typeof (e.preventDefault))
                e.preventDefault();
            if ('undefined' !== typeof (e.stopImmediatePropagation))
                e.stopImmediatePropagation();
            //$('.active').removeClass("active");

        }

    });

    
    function sind(x) {
        return Math.sin(x * Math.PI / 180);
    }

    function cosd(x) {
        return Math.cos(x * Math.PI / 180);
    }

    var getRotationInDegrees = function(p1,p2){
        // // Get rotation in degrees
        // p1 = p1.left;
        // p2 = p2.left;
        // var rotation = Math.atan(p1/p2) * 180 / Math.PI;

        // // Adjust for 2nd & 3rd quadrants, i.e. diff y is -ve.
        // if (p2 < 0) {
        //     rotation += 180;

        // // Adjust for 4th quadrant
        // // i.e. diff x is -ve, diff y is +ve
        // } else if (p1 < 0) {
        //     rotation += 360;
        // }
        
        // return rotation;
        return Math.atan2(p2.top-p1.top,p2.left-p1.left)/Math.PI*180;
    }


    becu_org.ui.viewModel.droppableModule = new JS.Module('becu_org.ui.viewModel.droppableModule', {
        dropxinit: function (e, ddev, dd) {//only fires when first element enters drop element, so can't be used
            //avoiding for now - seems to fire quite a bit
            //log('dropstart:' + this.id);
            //return false;
            var _this = e.target;
            var $this = $(_this);
            //dd.scale = $this.scale();
            //log('initdd: ' + dd.scale);


            var data = $this.data("dropdata");
            if (!data.viewModel || !data.viewModel != this){
                data.viewModel = this;
                
            }
            if (!data.prom){
                data.prom = jQuery.Deferred();
            }

            
            this.__dropInit(arguments, true);
        }
            ,
        dropxstart: function (e, ddev, dd) {//only fires when first element enters drop element, so can't be used
            //avoiding for now - seems to fire quite a bit
            //log('dropstart:' + this.id);
            //return false;
            //var _this = e.target;
            //var $this = $(_this);
            //dd.scale = 1;

            ////log('startdd: ' + dd.scale);

            //$this.data('dropxdata', { scale: dd.scale });


            this.__dropStarted(arguments, true);
        }
            ,

        dropxover: function (e, ddev, dd) {
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            var $this = $(_this);

            //if (!$this.data('dropxdata')) {
            //    dd.scale = 1;

            //    //log('startdd: ' + dd.scale);

            //    $this.data('dropxdata', { scale: dd.scale });
            //}

            //$this.stop(true, true);


            //
            //log('scale: ' + $this.scale());

            //if ($.support.cssProperty('transform')) {
                //var data = $this.data('dropxdata');
                //var scale = dd.scale || (data? data.scale: 0); // $this.scale();
                //            log('scale: ' + scale);
                //            log('ddscale: ' + dd.scale);

                //if (scale == 1) {
                //scale = (scale || 1) * 1.25;
                //}
                //log('scale: ' + scale);
                //$this.animate({ 'scale': scale }, 400);
                
            //}
            //else {
            //    $this.addClass("dnd-active");
            //}

            TweenLite.killTweensOf(_this);
            TweenLite.to(_this, 0.15, { 'scaleX': 1.25, 'scaleY': 1.25, ease: Sine.easeIn });
        }
            ,

        dropxout: function (e, ddev, dd) {
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            //var $this = $(_this);

            //$this.stop(true, true);
            ////$this.removeClass("dnd-active");
            ////log('scale: ' + $this.scale());
            //if ($.support.cssProperty('transform')) {
            //    var data = $this.data('dropxdata');
            //    var scale = dd.scale || (data ? data.scale : 0); // $this.scale();
            //    //log('outscale: ' + scale);
            //    $this.animate({ 'scale': (scale) }, 400);
            //}
            //else {
            //    $this.removeClass("dnd-active");
            //}


            TweenLite.killTweensOf(_this);
            TweenLite.to(_this, 0.15, { 'scaleX': 1, 'scaleY': 1, ease: Sine.easeIn });
        }
            ,

        dropx: function (e, ddev, dd, z) {
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            var $this = $(_this);

            var data = $this.data("dropdata");
            if (!data.viewModel || !data.viewModel != this){
                data.viewModel = this;          
            }
            
            if (!data.prom){
                data.prom = jQuery.Deferred();
            }
            ////                    var origColor = $this.css('backgroundColor') || "";
            ////                    var aniColor = "#d00";
            ////                    //log(origColor);
            ////                    $this.stop().animate({
            ////                        backgroundColor: aniColor
            ////                    }, 200, function () {
            ////                        $this.animate({ backgroundColor: origColor }, 300,
            ////                        function () { $this.css("background-color", ""); }
            ////                        )
            ////                    });
            //var scale = dd.scale || $this.scale();
            ////log('scale: ' + scale);

            ////if (scale == 1) {
            //scale = (scale || 1);

            //$this.stop(true, true);
            ////$this.addClass("dropped", 200, function () { });
            //$this.addClass("dropped", 10);

            //if ($.support.cssProperty('transform')) {
            //    $this.animate({ 'scale': (scale * 1.25) }, 200, function () { $this.animate({ 'scale': scale }, 200); $this.removeClass("dropped", 300); });
            //}

            TweenLite.killTweensOf(_this);
            //TweenMax.fromTo(_this, 0.3, { 'scaleX': 1.25, 'scaleY': 1.25, ease: Elastic.easeOut.config(8.5, 5) }, {
            //    'scaleX': 1, 'scaleY': 1,
            //    repeat: 1,
            //    yoyo: true, ease: Elastic.easeOut.config(8.5, 5)
            //});
            //TweenMax.fromTo(_this, 0.3, { 'scaleX': 1, 'scaleY': 1, ease: Elastic.easeOut.config(8.5, 5) }, {
            //    'scaleX': 1.25, 'scaleY': 1.25,
            //    repeat: 1,
            //    yoyo: true, ease: Elastic.easeOut.config(8.5, 5)
            //});

            
            if (data.viewModel.onTop)
                data.viewModel.onTop(!data.viewModel.onTop());


            //var dragData = $this.data("dragdata");

            //var deferred = jQuery.Deferred();
            TweenMax.to(_this, 0.13, { 'scaleX': 1, 'scaleY': 1,
                repeat: 2,
                yoyo: true, ease: Sine.easeIn//.config(8.5, 5)
                ,onComplete: function(){/*deferred.resolve();*/}
            });
            this.__droppedOn(arguments, true, dd.prom);
        }
            ,

        dropxselect: function (ev, e, ddev, dd) {
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            var $this = $(_this);

            if ('undefined' !== typeof (dd.toggle) && dd.toggle) {
                $this.finish(true, true);
                if (!$this.is('input'))
                    $this.toggleClass('selected');
            }

            if ('undefined' !== typeof (dd.selected)) {
                if (dd.selected) {
                    $this.finish(true, true);
                    if (!$this.is('input'))
                        $this.addClass('selected');
                }
                else {
                    $this.finish(true, true);
                    if (!$this.is('input'))
                        $this.removeClass('selected');
                }
            }
        }
            ,

        dropxend: function (e, ddev, dd) {
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            var $this = $(_this);


            //if ($.support.cssProperty('transform')) {
            //    var scale = dd.scale || $this.scale();
            //    scale = (scale || 1);
            //    //log('dropxendscale: ' + scale);
            //    $this.stop(true, true);
            //    //$this.removeClass("dnd-active");
            //    $this.animate({ 'scale': scale }, 400);
            //}
            //else {
            //    $this.removeClass("dnd-active");
            //}


            var data = $this.data("dropdata");
            if (!data.viewModel || !data.viewModel != this){
                data.viewModel = this;
                
            }

            if (!data.prom){
                data.prom = jQuery.Deferred();
            }


            var deferred = jQuery.Deferred();
            TweenLite.killTweensOf(_this);
            TweenLite.to(_this, 0.15, { 'scaleX': 1, 'scaleY': 1, ease: Sine.easeIn
                ,onComplete: function(){deferred.resolve();} });

            this.__dropEnded(arguments, true, deferred);
        }

    });
});