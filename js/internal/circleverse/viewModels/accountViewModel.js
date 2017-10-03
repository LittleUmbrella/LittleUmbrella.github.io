
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.accountViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.accountViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            circleverse.viewModel.satellite,
            circleverse.viewModel.centerCircle,
            becu_org.ui.viewModel.draggableModule,
            becu_org.ui.viewModel.droppableModule
            // ,
            // circleverse.viewModel.NavigableSatellite
        ],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            //self.transferVm = new circleverse.viewModel.MoneyTransferViewModel(object, self, globalSettings);

            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            var initSize = 100;
             self.size = ko.observable(initSize);

             self.callSuper(object, parent, globalSettings);

             
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

// , {
//                  dropFilter: '.account',
//                  minCenterDiameter: 150,
//                  mapping: {
//                      map: globalSettings.mappings['becu_org_domain_model_Customer']
//                  }
//              }
            self.contentTemplate('accountContentTemplate');



            self.icon.location = { center: true, offset: { y: -35 } }; //ko.observable(false);//

            self.icon.url = "";// ko.observable('url("/media/img/trashpiggy35x35.png")');


            self.icon.name('icon-pig icon-size-2x');
            self.icon.location = { center: true, offset: { y: -2, x: -4 } }; //ko.observable(false);//


            //todo: real impl
            var acctNumber = parseFloat(self.rawModel().accountNumber);


            if ((acctNumber % 6) == 0)
                self.icon.name('icon-car icon-size-2x');
            else if ((acctNumber % 5) == 0)
                self.icon.name('icon-anchor icon-size-2x');
            else if ((acctNumber % 4) == 0)
                self.icon.name('icon-pig icon-size-2x');
            else if ((acctNumber % 3) == 0)
                self.icon.name('icon-home icon-size-2x');
            else if ((acctNumber % 2) == 0)
                self.icon.name('icon-home icon-size-2x');


            // self.childViewModels.push(new circleverse.viewModel.PaymentSchedulesViewModel(object.paymentSchedules, self, globalSettings));
            // self.childViewModels.push(new circleverse.viewModel.AccountRolesViewModel(object.relationships, self, globalSettings));
            // self.childViewModels.push(new circleverse.viewModel.AccountTransactionsViewModel(object.transactions, self, globalSettings));
            // self.childViewModels.push(new circleverse.viewModel.AlertsViewModel(object.alerts, self, globalSettings));
            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)




            // self.closeAccountVm = new circleverse.viewModel.CloseAccountViewModel(object, self, globalSettings, {
            //     mapping: {
            //         map: globalSettings.mappings['becu_org_domain_model_Account']
            //     }
            // });

            //self.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);

        }

            ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }
        //            ,


        //        close: function () {
        //            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
        //            //refactor to ask service/domain to close
        //            //this.from.amount();
        //            this.closeAccountVm.hideCloseForm(true);
        //            //}
        //        }
        //    ,

        //dropxstart: function (e, ev, dd) {
        //    if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel))
        //        return false;

        //    this.callSuper();
        //}
        //,


        // droppedOn: function (dragModel, dragViewModel) {
        //     var self = this;

        //     if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
        //         self.__globalSettings.eventAggregator.publish('circleverse.account.transfer.requested', { from: dragModel, to: self.model() });
                
        //     }

        // }
        //     ,

        // dropped: function (dropModel, dropViewModel, args) {
        //     if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
        //         this.closeAccountVm.hideCloseForm(false);
        //     }
        // }

    });
})();

