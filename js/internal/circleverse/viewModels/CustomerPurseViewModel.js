
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerPurseViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomerPurseViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite,circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var initSize = 60;
 self.size = ko.observable(initSize);
            //properties
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(initSize);
            this.insideDiameter = 40;

            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            this.callSuper(object, parent, globalSettings);

            
                


            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/wallet64x48.png")');

            this.icon.name('icon-wallet2 icon-size-2x');
            
            
            //this.closeAccountVm = new circleverse.viewModel.CloseAccountViewModel(this.model(), this);

            //this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);
            self.customerCashViewModel = new circleverse.viewModel.CustomerCashViewModel(self.rawModel(), self, globalSettings);
            self.customerDebitCardViewModel = new circleverse.viewModel.CustomerDebitCardViewModel(self.rawModel(), self, globalSettings);
            self.customerVisaViewModel = new circleverse.viewModel.CustomerVisaViewModel(self.rawModel(), self, globalSettings);

            self.childViewModels.push(self.customerCashViewModel);
            self.childViewModels.push(self.customerDebitCardViewModel);
            self.childViewModels.push(self.customerVisaViewModel);
            
        }

            ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }
    });
})();

