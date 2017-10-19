
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.centerCircle = (function () {



        return new JS.Module("centerCircle", {

            initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                //include: [becu_org.ui.viewModel.baseModule],
                var self = this;
                self.settings = $.extend(self.settings || {}, { ignoreUnderscore: true }, opts);

                self.callSuper();
                //properties

                if (!self.size)
                    self.size = ko.observable();

                if (!self.children)
                    self.children = ko.observableArray();

                if (!self.dimensions)
                    self.dimensions = ko.observable({width: self.size(), top: self.size()});


                if (!self.innerArr)
                    self.innerArr = ko.observableArray().extend({ rateLimit: 200 });

                //if (!self.filterableArr)
                //    self.innerArr = ko.observableArray();

                if (!self.childViewModels)
                    self.childViewModels = ko.observableArray();//.extend({ rateLimit: 200 });

                self.autoPopSingleChild = ko.observable(true);    
                self.globalSettings = globalSettings;

                self.modelItem = ko.computed(function () {
                    var len = self.childViewModels().length, itemDiameter = 0, itemBorderWidth = 0, item, modelItem;

                    if (0 == len) return null;

                    //get item size
                    for (var i = 0; i < len; i++) {
                        item = ko.unwrap(self.childViewModels()[i]);

                        if (item && (itemDiameter + itemBorderWidth) < (item.size() + item.borderWidth)) {
                            itemDiameter = item.size();
                            itemBorderWidth = item.borderWidth;

                            modelItem = item
                        }
                    }

                    return modelItem;
                });

                self.itemRadius = ko.computed(function () {
                    var modelItem = self.modelItem();

                    if (!modelItem) return 0;

                    return modelItem.size() / 2 + modelItem.borderWidth;
                });



                self.ringRadius = ko.computed(function () {
                    var satellite = self.modelItem();
                    if (!satellite)
                        return 0;

                    var res = littleUmbrella.circleverse.ui.shapes.satellite.getPosition.call(satellite, satellite.__settings());
                    return res.ringRadius;
                    //return (self.size() / 2) + self.borderWidth + self.itemRadius();
                });

                self.shadowActive = ko.observable(false);

                var showShadow = ko.observable(globalSettings['shadeChildren'].value());

                globalSettings.eventAggregator.subscribe('circleverse.setting.changed', function (msg, data) {
                    if (data.setting == 'shadeChildren') {
                        showShadow(data.value);
                    }

                });


                self.shadow = ko.computed(function () {
                    var ss = showShadow();

                    if (self.shadowActive()) {
                        if (!ss) return 'none';
                        if (self.globalSettings['theme'].value() == 'light') {
                            //return '0 0 0 ' + ((self.itemRadius() * 2) + 15) + 'px rgba(86, 174, 224,.3)';
                            return '0 0 0px ' + ((self.ringRadius()) + self.itemRadius() + 5) + 'px rgba(255, 255, 255,.65)';
                        }
                        else {
                            return '0 0 0px ' + ((self.ringRadius()) + self.itemRadius() + 5) + 'px rgba(0, 0, 0,.55)';
                        }
                    }

                    return 'none';
                });

                self.innerArr.subscribe(function (changes) {
                    //return;
                    var changesArrLen = changes.length;
                    //                 changes will be: [
                    //{
                    //    index: idx,
                    //    status: 'added' | 'removed',
                    //    value: obj
                    //}
                    //                 ], ...
                    
                }, self, "arrayChange");

                self.toggledRecently = false;
                self.childrenVisible = ko.observable(false);
                self.childrenVisible.subscribe(function (val) {
                    if (val) {
                        self.toggledRecently = true;
                        self.onTop(!self.onTop());

                        //settimeout
                        setTimeout(function () {
                            self.toggledRecently = false;
                        }, 1000);
                    }
                });

                self.hasChildrenToggled = ko.observable(false);
                self.isRoot = ko.observable(false);

            }

            
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)) {
                prom.then(function(){
                    return self.showChildVieModels();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)){
                prom.then(function(){
                    return self.parent.hideChildVieModels();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
                if (self.parent.isA(circleverse.viewModel.LinksViewModel)){
                    prom.then(function(){
                        self.parent.breakLink(self);
                    });
                }
            }

            return prom;
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            if (dragVm.isA(circleverse.viewModel.OpenViewModel)) {

                prom.then(function(){
                    return self.showChildVieModels();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.CloseViewModel)){
                prom.then(function(){
                    return self.parent.hideChildVieModels();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.garbageViewModel)) {
                if (self.parent.isA(circleverse.viewModel.LinksViewModel)){
                    prom.then(function(){
                        self.parent.breakLink(self);
                    });
                }

            }

            return prom;
        }
            ,

            reevaluateShadowState: function () {
                var self = this,
                    childViewModelsArr = self.childViewModels(),
                    childViewModelsLength = childViewModelsArr.length,
                    childViewModelsItem
                ;

                for (var i = 0; i < childViewModelsLength; i++) {
                    childViewModelsItem = ko.unwrap(childViewModelsArr[i]);

                    if (childViewModelsItem.showMe()) {

                        self.shadowActive(true);
                        return;
                    }

                }


                self.shadowActive(false);
            },

            showChildVieModels: function(){
                var self = this, arr = self.childViewModels(), len = arr.length, item, anyChildPopped = false, anyChildUnPopped = false, mixPop = false;

                if (!self.hasChildrenToggled()){
                    self.hasChildrenToggled(true);
                }

                var deferred = jQuery.Deferred();
                var popDeferreds = [];


                //special case the faded guys.  user is either trying to open or close a middle bubble in the chain
                if (self.faded()){
                    self.faded(false);

                    var movement = self.downToLeavesAndUnpopParents(arr, self);

                    if (movement.top != 0 && movement.left != 0)
                        self.moveRoot({movement: movement});
                    
                    for (var i = 0; i < len; i++) {
                        item = ko.unwrap(arr[i]);
                        if (!item.popped){
                            var popDeferred = item.pop();
                            
                            //we are re-popping any children of a lower parent, so don't auto-pop back up and send parent down again 

                            popDeferreds.push(popDeferred);
                        }

                        if (item.faded())
                            self.faded(false);

                    }
                    self.childrenVisible(true);
                    
                }
                else{
                    
                    for (var i = 0; i < len; i++) {
                        item = ko.unwrap(arr[i]);

                        if (!item.popped){ 
                            var popDeferred = item.pop();
                            //if only one child, open it                            
                            if (len == 1 && item.autoPopSingleChild()){
                                popDeferred.then(function(){
                                    item.showChildVieModels();
                                });
                            }
                            popDeferreds.push(popDeferred);
                        }

                        //anyChildPopped = true;
                    }

                    if (popDeferreds.length == 0)
                        deferred.resolve();
                    else
                        $.when.apply(null, popDeferreds).then(function(){
                            deferred.resolve();
                        });
                    
                    self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);

                    var loc;
                    if (!self.childrenVisible()){
                        // if (self.isRoot && self.isRoot() && self.moveRoot){
                        //     loc = self.location();
                            
                        //     //self.parent.faded(true);
                        //     self.moveRoot({movement: {top: -(loc.top), left: -(loc.left)}});

                        //     //self.parent.unpopAllBut(self);
                        // }
                        if (self.parent && self.parent.moveRoot && (!self.parent.isRoot || !self.parent.isRoot()) && (!self.canMoveRoot || self.canMoveRoot())){
                            loc = self.location();
                            
                            self.parent.faded(true);
                            self.parent.moveRoot({movement: {top: -(loc.top), left: -(loc.left)}});

                            self.parent.unpopAllBut(self);
                        }                    
                    }
                    
                    self.childrenVisible(true);


                    if (self.globalSettings['autoPin'].value()) {
                        if (self.pinViewModel)
                            self.pinViewModel.togglePin([self.pinViewModel]);
                    }
                }




                return deferred;
            },

            hideChildVieModels: function(){
                var self = this, arr = self.childViewModels(), len = arr.length, item, anyChildPopped = false, anyChildUnPopped = false, mixPop = false;

                if (!self.hasChildrenToggled()){
                    self.hasChildrenToggled(true);
                }

                var deferred = jQuery.Deferred();
                var popDeferreds = [];

                //special case the faded guys.  user is either trying to open or close a middle bubble in the chain
                // if (self.faded()){
                //     self.faded(false);

                //     var movement = self.downToLeavesAndUnpopParents(arr, self);

                //     if (movement.top != 0 && movement.left != 0)
                //         self.moveRoot({movement: movement});
                    
                //     for (var i = 0; i < len; i++) {
                //         item = ko.unwrap(arr[i]);
                //         if (item.popped){
                //             popDeferreds.push(item.pop());
                //         }

                //         if (item.faded())
                //             self.faded(false);

                //     }
                //     self.childrenVisible(false);
                    
                // }
                // else{

                    for (var i = 0; i < len; i++) {
                        item = ko.unwrap(arr[i]);

                        if (item.popped){
                            anyChildPopped = true;                            
                        }
                        else{
                            anyChildUnPopped = true; 
                        }

                        if (anyChildPopped && anyChildUnPopped){
                            mixPop = true;
                            break;
                        }
                        //anyChildPopped = true;
                    }

                    var movement = {top: 0, left: 0};
                    self.faded(false);
                    if (self.parent && self.parent.moveRoot){
                        loc = self.location();
                        self.parent.faded(false);
                        //self.parent.moveRoot({movement: {top: -(loc.top), left: -(loc.left)}});
                        movement = {top: loc.top, left: loc.left};
                    }
                    var chainMove = self.downToLeavesAndUnpopParents(arr, self);
                    movement.left += chainMove.left;
                    movement.top += chainMove.top;

                    if (movement.top != 0 && movement.left != 0){
                        if (self.parent && self.parent.moveRoot && (!self.parent.isRoot || !self.parent.isRoot()) && (!self.isRoot || !self.isRoot()) && (!self.canMoveRoot || self.canMoveRoot())){
                            self.parent.moveRoot({movement: movement});
                        }


                    }
                    // if (!mixPop)
                    //     self.childrenVisible(!self.childrenVisible());

                    // var childrenVisible = self.childrenVisible();
                    self.childrenVisible(false);
                    for (var i = 0; i < len; i++) {
                        item = ko.unwrap(arr[i]);

                        // if (childrenVisible){
                        //     if (!item.popped){ 
                        //         popDeferreds.push(item.pop());
                        //     }
                        // }
                        // else{
                            if (item.popped){
                                popDeferreds.push(item.pop());
                            }
                        //}

                        //anyChildPopped = true;
                    }

                    if (popDeferreds.length == 0)
                        deferred.resolve();
                    else
                        $.when.apply(null, popDeferreds).then(function(){
                            deferred.resolve();
                        });
                    
                    self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);

                    // if (mixPop){
                    //     return deferred;
                    // }

                    var loc;
                    // if (self.childrenVisible()){
                    //     if (self.parent && self.parent.moveRoot){
                    //         loc = self.location();
                            
                    //         self.parent.faded(true);
                    //         self.parent.moveRoot({movement: {top: -(loc.top), left: -(loc.left)}});

                    //         self.parent.unpopAllBut(self);
                    //     }
                    // }
                    // else{
                    //}



                    if (self.globalSettings['autoPin'].value()) {
                        if (self.pinViewModel)
                            self.pinViewModel.togglePin([self.pinViewModel]);
                    }
                //}




                return deferred;
                
                
            }
            ,
            
            toggleChildrenVisibility: function () {
                var self = this;

                //var currentLimeList = self.limeLight();
                // if (currentLimeList){
                //     self.limeLight(!self.limeLight());
                    
                //     //if (anyChildPopped)
                //     self.downToLeavesAndUnpopParents(arr, self);
                // }
                
                if (self.childrenVisible()){
                    return self.showChildVieModels();
                }
                else{
                    return self.hideChildVieModels();                    
                }

            },

            unpopAllBut: function(exclusion){
                var self = this, arr = self.childViewModels(), len = arr.length, item;

                for (var i = 0; i < len; i++) {
                    item = ko.unwrap(arr[i]);
                    if (item != exclusion && item.popped){
                        item.pop();                        
                        //item.parent.childrenVisible(false);
                    }
                }
            },

            downToLeavesAndUnpopParents: function(branches, originalNode){
                
                if (!branches) return;

                var self = this, len = branches.length, item, movement = {top: 0, left: 0}, retVal, adjusted = false;

                for (var i = 0; i < len; i++) {
                    item = ko.unwrap(branches[i]);
                    if (item){
                        if (item.childViewModels){
                            var arr = item.childViewModels(), childLen = arr.length;
                            if (childLen > 0){                        
                                retVal = item.downToLeavesAndUnpopParents(arr, originalNode);
                                
                                movement.top += retVal.top;
                                movement.left += retVal.left;
                                //return;
                            }                                                                        
                        }

                        item.faded(false);
                        if (originalNode != item.parent && item.popped){
                            item.parent.childrenVisible(false);
                            item.pop();

                            if (!adjusted){
                                var loc = item.parent.location();
                                movement.top += loc.top;
                                movement.left += loc.left;
                                adjusted = true;
                            }
                            //self.unpopParents(node.parent, originalNode);
                        }    
                        //self.unpopParents(item, originalNode);
                    } 
                }
                
                
                return movement;
            },

            // unpopParents: function(node, originalNode){
            //     var self = this;
            //     if (originalNode != node.parent && node.parent.popped){
            //         node.parent.pop();
            //         self.unpopParents(node.parent, originalNode);
            //     }
            // }
            // ,

            pin: function (except) {
                var self = this, arr = self.childViewModels(), len = arr.length;

                for (var i = 0; i < len; i++) {

                    var child = ko.unwrap(arr[i]), exceptlen = except.length, unpinChild = true;
                    for (var j = 0; j < exceptlen; j++) {
                        if (ko.unwrap(except[j]).parent == child) {
                            unpinChild = false;
                            break;
                        }
                        
                    }
                    if (unpinChild)
                        ko.unwrap(arr[i]).pop();
                }

            }


        });
    })();

