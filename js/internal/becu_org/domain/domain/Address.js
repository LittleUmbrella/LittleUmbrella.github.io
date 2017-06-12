JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.Address = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.line1 = ko.observable();
				this.line2 = ko.observable();
				this.line3 = ko.observable();
				this.lines = ko.observable();
				this.postalCode = ko.observable();
				this.city = ko.observable();
				this.state = ko.observable();
				this.country = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
