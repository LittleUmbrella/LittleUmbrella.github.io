	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AtmObservable = (function () {
		return new JS.Class('becu_org.domain.model.AtmObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.atmInfo = ko.observable();
				self.address = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Atm = (function () {
		return new JS.Class('becu_org.domain.model.Atm', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.atmInfo;
				self.address;
				self.id;

			}
		});
	})();
