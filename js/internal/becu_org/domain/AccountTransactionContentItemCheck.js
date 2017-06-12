	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransactionContentItemCheckObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionContentItemCheckObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount = ko.observable();
				self.cleared = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AccountTransactionContentItemCheck = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionContentItemCheck', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount;
				self.cleared;
				self.id;

			}
		});
	})();
