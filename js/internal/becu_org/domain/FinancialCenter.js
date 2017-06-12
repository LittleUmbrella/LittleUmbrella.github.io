	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.FinancialCenterObservable = (function () {
		return new JS.Class('becu_org.domain.model.FinancialCenterObservable', becu_org.domain.model.FinancialLocation, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.FinancialCenter = (function () {
		return new JS.Class('becu_org.domain.model.FinancialCenter', becu_org.domain.model.FinancialLocation, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.id;

			}
		});
	})();
