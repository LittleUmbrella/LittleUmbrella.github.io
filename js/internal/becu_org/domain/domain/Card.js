JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.Card = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.id = ko.observable();

			}
		});
	})();
});
