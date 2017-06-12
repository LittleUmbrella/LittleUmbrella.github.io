JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountTransaction = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.createDate = ko.observable();
				this.principal = ko.observable();
				this.effectiveDate = ko.observable();
				this.id = ko.observable();
				this.transactionDate = ko.observable();
				this.amount = ko.observable();
				this.checkNumber = ko.observable();
				this.initiator = ko.observable();

			}
		});
	})();
});
