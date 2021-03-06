﻿
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerAddressViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
            var initSize = 120;
    return new JS.Class('circleverse.viewModel.CustomerAddressViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule,
            circleverse.viewModel.SpecialViewViewModel
        ],

        initialize: function (object, addressOwner, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            self.size = ko.observable(initSize);
            //properties

            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            this.callSuper(object, parent, globalSettings);

            self.location({left:0, top:0});

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.showMe(true);

            self.autoPopSingleChild(false);

            self.addressOwner = ko.observable(addressOwner);

            this.icon.name('icon-address icon-size-2x');

            
            this.icon.secondary = {name: ko.pureComputed(function(){
                switch(self.model().use().toLowerCase()){
                    case 'prim':
                        return 'icon-dot-circle-o icon-size-2x prim';
                    case 'sea':
                        return 'icon-calendar2 icon-size-2x';
                    case 'tax':
                        return 'icon-file-text-o icon-size-2x';
                    case 'alt01':
                        return 'icon-dot-circle-o icon-size-2x';
                    case 'alt02':
                        return 'icon-dot-circle-o icon-size-2x';
                    case 'alt03':
                        return 'icon-dot-circle-o icon-size-2x';
                    case 'alt04':
                        return 'icon-dot-circle-o icon-size-2x';
                }
            })
            };


            //self.animationSettings({width: self.parent.dimensions().width, height: self.parent.dimensions().height, callback: self.toggleFormAnimationEnded});

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });


            // self.center = [self.model().latitude(), self.model().longitude()];
            // self.color = ko.observable();
            // self.opened= ko.observable(false);
            self.memberIcon = ko.observable('icon-search icon-size-3x');


            self.changeAdditional = ko.observableArray();


            self.linksCount = ko.computed(function(){                
                

                return self.changeAdditional().length;

            });

            var linksSubscription = null;

            var strawberry = function(linksVm){
                var llen = linksVm.childViewModels().length;

                self.changeAdditional.removeAll();

                for (var i = 0; i < llen; i++) { 
                    var lmodel = linksVm.childViewModels()[i].rawModel();

                    if (lmodel.isA(becu_org.domain.model.PersonObservable)){
                        self.changeAdditional.push(lmodel.fullName());
                    }
                    else if (lmodel.isA(becu_org.domain.model.AccountObservable)){
                        self.changeAdditional.push(lmodel.accountNumber());
                    }
                }
            }

            var childrenSubscription = self.childViewModels.subscribe(function(){  

                var clen = self.childViewModels().length;
                for (var h = 0; h < clen; h++) {          
                    var cvm = self.childViewModels()[h];

                    if (cvm.isA(circleverse.viewModel.LinksViewModel)){
                        if (!linksSubscription)
                            linksSubscription = cvm.childViewModels.subscribe(function(){
                                strawberry(cvm);
                            });

                        strawberry(cvm);                        
                    }
                }

            });

            self.searchDimensionSettingsBig;
            self.searchDimensionSettingsRegular;


            var setToggleFormSettings = function(loc){
                
                var searchLocation = self.location(),
                width = 600,
                height = 155;

                self.searchDimensionSettingsBig = {width: width, height: height, top: searchLocation.top - ((height)/2) + ((initSize)/2), left: searchLocation.left - ((width)/2) + ((initSize)/2), borderRadius: 15, background: 'inherit', borderWidth: 2, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

                self.searchDimensionSettingsRegular = {width: initSize, top: searchLocation.top + ((height)/2) - ((initSize)/2), left: searchLocation.left + ((width)/2) - ((initSize)/2), height: initSize, borderRadius: '50%', background: 'initial', borderWidth: 0, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
    
            };


            self.location.subscribe(function(val){
                setToggleFormSettings();
            });

            
            self.results = ko.observableArray();

            self.lostFocus = function(){                
                //because of the way value binding works, value will fire after and cause the auto-fill to re-appear, so as a kludge, use a timeout
                setTimeout(function(){
                    self.results.removeAll();
                }, 1000);
            };

            self.autofillSelect = function(val){  
                var model = self.model();
                var parsed = parseAddress.parseLocation(val);
                var model = self.model();

                model.line1(parsed.number + ' ' + ((typeof(parsed.type) == 'undefined')? '' : parsed.type) + ' ' + ((typeof(parsed.prefix) == 'undefined')? '': parsed.prefix) + ' ' + parsed.street);
                model.city(parsed.city);
                model.state(parsed.state);
                model.postalCode(parsed.zip);   

                self.results.removeAll();
            };
            
            self.lineStartAt('center');
            self.connectionWidthStaticAdjustment(-25);
            self.mainCss("address see-through");

            self.autofillMainCss = ko.observable('auto-fill list');
            self.autofillItemCss = ko.observable('row');
            self.autofillSelectCss = ko.observable('item');

            self.parsed = {
				line1 : ko.observable(),
				postalCode : ko.observable(),
				city : ko.observable(),
				state : ko.observable()};

            self.address = ko.pureComputed({
                read: function(){
                    console.log('read');
                    return self.model().full();
                },
                write: function(val){
                    console.log('write');
                    if (val && val.length >= 2){
                        //parse address and set model's
                        var parsed = parseAddress.parseLocation(val);
                        //var model = self.model();

                        self.parsed.line1(parsed.number + ' ' + ((typeof(parsed.type) == 'undefined')? '' : parsed.type) + ' ' + ((typeof(parsed.prefix) == 'undefined')? '': parsed.prefix) + ' ' + parsed.street);
                        self.parsed.city(parsed.city);
                        self.parsed.state(parsed.state);
                        self.parsed.postalCode(parsed.zip);
                        //model.line1(parsed.number);

// number: '1005',
//  prefix: 'N',
//  street: 'Gravenstein',
//  type: 'Highway',
//  city: 'Sebastopol',
//  state: 'CA',
//  zip: '95472' }

                        //prompt
                        self.globalSettings.repository.searchMemberAddress(val).then(function(result){
                
                            self.results.removeAll();

                            if (result){
                                for (var i = result.length; i > 0; i--){
                                    self.results.push(result[i-1]);
                                }
                            }

                        });
                    }
                },
                owner: self
            });
            
            self.contentTemplate('CustomerAddressViewModelContentTemplate');

            this.childrenOnTop = ko.observable(true);

            self.isRoot(true);
            self.canMoveRoot(false);

            this.info = "Account Transactions (includes Pending)";

            
            self.canCreate(false);
            self.canEdit(true);
            self.canDelete(true);
            self.canSearch(false);
            self.canRefresh(false);
            self.canSave(false);
            self.canOpen(false);
            self.canClose(false);
            self.canHelp(true);

            self.showForm = ko.observable(false);

        }
        ,

        showMainForm: function(){
            var self = this;

            var deferred = jQuery.Deferred();
            
            

            self.searchDimensionSettingsBig.onComplete = function(){
                self.toggleFormAnimationEnded();
                
                if (self.childrenVisible()){
                    self.hideChildVieModels().then(function(){
                        deferred.resolve();
                    });
                }
                else{                    
                    deferred.resolve();
                }
                self.focus(true);

                
            };
            self.animationSettings(self.searchDimensionSettingsBig);
            //self.size(self.searchDimensionSettingsBig.width);
            
            self.canEdit(false);
            self.canSave(true);
            self.canClose(true);
            self.globalSettings.eventAggregator.publish('stage.activeThings.add', self);
            
            //self.showLabel(false);



            self.mainFormOpen = true ;

            return deferred;
        }
        ,

        hideMainForm: function(){
            var self = this;
            
            var deferred = jQuery.Deferred();

            
            self.focus(false);
            self.contentTemplate('emptyContentTemplate');
                self.searchDimensionSettingsRegular.onComplete = function(){
                    self.toggleFormAnimationEnded();
                    if (!self.childrenVisible()){
                        self.showChildVieModels().then(function(){
                            deferred.resolve();
                        });
                    }
                    else{                        
                        deferred.resolve();
                    }

                    
                };
                self.animationSettings(self.searchDimensionSettingsRegular);
            
            self.canEdit(true);
            self.canSave(false);
            self.canClose(false);
            self.globalSettings.eventAggregator.publish('stage.activeThings.add', self);

            self.canOpen(true);
            self.canSave(false);
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
                self.location({top: self.searchDimensionSettingsRegular.top, left: self.searchDimensionSettingsRegular.left});
                //self.size(self.searchDimensionSettingsRegular.width);
                //self.__overridden = false;
                //self.location(self.getCalculatedLocation());
                //self.__overridden = false;

            }
        }

        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.mail, .edit, .new, .trash, .save, .help';
            
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
        
        toggleChildrenVisibility: function () {
            var self = this;
            
            if (self.childrenVisible()){
                if (self.mainFormOpen)
                    return self.hideMainForm();
            }
            else{                
                if (self.mainFormOpen)
                    return self.hideMainForm();                
            }

        }
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen)
                        self.hideMainForm();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    if (self.mainFormOpen)
                        self.hideMainForm();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.SaveViewModel) || dropViewModel.isA(circleverse.viewModel.SaveViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    self.saveAddress();
                });


            }
            else if (dropViewModel.isA(circleverse.viewModel.MailViewModel)) {
                

                prom.then(function(){
                     self.promptForMailRerouteConfirmation(dropViewModel, args[2].element);
                });


            }
            else if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
                prom.then(function(){
                     self.promptForDeleteConfirmation(dropViewModel, args[2].element);
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.EditViewModel)) { 
                
                prom.then(function(){
                    if (!self.mainFormOpen)               
                        self.showMainForm();
                });
            }
            //if closing address that isn't in edit mode
            if (!self.mainFormOpen) if (self.callSuper) self.callSuper();
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            if (dragVm.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen)
                        self.hideMainForm();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    if (self.mainFormOpen)
                        self.hideMainForm();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel)) {
                

                prom.then(function(){
                    self.saveAddress();
                });


            }
            else if (dragVm.isA(circleverse.viewModel.MailViewModel)) {
                

                prom.then(function(){
                     self.promptForMailRerouteConfirmation(dragVm, args[2].element);
                });


            }
            else if (dragVm.isA(circleverse.viewModel.garbageViewModel)) {
                prom.then(function(){
                     self.promptForDeleteConfirmation(dragVm, args[2].element);
                });
                
            }
            else if (dragVm.isA(circleverse.viewModel.EditViewModel)) {  
                prom.then(function(){
                    if (!self.mainFormOpen)               
                        self.showMainForm();
                });
            }
            if (!self.mainFormOpen) if (self.callSuper) self.callSuper();
        }
        ,

        promptForMailRerouteConfirmation: function(mailVm, fromElement){
            var self = this;

            var dialogOptions = {template: mailVm.confirmTemplateName(), fromElement: fromElement, type: 'confirm', dimensions: {width: 400, height: 300}, vms: {}, title: 'Are you sure?'};
                    dialogOptions.vms[self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1)] = self;
                    dialogOptions.vms[mailVm.klass.displayName.substring(mailVm.klass.displayName.lastIndexOf(".") + 1)] = mailVm;

                    self.eventAggregator.publish('dialog.confirm.open', dialogOptions);    
        }
        ,

        promptForDeleteConfirmation: function(deleteVm, fromElement){
            var self = this;

            var dialogOptions = {template: self.confirmDeleteTemplateName(), fromElement: fromElement, type: 'confirm', dimensions: {width: 400, height: 300}, vms: {}, title: 'Are you sure?'};
                    dialogOptions.vms[self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1)] = self;
                    dialogOptions.vms[deleteVm.klass.displayName.substring(deleteVm.klass.displayName.lastIndexOf(".") + 1)] = deleteVm;

                    self.eventAggregator.publish('dialog.confirm.open', dialogOptions);    
        }
        ,

        othersDragEnded: function (dragModel, dragViewModel, args, prom) {
            var self = this;

            self.callSuper();
            if (self.showMe() && !self.__downTree(self, dragViewModel) && dragViewModel.isA(circleverse.viewModel.MailViewModel))
                self.isAvailable(false);
        }
        ,

        othersDragStarted: function (dragModel, dragViewModel, args, prom) {
            var self = this;

            self.callSuper();
            if (self.showMe() && !self.__downTree(self, dragViewModel) && dragViewModel.isA(circleverse.viewModel.MailViewModel))
                self.isAvailable(true);
        },
            
        dialogConfirmed: function(vms){
            var self = this;

            if ('undefined' != typeof vms.MailViewModel){
                vms.MailViewModel.parent.childViewModels.remove(vms.MailViewModel);

                vms.MailViewModel.parent = self;
                self.childViewModels.push(vms.MailViewModel);               

            }
            if ('undefined' != typeof vms.garbageViewModel){
                self.deleteSelf();               

            }
        },

        deleteSelf: function(){
            var self = this;

            self.globalSettings.eventAggregator.publish('stage.activeThings.remove', self);

            //self.parent.allDialogs.remove(self);
            self.deleteNow(true);
        }

    });
})();
