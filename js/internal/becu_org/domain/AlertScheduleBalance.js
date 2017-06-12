	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AlertScheduleBalanceObservable = (function () {
		return new JS.Class('becu_org.domain.model.AlertScheduleBalanceObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount = ko.observable();
				self.alertChannel = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AlertScheduleBalance = (function () {
		return new JS.Class('becu_org.domain.model.AlertScheduleBalance', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount;
				self.alertChannel;

			}
		});
	})();
