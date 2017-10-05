
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
            becu_org.ui.viewModel.labelModule
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

            this.label("Addresses");

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

            this.childrenOnTop = ko.observable(true);


            this.info = "Account Transactions (includes Pending)";

            var acct = self.parent.rawModel();


            self.showForm = ko.observable(false);

            self.canSave(false);
            self.__loadedChildren = false;
        }
        ,

        toggleChildrenVisibility: function () {
            var self = this, isFormVisible = self.showForm();


            if ((!self.childrenVisible()) && (!self.__loadedChildren)){
                var len = self.rawModel().addresses().length;
                for (var i = 0; i < len; i++) {
                    self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel().addresses()[i], self, self.globalSettings));
                }


                self.__addLinks();
                
                self.__loadedChildren = true;
            }

            return self.callSuper();
            //if (self.__isKidsLoaded)
            //self.__globalSettings.eventAggregator.publish('member.view', self);
        }
        ,
        __addLinks: function(){
            var self = this;

            var cust = self.parent.rawModel();
            var clen = self.childViewModels().length;

            var addLink = function(vm, model){
                //add links container if not already there
                var linksVm = null, childChildrenLen = vm.childViewModels().length;
                for (var v = 0; v < childChildrenLen; v++) {
                    var child = vm.childViewModels()[v];
                    if (child.isA(circleverse.viewModel.LinksViewModel)){
                        linksVm = child;
                        break;
                    }
                }

                if (!linksVm){
                    linksVm = new circleverse.viewModel.LinksViewModel(self.rawModel().addresses()[i], vm, self.globalSettings);
                    cvm.childViewModels.push(linksVm);
                }

                if (model.isA(becu_org.domain.model.AccountObservable)){
                    linksVm.childViewModels.push(new circleverse.viewModel.accountViewModel(model, linksVm, self.globalSettings));
                    
                }
                else if (model.isA(becu_org.domain.model.CustomerObservable)){
                    linksVm.childViewModels.push(new littleUmbrella.circleverse.viewModel.CustomerViewModel(model, linksVm, self.globalSettings));                    
                } 
            };

            if (clen > 0){  
                for (var h = 0; h < clen; h++) {          
                    var cvm = self.childViewModels()[h], ca = cvm.rawModel();

                    //inspect addresses of accounts
                    if (cust.accounts() && cust.accounts().length > 0){
                        var accts = cust.accounts(), len = accts.length;
                        for (var i = 0; i < len; i++) {
                            var acct = cust.accounts()[i];
                            if (acct){
                                var addies = acct.addresses()
                                if (addies){
                                    var alen = addies.length;
                                    for (var j = 0; j < alen; j++) {
                                        var a = addies[j];

                                        if (a){
                                            if (a.line1() == ca.line1() && a.city() == ca.city() && a.state() == ca.state() && a.postalCode() == ca.postalCode()){
                                                addLink(cvm, acct);
                                            }
                                        }
                                    }      
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
                                                            if (contactAddress.line1() == ca.line1() && contactAddress.city() == ca.city() && contactAddress.state() == ca.state() && contactAddress.postalCode() == ca.postalCode()){
                                                                addLink(cvm, contact);
                                                            }
                                                        }
                                                    }    
                                                }
                                            }                     
                                        }
                                    } 
                                }                  
                            }
                        } 
                    }

                    
                    
                }
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
            //settings.not = '.koGrid, .koGrid div, .kgRow, .kgCell div, .kgHeaderCell div, .kgTopPanel, .kgColMenu, .kgFooterPanel, .kgColListItem, .kgRow.odd, .kgRow.even, .kgRow.selected, .kgGroupIcon';
            return settings;
        }
            ,


        close: function () {
            this.hideCloseForm(true);
        }

    });
})();
