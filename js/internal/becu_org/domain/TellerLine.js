	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.TellerLineObservable = (function () {
		return new JS.Class('becu_org.domain.model.TellerLineObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.tellerInterface = ko.observable();
				self.financialCenter = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.TellerLine = (function () {
		return new JS.Class('becu_org.domain.model.TellerLine', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.tellerInterface;
				self.financialCenter;
				self.id;

			}
		});
	})();
