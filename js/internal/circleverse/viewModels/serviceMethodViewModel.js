
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.serviceMethod = (function () {

        //any global variables here will be in scope for ALL instances
        //of the JS Class, not just one instance

        //var that;
        return new JS.Class('circleverse.viewModel.serviceMethod', circleverse.viewModel.ResizeableBase, {
            include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

            initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

                var that = this;
                //properties
                this.__reqDiameter = 20;

                this.methodDiameter = ko.dependentObservable(function () {
                    var settings = {
                        collection: object.callSpec().need()
                    , item: this.model
                    , itemDiameter: this.__reqDiameter
                    , minCenterDiameter: 0
                    , itemSeparation: 0
                    , itemPadding: 1
                    , center: { x: 0 / 2, y: 0 / 2 }
                    };

                    var points = littleUmbrella.circleverse.ui.shapes.satellite.getAllPositions(settings);
                    var polygon = new Polygon(points);

                    //                    for (var i = 0; i < points.length; i++) {
                    //                        log('point' + i + '=' + points[i].x + '__' + points[i].y);
                    //                    }
                    var retVal = Math.max(30, ((2 * polygon.radius()) + (this.__reqDiameter) + 2));
                    //                    log('methodDiameter=' + retVal);
                    //                    log('points.length=' + points.length);
                    //                    log('polygon.radius()=' + polygon.radius());
                    return retVal;

                } .bind(this));

                this.callSuper();


                this.methodRequirements = ko.observableArray();

                var callSpecObservable = this.model().callSpec;
                //var callSpec = callSpecObservable();

                if (callSpecObservable()) {
                    for (var i = 0; i < callSpecObservable().need().length; i++) {
                        vm = new circleverse.viewModel.serviceMethodRequirement(callSpecObservable().need()[i], this);
                        this.methodRequirements.push(vm);
                    }
                }

                var callSpecSubscription =
                callSpecObservable.subscribe(function (item) {

                    callSpecObservable().need.subscribe(function (item) {
                        var vm = new circleverse.viewModel.serviceMethodRequirement(item, self);

                        self.methodRequirements.push(vm);
                    });

                    callSpecSubscription.dispose();
                });



                //this.getObjects();
                //have no idea why this is necessary, but it seems to be
                //var methodsArr = that.model.parent.serviceMethods();



                //this.location({ left: 0, top: 0, width: 50, height: 50 });

            }

            ,
            applyBindings: function (namespace, node) {
                var ns = namespace || 'serviceMethod';
                if (node)
                    ko.applyBindings(this, node);
                //        var arr = []; //[0,1,2,3,4,5,6,7,8,9];

                //        var num = 3;

                //        for (var z = 0; z < num; z++) {
                //            arr.push(z);
                //        }





            }
            ,

            droppedOn: function (dragModel) {
                this.model().callSpec().add(dragModel);
            }
            ,

            getNeeds: function (ctx) {
                return ctx.need();
            }
        ,

            getItemLocation: function (item) {
                var collection = this.model().callSpec().need();

                //var collection = collectionCallback();
                var diameter = this.__reqDiameter; // ko.unwrap(satelliteDiameter); // this.methodDiameter;
                var parentDiam = ko.unwrap(this.methodDiameter);

                //log('parentDiameter=' + parentDiameter);

                var settings = {
                    collection: collection
                    , item: item
                    , itemDiameter: ko.unwrap(diameter)
                    , minCenterDiameter: 0 //parentDiam
                    , itemSeparation: 0
                    , itemPadding: 1
                    , center: { x: parentDiam / 2, y: parentDiam / 2 }
                };


                var pos = littleUmbrella.circleverse.ui.shapes.satellite.getPosition(settings);


                //                log('parentDiam=' + parentDiam);
                //                log('actualpoint=' + pos.x + '__' + pos.y);

                var loc = { left: pos.x, top: pos.y, width: diameter, height: diameter };

                //inside of parent
                //var loc = { left: left - diameter / 2, top: top - diameter / 2, width: diameter, height: diameter };
                return loc;

                var left;
                var top;
                if (reqs.length == 1) {
                    left = (this.methodDiameter() / 2) - (diameter / 2);
                    top = (this.methodDiameter() / 2) - (diameter / 2);
                    return { left: left, top: top, width: diameter, height: diameter };
                }
                var index = $.inArray(item, reqs);

                if (index == -1) return { left: 20 + (item.key * 3), top: 20, width: 20, height: 20 };


                var pp = littleUmbrella.circleverse.ui.pointsAndPolygon(this.model().callSpec().need(), diameter);

                //                log('need cnt: ' + this.model().callSpec.need().length);

                var obj = pp.points[index];

                var center = pp.polygon.center();
                var radius = pp.polygon.radius(diameter, diameter);

                //parent responds after, so we need future parent size 
                //not that.parent.size();
                var parentWidth = this.methodDiameter; //radius * 2;
                var parentHeight = parentWidth;

                var addX = Math.abs(center.x - (parentWidth / 2));
                var addY = Math.abs(center.y - (parentHeight / 2));


                left = obj.x + addX; // +(2*mX);
                top = obj.y + addY; // +(2*mY );


                //                log('left: ' + left + ' top: ' + top + ' center.x: ' + center.x + ' center.y: ' + center.y);

                //                log('');

                var loc = { left: left, top: top, width: diameter, height: diameter };

                //inside of parent
                //var loc = { left: left - diameter / 2, top: top - diameter / 2, width: diameter, height: diameter };
                return loc;
                //            for (var p = 0; p < printArr.length; p++) {
                //                var obj = printArr[p];

                //                var left = obj.x + addX; // +(2*mX);
                //                var top = obj.y + addY; // +(2*mY );

                //                log('left : ' + left + ' top : ' + top);


                //                var el = document.createElement("div");
                //                var $el = $(el);
                //                $el.css({ left: left - (diameter / 2), top: top - (diameter / 2), width: diameter, height: diameter });
                //                $el.addClass('circle');
                //                $canvas.append($el);
                //            }
            }
            ,

            prepare: function () {


            }
            ,

            getObjects: function (e, dataItem) {
                //log("object is a'comin");

                //                var vm;
                //                var needs = this.model().callSpec().need();

                //                for (var i = 0; i < needs.length; i++) {
                //                    vm = new needs[i].viewModel(needs[i]);
                //                    vm.loadInstanceView(undefined, vm);
                //                    //vm.applyBindings
                //                }


                var obj = new dataItem.type();

                //log('dblclick');
                if (JS.Interface.implements(obj, becu_org.ui.IValidateable)) {
                    obj.setRequirement(dataItem);
                }
                else
                    throw new Error("object " + obj.toString() + " does not implement IValidateable");


                var vm = new dataItem.viewModel(obj, dataItem, this);
                //log('dblclick');
                vm.loadInstanceView(null, vm);
            }
        ,

            postRender: function (renderedElements, vm) {

                //alert("rendered");
                $(renderedElements).each(function () {
                    //if (this.id == dataItem.id) {
                    var $el = $(this);
                    var dataItem = $el.tmplItem();
                    //                    if ($el.is('.circle'))
                    //                        littleUmbrella.circleverse.circlefy($el);

                    //                    $el.find('.circle').each(function () {
                    //                        var $child = $(this);
                    //                        littleUmbrella.circleverse.circlefy($child);

                    //                    });

                    $el.find('.center').each(function () {
                        var $child = $(this);
                        $child.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ($child.height() / 2) + 'px 0 0 -' + ($child.width() / 2) + 'px' });

                        //                            if ($child.parent)
                        //                                $child.parent.bind('resize', function () {
                        //                                    $child.center({ transition: 300 });
                        //                                });
                    });

                    //}
                    if ('undefined' != typeof dataItem.data.klass) {
                        var req = new circleverse.viewModel.serviceMethodRequirement(dataItem.data, vm);
                        req.applyBindings(undefined, this);
                    }
                });
            }
        });
    })();

