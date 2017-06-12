
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SatelliteNavigatorViewModel = (function () {



    return new JS.Class("circleverse.viewModel.SatelliteNavigatorViewModel" , circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //include: [becu_org.ui.viewModel.baseModule],
            var self = this;
            self.parent = parent;
            
            var dimensions = ko.observable({width:0, height:0});
            var location = ko.observable({left:0, top:0});
            

            self.settings = $.extend(self.settings || {}, { dragThreshold: 3 }, opts);

            self.callSuper();
            //properties
            self.direction = 0;
            self.icon.name('icon-arrows-h icon-size-3x');

            self.dimensions = ko.computed({
                read: function () {
                    return dimensions();
                }
                ,
                write: function (val) {
                    dimensions({ width: val.width || 0, height: val.height || 0 });
                }
            });

            self.location = ko.computed({
                read: function () {
                    return location();
                }
                ,
                write: function (val) {
                    location(val);
                }
            });

            if (!self.size)
                self.size = ko.observable();

            //self.size(self.parent.modelItem().size());
            self.navState = ko.observable();
            self.opacity = ko.observable(1);
            self.css = 'nav';

            self.startPosition = { x: 0, y: 0 };


            self.itemRadius = ko.computed(function () {
                return self.parent.itemRadius();
            });

            self.__modelItem = self.parent.modelItem();

            var 
                ticklerSubscription = null,
                modelItemSubscription = null
                    ;

            var onTopTickler = function (item) {
                self.__modelItem = item;
                if (item) {
                    self.showMe.subscribe(function (val) {
                        if (val) {
                            ticklerSubscription = self.__globalSettings.eventAggregator.subscribe('onTop.' + self.__modelItem.klass.displayName, eaf.core.createDelegate(self, self.__tickleTop));
                        }
                        else {
                            if (ticklerSubscription) {
                                self.__globalSettings.eventAggregator.unsubscribe(ticklerSubscription);
                            }
                        }
                    });

                    if (self.showMe()) {
                        self.__globalSettings.eventAggregator.subscribe('onTop.' + self.__modelItem.klass.displayName, eaf.core.createDelegate(self, self.__tickleTop));
                    }

                    if (modelItemSubscription) modelItemSubscription.dispose();
                }
            };

            if (self.__modelItem) {
                onTopTickler();
            }
            else {

                modelItemSubscription = self.parent.modelItem.subscribe(onTopTickler);

            }

            
        }
        ,

        __tickleTop: function (msg, data) {
            var self = this;

            if (!data.toggledRecently)
                self.callSuper();
        }
        ,

        
        dragx: function (e, ev, dd) {
            var self = this;

            //if dragging less than threshold, do nothing
            //if ((Math.abs(dd.deltaY) + Math.abs(dd.deltaX)) % self.settings.dragThreshold != 0) return;

            dd.update();
            var //data = $.data(this, 'circle'),
                      //itemRadius = ($(this).width() / 2),
                      itemRadius = self.itemRadius(),
                      ringRadius = self.parent.ringRadius(),
                      //draggedVmContainer = self,
                      draggedVm = self,
                          parentCenter = { x: /*self.parent.location().x +*/ self.parent.size() / 2, y: /*self.parent.location().y +*/ self.parent.size() / 2 };
            //,
            //angle = data.angle
            ;
            var angleMouse = Math.atan2(dd.deltaY + dd.originalY + itemRadius - parentCenter.y, dd.deltaX + dd.originalX + itemRadius - parentCenter.x);
            //var move = (dd.deltaX < 0 || dd.deltaY < 0) ? -1 : 1;
            var currentAngle = Math.atan2(draggedVm.location().top + itemRadius - parentCenter.y, draggedVm.location().left + itemRadius - parentCenter.x);
            var originalAngle = Math.atan2(dd.originalY + itemRadius - parentCenter.y, dd.originalX + itemRadius - parentCenter.x);
            //var change = eaf.util.degToRad(eaf.util.radToDeg(angle) + (dd.deltaY - dd.deltaX));
            //var change = eaf.util.degToRad(eaf.util.radToDeg(angle)) - angleMouse;
            var change = angleMouse - originalAngle;

            draggedVm.location({
                left: (Math.round(parentCenter.x + Math.cos(angleMouse) * ringRadius) - itemRadius),
                top: (Math.round(parentCenter.y + Math.sin(angleMouse) * ringRadius) - itemRadius)
            });









            //var idxDragged = -1, 
            var len = self.parent.childViewModels().length;
            //for (var i = 0; i < len; i++) {
            //    if (self.parent.childViewModels()[i]() == draggedVm) {
            //        idxDragged = i;
            //        break;
            //    }
            //}




            var direction = self.direction = eaf.util.getCircularDirection(eaf.util.radToDeg(currentAngle), eaf.util.radToDeg(angleMouse)),
                rotarydOne = false;
            //console.log('delta: ' + direction);
            for (var i = 0; i < len; i++) {
                var vm = ko.unwrap(self.parent.childViewModels()[i]);

                if (vm == draggedVm) {
                    continue;
                }

                //if the vm was dragged outside the ring radius, don't rotate it
                //but if none are, then we need to bring one in for the rotary nav
                //calculate distance
                var yRefPnt = vm.startPosition.y + itemRadius - parentCenter.y,
                    xRefPnt = vm.startPosition.x + itemRadius - parentCenter.x,
                    dist = Math.sqrt(yRefPnt * yRefPnt + xRefPnt * xRefPnt)
                    ;

                if (rotarydOne || i < (len -2))
                    if (Math.abs(dist - ringRadius) > 40) {
                        continue;
                    }

                rotarydOne = true;

                var otherOriginalAngle = Math.atan2(yRefPnt, xRefPnt);

                //same speed: 
                var otherSameSeedChange = otherOriginalAngle + change;
                //var otherChange = change < 0 ? otherOriginalAngle + Math.abs(change / 2) : otherOriginalAngle - Math.abs(change / 2);
                //var otherChange = otherSameSeedChange < 0 ? otherOriginalAngle + change / 2 : otherOriginalAngle - change / 2;
                //var otherChange = otherSameSeedChange < 0 ? otherOriginalAngle + Math.abs(change / 2) : otherOriginalAngle - change / 2;
                //var otherChange = otherSameSeedChange < 0 ? otherOriginalAngle + Math.abs(change / 2) : otherOriginalAngle - Math.abs(change / 2);
                //var otherChange = otherSameSeedChange < 0 ? otherOriginalAngle + change / 2 : otherOriginalAngle - Math.abs(change / 2);
                var otherChange = otherOriginalAngle - change;
                //console.log('delta: ' + direction);
                //if (points.length - 1 == i)
                //    $el.css({
                //        top: Math.round(parentCenter.y + Math.sin(otherSameSeedChange) * self.parent.ringRadius()) - itemRadius,// - (settings.itemDiameter + settings.itemPadding),
                //        left: Math.round(parentCenter.x + Math.cos(otherSameSeedChange) * self.parent.ringRadius()) - itemRadius// - (settings.itemDiameter + settings.itemPadding)                              
                //    });
                //else
                vm.location({
                    left: Math.round(parentCenter.x + Math.cos(otherChange) * ringRadius) - itemRadius,
                    top: Math.round(parentCenter.y + Math.sin(otherChange) * ringRadius) - itemRadius
                });

            }

            //var activeDropTargetsLen = dd.drop.length

            var dropsSansDragged = [];

            var activeDropTargetsLen = dd.drop.length;


            for (var t = 0; t < activeDropTargetsLen; t++) {
                var target = dd.drop[t], 
                    targetVm = ko.dataFor(target);
                if (targetVm == draggedVm) continue;

                var targetContainer = self.parent.childViewModels().filter(function (data) {
                    return ko.unwrap(data) == targetVm;
                })[0];

                dropsSansDragged.push(targetContainer);
                //            return Math.max(0, Math.min(target.bottom, proxy.bottom) - Math.max(target.top, proxy.top))
                //* Math.max(0, Math.min(target.right, proxy.right) - Math.max(target.left, proxy.left));

                var diameter = itemRadius * 2,
                    target = {},
                    proxy = {};

                target.top = targetVm.location().top;
                proxy.top = draggedVm.location().top;
                target.left = targetVm.location().left;
                proxy.left = draggedVm.location().left;
                target.bottom = target.top + diameter;
                target.right = target.left + diameter;
                proxy.bottom = proxy.top + diameter;
                proxy.right = proxy.left + diameter;
                var overlap = Math.max(0, Math.min(target.bottom, proxy.bottom) - Math.max(target.top, proxy.top))
                        * Math.max(0, Math.min(target.right, proxy.right) - Math.max(target.left, proxy.left));
                //console.log(overlap);
                //opacity is whatever percentage of overlap there is
                targetVm.opacity(1 - (overlap / (diameter * diameter)));

                targetVm.navState('active');
            }

            //if (true && 2 == dropsSansDragged.length) {
            //    var dropped1Container = dropsSansDragged[dropsSansDragged.length - 2]
            //        ,
            //        dropped1 = dropped1Container()
            //        ,
            //        dropped2Container = dropsSansDragged[dropsSansDragged.length - 1]
            //        ,
            //        dropped2 = dropped2Container()
            //        ,
            //        idxdropped1Container = $.inArray(dropped1Container, self.parent.innerArr())
            //        ,
            //        idxdropped2Container = $.inArray(dropped2Container, self.parent.innerArr())
            //    ;

            //    var dropped1Angle = Math.atan2(dropped1.startPosition.y + itemRadius - parentCenter.y, dropped1.startPosition.x + itemRadius - parentCenter.x);
            //    var dropped2Angle = Math.atan2(dropped2.startPosition.y + itemRadius - parentCenter.y, dropped2.startPosition.x + itemRadius - parentCenter.x);

            //    var directionDrops = 0;

            //    var droppedContainer = dropped1Container;
            //    var dropped = dropped1;

            //    //console.log('angle 1: ' + eaf.util.radToDeg(dropped1Angle) + '  angle 2: ' + eaf.util.radToDeg(dropped2Angle));

            //    if (idxdropped2Container > idxdropped1Container && self.parent.visiblCnt - 1 != Math.abs(idxdropped2Container - idxdropped1Container)) {

            //        directionDrops = eaf.util.getCircularDirection(eaf.util.radToDeg(dropped1Angle), eaf.util.radToDeg(dropped2Angle));
            //        if (directionDrops != direction) {
            //            droppedContainer = dropped2Container;
            //            dropped = dropped2;
            //        }
            //    }
            //    else {
            //        directionDrops = eaf.util.getCircularDirection(eaf.util.radToDeg(dropped2Angle), eaf.util.radToDeg(dropped1Angle));
            //        if (directionDrops == direction) {
            //            droppedContainer = dropped2Container;
            //            dropped = dropped2;
            //        }
            //    }
            //    //console.log('directionDrops: ' + directionDrops);


            //    //if (direction < directionDrops) {
            //    //    droppedContainer = dropped2Container;
            //    //    dropped = dropped2;
            //    //}

            //    dropped.navState('inactive');
            //    //flip the one we are navigating away from 
            //    //base it on direction and lastSwappedIndex...
            //    //"away from" is defined as two dropped items, and the direction of the drag is "pointing" to the second
            //    //"pointing" is defined as the difference between the two dropped items
            //    //if moving away from dropped item, and moving clockwise, if dropped item isn't current index make next
            //    //if moving away from dropped item, and moving counterclockwise, if dropped item isn't current index + visible count make previous
            //    if (parseFloat(dropped.opacity()) < .7) {
            //        var droppedIdx = $.inArray(dropped, self.parent.innerArr());
            //        if (direction > 0) {

            //            if (droppedIdx != self.parent.lastSwappedIndex) {

            //                //console.log(dropped.icon.name);
            //                var next = self.parent.getNext();
            //                //console.log(next.icon.name);
            //                next.startPosition.x = dropped.startPosition.x;
            //                next.startPosition.y = dropped.startPosition.y;
            //                next.location({
            //                    left: (dropped.location().left),
            //                    top: (dropped.location().top)
            //                });
            //                next.opacity(dropped.opacity());
            //                next.navState(dropped.navState());

            //                droppedContainer(next);
            //            }
            //        }
            //        else {
            //            if ((droppedIdx == 0 ? self.parent.innerArr().length - 1 : droppedIdx - 1) != self.parent.lastSwappedIndex) {

            //                //console.log(dropped.icon.name);
            //                var prev = self.parent.getPrevious();
            //                //console.log(next.icon.name);
            //                prev.startPosition.x = dropped.startPosition.x;
            //                prev.startPosition.y = dropped.startPosition.y;
            //                prev.location({
            //                    left: dropped.location().left,
            //                    top: dropped.location().top
            //                });
            //                prev.opacity(dropped.opacity);
            //                prev.navState(dropped.navState());

            //                droppedContainer(prev);
            //            }
            //        }


            //    }


            //}
        },


        getSettings: function () {

            var self = this, settings = $.extend(self.callSuper(), self.settings);
            settings.drop = self.settings.dropFilter;
            return settings;
        }
        ,

        dragxend: function (e, ev, dd) {
            var self = this;

            //self.callSuper();
            self.parent.dragEnded(self);
        }
        ,

        dragxstart: function (e, ev, dd) {
            var self = this;

            self.callSuper();
            self.parent.dragStarted(self);
        },


        pop: function () {
            var self = this;

            if (self.parent.overflowing)
                self.callSuper();

        }
    });
})();

