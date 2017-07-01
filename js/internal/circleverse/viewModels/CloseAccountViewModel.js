
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CloseAccountViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CloseAccountViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            this.parent = parent;
            this.customer = parent.parent.parent.model();
            

            this.hideCloseForm = ko.observable(true);


            this.callSuper(object, parent, globalSettings, {
                mapping: {
                    map: globalSettings.mappings['becu_org_domain_model_Customer']
                }
            }); //object, parent.insideDiameter * parent.scale(), this.methodDiameter(), parent.childViewModels, function () { return self });

            var initSize = 35;
 self.size = ko.observable(initSize);
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: 0, x: 0} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/trashpiggy35x35.png")');

            this.info = "Balance Alerts";
            


            this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);

            this.closeReason = ko.observable();
            this.isCurrentMemberAuthorizedToClose = ko.observable(false);
            this.hasEquivalentAccount = ko.observable(false);
            this.isLoanAccountFundingSource = ko.observable(true);
            this.otherPersonsWhoNeedToAuthorizeClosure = ko.observableArray();
            this.closureForms = ko.observableArray([{ name: 'Account Closure Authorization Form' }, { name: 'Account Modification Form' }, { name: 'Loan Modification Form'}]);

            this.showManualPendingPaymentsHandling = ko.observable(true);
            this.showManualPaymentShedulesHandling = ko.observable(true);
            this.showBalanceAlertsHandling = ko.observable(true);
            this.showManualDebitCardHandling = ko.observable(true);
            this.showManualCertificateOfDepositHandling = ko.observable(true);


            this.howToManualPendingPaymentsHandling = ko.observable(true);
            this.howToManualPaymentShedulesHandling = ko.observable("Using your mouse, drag the scheduled payments icon <img src='/media/img/scheduled-payments28x35.png'/> from the close account circle to another account circle");
            this.howToBalanceAlertsHandling = ko.observable(true);
            this.howToManualDebitCardHandling = ko.observable(true);
            this.howToManualCertificateOfDepositHandling = ko.observable(true);


            this.currentMemberNotAuthorizedToCloseReason = ko.observable("not a signer on account");
            this.showAutomatedPendingPaymentsHandling = ko.observable(false);
            this.showAutomatedPaymentShedulesHandling = ko.observable(false);
            this.showAutomatedBalanceAlertsHandling = ko.observable(false);
            this.showAutomatedDebitCardHandling = ko.observable(false);
            this.showAutomatedCertificateOfDepositHandling = ko.observable(false);

            this.postInit();
        }
        ,

        postInit: function () {
            //authorization
            for (var i = 0; i < this.rawModel().relationships.length; i++) {
                var relationship = this.rawModel().relationships[i];

                if (relationship.accountRole.accountRoleDescription == 'signer') {
                    if (this.customer == relationship.customer) {
                        this.isCurrentMemberAuthorizedToClose = ko.observable(true);
                    }
                    else {
                        this.otherPersonsWhoNeedToAuthorizeClosure.push(relationship.customer);
                    }
                }
            }
            return;
            //replacement account   
            for (var i = 0; i < this.customer.accounts().length; i++) {
                var account = this.customer.accounts()[i];

                if (account.product().id() == this.model().product().id() && account.product().id().secondaryProductCode() == this.model().product().id().secondaryProductCode()) {

                    this.hasEquivalentAccount(true);
                }
            }


            this.showManualPendingPaymentsHandling(false);
            this.showManualPaymentShedulesHandling(false);
            this.showBalanceAlertsHandling(false);
            this.showManualDebitCardHandling(false);
            this.showManualCertificateOfDepositHandling(false);

            //            if (this.model().relationships().length > 0) {
//                this.showAutomatedPendingPaymentsHandling(true);
//            }
            if (this.model().paymentSchedules().length > 0) {
                this.showAutomatedPaymentShedulesHandling(true);
            }
//            this.showAutomatedPaymentShedulesHandling(true);
//            this.showAutomatedBalanceAlertsHandling(true);
//            this.showAutomatedDebitCardHandling(true);
//            this.showAutomatedCertificateOfDepositHandling(true);

        }
        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false; // '.account';
            return settings;
        }
        ,


        close: function () {
            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            //refactor to ask service/domain to close
            //this.from.amount();
            this.hideCloseForm(true);
            //}
        }
            
            ,

        dropped: function (dropModel, dropViewModel, args) {
        }

    });
})();

