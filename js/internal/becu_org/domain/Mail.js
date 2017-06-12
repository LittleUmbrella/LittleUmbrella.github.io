	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.MailObservable = (function () {
		return new JS.Class('becu_org.domain.model.MailObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.carrier = ko.observable();
				self.trackingNumber = ko.observable();
				self.postalDate = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Mail = (function () {
		return new JS.Class('becu_org.domain.model.Mail', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.carrier;
				self.trackingNumber;
				self.postalDate;
				self.id;

			}
		});
	})();
