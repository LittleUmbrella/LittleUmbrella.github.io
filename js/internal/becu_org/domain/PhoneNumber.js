	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.PhoneNumberObservable = (function () {
		return new JS.Class('becu_org.domain.model.PhoneNumberObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number = ko.observable();
				self.extension = ko.observable();

			}
		});
	})();


	becu_org.domain.model.PhoneNumber = (function () {
		return new JS.Class('becu_org.domain.model.PhoneNumber', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number;
				self.extension;

			}
		});
	})();
