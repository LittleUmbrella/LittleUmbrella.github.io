
eaf.util.namespace('becu_org.http.requestInterceptor');
becu_org.http.requestInterceptor.CloseAccount = (function () {
    return new JS.Class('becu_org.http.requestInterceptor.CloseAccount', {
        initialize: function () {

            //properties

            this.accountNumber;
            this.taxId; 
        }
        ,

        init: function () {
            var url = $.url();
            this.accountNumber = url.param('accountNumber');
            this.taxId = url.param('taxId');
        }
    });
})();
