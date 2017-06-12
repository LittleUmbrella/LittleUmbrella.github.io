	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.DepositObservable = (function () {
		return new JS.Class('becu_org.domain.model.DepositObservable', becu_org.domain.model.AccountTransaction, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.slip = ko.observable();
				self.contents = ko.observableArray();
				self.source = ko.observable();
				self.institution = ko.observable();
				self.amount = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Deposit = (function () {
		return new JS.Class('becu_org.domain.model.Deposit', becu_org.domain.model.AccountTransaction, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.slip;
				self.contents;
				self.source;
				self.institution;
				self.amount;

			}
		});
	})();
