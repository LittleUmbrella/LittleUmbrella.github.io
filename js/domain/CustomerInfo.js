JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.customerInfo = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.profileInfo = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
