
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

            self.searchDimensionSettingsBig = {width: width, height: height, top: top, left: left, borderRadius: 0, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};


            this.childrenOnTop = ko.observable(true);


            this.info = "Account Transactions (includes Pending)";

            var acct = self.parent.rawModel();


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
                
                self.canOpen(false);
                self.canClose(true);          
                self.canSave(true);
                self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);
                            
                self.isRoot(true);
                self.canMoveRoot(false);

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
                    var prom = jQuery.Deferred();  
                    if (self.childrenVisible()){
                        var prom = self.hideChildVieModels();
                    }   
                    else{
                        prom.resolve();
                    }

                    self.canOpen(true);
                    self.canClose(true);            
                    self.canSave(false);
                    self.globalSettings.eventAggregator.publish('circleverse.spotlightContext', self);

                    prom.then(function(){

                        self.isRoot(false);
                        self.canMoveRoot(true);
                        deferred.resolve();
                        
                    });
                };
                self.animationSettings(self.searchDimensionSettingsRegular);
                //self.size(self.searchDimensionSettingsRegular.width);


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
                    self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel().addresses()[i], self, self.globalSettings));

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

            var cust = self.parent.rawModel();
            var clen = self.childViewModels().length;

            var addLink = function(address, model){
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
                    child = new circleverse.viewModel.CustomerAddressViewModel(address, self, self.globalSettings);
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

            var getMailAddress = function(addies){
                if (addies){
                    var alen = addies.length, retval;
                    for (var g = 0; g < alen; g++) {
                        var a = addies[g];

                        if (a){
                            if (a.isA(becu_org.domain.model.SeasonalAddressAbsoluteObservable) || a.isA(becu_org.domain.model.SeasonalAddressRecurringObservable)){
                                return a;
                            }
                            else if (a.use() && a.use().toLowerCase() == "mail"){
                                retval = a;
                            }
                            else if (a.use() && a.use().toLowerCase() == "prim" && retval == null){
                                retval = a;
                            }
                        }
                    }   
                }

                return retval;
            }

            var custMailAddress = getMailAddress(self.model());

                    //inspect addresses of accounts
                    if (cust.accounts() && cust.accounts().length > 0){
                        var accts = cust.accounts(), len = accts.length;
                        for (var i = 0; i < len; i++) {
                            var acct = cust.accounts()[i];
                            if (acct){
                                var createdLink = false;
                                var addies = acct.addresses()
                                if (addies){
                                    
                                    var custMailAddress = getMailAddress(addies);
                                    var alen = addies.length;
                                    for (var j = 0; j < alen; j++) {
                                        var a = addies[j];

                                        if (a){
                                            
                                                addLink(a, acct);
                                                createdLink = true;
                                        }
                                    }   
                                    //add to customer mail address account   
                                } 

                                //inspect addresses of account relationships
                                if (acct.relationships().length > 0){
                                    var relationships = acct.relationships(), rlen = relationships.length;
                                    for (var k = 0; k < rlen; k++) {
                                        var relationship = acct.relationships()[k];
                                        if (relationship){
                                            var contact = relationship.customer();
                                            if (contact){
                                                var caddies = contact.addresses()
                                                if (caddies){ 
                                                    var calen = caddies.length;
                                                    for (var l = 0; l < calen; l++) {
                                                        var contactAddress = caddies[l];

                                                        if (contactAddress){
                                                            addLink(contactAddress, contact);
                                                            createdLink = true;
                                                        }
                                                    }    
                                                }
                                            }                     
                                        }
                                    } 
                                }

                                if (!createdLink){
                                    addLink(custMailAddress, acct);
                                }
                                                  
                            }
                        

                    
                    
                }
            }


        }

            ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen){                        
                        self.hideMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                    else{
                        self.showMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
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
            var self = this;

            if (dragVm.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen){                        
                        self.hideMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                    else{
                        self.showMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
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



        close: function () {
            this.hideCloseForm(true);
        }

    });
})();
