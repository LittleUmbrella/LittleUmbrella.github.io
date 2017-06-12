	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransactionObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.id = ko.observable();
				self.amount = ko.observable();
				self.transactionDate = ko.observable();
				self.transactionDescription = ko.observable();
				self.effectiveDate = ko.observable();
				self.principal = ko.observable();
				self.createDate = ko.observable();
				self.initiator = ko.observable();
				self.checkNumber = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AccountTransaction = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransaction', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.id;
				self.amount;
				self.transactionDate;
				self.effectiveDate;
				self.principal;
				self.createDate;
				self.initiator;
				self.checkNumber;
				self.transactionDescription;
			}
		});
	})();
