
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

            var len = self.rawModel().addresses().length;
            for (var i = 0; i < len; i++) {
               self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel().addresses()[i], self, globalSettings));
            }

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

            self.canSave(true);

        }
        ,

        toggleChildrenVisibility: function () {
            var self = this, isFormVisible = self.showForm();

            self.callSuper();

            //if (self.__isKidsLoaded)
            //self.__globalSettings.eventAggregator.publish('member.view', self);
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
