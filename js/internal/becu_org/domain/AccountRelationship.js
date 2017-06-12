//define('becu_org.domain.model.customer', ['JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'], function () {
    eaf.util.namespace('becu_org.domain');
    becu_org.domain.model.AccountRelationship = (function () {
        return new JS.Class('becu_org.domain.model.AccountRelationship', becu_org.domain.model.Base, {
            initialize: function (role, customer) {
                this.callSuper();
                //properties
                this.accountRole = role;
                this.customer = customer;

            }
        });
    })();


    becu_org.domain.model.AccountRelationshipObservable = (function () {
        return new JS.Class('becu_org.domain.model.AccountRelationshipObservable', becu_org.domain.model.Base, {
            initialize: function (role, customer) {
                this.callSuper();
                //properties
                this.accountRole = ko.observable(role);
                this.customer = ko.observable(customer);

            }
        });
    })();
//});
