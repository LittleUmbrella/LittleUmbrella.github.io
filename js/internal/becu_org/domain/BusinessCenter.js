//define('becu_org.domain.model.customer', ['JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'], function () {
    eaf.util.namespace('becu_org.domain');
    becu_org.domain.model.AccountRole = (function () {
        return new JS.Class('becu_org.domain.model.BusinessService', becu_org.domain.model.Base, {
            initialize: function (name) {
                this.callSuper();
                //properties
                this.name = ko.observable(name);
            }
        });
    })();
//});
