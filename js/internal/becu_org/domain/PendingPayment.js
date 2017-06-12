	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.PendingPaymentObservable = (function () {
		return new JS.Class('becu_org.domain.model.PendingPaymentObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.account = ko.observable();
				self.amount = ko.observable();
				self.transactionDate = ko.observable();
				self.merchant = ko.observable();

			}
		});
	})();


	becu_org.domain.model.PendingPayment = (function () {
		return new JS.Class('becu_org.domain.model.PendingPayment', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.account;
				self.amount;
				self.transactionDate;
				self.merchant;

			}
		});
	})();
