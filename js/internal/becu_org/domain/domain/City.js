JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.city = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.name = ko.observable();

			}
		});
	})();
});
