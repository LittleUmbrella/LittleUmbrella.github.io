JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.withdrawal = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.source = ko.observable();
				this.institution = ko.observable();
				this.contents = ko.observable();
				this.amount = ko.observable();

			}
		});
	})();
});
