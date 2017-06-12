JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.communication');

    becu_org.communication.services = (function () {

        //any global variables here will be in scope for ALL instances
        //of the JS Class, not just one instance
        var methodsCnt = 3;
        var serviceCnt = 3;

        return new JS.Class(circleverse.viewModel.Base, {
            include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

            initialize: function () {
                this.callSuper();

                //properties
                this.services = []; // ko.observableArray(); //
            },

            getServices: function () {
                //                var serviceMethods = [];
                //                var method;
                //                for (var i = 0; i < serviceCnt; i++) {
                //                    //var config = new becu_org.communication.serviceConfig();
                //                    serviceMethods = []; //reset


                //                    //                    for (var z = 0; z < serviceCnt; z++) {
                //                    //                        method = new becu_org.domain.serviceMethod();
                //                    //                        method.name = "test service method" + z;
                //                    //                        method.id = "serviceMethod" + z;

                //                    //                        serviceMethods.push(method);
                //                    //                    }

                //                    var service = new becu_org.domain.service(
                //                        serviceMethods
                //                    );

                //                    //this.uri = uri;
                //                    //                service.templateId = "serviceTemplate" + i;
                //                    //                service.templateUri = 'viewModels/service.js';
                //                    //                service.viewUri = 'views/service.html';
                //                    service.name = "test service" + i;
                //                    service.id = "serviceView" + i;
                //                    service.activatorId = service.id + 'activator';
                //                    //                serviceMethods.push(
                //                    //                    new becu_org.domain.serviceMethod(
                //                    //                        "http://www.yahoo.com"
                //                    //                        ,
                //                    //                        "http://www.yahoo.com"
                //                    //                        ,
                //                    //                        i
                //                    //                        ,
                //                    //                        "http://www.yahoo.com"
                //                    //                        ,
                //                    //                        callSpec
                //                    //                        ,
                //                    //                        i + "template"
                //                    //                        ,
                //                    //                        i
                //                    //                        ));


                //                    //service.process();

                //                    this.services.push(service);
                //                }
                var vm = new circleverse.viewModel.service(new littleUmbrella.Circleverse.Service.CustomerService(), 0);
                this.services.push(vm);

            }
        ,
            applyBindings: function (namespace) {
                ko.applyBindings(this, $('#services')[0]);

                //            var $el = $('#' + this.model().config.id);

                //            littleUmbrella.circleverse.circlefy($el);
                //            littleUmbrella.circleverse.dragify($el);
                //            littleUmbrella.circleverse.dropify($el);
            }

            ,
            prepare: function (model) {
                //show methods and forms
                //alert('clicked');

                $('#' + model.activatorId).remove();

                //                var serviceVm = new circleverse.viewModel.service(model);
                //                //service.prepare();
                //                serviceVm.applyBindings('service', $('#' + model.id)[0]);




            }
            ,

            dropped: function (model) {
                //alert(model.id);
            }
            ,

            droppedOn: function (model) {
                //alert(model.id);
                //alert('dropped');
            }
            ,



            //            dragging: function () {
            //                return function () { };
            //            }
            //            ,
            //            
            //            dragend: function () {
            //                return function () { };
            //            }
            //            ,
            added: function (elem) {
                var $elem = $(elem);
                // We'll target all AREA elements with alt tags (Don't target the map element!!!)


                $elem.hide().slideDown();
            }
            ,

            postRender: function (args, vm) {//renderedElements, dataItem
                return;
                //var args = arguments;
                var renderedElements = args[0];
                var dataItem = args[1];
                if (renderedElements !== undefined && renderedElements[0]) {
                    var initialPosition = { left: ($.inArray(dataItem, vm.services) * 90), top: 20 };
                    var serviceVm = new circleverse.viewModel.service(dataItem, initialPosition);
                    //service.prepare();
                    serviceVm.applyBindings('service', renderedElements[0]);
                }

                //return;
                var toCenter = [];

                //grayscale(renderedElements[0]);
                $(renderedElements).each(function () {
                    var $el = $(this);

                    var $info;
                    $el.find('.info').each(function () {
                        var info = $(this);
                        info.qtip(
                        {
                            //                            position: {
                            //                                target: [$this.position().left, $this.position().top]
                            //                            },
                            //                           content: {
                            //                               attr: 'tip' // Use the ALT attribute of the area map for the content
                            //                           },
                            // 
                            style: {
                                classes: 'ui-tooltip-tipsy ui-tooltip-shadow'
                            }
                            ,
                            show: {
                                effect: function () {
                                    var $this = $(this);
                                    //                                    $this.queue(function (next) {
                                    //                                        $this.show(); $(this).dequeue();
                                    //                                    });
                                    //                                    $this.queue(function () { $this.animate({ opacity: 0 }, 3000) });
                                    //$this.show(100, function () { $this.hide('slow') });
                                    //;
                                    //$this.animate({ opacity: 0 }, 3000);
                                    $this.show('fast', function () { $this.animate({ opacity: 0 }, 3000); });
                                    //$this.show().animate({ opacity: 0 }, { duration: 2000 }); ;
                                    //$this.queue(function () { $this.animate({ opacity: 0 }, { duration: 3000 }); $this.dequeue; });
                                } //effect: function () { $(this).show('explode', { pieces: 1 }, 200).hide('explode', null, 3500); } //.animate({ opacity: 0 }, 800); }
                            }
                            ,
                            hide: {
                                effect: function () {
                                    $(this).stop(true).hide();
                                }
                            }
                        });
                    });

                    if ($el.is('.info')) {
                        $el.qtip(
                        {
                            //                            position: {
                            //                                //target: [uiSetting['ui-tooltip-self-x'], uiSetting['ui-tooltip-self-y']]
                            //                                //target: [$el.position().left, $el.position().top]
                            //                            },
                            //                           content: {
                            //                               attr: 'tip' // Use the ALT attribute of the area map for the content
                            //                           },
                            // 
                            style: {
                                classes: 'ui-tooltip-tipsy ui-tooltip-shadow'
                            }
                            ,
                            show: {
                                effect: function () {
                                    var $this = $(this);
                                    //                                    $this.queue(function (next) {
                                    //                                        $this.show(); $(this).dequeue();
                                    //                                    });
                                    //                                    $this.queue(function () { $this.animate({ opacity: 0 }, 3000) });
                                    //$this.show(100, function () { $this.hide('slow') });
                                    //;
                                    //$this.animate({ opacity: 0 }, 3000);
                                    $this.show('fast', function () { $this.animate({ opacity: 0 }, 3000); });
                                    //$this.show().animate({ opacity: 0 }, { duration: 2000 }); ;
                                    //$this.queue(function () { $this.animate({ opacity: 0 }, { duration: 3000 }); $this.dequeue; });
                                } //effect: function () { $(this).show('explode', { pieces: 1 }, 200).hide('explode', null, 3500); } //.animate({ opacity: 0 }, 800); }
                            }
                            ,
                            hide: {
                                effect: function () {
                                    $(this).stop(true).hide();
                                }
                            }
                        });

                        //grayscale.prepare($el);
                    }

                    if ($el.is('.onLoadTip')) {
                        $el.qtip(
                        {
                            position: {
                                my: 'top center', // Use the corner...
                                at: 'bottom center' // ...and opposite corner
                            },
                            //                           content: {
                            //                               attr: 'tip' // Use the ALT attribute of the area map for the content
                            //                           },
                            // 
                            style: {
                                classes: 'ui-tooltip-tipsy ui-tooltip-shadow'
                            }
                            ,
                            show: {
                                effect: function () {
                                    var $this = $(this);
                                    //                                    $this.queue(function (next) {
                                    //                                        $this.show(); $(this).dequeue();
                                    //                                    });
                                    //                                    $this.queue(function () { $this.animate({ opacity: 0 }, 3000) });
                                    //$this.show(100, function () { $this.hide('slow') });
                                    //;
                                    //$this.animate({ opacity: 0 }, 3000);
                                    $this.show('fast', function () { $this.animate({ opacity: 0 }, 3000); });
                                    //$this.show().animate({ opacity: 0 }, { duration: 2000 }); ;
                                    //$this.queue(function () { $this.animate({ opacity: 0 }, { duration: 3000 }); $this.dequeue; });
                                } //effect: function () { $(this).show('explode', { pieces: 1 }, 200).hide('explode', null, 3500); } //.animate({ opacity: 0 }, 800); }
                            }
                            ,
                            hide: {
                                effect: function () {
                                    $(this).stop(true).hide();
                                }
                            }
                        });

                        //grayscale.prepare($el);
                    }

                    $el.find('.onLoadTip').each(function () {
                        $(this).qtip(
                        {
                            position: {
                                my: 'top center', // Use the corner...
                                at: 'bottom center' // ...and opposite corner
                            },
                            //                           content: {
                            //                               attr: 'tip' // Use the ALT attribute of the area map for the content
                            //                           },
                            // 
                            style: {
                                classes: 'ui-tooltip-tipsy ui-tooltip-shadow'
                            }//,
                            //effect: function () { $(this).hide('bounce', null, 100); }
                        });
                    });

                    if (this.id == dataItem.id) {

                        //                        if ($el.is('.circle'))
                        //                            littleUmbrella.circleverse.circlefy($el);
                        //                        if ($el.is('.drag'))
                        //                            littleUmbrella.circleverse.dragify($el);
                        //                        if ($el.is('.drop'))
                        //                            littleUmbrella.circleverse.dropify($el);

                        //                        $el.children().each(function () {
                        //                            var $child = $(this);
                        //                            if ($child.is('.circle'))
                        //                                littleUmbrella.circleverse.circlefy($child);
                        //                            if ($child.is('.drag'))
                        //                                littleUmbrella.circleverse.dragify($child);
                        //                            if ($child.is('.drop'))
                        //                                littleUmbrella.circleverse.dropify($child);

                        //                        });

                        //                        $el.find('.circle').each(function () {
                        //                            var $child = $(this);
                        //                            littleUmbrella.circleverse.circlefy($child);

                        //                        });

                        $el.find('.center').each(function () {
                            var $child = $(this);
                            toCenter.push($child);

                            //$child.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ($child.height() / 2) + 'px 0 0 -' + ($child.width() / 2) + 'px' });

                            //                            if ($child.parent)
                            //                                $child.parent.bind('resize', function () {
                            //                                    $child.center({ transition: 300 });
                            //                                });
                        });

                        //                        $el.find('.drag').each(function () {
                        //                            var $child = $(this);
                        //                            littleUmbrella.circleverse.dragify($child);
                        //                        });

                        //                        $el.find('.drop').each(function () {
                        //                            var $child = $(this);
                        //                            littleUmbrella.circleverse.dropify($child);

                        //                        });
                    }
                });
                //                for (el in renderedElements) {
                //                    if (el.id == dataItem.id) {
                //                        
                //                    }
                //                }
                //alert("rendered");
                var center;
                for (var i = 0; i < toCenter.length; i++) {
                    center = toCenter[i];
                    //alert(center.outerHeight());
                    //alert(center.height());
                    center.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + (center.outerHeight() / 2) + 'px 0 0 -' + (center.outerWidth() / 2) + 'px' });
                }
            }

        });

    })();
});