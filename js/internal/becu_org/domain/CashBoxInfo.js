	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CashBoxInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.CashBoxInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.CashBoxInfo = (function () {
		return new JS.Class('becu_org.domain.model.CashBoxInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number;
				self.id;

			}
		});
	})();
