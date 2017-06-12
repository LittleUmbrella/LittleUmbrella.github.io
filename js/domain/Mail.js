JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.mail = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.carrier = ko.observable();
				this.trackingNumber = ko.observable();
				this.postalDate = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
