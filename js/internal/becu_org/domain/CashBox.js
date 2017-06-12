	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CashBoxObservable = (function () {
		return new JS.Class('becu_org.domain.model.CashBoxObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.cashBoxInfo = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.CashBox = (function () {
		return new JS.Class('becu_org.domain.model.CashBox', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.cashBoxInfo;
				self.id;

			}
		});
	})();
