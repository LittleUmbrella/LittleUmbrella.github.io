	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.DepositAccountObservable = (function () {
		return new JS.Class('becu_org.domain.model.DepositAccountObservable', becu_org.domain.model.Account, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.cDMaturityDate = ko.observable();

			}
		});
	})();


	becu_org.domain.model.DepositAccount = (function () {
		return new JS.Class('becu_org.domain.model.DepositAccount', becu_org.domain.model.Account, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.cDMaturityDate;

			}
		});
	})();
