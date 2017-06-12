
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CloseAccountViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CloseAccountViewModel', circleverse.viewModel.Base, {

        initialize: function (eventAggregator, lookupService, wizard, stepBasicViewModel, stepRecurringViewModel, stepBalanceViewModel, stepConfirmationViewModel, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            self.parent = parent;
            self.eventAggregator = eventAggregator;

            self.callSuper();


            self.stepBasicViewModel = ko.observable(stepBasicViewModel);
            self.stepRecurringViewModel = ko.observable(stepRecurringViewModel);
            self.stepBalanceViewModel = ko.observable(stepBalanceViewModel);
            self.stepConfirmationViewModel = ko.observable(stepConfirmationViewModel);

            self.wizard = ko.observable(wizard);

            self.wizard().goNextPredicate = function () {
                var retVal = self.stepBasicViewModel().canProceed();


                //self.wizard().canGoNext(retVal);

                return retVal;
            };

            self.wizard().stepModels.push(new circleverse.controls.viewModel.WizardStepViewModel(1, "Basic Information", "basicTmpl", self.stepBasicViewModel()));
            self.wizard().stepModels.push(new circleverse.controls.viewModel.WizardStepViewModel(2, "Pending & Recurring Transactions", "recurringTmpl", self.stepRecurringViewModel()));
            self.wizard().stepModels.push(new circleverse.controls.viewModel.WizardStepViewModel(3, "Transfer Balance & Services", "balanceTmpl", self.stepBalanceViewModel()));
            self.wizard().stepModels.push(new circleverse.controls.viewModel.WizardStepViewModel(4, "Confirm & Submit", "confirmationTmpl", self.stepConfirmationViewModel()));

            self.wizard().makeCurrentStep(self.wizard().stepModels()[0]);

            self.closeReasonCodes = ko.observableArray();



        }
    });
})();



eaf.util.namespace('circleverse.viewModel.CloseAccountViewModel.Step');

//alert('hi');

circleverse.viewModel.CloseAccountViewModel.Step.Basic = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CloseAccountViewModel.Step.Basic', circleverse.viewModel.Base, {

        initialize: function (eventAggregator, lookupService, accountService, customer, accountToClose, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;

            var reqText = 'Invalid, please enter a value';
            //properties
            self.parent = parent;
            self.eventAggregator = eventAggregator;

            self.callSuper();

            self.dnaUserName = ko.observable();
            self.dnaPassword = ko.observable();

            self.lookupService = lookupService;
            self.accountService = accountService;
            self.customer = ko.observable(customer);
            self.accountToClose = ko.observable(accountToClose);


            self.formsNeeded = ko.observableArray();
            self.canClose = ko.observable(false);
            self.cannotCloseReasons = ko.observableArray();


            self.replacementAccountsSelectionList = ko.observableArray();


            self.inEligibleReplacementAccountsSelectionList = ko.observableArray();



            self.isMemberReplacingAccount = ko.observable().extend({ required: { message: reqText, params: true} });
            //            //for radio selection
            //            self.replacementAccountValue = ko.observable();
            self.replacementAccount = ko.observable();

            self.eventAggregator.subscribe('circleverse.viewModel.CloseAccountApplication.Customer.Changed', function (ctx) {
                self.customer(ctx);

            });

            self.eventAggregator.subscribe('circleverse.viewModel.CloseAccountApplication.AccountToClose.Changed', function (ctx) {
                self.accountToClose(ctx);

                try {
                    var replacementAccountsSelectionList = accountService.getReplacementAccountsSelectionList(ctx.accountNumber());
                }
                catch (e) {
                    self.eventAggregator.publish('exception', { friendlyMessage: 'There was a problem retrieving replacement account data', error: +e.toString() });
                }

                for (var i = 0; i < replacementAccountsSelectionList.length; i++) {
                    var replace = replacementAccountsSelectionList[i];

                    if (replace.canBeUsedToReplace) {
                        self.replacementAccountsSelectionList.push(replace);
                    }
                    else {
                        self.inEligibleReplacementAccountsSelectionList.push(replace);
                    }
                }
            });


            self.isMemberReplacingAccount.subscribe(function (val) {
                if ('false' == val) {
                    self.replacementAccount(null);
                }
            });

            self.replacementAccountDisplay = ko.computed(function () {
                if (self.replacementAccount() == null) {
                    return "None selected";
                }

                return self.replacementAccount().accountNumber();
            });


            self.reasonsToClose = ko.observableArray(lookupService.getCloseAccountReasonCodes());

            self.closeReason = ko.observable().extend({ required: { message: reqText, params: true} });

            self.closeReason.subscribe(function (val) {
                var result = self.canCloseAccount();

                if (null != val) {
                    if (val.needsExplanation) {
                        self.IsCloseReasonNotesVisible(true);
                        return;
                    }
                }

                self.IsCloseReasonNotesVisible(false);
            });

            self.IsCloseReasonNotesVisible = ko.observable(false);
            self.closeReasonNotes = ko.observable();

            self.isFooterVisible = ko.observable(false);



            self.eventAggregator.subscribe('circleverse.controls.viewModel.WizardStepViewModel.goNext', function (can) {
                var observable, isModified;
                for (n in self) {
                    observable = self[n];
                    if (observable && 'undefined' != typeof observable.isValid) {
                        //ko.validation.validateObservable(observable);
                        isModified = observable.isModified();
                        observable.isModified(true);
                        //observable.isModified(isModified);
                    }
                }
            });



            //self.__canProceed = ko.observable(false);
            self.canProceed = ko.computed(function () {
                //                for (n in self) {
                //                    if ('undefined' != typeof n.isValid) {
                //                        ko.validation.validateObservable(n);
                //                    }
                //                }
                var can = self.closeReason.isValid();
                can = can && self.isMemberReplacingAccount.isValid();
                can = can && self.formsNeeded().length == 0;
                can = can && self.canClose();
                return can;
            });
        }
        ,

        canCloseAccount: function () {
            var self = this;

            try {
                self.canClose(false);
                var result = self.accountService.canCloseAccount(self.accountToClose().accountNumber(), self.closeReason());

                self.canClose(result.can);
                return result;
            }
            catch (e) {
                self.eventAggregator.publish('exception', { friendlyMessage: 'There was a problem checking business rules', error: +e.toString() });
            }
        }
        ,

        changeSelectedItem: function (item, e) {
            var self = this;

            if (self.replacementAccount() == item) {
                self.replacementAccount(null);
            }
            else {
                self.replacementAccount(item);
            }

        }
    });
})();


circleverse.viewModel.CloseAccountViewModel.Step.Recurring = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CloseAccountViewModel.Step.Recurring', circleverse.viewModel.Base, {

        initialize: function (eventAggregator, lookupService, accountService) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var reqText = 'Invalid, please enter a value';
            //properties
            self.eventAggregator = eventAggregator;

            self.callSuper();

            self.customer = ko.observable();
            self.accountToClose = ko.observable();

            self.eventAggregator.subscribe('circleverse.viewModel.CloseAccountApplication.AccountToClose.Changed', function (ctx) {
                self.accountToClose(ctx);

                //                try {
                //                    var replacementAccountsSelectionList = accountService.getReplacementAccountsSelectionList(ctx.accountNumber());
                //                }
                //                catch (e) {
                //                    self.eventAggregator.publish('exception', { friendlyMessage: 'There was a problem retrieving replacement account data', error: +e.toString() });
                //                }

                //                for (var i = 0; i < replacementAccountsSelectionList.length; i++) {
                //                    var replace = replacementAccountsSelectionList[i];

                //                    if (replace.canBeUsedToReplace) {
                //                        self.replacementAccountsSelectionList.push(replace);
                //                    }
                //                    else {
                //                        self.inEligibleReplacementAccountsSelectionList.push(replace);
                //                    }
                //                }
            });

            self.hasPendingPopMoneyTransactions = ko.observable().extend({ required: { message: reqText, params: true} });
            self.hasPendingExternalTransactions = ko.observable().extend({ required: { message: reqText, params: true} });
            self.hasPendingCheckTransactions = ko.observable().extend({ required: { message: reqText, params: true} });
            self.hasPendingAchTransactions = ko.observable().extend({ required: { message: reqText, params: true} });

        }
    });
})();


circleverse.viewModel.CloseAccountViewModel.Step.Balance = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CloseAccountViewModel.Step.Balance', circleverse.viewModel.Base, {

        initialize: function (eventAggregator, customer, accountToClose, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var reqText = 'Invalid, please enter a value';
            //properties
            self.parent = parent;
            self.eventAggregator = eventAggregator;

            self.callSuper();

            self.customer = ko.observable(customer);
            self.accountToClose = ko.observable(accountToClose);


        }
    });
})();


circleverse.viewModel.CloseAccountViewModel.Step.Confirmation = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CloseAccountViewModel.Step.Confirmation', circleverse.viewModel.Base, {

        initialize: function (eventAggregator, customer, accountToClose, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var reqText = 'Invalid, please enter a value';
            //properties
            self.parent = parent;
            self.eventAggregator = eventAggregator;

            self.customer = ko.observable(customer);
            self.accountToClose = ko.observable(accountToClose);


        }
    });
})();


