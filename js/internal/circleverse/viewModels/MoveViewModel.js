eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.MoveViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.MoveViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 100;
            var minLeft = 20;

            var calcTop = (this.dimensions().height * 2);
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() - this.dimensions().width)) - 30);
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper(object, parent, globalSettings);
            //properties

            var self = this;
            this.location = ko.observable();
            //left: scale() * 300, top:,

            self.size = ko.observable(initSize);
            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            self.settings = $.extend(self.settings || {}, { dropFilter: '.filterable' }, opts);

            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });

            self.label("Move");
            


            var subscriptions = [];

            var evaluatevisibility = function(activeThings){
                var show = false;
                for (var i = 0; i < activeThings.length; i++){
                    var activeThing = activeThings[i]; 
                    if (activeThing.canMove){                   

                        //purge all subscriptions
                        for (var h = 0; h < subscriptions.lenght; h++){
                            subscriptions[h].dispose(); 
                        }
                        subscriptions = [];
                        
                        //add subscriptions back TO ALL ACTIVE THINGS, in case one of them changes their mind
                        var subscription = activeThing.canMove.subscribe(function(){
                            self.globalSettings.eventAggregator.publish('stage.activeThings.changed', self);
                        });

                        subscriptions.push(subscription);

                        if (!show && activeThing.canMove()) show = true;
                    }
                }
                self.showMe(show);
            };

            globalSettings.eventAggregator.subscribe('stage.activeThings.changed', function(eventName, activeThings){
                evaluatevisibility(activeThings);                
            });


            
            this.icon.name('icon-recreational-vehicle icon-size-2x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }
            ,

        onresize: function (e, data) {
            this.callSuper();


            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            //log('garbage position: ' + this.position().top);
        }
 
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //self.callSuper();
            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(littleUmbrella.circleverse.viewModel.CustomerViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                var findChileAndToggleIfNecessary = function(children, t){
                    var len = children.length, prom = jQuery.Deferred(), found = false;

                    for (var i = 0; i < len; i++) {
                        var item = ko.unwrap(children[i]);

                        if (item.isA(t)) {
                            found = true;

                            if (item.childViewModels){
                                if (item.childrenVisible()){
                                    prom.resolve(item);
                                    return prom;
                                }
                                else{
                                    item.showChildVieModels().then(function(){
                                        prom.resolve(item);                                        
                                    });
                                    return prom;
                                }
                            }
                            else{
                                prom.resolve(item);
                                return prom;
                            }
                        }
                    }

                    if (!found){
                        prom.resolve();

                    }

                    return prom;
                };

                if (!dropViewModel.childrenVisible()){
                    prom.then(function(){
                        dropViewModel.showChildVieModels().then(function(child){
                            findChileAndToggleIfNecessary(dropViewModel.childViewModels(), circleverse.viewModel.CustomerInfoViewModel).then(function(child){
                                // if (child){
                                //     findChileAndToggleIfNecessary(child.childViewModels(), circleverse.viewModel.CustomerAddressesViewModel).then(function(child){
                                //         // if (child){
                                //         //     findChileAndToggleIfNecessary(child.childViewModels(), circleverse.viewModel.CustomerAddressViewModel).then(function(child){
                                //         //         if (child){
                                //         //             if (!child.showForm()){
                                //         //                 child.showMainForm();
                                //         //             }
                                //         //         }
                                //         //     });
                                //         // }
                                //     });
                                // }
                            });
                        });
                    });
                }
                else {
                    findChileAndToggleIfNecessary(dropViewModel.childViewModels(), circleverse.viewModel.CustomerInfoViewModel).then(function(child){
                        // if (child){
                        //     findChileAndToggleIfNecessary(child.childViewModels(), circleverse.viewModel.CustomerAddressesViewModel).then(function(child){
                        //         // if (child){
                        //         //     findChileAndToggleIfNecessary(child.childViewModels(), circleverse.viewModel.CustomerAddressViewModel).then(function(child){
                        //         //         if (child){
                        //         //             if (!child.showForm()){
                        //         //                 child.showMainForm();
                        //         //             }
                        //         //         }
                        //         //     });
                        //         // }
                        //     });
                        // }
                    });
                }
            }
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            //self.callSuper();
            //this.model().callSpec().add(dragModel);
            if (dragVm.isA(littleUmbrella.circleverse.viewModel.CustomerViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                
                var findChileAndToggleIfNecessary = function(children, t){
                    var len = children.length, prom = jQuery.Deferred(), found = false;

                    for (var i = 0; i < len; i++) {
                        var item = ko.unwrap(children[i]);

                        if (item.isA(t)) {
                            found = true;

                            if (item.childViewModels){
                                if (item.childrenVisible()){
                                    prom.resolve(item);
                                    return prom;
                                }
                                else{
                                    item.showChildVieModels().then(function(){
                                        prom.resolve(item);                                        
                                    });
                                    return prom;
                                }
                            }
                            else{
                                prom.resolve(item);
                                return prom;
                            }
                        }
                    }

                    if (!found){
                        prom.resolve();

                    }

                    return prom;
                };

                if (!dragVm.childrenVisible()){
                    prom.then(function(){
                        dragVm.showChildVieModels().then(function(child){
                            findChileAndToggleIfNecessary(dragVm.childViewModels(), circleverse.viewModel.CustomerInfoViewModel).then(function(child){
                                // if (child){
                                //     findChileAndToggleIfNecessary(child.childViewModels(), circleverse.viewModel.CustomerAddressesViewModel).then(function(child){
                                //         // if (child){
                                //         //     var children = child.childViewModels(), len = children.length;

                                //         //     for (var i = 0; i < len; i++) {
                                                
                                //         //         var item = ko.unwrap(children[i]);

                                //         //         if (item.isA(circleverse.viewModel.CustomerAddressViewModel)) {
                                //         //             if (!item.showForm()){
                                //         //                 item.showMainForm();
                                //         //             }
                                //         //         }
                                //         //     }
                                //         // }
                                //     });
                                // }
                            });
                        });
                    });
                }
                else {
                    findChileAndToggleIfNecessary(dragVm.childViewModels(), circleverse.viewModel.CustomerInfoViewModel).then(function(child){
                        // if (child){
                        //     findChileAndToggleIfNecessary(child.childViewModels(), circleverse.viewModel.CustomerAddressesViewModel).then(function(child){
                        //         // if (child){
                        //         //     var children = child.childViewModels(), len = children.length;

                        //         //     for (var i = 0; i < len; i++) {
                                        
                        //         //         var item = ko.unwrap(children[i]);

                        //         //         if (item.isA(circleverse.viewModel.CustomerAddressViewModel)) {
                        //         //             if (!item.showForm()){
                        //         //                 item.showMainForm();
                        //         //             }
                        //         //         }
                        //         //     }
                        //         // }
                        //     });
                        // }
                    });
                }

            }
        }

    });
})();
