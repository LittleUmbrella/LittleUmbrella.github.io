JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.atm = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.atmInfo = ko.observable();
				this.address = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
