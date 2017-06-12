	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ContactInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.ContactInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.email = ko.observable();
				self.officePhone = ko.observable();
				self.homePhone = ko.observable();
				self.mobilePhone = ko.observable();
				self.mailstop = ko.observable();

			}
		});
	})();


	becu_org.domain.model.ContactInfo = (function () {
		return new JS.Class('becu_org.domain.model.ContactInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.email;
				self.officePhone;
				self.homePhone;
				self.mobilePhone;
				self.mailstop;

			}
		});
	})();
