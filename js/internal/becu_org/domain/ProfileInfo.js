	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ProfileInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.ProfileInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.firstName = ko.observable();
				self.fullName = ko.observable();
				self.lastName = ko.observable();
				self.taxId = ko.observable();
				self.contactInfo = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.ProfileInfo = (function () {
		return new JS.Class('becu_org.domain.model.ProfileInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.firstName;
				self.fullName;
				self.lastName;
				self.taxId;
				self.contactInfo;
				self.id;

			}
		});
	})();
