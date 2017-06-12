JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.department = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.code = ko.observable();
				this.contactInfo = ko.observable();
				this.name = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
