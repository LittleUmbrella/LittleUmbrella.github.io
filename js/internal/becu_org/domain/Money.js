//define('becu_org.domain.model.customer', ['JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'], function () {
    eaf.util.namespace('becu_org.domain');
    becu_org.domain.MoneyObservable = (function () {
        return new JS.Class('becu_org.domain.MoneyObservable', becu_org.domain.model.Base, {
            initialize: function (amount) {
                this.callSuper();
                //properties
                this.amount = ko.observable(amount);

            }
        });
    })();
//});
    becu_org.domain.Money = (function () {
        return new JS.Class('becu_org.domain.Money', becu_org.domain.model.Base, {
            initialize: function (amount) {
                this.callSuper();
                //properties
                this.amount = ko.observable(amount);

            }
        });
    })();