JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.employee = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.employeeInfo = ko.observable();
				this.department = ko.observable();
				this.login = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
