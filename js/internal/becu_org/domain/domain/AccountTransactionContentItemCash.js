JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransactionContentItemCash = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.amount = ko.observable();
				this.quantity = ko.observable();
				this.denomination = ko.observable();

			}
		});
	})();
});
