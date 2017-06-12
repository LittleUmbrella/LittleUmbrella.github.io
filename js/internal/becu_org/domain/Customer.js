eaf.util.namespace('becu_org.domain.model');
becu_org.domain.model.CustomerObservable = (function () {
    return new JS.Class('becu_org.domain.model.CustomerObservable', becu_org.domain.model.PersonObservable, {
        initialize: function () {

            var self = this;
            self.callSuper();
            //properties
            self.customerStartDate = ko.observable();
            self.accounts = ko.observableArray();
            self.remoteServices = ko.observableArray();
            self.contacts = ko.observableArray();

        }
    });
})();


becu_org.domain.model.Customer = (function () {
    return new JS.Class('becu_org.domain.model.Customer', becu_org.domain.model.Person, {
        initialize: function () {
            var self = this;
            self.callSuper();
            //properties
            self.customerStartDate;
            self.accounts = [];
            self.remoteServices = [];
            self.contacts = [];
        }
    });
})();
