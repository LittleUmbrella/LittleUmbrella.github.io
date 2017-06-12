	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.LoanAccountObservable = (function () {
		return new JS.Class('becu_org.domain.model.LoanAccountObservable', becu_org.domain.model.Account, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.mLAccountNumber = ko.observable();

			}
		});
	})();


	becu_org.domain.model.LoanAccount = (function () {
		return new JS.Class('becu_org.domain.model.LoanAccount', becu_org.domain.model.Account, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.mLAccountNumber;

			}
		});
	})();
