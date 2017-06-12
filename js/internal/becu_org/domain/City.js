	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CityObservable = (function () {
		return new JS.Class('becu_org.domain.model.CityObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();

			}
		});
	})();


	becu_org.domain.model.City = (function () {
		return new JS.Class('becu_org.domain.model.City', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;

			}
		});
	})();
