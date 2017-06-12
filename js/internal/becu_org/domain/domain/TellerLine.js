JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.tellerLine = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.tellerInterface = ko.observable();
				this.financialCenter = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
