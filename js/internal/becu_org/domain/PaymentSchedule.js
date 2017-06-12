	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.PaymentScheduleObservable = (function () {
		return new JS.Class('becu_org.domain.model.PaymentScheduleObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.account = ko.observable();
				self.amount = ko.observable();
				self.schedule = ko.observable();
				self.merchant = ko.observable();
				self.nextScheduledTransferDate = ko.observable();

			}
		});
	})();


	becu_org.domain.model.PaymentSchedule = (function () {
		return new JS.Class('becu_org.domain.model.PaymentSchedule', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.account;
				self.amount;
				self.schedule;
				self.merchant;
				self.nextScheduledTransferDate;

			}
		});
	})();
