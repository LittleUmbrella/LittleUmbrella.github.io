	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.DepartmentObservable = (function () {
		return new JS.Class('becu_org.domain.model.DepartmentObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.contactInfo = ko.observable();
				self.code = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Department = (function () {
		return new JS.Class('becu_org.domain.model.Department', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.contactInfo;
				self.code;
				self.id;

			}
		});
	})();
