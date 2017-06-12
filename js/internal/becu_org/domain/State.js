	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.StateObservable = (function () {
		return new JS.Class('becu_org.domain.model.StateObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.State = (function () {
		return new JS.Class('becu_org.domain.model.State', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.id;

			}
		});
	})();
