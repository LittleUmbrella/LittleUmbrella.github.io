
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerAddressViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomerAddressViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule
        ],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            var initSize = 120;
            self.size = ko.observable(initSize);
            //properties
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(initSize);
            this.insideDiameter = 40;

            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);
 self.size = ko.observable(initSize);

            this.callSuper();

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.name('icon-address icon-size-2x');

            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//

            self.animationSettings({width: self.parent.dimensions().width, height: self.parent.dimensions().height, callback: self.toggleFormAnimationEnded});

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });

            self.memberIcon = ko.observable('icon-search icon-size-3x');



            var searchLocation = self.location(),
                width = 550,
                height = 45,
                top = searchLocation.top - ((height)/2),
                left = searchLocation.left - ((width)/2);

            self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, top: top, left: left, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

            
            self.contentTemplate('CustomerAddressViewModelContentTemplate');

            this.childrenOnTop = ko.observable(true);


            this.info = "Account Transactions (includes Pending)";

            var acct = self.parent.rawModel();


            self.showForm = ko.observable(false);

        }
        ,

        toggleChildrenVisibility: function () {
            var self = this, isFormVisible = self.showForm();

            self.callSuper();

            //if (self.__isKidsLoaded)
            //self.__globalSettings.eventAggregator.publish('member.view', self);
        }
        ,

        showMainForm: function(){
            var self = this;

            var deferred = jQuery.Deferred();
            
            

            self.searchDimensionSettingsBig.onComplete = function(){
                self.toggleFormAnimationEnded();
                
                // if (self.childrenVisible()){
                //     self.toggleChildrenVisibility();
                // }
                deferred.resolve();
            };
            self.animationSettings(self.searchDimensionSettingsBig);
            //self.size(self.searchDimensionSettingsBig.width);
            
            self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);
            
            //self.showLabel(false);

            self.canOpen(false);
            self.canClose(true);
            //self.canEdit(true);
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
                    if (self.childrenVisible()){
                        self.toggleChildrenVisibility();
                    }
                    deferred.resolve();
                };
                self.animationSettings(self.searchDimensionSettingsRegular);
                //self.size(self.searchDimensionSettingsRegular.width);

            //self.showLabel(true);

            self.canOpen(true);
            self.canClose(false);
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
                self.contentTemplate('CustomerAddressEditViewModelContentTemplate');
                self.dimensions({width: self.searchDimensionSettingsBig.width, height: self.searchDimensionSettingsBig.height});
                self.location({top: self.searchDimensionSettingsBig.top, left: self.searchDimensionSettingsBig.left});
                //self.size(self.searchDimensionSettingsBig.width);
                //self.location(self.getCalculatedLocation());
                
            }
            else{
                self.contentTemplate('CustomerAddressViewModelContentTemplate');
                self.dimensions({width: self.searchDimensionSettingsRegular.width, height: self.searchDimensionSettingsRegular.height});
                //self.location({top: self.searchDimensionSettingsRegular.top, left: self.searchDimensionSettingsRegular.left});
                self.size(self.searchDimensionSettingsRegular.width);
                self.__overridden = false;
                self.location(self.getCalculatedLocation());

            }
        }

        ,

        getSettings: function () {
            var settings = this.callSuper();
            //settings.drop = false;
            //settings.not = '.koGrid, .koGrid div, .kgRow, .kgCell div, .kgHeaderCell div, .kgTopPanel, .kgColMenu, .kgFooterPanel, .kgColListItem, .kgRow.odd, .kgRow.even, .kgRow.selected, .kgGroupIcon';
            return settings;
        }
        ,

        saveAddress: function(){
            var self = this;

            var request = {address: self.model()};

            self.isBusy(true);
            self.globalSettings.repository.saveMemberAddress(request).then(function(result){
                
                self.isBusy(false);
                if (self.mainFormOpen){
                    self.hideMainForm();
                }

            });
        }
        ,

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
                    if (self.mainFormOpen)
                        self.toggleMainForm();
                    else
                        self.toggleChildrenVisibility();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.SaveViewModel) || dropViewModel.isA(circleverse.viewModel.SaveViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    //self.toggleChildrenVisibility();
                    self.saveAddress();
                });


            }
            else if (dropViewModel.isA(circleverse.viewModel.EditViewModel)) { 
                
                prom.then(function(){
                    if (!self.mainFormOpen)               
                        self.showMainForm();
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
                    //self.toggleChildrenVisibility();
                    if (self.mainFormOpen)
                        self.toggleMainForm();
                    else
                        self.toggleChildrenVisibility();
                });

            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel) || dragVm.isA(circleverse.viewModel.SaveViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    //self.toggleChildrenVisibility();
                    self.saveAddress();
                });


            }
            else if (dragVm.isA(circleverse.viewModel.EditViewModel)) {  
                prom.then(function(){
                    if (!self.mainFormOpen)               
                        self.showMainForm();
                });
            }
        }

    });
})();
