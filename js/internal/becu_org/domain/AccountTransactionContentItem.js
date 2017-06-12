	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransactionContentItemObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionContentItemObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AccountTransactionContentItem = (function () {
		return new JS.Class('becu_org.domain.model.AccountTransactionContentItem', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.amount;

			}
		});
	})();
