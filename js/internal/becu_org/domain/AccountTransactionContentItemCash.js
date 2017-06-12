	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransactionContentItemCashObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionContentItemCashObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount = ko.observable();
				self.quantity = ko.observable();
				self.denomination = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AccountTransactionContentItemCash = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionContentItemCash', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount;
				self.quantity;
				self.denomination;

			}
		});
	})();
