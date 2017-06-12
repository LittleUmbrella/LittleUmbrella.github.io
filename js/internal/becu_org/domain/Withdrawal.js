	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.WithdrawalObservable = (function () {
		return new JS.Class('becu_org.domain.model.WithdrawalObservable', becu_org.domain.model.AccountTransaction, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.source = ko.observable();
				self.institution = ko.observable();
				self.contents = ko.observableArray();
				self.amount = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Withdrawal = (function () {
		return new JS.Class('becu_org.domain.model.Withdrawal', becu_org.domain.model.AccountTransaction, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.source;
				self.institution;
				self.contents;
				self.amount;

			}
		});
	})();
