JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.contactInfo = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.email = ko.observable();
				this.mailstop = ko.observable();
				this.homePhone = ko.observable();
				this.mobilePhone = ko.observable();
				this.officePhone = ko.observable();

			}
		});
	})();
});
