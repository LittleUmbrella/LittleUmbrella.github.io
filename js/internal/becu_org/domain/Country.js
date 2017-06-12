	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CountryObservable = (function () {
		return new JS.Class('becu_org.domain.model.CountryObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Country = (function () {
		return new JS.Class('becu_org.domain.model.Country', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.id;

			}
		});
	})();
