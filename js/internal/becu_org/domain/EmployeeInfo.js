	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.EmployeeInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.EmployeeInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.profileInfo = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.EmployeeInfo = (function () {
		return new JS.Class('becu_org.domain.model.EmployeeInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.profileInfo;
				self.id;

			}
		});
	})();
