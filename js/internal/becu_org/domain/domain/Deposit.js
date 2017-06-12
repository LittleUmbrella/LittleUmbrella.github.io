JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.deposit = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.contents = ko.observable();
				this.institution = ko.observable();
				this.source = ko.observable();
				this.slip = ko.observable();
				this.amount = ko.observable();

			}
		});
	})();
});
