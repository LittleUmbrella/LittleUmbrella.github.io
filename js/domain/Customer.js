JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain');
    becu_org.domain.customer = (function () {
        return new JS.Class('becu_org.domain.customer', becu_org.domain.Base, {
            initialize: function () {
                this.callSuper();
                //properties
                this.accounts = ko.observable();
                this.customerInfo = ko.observable();
                this.id = ko.observable();

            }
        });
    })();
});
