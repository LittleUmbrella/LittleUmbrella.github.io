
JS.require('JS.Class', function () {

    eaf.util.namespace('becu_org.service');
    becu_org.service.CustomerService = (function () {
        return new JS.Class('becu_org.service.CustomerService', {
            initialize: function () {
                var self = this;
                //properties

            }
            ,

            getCustomer: function (taxId) {
                var cust = new becu_org.domain.model.CustomerObservable(), a, c, info, tran, r, role, aalert, s, t, prod;
                c = cust;

                var accountService = new becu_org.service.AccountService();


                switch (taxId) {
                    case '0123456789':


                        c.firstName("Wink");
                        c.lastName("Martindale");

                        cust.accounts(accountService.getReplacementAccountsSelectionList(taxId));
                        break;
                    case '0123456788':


                        c.firstName("Chuck (Carlos)");
                        c.lastName("Noris");
                        cust.accounts(accountService.getReplacementAccountsSelectionList(taxId));
                        break;
                    case '0123456787':


                        c.firstName("Alf");
                        c.lastName("");
                        cust.accounts(accountService.getReplacementAccountsSelectionList(taxId));
                        break;
                    case '0123456786':


                        c.firstName("Amanda B.");
                        c.lastName("Reckonedwith");
                        cust.accounts(accountService.getReplacementAccountsSelectionList(taxId));
                        break;
                    default:


                        c.firstName("Wink");
                        c.lastName("Martindale");
                        cust.accounts(accountService.getReplacementAccountsSelectionList('0123456789'));
                        break;
                }

                return cust;
            }

        });
    })();
});




