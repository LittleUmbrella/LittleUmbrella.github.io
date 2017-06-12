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

        __droppedOn: function (args, droppedFirst) {//droppedFirst, 
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
                if (undefined != dragViewModel && dragViewModel.dropped) {
                    if (dragViewModel)
                        dragViewModel.dropped(dropModel, dropViewModel, args);
                }

                if (undefined != dropViewModel && dropViewModel.droppedOn) {
                    if (dropViewModel)
                        dropViewModel.droppedOn(dragModel, dragViewModel, args);
                }
            }
            else {
                if (undefined != dropViewModel && dropViewModel.droppedOn) {
                    if (dropViewModel)
                        dropViewModel.droppedOn(dragModel, dragViewModel, args);
                }

                if (undefined != dragViewModel && dragViewModel.dropped) {
                    if (dragViewModel)
                        dragViewModel.dropped(dropModel, dropViewModel, args);
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
                    dragViewModel.dragEnded(dragModel, dragViewModel, args);
                }
            }

            //this[fnName](model, args);
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
            return { relative: true, click: false, distance: 3 };
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
                $this.stop(true, true);
                if (!$this.is('input') && $this.is('.drag'))
                    $this.toggleClass('selected');
            }

            if ('undefined' !== typeof (dd.selected)) {
                if (dd.selected) {
                    $this.stop(true, true);
                    if (!$this.is('input') && $this.is('.drag'))
                        $this.addClass('selected');
                }
                else {
                    $this.stop(true, true);
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

            $this.data("dragdata").viewModel = this;
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
                self.onTop((self.onTop() || 0) + 1);

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
            var $this = $(e.target);

            if (dd.moveWithDrag) {
                $this.css({
                    top: dd.offsetY,
                    left: dd.offsetX
                });
                if (this.dndposition) {
                    this.dndposition = {
                        top: dd.offsetY,
                        left: dd.offsetX
                    };
                }
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
                        TweenLite.to(_this, .5, {
                            'left': dd.dndposition.left, 'top': dd.dndposition.top, ease: Elastic.easeOut.config(.5, 2), onComplete: function () {

                                self.eventAggregator.publish('circleverse.ui.viewModel.draggableModule.dragEnd', data);

                                self.__dragEnded(args, true, dd.dndposition);
                            }
                        });
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
            if (!data.viewModel || !data.viewModel != this)
                data.viewModel = this;
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
            if (!data.viewModel || !data.viewModel != this)
                data.viewModel = this;
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
            TweenMax.to(_this, 0.13, { 'scaleX': 1, 'scaleY': 1,
                repeat: 2,
                yoyo: true, ease: Sine.easeIn//.config(8.5, 5)
            });
            this.__droppedOn(arguments, true);
        }
            ,

        dropxselect: function (ev, e, ddev, dd) {
            //this will refer to the data item if binding in template
            //safer to use e.target for the element
            var _this = e.target;
            var $this = $(_this);

            if ('undefined' !== typeof (dd.toggle) && dd.toggle) {
                $this.stop(true, true);
                if (!$this.is('input'))
                    $this.toggleClass('selected');
            }

            if ('undefined' !== typeof (dd.selected)) {
                if (dd.selected) {
                    $this.stop(true, true);
                    if (!$this.is('input'))
                        $this.addClass('selected');
                }
                else {
                    $this.stop(true, true);
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
            if (!data.viewModel || !data.viewModel != this)
                data.viewModel = this;


            TweenLite.killTweensOf(_this);
            TweenLite.to(_this, 0.15, { 'scaleX': 1, 'scaleY': 1, ease: Sine.easeIn });

            this.__dropEnded(arguments, true);
        }

    });
});