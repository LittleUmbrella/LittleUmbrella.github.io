	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CustomerInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.CustomerInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.profileInfo = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.CustomerInfo = (function () {
		return new JS.Class('becu_org.domain.model.CustomerInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.profileInfo;
				self.id;

			}
		});
	})();
