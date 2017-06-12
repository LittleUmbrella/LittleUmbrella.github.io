	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.EmployeeObservable = (function () {
		return new JS.Class('becu_org.domain.model.EmployeeObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.login = ko.observable();
				self.employeeInfo = ko.observable();
				self.department = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Employee = (function () {
		return new JS.Class('becu_org.domain.model.Employee', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.login;
				self.employeeInfo;
				self.department;
				self.id;

			}
		});
	})();
