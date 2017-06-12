	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.InstitutionObservable = (function () {
		return new JS.Class('becu_org.domain.model.InstitutionObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.isUs = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Institution = (function () {
		return new JS.Class('becu_org.domain.model.Institution', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.isUs;

			}
		});
	})();
