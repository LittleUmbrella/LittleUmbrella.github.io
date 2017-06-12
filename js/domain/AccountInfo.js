JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.accountInfo = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.number = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
