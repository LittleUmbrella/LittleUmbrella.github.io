eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.CustomerViewModel = (function () {

    var error = function () {
        //todo: display error JS.Interface.ensure(this.config.tracker, ITemplateTracker);
    };

    return new JS.Class('littleUmbrella.circleverse.viewModel.CustomerViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],
        __getCoords: function () {
            var minTop = 0;
            var minLeft = 10;

            var calcTop = 20;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = 10;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
            ,

        onresize: function (e, data) {
            this.callSuper();


            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * 75, width: this.scale() * 75 });
            //log('customer position: ' + this.position().left);
        }
             ,
        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self=this;

            //properties            

            var initSize = 100;
 self.size = ko.observable(initSize);
            //self.requirement = requirement;
            self.hideMainForm = ko.observable(true);
            self.showMainForm = ko.observable(false);

            self.location = ko.observable({ left: 300, top: 300 });


            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);


            self.accountViewModels = ko.observableArray([]);

            self.initLocation = ko.observable();
            self.initLocation({ left: 0, top: 0 });


            globalSettings.eventAggregator.subscribe('circleverse.viewModel.satellite.popped.out', function (topic, vm) {
                if (vm == self)
                    self.toggleChildrenVisibility();
            });

            self.callSuper(object, parent, globalSettings, {
                mapping: {
                    map: globalSettings.mappings['becu_org_domain_model_Customer']
                }
            });



            self.__size = 150;
            //self.position = initialPosition || { top: 0, left: 0 };
            self.size(self.__size);

//            var vm;
//            for (var i = 0; i < self.model().accounts().length; i++) {
//                vm = new circleverse.viewModel.accountViewModel(self.model().accounts()[i], self);
//                self.accountViewModels.push(vm);
//            }

//            self.model().accounts.subscribe(function (item) {
//                var vm = new circleverse.viewModel.accountViewModel(item, self);

//                self.accountViewModels.push(vm);
//            });

            

            
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });



            var coords = self.__getCoords();
            //self.location({ left: coords.left, top: coords.top });
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });
            //log('scale: ' + self.scale());


            //self.childViewModels();

            self.customerPurseViewModel = new circleverse.viewModel.CustomerPurseViewModel(self.rawModel(), self, globalSettings);
            self.customerAccountsViewModel = new circleverse.viewModel.CustomerAccountsViewModel(self.rawModel().accounts, self, globalSettings);
            self.customerWorkflowViewModel = new circleverse.viewModel.CustomerWorkflowViewModel(self.rawModel(), self, globalSettings);
            self.customerFinanceManagementViewModel = new circleverse.viewModel.CustomerFinanceManagementViewModel(self.rawModel(), self, globalSettings);
            self.customerFilesViewModel = new circleverse.viewModel.CustomerFilesViewModel(self.rawModel(), self, globalSettings);
            self.customerCampaignsViewModel = new circleverse.viewModel.CustomerCampaignsViewModel(self.rawModel(), self, globalSettings);
            self.customerContactsViewModel = new circleverse.viewModel.CustomerContactsViewModel(self.rawModel().contacts, self, globalSettings);
            self.customerInteractionsViewModel = new circleverse.viewModel.CustomerInteractionsViewModel(self.rawModel(), self, globalSettings);
            self.customerInfoViewModel = new circleverse.viewModel.CustomerInfoViewModel(self.rawModel(), self, globalSettings);
            //self.formsViewModel = new circleverse.viewModel.FormsViewModel(self.model(), self);

            self.childViewModels.push(self.customerInfoViewModel);
            self.childViewModels.push(self.customerPurseViewModel);
            self.childViewModels.push(self.customerAccountsViewModel);
            //self.childViewModels.push(self.customerWorkflowViewModel);
            //self.childViewModels.push(self.customerFinanceManagementViewModel);
            //self.childViewModels.push(self.customerFilesViewModel);
            //self.childViewModels.push(self.customerCampaignsViewModel);
            self.childViewModels.push(self.customerContactsViewModel);
            //self.childViewModels.push(self.customerInteractionsViewModel);



            self.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            self.icon.url = ko.observable(); 
            if (object.icon) {
                self.icon.url( object.icon);
            }
            self.icon.name('icon-user icon-size-3x');

            self.isValid = function () {
                return self.model().isValid();
            };

            self.icon.opacity = ko.dependentObservable(function () {


                if (self.isValid()) {
                    return 1;
                }

                return .2;
            } .bind(self));



            //self.productsInfo = 'Products and Services ' + self.model().fullName() + ' is using';
            //self.interactionsInfo = 'Interactions ' + self.model().fullName() + ' has had with BECU';
            //self.contactsInfo = 'Contacts of ' + self.model().fullName() + '';
            //self.campaignsInfo = 'Campaigns for ' + self.model().fullName() + '';



        }
            ,

        close: function () {
            if (this.isValid())
                this.hideMainForm(true);
        }
        ,
        
        toggleMainForm: function (e) {

            if (this.showMainForm()) {
                this.hideMainForm(true);

            }
            else {

                this.showMainForm(true);
            }
        }


    });


})();

