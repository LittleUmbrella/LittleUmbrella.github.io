eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SearchMembersViewModel = (function () {

    var initSize = 94;

    return new JS.Class('circleverse.viewModel.SearchMembersViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule, 
            becu_org.ui.viewModel.circleModule
            ],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 20;

            var calcTop = 0;// (this.dimensions().height);
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = 0; //(this.dimensions().width));
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;
            //this.location = ko.observable();

            // var settings = {
            //     itemDiameter: initSize + 5,
            //     startSatellitesOnEdge: false,
            //     startingDegree: 230,
            //     evenDistribution: false
            // };
            
            self.callSuper(object, parent, globalSettings);

            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            self.settings = $.extend(self.settings || {}, { dropFilter: '.searchable' }, opts);

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });
            //properties
             // = ko.observableArray([]);

            self.size = ko.observable(initSize);
            //this.location = ko.observable();
            //left: scale() * 300, top:,

            
            //this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.animationSettings({width: self.parent.dimensions().width, height: self.parent.dimensions().height, callback: self.toggleFormAnimationEnded});

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });

            self.memberIcon = ko.observable('icon-search icon-size-3x');



            var searchLocation = self.location(),
                width = 300,
                height = 300,
                top = searchLocation.top - ((height)/2),
                left = searchLocation.left - ((width)/2);

            self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, top: top, left: left, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

            
            self.parent.childViewModels.subscribe(function(changes){
                if (changes[0].status == "added" && changes[0].item == self){
                    searchLocation = self.location(),
                        width = 300,
                        height = 300,
                        top = searchLocation.top - ((height)/2),
                        left = searchLocation.left - ((width)/2);

                    self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, top: top, left: left, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
                    self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

                }
            });

            // self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            // self.searchDimensionSettingsRegular = {width: self.dimensions().width, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};


            self.mainFormOpen = false;
            
            self.canDelete(false);
            self.canSearch(false);
            self.canEdit(false);
            self.canCreate(false);    

            
            self.firstName = ko.observable();
            self.middleName = ko.observable();
            self.lastName = ko.observable();
            self.taxId = ko.observable();   
            self.id = ko.observable();    
            
            this.icon.name('icon-search icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }
        //     ,

        // toggleChildrenVisibility: function(){
        //     var self = this;

        //     var s = self.callSuper;
            
        //     if (!self.parent.mainFormOpen){
        //         var prom = self.parent.searchRequested(self);
        //         prom.then(function(){                    
        //             s.call(self);
        //         });
        //     }
        // }
        ,

        showMainForm: function(){
            var self = this;
//return;
            var deferred = jQuery.Deferred();
            
            

            self.searchDimensionSettingsBig.onComplete = function(){
                if (self.childrenVisible()){
                    self.toggleChildrenVisibility();
                }
                self.toggleFormAnimationEnded();
                
                self.canOpen(false);
                self.canClose(true);          
                self.canSave(true);
                self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);
            
                deferred.resolve();
            };
            self.animationSettings(self.searchDimensionSettingsBig);
            //self.size(self.searchDimensionSettingsBig.width);
            
            self.mainFormOpen = true ;

            return deferred;
        }
        ,

        hideMainForm: function(){
            var self = this;
            
            var deferred = jQuery.Deferred();

            
            self.contentTemplate('emptyContentTemplate');
                self.searchDimensionSettingsRegular.onComplete = function(){
                    self.toggleFormAnimationEnded();
                    if (!self.childrenVisible()){
                        self.toggleChildrenVisibility();
                    }
                    
                    
                    self.canOpen(true);
                    self.canClose(true);            
                    self.canSave(false);
                    self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);
                    deferred.resolve();
                };
                self.animationSettings(self.searchDimensionSettingsRegular);
                //self.size(self.searchDimensionSettingsRegular.width);



            self.mainFormOpen = false ;

            return deferred;
        }
        ,

        

        toggleMainForm: function(){
            var self = this;
            
            var deferred;
            if (self.mainFormOpen){
                deferred = self.hideMainForm();
            }
            else{
                deferred = self.showMainForm();
            }


            return deferred;
        }
        ,

        toggleFormAnimationEnded: function(){
            var self = this;

            if (self.mainFormOpen){
                self.contentTemplate('findMemebersTemplate');
                self.dimensions({width: self.searchDimensionSettingsBig.width, height: self.searchDimensionSettingsBig.height});
                self.location({top: self.searchDimensionSettingsBig.top, left: self.searchDimensionSettingsBig.left});
                //self.size(self.searchDimensionSettingsBig.width);
                //self.location(self.getCalculatedLocation());
                
            }
            else{
                self.contentTemplate('standardContentTemplate');
                self.dimensions({width: self.searchDimensionSettingsRegular.width, height: self.searchDimensionSettingsRegular.height});
                self.location({top: self.searchDimensionSettingsRegular.top, left: self.searchDimensionSettingsRegular.left});
                self.size(self.searchDimensionSettingsRegular.width);
                self.__overridden = false;
                self.location(self.getCalculatedLocation());

            }
        }
        ,

        findIndividuals: function(){
            var self = this;

            var request = {firstName: self.firstName(),
            lastName: self.lastName(),
            taxId: self.taxId(),   
            id: self.id()};

            self.isBusy(true);
            self.childViewModels.removeAll();
            self.globalSettings.repository.findIndividuals(request).then(function(result){
                
                result.forEach(function(element) {
                    element.name = element.firstName + ' ' + element.lastName;
                    element.age = element.dateOfBirth;
                    self.childViewModels.push(new circleverse.viewModel.SearchMembersResultViewModel(element, self, self.globalSettings));
                    
                }, self);

                self.isBusy(false);
                if (self.childrenVisible()){
                    //self.searchResultsViewModel.showResults(result);
                }
                else{
                }
                self.hideMainForm();

            });
        }
        ,

        // onresize: function (e, data) {
        //     this.callSuper();


        //     var coords = this.__getCoords();
        //     this.location({ left: coords.left, top: coords.top });
        //     this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

        //     //log('garbage position: ' + this.position().top);
        // }
        // ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel) || dropViewModel.isA(circleverse.viewModel.OpenViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    //self.toggleChildrenVisibility();
                    if (self.faded())
                        self.toggleChildrenVisibility();
                    else
                        self.toggleMainForm();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.SaveViewModel) || dropViewModel.isA(circleverse.viewModel.SaveViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    //self.toggleChildrenVisibility();
                    self.findIndividuals();
                });


            }
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dragVm.isA(circleverse.viewModel.CloseViewModel) || dragVm.isA(circleverse.viewModel.OpenViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    if (self.faded())
                        self.toggleChildrenVisibility();
                    else
                        self.toggleMainForm();
                });


            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel) || dragVm.isA(circleverse.viewModel.SaveViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    //self.toggleChildrenVisibility();
                    self.findIndividuals();
                });


            }
        }


    });
})();
