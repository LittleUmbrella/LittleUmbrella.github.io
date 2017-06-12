eaf.util.namespace('becu_org.domain.model');
becu_org.domain.model.ContactObservable = (function () {
    return new JS.Class('becu_org.domain.model.ContactObservable', becu_org.domain.model.PersonObservable, {
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


becu_org.domain.model.Contact = (function () {
    return new JS.Class('becu_org.domain.model.Contact', becu_org.domain.model.Person, {
        initialize: function () {
            var self = this;
            self.callSuper();
            //properties
            self.accounts = [];
        }
    });
})(); 
