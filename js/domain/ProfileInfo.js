JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.profileInfo = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.firstName = ko.observable();
				this.fullName = ko.observable();
				this.lastName = ko.observable();
				this.taxId = ko.observable();
				this.contactInfo = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
