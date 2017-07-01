JS.require('JS.Class', function () {
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.service = (function () {

        //any global variables here will be in scope for ALL instances
        //of the JS Class, not just one instance

        return new JS.Class(circleverse.viewModel.ResizeableBase, {
            include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

            __getCoords: function () {
                var minTop = 30;
                var minLeft = 20;

                var calcTop = 20;
                var top = (calcTop < minTop) ? minTop : calcTop;

                var calcLeft = 10;
                var left = (calcLeft < minLeft) ? minLeft : calcLeft;

                //            log('garbage left: ' + left);
                //            log('garbage top: ' + top);
                return { left: left, top: top };
            }
            ,

            onresize: function (e, data) {
                this.callSuper();


                var coords = this.__getCoords();
                this.location({ left: coords.left, top: coords.top });
                this.dimensions({ height: this.scale() * 75, width: this.scale() * 75 });
                //log('customer position: ' + this.position().left);
            }
             ,
            initialize: function (object, initialPosition) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

                var initSize = 75;
 self.size = ko.observable(initSize);
                this.methodDiameter = 30;
                //
                this.callSuper(object, this.methodDiameter, object.serviceMethods);


                //properties
                var self = this;
                var that = this;

                this.__size = 75;


                //this.position = initialPosition || { top: 0, left: 0 };
                this.size(this.__size);

                this.isHoveringOver = ko.observable(false);


                this._methodsCache = [];

                this.methods = ko.observableArray([]);
                var vm;
                for (var i = 0; i < this.model().serviceMethods().length; i++) {
                    vm = new circleverse.viewModel.serviceMethod(this.model().serviceMethods()[i], this);
                    this.methods.push(vm);
                }

                this.model().serviceMethods.subscribe(function (item) {
                    var vm = new circleverse.viewModel.serviceMethod(item, self);

                    self.methods.push(vm);
                });


                this.initLocation = ko.observable();
                this.initLocation({ left: 20, top: 20 });
                
                this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



                var coords = this.__getCoords();
                this.initLocation({ left: coords.left, top: coords.top });
                this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });
                //log('scale: ' + this.scale());

                return;

                this.infoLocation = ko.dependentObservable(function () {
                    //                    angle = Math.PI * 0 / 180.0;
                    //                    var diameter = this.location().width;
                    //                    var x = (Math.cos(angle)) * (.5 * diameter) + (58); //* diameter; //
                    //                    var y = (Math.sin(angle)) * -(.5 * diameter) ; //* diameter; //
                    //                    log('diameter: ' + diameter);
                    //                    var loc = { left: x, top: y };
                    //                    var angle = 45;
                    //                    var loc = this.location();
                    //                    var r = (loc.width / 2);
                    //                    var center = { y: 0 + (loc.height / 2), x: 0 + (loc.width / 2) };

                    //                    var x = (Math.cos(angle) * r)+ center.x; //* diameter; //
                    //                    var y = (Math.sin(angle) * r) + center.y; //* diameter; //
                    var angle = 325;
                    var loc = this.location();
                    var r = (loc.width / 2);
                    var center = { y: r, x: r };

                    //log('r: ' + r);

                    var x = ((Math.cos(angle * Math.PI / 180) * r) + center.x); // +(58 / 2); //* diameter; //
                    var y = ((Math.sin(angle * Math.PI / 180) * r) + center.y) - (32); //* diameter; //

                    var loc = { left: x, top: y };

                    return loc;
                } .bind(this));
                //this.isActive = ko.observable(false);


                this.isExpanded(true);

            }
            ,

            getSettings: function () {

                return { relative: true, click: false, distance: 3, drop: '.favoriteServices' };
            }
        ,

            applyBindings: function (namespace, node) {
                if (node)
                    ko.applyBindings(this, node);
                //        var arr = []; //[0,1,2,3,4,5,6,7,8,9];

                //        var num = 3;

                //        for (var z = 0; z < num; z++) {
                //            arr.push(z);
                //        }


                var $el = $(node); // $(this);

                //                if ($el.is('.circle'))
                //                    littleUmbrella.circleverse.circlefy($el);

                //                $el.find('.circle').each(function () {
                //                    var $child = $(this);
                //                    littleUmbrella.circleverse.circlefy($child);

                //                });

                $el.find('.center').each(function () {
                    var $child = $(this);
                    $child.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ($child.height() / 2) + 'px 0 0 -' + ($child.width() / 2) + 'px' });

                    //                            if ($child.parent)
                    //                                $child.parent.bind('resize', function () {
                    //                                    $child.center({ transition: 300 });
                    //                                });
                });

                //seems to be needed onload
                //this.isExpanded(!this.isExpanded());
                //this.isExpanded(!this.isExpanded());

            }
        ,

            toggle: function (data, e) {
                //alert('getMethods');
                //if (e.currentTarget != e.target) return;

                //this.size(this.size() + 50);

                //log(this.isExpanded());


                if (this.isExpanded()) {
                    //this.model().serviceMethods.removeAll();
                    this.size(this.__size);

                    this.isExpanded(false);
                    return;

                }

                //                if (this._methodsCache.length == 0) {
                //                    
                //                }
                //                for (var i = 0; i < this._methodsCache.length; i++) {
                //                    this.model().serviceMethods.push(this._methodsCache[i]);
                //                }

                this.isExpanded(true);


                var that = this;
                //window.setTimeout(function () { that.methodTest(that) }, 3000);
            }
            ,

            methodTest: function (ctx) {
                method = new becu_org.domain.serviceMethod();
                method.name = "test service method" + 5;
                method.id = "serviceMethod" + 5;
                method.parent = ctx.model;

                ctx.model.serviceMethods.push(method);
            }
        ,

            postRender: function (renderedElements, vm) {

                //var renderedElements = args[0];
                //var dataItem = args[1];

                //                if (renderedElements !== undefined && renderedElements[0]) {
                //                    renderedElements[0]
                //                    //var initialPosition = { left: ($.inArray(dataItem, vm.services) * 60), top: 0 };
                //                    var serviceMethodVm = new circleverse.viewModel.serviceMethod(dataItem, this);
                //                    //service.prepare();
                //                    serviceMethodVm.applyBindings('serviceMethod', renderedElements[0]);
                //                    

                //                }
                //                return;

                //alert("rendered");
                var toCenter = [];
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
                        //$child.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ($child.outerHeight() / 2) + 'px 0 0 -' + ($child.outerWidth() / 2) + 'px' });
                        toCenter.push($child);
                        //                            if ($child.parent)
                        //                                $child.parent.bind('resize', function () {
                        //                                    $child.center({ transition: 300 });
                        //                                });
                    });

                    //}
                    if ('undefined' != typeof dataItem.data.klass) {
                        var meth = new circleverse.viewModel.serviceMethod(dataItem.data, vm);
                        dataItem.viewModel = meth;
                        meth.applyBindings(undefined, this);
                    }
                });

                //alert(toCenter.length);
                var center;
                for (var i = 0; i < toCenter.length; i++) {
                    center = toCenter[i];
                    //alert(center.outerHeight());
                    center.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + (center.outerHeight() / 2) + 'px 0 0 -' + (center.outerWidth() / 2) + 'px' });
                }

            }
        });
    })();
});
