JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.employeeInfo = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.profileInfo = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
