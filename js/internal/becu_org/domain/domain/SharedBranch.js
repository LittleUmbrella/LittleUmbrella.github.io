JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.sharedBranch = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.name = ko.observable();
				this.location = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
