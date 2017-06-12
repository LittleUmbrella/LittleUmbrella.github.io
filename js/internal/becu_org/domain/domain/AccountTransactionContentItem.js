JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransactionContentItem = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.amount = ko.observable();

			}
		});
	})();
});
