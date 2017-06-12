JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.account = (function () {
	    return new JS.Class('becu_org.domain.account', becu_org.domain.Base, {
	        initialize: function () {
	            this.callSuper();
				//properties
				this.accountInfo = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
