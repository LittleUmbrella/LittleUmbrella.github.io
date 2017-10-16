
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.BusinessCenterViewModel = (function () {



    return new JS.Class('circleverse.viewModel.BusinessCenterViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

        initialize: function (from, to) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties
            this.model = from; // = ko.observableArray([]);

            var self = this.self = this;


            this.moneyVms = ko.observableArray([new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(1), 0)
                , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(5), 1)
            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(10), 2)
                , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(20), 2)
            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(50), 4)
                , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 3)
                , new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)
            ]);

            this.fromAccount = ko.observable(from);
            this.toAccount = ko.observable(to);

            this.amount = ko.observable().extend({ money: true });

            this.fromAccountTransferPreviewAmount = ko.computed(function () {
                if (self.fromAccount() != null) {
                    return self.fromAccount().balance() - (self.amount() || 0);
                }

                self.__resetLastItem(self.toAccount(), self.fromAccount());
                return null;
            }).extend({ money: true });


            this.toAccountTransferPreviewAmount = ko.computed(function () {
                if (self.toAccount() != null) {
                    return self.toAccount().balance() + (self.amount() || 0);
                }
                self.__resetLastItem(self.toAccount(), self.fromAccount());

                return null;
            }).extend({ money: true });


            this.amountHasFocus = ko.observable(false);

            this.amountOrDefault = ko.computed({
                read: function () {
                    if (self.amount()) {
                        return self.amount();
                    }
                    else {
                        if (self.amountHasFocus())
                            return self.amount();
                        else
                            return "type or drag $";
                    }
                }
                ,
                write: function (value) {
                    self.amount(value);
                }
            });

            this.hideTransferForm = ko.observable(true);

            this.calculatorVm = new circleverse.viewModel.CalculatorViewModel();


            this.fromAccount.subscribe(function (value) {
                self.__resetLastItem(self.toAccount(), value);
            });


            this.toAccount.subscribe(function (value) {
                self.__resetLastItem(value, self.fromAccount());
            });

            if (this.toAccount() != null && this.fromAccount() != null)
                this.__resetLastItem(this.toAccount, this.fromAccount);


            if ('undefined' == typeof this.onTop)
                this.onTop = ko.observable(true);
        }
            ,

            dragxend: function(){
                this.callSuper();

                this.onTop(!self.onTop()); //just change so that it's re-evaluated
            }
            ,

        __resetLastItem: function (toAccount, fromAccount) {

            //bug: not updating if multiple transfers started at once.

            //todo: refactor to state machine
            if (fromAccount != null && fromAccount.isA(becu_org.domain.model.Account)) {
                var fromBal = fromAccount.balance();
                if (toAccount != null && toAccount.isA(becu_org.domain.model.Account)) {

                    var money = new becu_org.domain.Money(0), self = this;

                    self.moneyVms.remove(self.moneyVms()[self.moneyVms().length - 1]);


                    var toBal = toAccount.balance();

                    if (fromBal > 0) {
                        if (toBal < 0) {
                            //pay to-account to 0 or as close as possible
                            var amt = Math.min(fromBal, Math.abs(toBal));

                            money.amount(amt);
                        }
                        else {
                            money.amount(fromBal);
                        }
                    }



                    this.moneyVms.push(new circleverse.viewModel.MoneyViewModel(money, 4));
                }
            }

        }
            ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            return settings;
        }
        ,

        transfer: function () {
            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            //refactor to ask service/domain to do transfer
            this.toAccount().balance(this.toAccount().balance() + parseFloat(this.amount()));
            this.fromAccount().balance(this.fromAccount().balance() - parseFloat(this.amount()));

            this.changeVisibility(true);
            this.flush();

        },

        changeVisibility: function (cmd) {
            var self = this;
            
            this.onTop(!self.onTop()); //just change so that it's re-evaluated
            if ((typeof cmd).toLowerCase() == 'boolean') {
                this.hideTransferForm(cmd);
            }
        }
        ,

        droppedOn: function (dragModel, dragViewModel) {
            if (JS.Interface.implements(dragViewModel, becu_org.ui.IQuantity)) {
                this.amount((this.amount() || 0) + parseFloat(dragViewModel.amount() || 0));
            }
        }
        ,

        flush: function () {
            this.fromAccount(null);
            this.toAccount(null);

            this.amount(null);
        }



    });
})();
