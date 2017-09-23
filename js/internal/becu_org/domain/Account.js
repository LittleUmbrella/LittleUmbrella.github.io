	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.accountNumber = ko.observable();
				self.displayName = ko.observable();
				self.dueDate = ko.observable();
				self.balance = ko.observable();
				self.availableBalance = ko.observable();
				self.status = ko.observable();
				self.interestRate = ko.observable();
				self.yTDInterest = ko.observable();
				self.transactions = ko.observableArray();
				self.relationships = ko.observableArray();
				self.alerts = ko.observableArray();
				self.paymentSchedules = ko.observableArray();
				self.pendingPayments = ko.observableArray();
				self.financialEntity = ko.observable();
				self.product = ko.observable();
				self.addresses = ko.observableArray();

			}
		});
	})();


	becu_org.domain.model.Account = (function () {
		return new JS.Class('becu_org.domain.model.Account', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.accountNumber;
				self.displayName;
				self.dueDate;
				self.balance;
				self.availableBalance;
				self.status;
				self.interestRate;
				self.yTDInterest;
				self.transactions = [];
				self.relationships = [];
				self.alerts = [];
				self.paymentSchedules = [];
				self.pendingPayments = [];
				self.financialEntity;
				self.product;
				self.addresses;

			}
		});
	})();
