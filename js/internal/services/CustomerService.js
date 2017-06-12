
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
                
                var accountService = new becu_org.service.AccountService();


                var getter = eaf.communications.jsonGetter.get('http://tvmkassa/BECU.CloseAccount.WebAPI/api/Customer?taxId=3Rbn2JCIuod4UIzavb15RRBi5l0/877Qi+uE9F/RE3nywmaxtknGmkULahwZ50sb&osiEntityType=P',
                function (result) {
//                    
//                    
//                    c.firstName("Wink");
//                    c.lastName("Martindale");

//                    cust.accounts(accountService.getReplacementAccountsSelectionList(taxId));
                }
                , function (result) { });

                
                return cust;
            }

        });
    })();
});




