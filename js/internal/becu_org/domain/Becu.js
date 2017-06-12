	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.BecuObservable = (function () {
	    return new JS.Class('becu_org.domain.model.BecuObservable', becu_org.domain.model.OrganizationObservable, {
			initialize:  function(){
			    var self = this; self.callSuper();


			    self.services = ko.observableArray();
			    self.customers = ko.observableArray();
			    self.employees = ko.observableArray();
			    self.locations = ko.observableArray();
			    self.vault = ko.observable({});
			}
		});
	})();


	becu_org.domain.model.Becu = (function () {
	    return new JS.Class('becu_org.domain.model.Becu', becu_org.domain.model.Organization, {
			initialize:  function(){
                var self = this; self.callSuper();

                self.services = [];
                self.customers = [];
                self.employees = [];
                self.locations = [];
                self.vault = {};

			}
		});
	})();
