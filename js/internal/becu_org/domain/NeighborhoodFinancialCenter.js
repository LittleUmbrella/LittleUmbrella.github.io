	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.NeighborhoodFinancialCenterObservable = (function () {
		return new JS.Class('becu_org.domain.model.NeighborhoodFinancialCenterObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.NeighborhoodFinancialCenter = (function () {
		return new JS.Class('becu_org.domain.model.NeighborhoodFinancialCenter', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.id;

			}
		});
	})();
