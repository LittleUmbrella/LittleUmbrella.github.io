eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//example of fake
//
//var deferred = jQuery.Deferred();

//setTimeout(function () {
//    deferred.resolve(id);
//}, 5000);


//return deferred.promise();

//example of Real
//
//return jQuery.ajax({
//    'type': 'GET',
//    //contentType: 'text/plain;  charset=utf-8',
//    'contentType': 'application/json',
//    'url': self._svcBaseUri + '/location/' + id + '/waittime',
//    //'data': request,
//    'dataType': 'json',
//    'headers': {
//        'RequestVerificationToken': self._af
//    }
//}).promise();

littleUmbrella.circleverse.Repository = (function () {
    var standardWaitTime = 1000, longWaitTime = 3000, shortWaitTime = 300;
    return new JS.Class('littleUmbrella.circleverse.Repository', {

        initialize: function (svcBaseUri, globalSettings, af) {
            var self = this;

            if (null == svcBaseUri || svcBaseUri.length == 0)
                throw new Error('svcBaseUri cannot be null or empty');

            self.useCache = true;
            self.__svcBaseUri = svcBaseUri;
            self.__globalSettings = globalSettings;
            self._af = af;
        },


        getTransactions: function (id, continuous) {
            var self = this;

            var deferred = jQuery.Deferred(), transactions = [];

            var tras = ["Check  ", "Check  ", "External Deposit - THE BOEING COMPA  - DIR DEP  ", "Electronic Check - AMERICAN EXPRESS (ARC PMT) Accounts Receivable Entry SERIAL #: 7235  ", "Check  ", "Check  ", "Electronic Check - JPMChase Bank NA (CHECK PYMT) Accounts Receivable Entry SERIAL #: 7237  ", "Electronic Check - City of Bonney L (CHECK PMTS) Accounts Receivable Entry SERIAL #: 7236  ", "POS Withdrawal - CHEVRON 0200325 17008 FOREST CANYON RD SUMNER       WAUS - Card Ending In 9584  ", "POS Withdrawal - FRED MEYER 801 AUBURN WAY N       AUBURN       WAUS - Card Ending In 9584  ", "POS Withdrawal - LOWE'S #1089 1232 A STREET NORTHEASTAUBURN       WAUS - Card Ending In 9584  ", "Dividend/Interest  ", "POS Withdrawal - RED WING SHOE #887 2016 S. 314TH STREET   FEDERAL WAY  WAUS - Card Ending In 9584  ", "Check  ", "Check  ", "External Deposit - THE BOEING COMPA  - DIR DEP  ", "POS Withdrawal - WINCO FOODS 6621 166th Avenue E    Sumner       WAUS - Card Ending In 9584  ", "POS Withdrawal - 2011015 WINCO FOO 6621 166th A Sumner       WAUS - Card Ending In 9584  ", "Check  ", "ATM Withdrawal - BECU 1201 VALLEY AVE E      SUMNER       WAUS - Card Ending In 9584  ", "ATM Deposit - BECU 1201 VALLEY AVE E      SUMNER       WAUS - Card Ending In 9584  ", "Electronic Check - JPMChase Bank NA (CHECK PYMT) Accounts Receivable Entry SERIAL #: 7227  ", "Electronic Check - AMERICAN EXPRESS (ARC PMT) Accounts Receivable Entry SERIAL #: 7228  ", "POS Withdrawal - FRED MEYER 1201 VALLEY AVE.       SUMNER       WAUS - Card Ending In 9584  ", "Electronic Check - Retail Home Equi (CHECK PYMT) Accounts Receivable Entry SERIAL #: 7226  ", "Withdrawal - Online Banking Transfer To Visa XXXXXXXXXXXX8961  ", "ATM Deposit - BECU 700 15TH ST            AUBURN       WAUS - Card Ending In 9584  ", "POS Withdrawal - BUCKYS INC 111 BRIDGE ST S        360-8933808  WAUS - Card Ending In 9584  ", "External Deposit - JESSICA FOX ONLNE TRNSFR88871085 - SENDER  ", "External Deposit - JESSICA FOX ONLNE TRNSFR88871085 - SENDER  ", "POS Withdrawal - PUERTO VALLARTA 1414 LAKE TAPPS PKWY E AUBURN       WAUS - Card Ending In 9584  ", "POS Withdrawal - 2011015 WINCO FOO 6621 166th A Sumner       WAUS - Card Ending In 9584  ", "Check  ", "POS Withdrawal - WINCO FOODS 6621 166th Avenue E    Sumner       WAUS - Card Ending In 9584  ", "POS Withdrawal - AGRISHOP AUBURN 308 WEST MAIN          AUBURN       WAUS - Card Ending In 9584"];


            setTimeout(function () {
                for (var t = 0; t < eaf.util.getRandomInt(10, 30) ; t++) {

                    tran = new becu_org.domain.model.AccountTransaction();
                    //tran.id;
                    tran.amount = Math.random() * 100;
                    tran.transactionDate = new Date(2012, 5, eaf.util.getRandomInt(20, 25));
                    tran.effectiveDate = new Date(2012, 5, eaf.util.getRandomInt(20, 25));
                    tran.principal;
                    tran.createDate;
                    tran.initiator;
                    tran.checkNumber;
                    tran.transactionDescription = tras[t];

                    transactions.push(tran);
                }

                deferred.resolve(transactions);
            }, longWaitTime);

            return deferred.promise();
        }


    });


})();
