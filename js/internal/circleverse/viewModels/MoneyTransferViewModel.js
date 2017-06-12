
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.MoneyTransferViewModel = (function () {



    return new JS.Class('circleverse.viewModel.MoneyTransferViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties

            var self = this.self = this;


            //self.moneyVms = ko.observableArray([new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(1), 0, globalSettings)
            //    , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(5), 1, globalSettings)
            ////, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(10), 2)
            //    , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(20), 2, globalSettings)
            ////, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(50), 4)
            //    , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 3, globalSettings)
            //    , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4, globalSettings)
            //]);

            var accountStrategy = new circleverse.domain.MoneyTransferAccountStrategy();
            var personStrategy = new circleverse.domain.MoneyTransferPersonStrategy();

            self.strategy;

            self.from = ko.observable();
            self.to = ko.observable();

            self.amount = ko.observable();

            self.fromTransferPreviewAmount = ko.computed(function () {
                if (self.from() != null) {
                    return self.from().balance - (parseFloat(self.amount()) || 0);
                }

                self.__resetLastItem(self.to(), self.from());
                return null;

            }).extend({ money: true });


            self.toTransferPreviewAmount = ko.computed(function () {
                if (self.to() != null) {
                    return self.to().balance + (parseFloat(self.amount()) || 0);
                }

                self.__resetLastItem(self.to(), self.from());
                return null;

            }).extend({ money: true });


            self.amountHasFocus = ko.observable(false);

            self.amountOrDefault = ko.computed({
                read: function () {
                    if (self.amount()) {
                        return self.amount();
                    }
                    else {
                        if (self.amountHasFocus())
                            return self.amount();
                        else
                            return null;
                    }
                }
                ,
                write: function (value) {
                    self.amount(value);
                }
            });
            self.showMe(false);

            self.calculatorVm = new circleverse.viewModel.CalculatorViewModel(null, null, globalSettings);


            self.from.subscribe(function (value) {
                self.__resetLastItem(self.to(), value);
            });


            self.to.subscribe(function (value) {
                self.__resetLastItem(value, self.from());
            });

            if (self.to() != null && self.from() != null)
                self.__resetLastItem(self.to(), self.from());

            self.__globalSettings.eventAggregator.subscribe('circleverse.account.transfer.requested', function (msg, data) {
                if (data.to.isA("becu_org.domain.model.Customer")) {
                }
                else {
                    self.to(data.to);
                }
                self.from(data.from);
                self.toggleVisibility();
            });
        }
            
            ,

        __resetLastItem: function (to, from) {
            //var self = this;
            ////bug: not updating if multiple transfers started at once.

            ////todo: refactor to state machine
            //if (from != null && from.isA(becu_org.domain.model.Account)) {
            //    var fromBal = from.balance;
            //    if (to != null && to.isA(becu_org.domain.model.Account)) {

            //        var money = new becu_org.domain.Money(0), self = this;

            //        self.moneyVms.remove(self.moneyVms()[self.moneyVms().length - 1]);


            //        var toBal = to.balance;

            //        if (fromBal > 0) {
            //            if (toBal < 0) {
            //                //pay to-account to 0 or as close as possible
            //                var amt = Math.min(fromBal, Math.abs(toBal));

            //                money.amount(amt);
            //            }
            //            else {
            //                money.amount(fromBal);
            //            }
            //        }



            //        self.moneyVms.push(new circleverse.viewModel.MoneyViewModel(money, 4, { eventAggregator: self.eventAggregator }));
            //    }
            //}

        }
            ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            return settings;
        }
        ,

        transfer: function () {
            var self = this;
            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            //refactor to ask service/domain to do transfer
            self.to().balance = self.to().balance + parseFloat(self.amount());
            self.from().balance = self.from().balance - parseFloat(self.amount());

            self.showMe(false);
            self.flush();

        },


        droppedOn: function (dragModel, dragViewModel) {
            var self = this;
            if (JS.Interface.implements(dragViewModel, becu_org.ui.IQuantity)) {
                self.amount((self.amount() || 0) + parseFloat(dragViewModel.amount() || 0));
            }
        }
        ,

        flush: function () {
            var self = this;
            self.from(null);
            self.to(null);

            self.amount(null);
        }



    });
})();
