
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerAddressesViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomerAddressesViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule,
            circleverse.viewModel.SpecialViewViewModel
            //,
            //becu_org.ui.viewModel.labelModule
        ],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            var initSize = 70;
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

            //this.label("Addresses");

            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.name('icon-address icon-size-2x');

            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//


            // if (changes.length > 1){                    
            //     self.childViewModels.push(new circleverse.viewModel.CustomerAddressesViewModel(self.rawModel(), self, globalSettings));
            // }
            // else{
            //     self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel(), self, globalSettings));
            // }
            
            // self.rawModel().addresses.subscribe(function(changes){                
            //     self.childViewModels.removeAll();
            //     if (changes.length > 1){                    
            //         self.childViewModels.push(new circleverse.viewModel.CustomerAddressesViewModel(self.rawModel(), self, globalSettings));
            //     }
            //     else{
            //         self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel(), self, globalSettings));
            //     }

            // }, null, "change");

            
            self.zoom= ko.observable(9);
            self.center = [ko.observable(47.36), ko.observable(-122.20)];
            //self.markers= ko.observableArray();

            // self.appointmentService.searchLocations({ search: '98059', topicId: 64, distance: 2000 }).always(function () {
            //    self.isBusy(false);
            // }).done(function (locations) {
               
            //});

            var searchLocation = self.location(),
                width = $(window).width() -160,
                height = $(window).height() - 160,
                top = ((searchLocation.top) - ($(window).height() / 2)) + 80 + (self.dimensions().height/2) - 10 /* buffer for line */,
                left = ((searchLocation.left) - ($(window).width() / 2)) + 80 + (self.dimensions().width/2) - 10 /* buffer for line */;

            self.searchDimensionSettingsBig = {width: width, height: height, top: top, left: left, borderRadius: 15, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};


            this.childrenOnTop = ko.observable(true);


            this.info = "Account Transactions (includes Pending)";

            var acct = self.parent.rawModel();

            self.adjustLocation = ko.observable(false);
            
            self.canCreate(false);
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(false);
            self.canRefresh(false);
            self.canSave(false);
            self.canOpen(true);
            self.canClose(true);
            self.canHelp(false);

            self.showForm = ko.observable(false);

            self.canSave(false);
            self.__loadedChildren = false;

            
        }
        ,

        showMainForm: function(){
            var self = this;
//return;
            var deferred = jQuery.Deferred();
            

            self.searchDimensionSettingsBig.onComplete = function(){
                // if (self.childrenVisible()){
                //     self.hideChildVieModels();
                // }
                self.toggleFormAnimationEnded();
                
                
                self.adjustLocation(true);           
                self.isRoot(true);
                self.canMoveRoot(false);

                deferred.resolve();

                var forceHelp = self.globalSettings.settingsStore.getSetting('help.CustomerAddressesViewModel');

                if (forceHelp && ko.unwrap(forceHelp.value)){
                    self.showHelp();
                }
            };
            self.animationSettings(self.searchDimensionSettingsBig);
            
            self.canOpen(false);
            self.canClose(true); 
            self.globalSettings.eventAggregator.publish('stage.activeThings.add', self);
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
                    var prom = jQuery.Deferred();  
                    if (self.childrenVisible()){
                        var prom = self.hideChildVieModels();
                    }   
                    else{
                        prom.resolve();
                    }
  

                    prom.then(function(){

                        self.isRoot(false);
                        self.canMoveRoot(true);
                        deferred.resolve();
                        
                    });
                };
                
                self.adjustLocation(false);
                self.animationSettings(self.searchDimensionSettingsRegular);
                //self.size(self.searchDimensionSettingsRegular.width);

                self.canOpen(true);
                self.canClose(true);
                self.globalSettings.eventAggregator.publish('stage.activeThings.add', self);

                self.mainFormOpen = false;


            return deferred;
        }
        ,

        toggleFormAnimationEnded: function(){
            var self = this;

            if (self.mainFormOpen){
                self.contentTemplate('mapTemplate');
                self.dimensions({width: self.searchDimensionSettingsBig.width, height: self.searchDimensionSettingsBig.height});
                self.location({top: self.searchDimensionSettingsBig.top, left: self.searchDimensionSettingsBig.left});
                //self.size(self.searchDimensionSettingsBig.width);
                //self.location(self.getCalculatedLocation());
                
                self.mainCss('map');
                self.showChildVieModels();
            }
            else{
                self.contentTemplate('standardContentTemplate');
                self.dimensions({width: self.searchDimensionSettingsRegular.width, height: self.searchDimensionSettingsRegular.height});
                self.location({top: self.searchDimensionSettingsRegular.top, left: self.searchDimensionSettingsRegular.left});
                self.size(self.searchDimensionSettingsRegular.width);
                self.__overridden = false;
                self.location(self.getCalculatedLocation());
                self.mainCss('');

                    
            }
        }
        ,

        // pop: function () {
        //     var self = this, callSuper = self.callSuper, deferred = jQuery.Deferred();

        //     if (self.popped){
        //         var prom = self.hideMainForm();

        //         prom.then(function(){
        //             callSuper().then(function(){
        //                 deferred.resolve();
        //             });
        //         });

                
        //         return deferred;
        //     }
        //     else{
        //         return callSuper();
        //     }

        // }, 

        hideChildVieModels: function () {
            var self = this, callSuper = self.callSuper, deferred = jQuery.Deferred();
            
            if (self.mainFormOpen){
                var prom = callSuper() ;
                
                prom.then(function(){
                    self.hideMainForm().then(function(){
                        deferred.resolve();
                    });
                });
                
                return deferred;
            }
            else{
                return callSuper();
            }
        }
        ,

        showChildVieModels: function () {
            var self = this, isFormVisible = self.showForm();

            if (!self.mainFormOpen){
                return self.showMainForm();
            }

            if ((!self.childrenVisible()) && (!self.__loadedChildren)){
                var len = self.rawModel().addresses().length;
                for (var i = 0; i < len; i++) {
                    self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel().addresses()[i], self.rawModel(), self, self.globalSettings));

                    //self.globalSettings.app.customerAddressesMapViewModel.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel().addresses()[i], self, self.globalSettings));
                }

                
                //var len = locations.length;
                
                
                // for (var i = 0; i < len; i++) {
                //     var item = locations[i];

                //     self.markers.push(
                //     {
                //         center: [ko.observable(item.latitude), ko.observable(item.longitude)],
                //         //text: ko.observable(item.name),
                //         //draggable: true,
                //         //opacity: 0.4,
                //         color: ko.observable(),
                //         model: item,
                //         opened: ko.observable(false)
                //     });
                // }

                self.__addLinks();
                
                self.__loadedChildren = true;
            }

            // var deferred = jQuery.Deferred();
            // deferred.resolve();
            // return deferred;
            
            self.hasChildrenToggled(true);
            var deferred = jQuery.Deferred();
            var popDeferreds = [];
            var arr = self.childViewModels(), len = arr.length, item;
            for (var i = 0; i < len; i++) {
                item = ko.unwrap(arr[i]);

                if (!item.popped){ 
                    var popDeferred = item.pop();
                    //open address children                          
                    //if (len == 1 && item.autoPopSingleChild()){
                        //popDeferred.then(function(){
                            item.showChildVieModels();
                        //});
                    //}
                    popDeferreds.push(popDeferred);
                }

                //anyChildPopped = true;
            }
    
            self.childrenVisible(true);

            if (popDeferreds.length == 0)
                deferred.resolve();
            else
                $.when.apply(null, popDeferreds).then(function(){
                    deferred.resolve();
                });
            //return self.callSuper();
            //if (self.__isKidsLoaded)
            //self.__globalSettings.eventAggregator.publish('member.view', self);
        }
        ,
        __addLinks: function(){
            var self = this;

            /*
            We are going to show a full address profile, meaning that whatever assets (accounts, person themselves) for which mail is generated shall be depicted.  In addition, any address under the person shall be depicted, whether we generate mail for them or not.



            We already added the addresses of the person being served in showChildVieModels.  Now, we need to determine where mail goes

            start with the person.  Where does mail related to them go?

            then look at their accounts.  where does mail for each account go?  if it goes to another person's address, show it but securely  
             */

            var cust = self.parent.rawModel();
            var clen = self.childViewModels().length;

            var addLink = function(address, model, addressOwner){
                //add links container if not already there
                var linksVm = null, childChildrenLen = self.childViewModels().length, found = false;
                for (var v = 0; v < childChildrenLen; v++) {
                    var child = self.childViewModels()[v], a = child.model();
                    // if (child.isA(circleverse.viewModel.LinksViewModel)){
                    //     linksVm = child;
                    //     break;
                    // }

                    if (a.line1() == address.line1() && a.city() == address.city() && a.state() == address.state() && a.postalCode() == address.postalCode()){
                        found = true;
                        
                        if (model.isA(becu_org.domain.model.AccountObservable)){
                            child.childViewModels.push(new circleverse.viewModel.MailViewModel(model, child, self.globalSettings));
                            
                        }
                        else if (model.isA(becu_org.domain.model.CustomerObservable)){
                            child.childViewModels.push(new circleverse.viewModel.MailViewModel(model, child, self.globalSettings));                    
                        } 
                    }
                }

                if (!found){
                    child = new circleverse.viewModel.CustomerAddressViewModel(address, addressOwner, self, self.globalSettings);
                    
                    self.childViewModels.push(child);
                    
                    if (model.isA(becu_org.domain.model.AccountObservable)){
                        child.childViewModels.push(new circleverse.viewModel.MailViewModel(model, child, self.globalSettings));
                        
                    }
                    else if (model.isA(becu_org.domain.model.CustomerObservable)){
                        child.childViewModels.push(new circleverse.viewModel.MailViewModel(model, child, self.globalSettings));                    
                    } 
                }

                // if (!linksVm){
                //     linksVm = new circleverse.viewModel.LinksViewModel(self.rawModel().addresses()[i], vm, self.globalSettings);
                //     cvm.childViewModels.push(linksVm);
                // }

            };

            //start with the person.  Where does mail related to them go?
            var assignMailAddresses = function(addies){
                if (addies){
                    var alen = addies.length, generalAddress;
                    for (var g = 0; g < alen; g++) {
                        var a = addies[g];

                        if (a){
                            //if (a.isA(becu_org.domain.model.SeasonalAddressAbsoluteObservable) || a.isA(becu_org.domain.model.SeasonalAddressRecurringObservable)){
                            if (a.use() && a.use().toLowerCase() == "sea"){
                                generalAddress = a;
                            }
                            else if (a.use() && a.use().toLowerCase() == "mail" && generalAddress == null){
                                generalAddress = a;
                            }
                            else if (a.use() && a.use().toLowerCase() == "prim" && generalAddress == null){
                                generalAddress = a;
                            }
                            else if (a.use() && a.use().toLowerCase() == "tax"){                                
                                addLink(a, cust, cust);
                            }
                        }
                    }             

                    addLink(generalAddress, cust, cust);
                }

            }

            assignMailAddresses(cust.addresses());


            //then look at their accounts.  where does mail for each account go?  if it goes to another person's address, show it but securely


            var isAddressPresentable = function(acct){
                if (acct){
                    var relationships = acct.relationships();
                    if (relationships){
                        var relationshipsLen = relationships.length;
                        for (var k = 0; k < relationshipsLen; k++) {
                            var relationship = acct.relationships()[k];
                            if (relationship){
                                var contact = relationship.customer(), role = relationship.accountRole();
                                if (contact.id() == cust.id()){
                                    switch (role.accountRoleCode().toLowerCase()){
                                        case 'sign':
                                            return true;
                                        case 'own':
                                            return true;
                                    }
                                }                     
                            }
                        } 

                    }
                }

                return false;
            }

            var getAccountOwner = function(acct){
                if (acct){
                    var relationships = acct.relationships();
                    if (relationships){
                        var relationshipsLen = relationships.length;
                        for (var k = 0; k < relationshipsLen; k++) {
                            var relationship = acct.relationships()[k];
                            if (relationship){
                                var contact = relationship.customer(), role = relationship.accountRole();
                                switch (role.accountRoleCode().toLowerCase()){
                                    case 'own':
                                        return contact;
                                }                 
                            }
                        } 

                    }
                }

                return null;
            }

            // var getMailAddresses = function(addies){
            //     if (addies){
            //         var alen = addies.length, generalAddress;
            //         for (var g = 0; g < alen; g++) {
            //             var a = addies[g];

            //             if (a){
            //                 if (a.isA(becu_org.domain.model.SeasonalAddressAbsoluteObservable) || a.isA(becu_org.domain.model.SeasonalAddressRecurringObservable)){
            //                     generalAddress = a;
            //                 }
            //                 else if (a.use() && a.use().toLowerCase() == "mail" && generalAddress == null){
            //                     generalAddress = a;
            //                 }
            //                 else if (a.use() && a.use().toLowerCase() == "prim" && generalAddress == null){
            //                     generalAddress = a;
            //                 }
            //                 else if (a.use() && a.use().toLowerCase() == "tax"){                                
            //                     addLink(a, cust, cust);
            //                 }
            //             }
            //         }             

            //         addLink(generalAddress, cust, cust);
            //     }

            //     return retval;
            // }

            //inspect addresses of accounts
            if (cust.accounts() && cust.accounts().length > 0){
                var accts = cust.accounts(), len = accts.length;
                for (var i = 0; i < len; i++) {
                    var acct = cust.accounts()[i];
                    if (acct){
                        if (isAddressPresentable(acct)){
                            var owner = getAccountOwner(acct);

                            if (!owner) throw Error("account " + acct.accountNumber() + " has no owner");

                            addLink(acct.addresses()[0], acct, owner);
                        }
                        // var createdLink = false;
                        // var addies = acct.addresses()
                        // if (addies){
                            
                        //     var custMailAddress = getMailAddress(addies);
                        //     var alen = addies.length;
                        //     for (var j = 0; j < alen; j++) {
                        //         var a = addies[j];

                        //         if (a){
                                    
                        //                 addLink(a, acct);
                        //                 createdLink = true;
                        //         }
                        //     }   
                        //     //add to customer mail address account   
                        // } 

                        // //inspect addresses of account relationships
                        // if (acct.relationships().length > 0){
                        //     var relationships = acct.relationships(), rlen = relationships.length;
                        //     for (var k = 0; k < rlen; k++) {
                        //         var relationship = acct.relationships()[k];
                        //         if (relationship){
                        //             var contact = relationship.customer();
                        //             if (contact){
                        //                 var caddies = contact.addresses()
                        //                 if (caddies){ 
                        //                     var calen = caddies.length;
                        //                     for (var l = 0; l < calen; l++) {
                        //                         var contactAddress = caddies[l];

                        //                         if (contactAddress){
                        //                             addLink(contactAddress, contact);
                        //                             createdLink = true;
                        //                         }
                        //                     }    
                        //                 }
                        //             }                     
                        //         }
                        //     } 
                        // }

                        // if (!createdLink){
                        //     addLink(custMailAddress, acct);
                        // }
                                            
                    }
                        

                    
                    
                }
            }


        }

            ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this, _super = self.callSuper;

            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)) {
                
                prom.then(function(){
                    if (self.mainFormOpen){                        
                        self.hideMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                    else{
                        
                        _super();
                    }
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    self.showMainForm().then(function(){
                        //if (self.callSuper) self.callSuper();
                    });
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.SaveViewModel) || dropViewModel.isA(circleverse.viewModel.SaveViewModel)) {
                prom.then(function(){
                    self.findIndividuals();
                });

                
                if (self.callSuper) self.callSuper();
            }
            else{
                
                if (self.callSuper) self.callSuper();
            }

            
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this, _super = self.callSuper;

            if (dragVm.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen){                        
                        self.hideMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                    else{                        
                        _super();
                    }
                });
            }
            else if (dragVm.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    self.showMainForm().then(function(){
                        //if (self.callSuper) self.callSuper();
                    });
                });
            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel) || dragVm.isA(circleverse.viewModel.SaveViewModel)) {               

                prom.then(function(){
                    self.findIndividuals();
                });

                if (self.callSuper) self.callSuper();
            }
            else{
                
                if (self.callSuper) self.callSuper();
            }
        }
        ,

        toggleMainForm: function () {
            this.showForm(!this.showForm());
        }

        ,

        getSettings: function () {
            var settings = this.callSuper();
            //settings.drop = false;
            return settings;
        }
        ,

        showHelp: function(){
            var self = this;

            var dialogOptions = {template: self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'HelpTemplate', 
                type: 'message', 
                fromElement: '.drag.drop.circle.map',
                dimensions: {width: 700, height: 600}, 
                title: 'Before you start...',
                vms: {}
            };
            dialogOptions.vms[self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1)] = self;
            self.globalSettings.eventAggregator.publish('dialog.message.open', dialogOptions);  
              

            
            return true;
        }
        ,

        dialogClosed: function(){
            var self = this;

            self.turnOffForcedHelp();
        }
            ,
        turnOffForcedHelp: function(){
            var self = this;

            self.globalSettings.settingsStore.setSetting('help.' + self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1), false);

        }
        ,

        

        close: function () {
            this.hideCloseForm(true);
        }

    });
})();
