JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.model.AccountTransactionContentItemCheck = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.amount = ko.observable();
				this.cleared = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
