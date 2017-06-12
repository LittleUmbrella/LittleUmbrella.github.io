	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountRoleObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountRoleObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.accountRoleCode = ko.observable();
				self.accountRoleDescription = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AccountRole = (function () {
		return new JS.Class('becu_org.domain.model.AccountRole', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.accountRoleCode;
				self.accountRoleDescription;

			}
		});
	})();
