JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.cashBox = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.cashBoxInfo = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
