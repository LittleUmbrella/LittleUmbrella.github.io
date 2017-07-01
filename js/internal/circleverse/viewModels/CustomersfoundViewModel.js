
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomersfoundViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomersfoundViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

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

            this.callSuper();





            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/wallet64x48.png")');

            this.icon.name('icon-view icon-size-2x');


            //this.closeAccountVm = new circleverse.viewModel.CloseAccountViewModel(this.model(), this);

            //this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);


        }
        ,

        toggleChildrenVisibility: function () {
            var self = this, isFormVisible = self.showForm();

            if (self.__isKidsLoaded)
                self.__globalSettings.eventAggregator.publish('customerInfo.found', self);

            if (!self.__isKidsLoaded && !isFormVisible) {
                self.__isKidsLoaded = true;

                self.isBusy(true);
                var customerInfo = self.rawModel();
                self.__globalSettings.repository.getCustomerInfo(self.rawModel().accountNumber, true).then(
                    function (val) {
                        if (val && val.length > 0) {
                            val.unshift(0);
                            customerInfo.splice.apply(customerInfo, val);
                            self.__globalSettings.eventAggregator.publish('customerInfo.found', self);
                        }

                        self.isBusy(false);
                    }
                    ,
                    null
                    , function (val) {
                        if (val && val.length > 0) {
                            val.unshift(0);
                            customerInfo.splice.apply(customerInfo, val);
                            self.__globalSettings.eventAggregator.publish('customerInfo.found', self);
                        }

                        self.isBusy(false);
                    }

                );
            }

        }

            ,
        applyBindings: function (namespace, node) {
            var ns = namespace || 'serviceMethod';
            if (node)
                ko.applyBindings(this, node);
            //        var arr = []; //[0,1,2,3,4,5,6,7,8,9];

            //        var num = 3;

            //        for (var z = 0; z < num; z++) {
            //            arr.push(z);
            //        }





        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }
    });
})();
