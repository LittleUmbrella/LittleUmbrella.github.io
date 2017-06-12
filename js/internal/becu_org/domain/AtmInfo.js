	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AtmInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.AtmInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AtmInfo = (function () {
		return new JS.Class('becu_org.domain.model.AtmInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number;
				self.id;

			}
		});
	})();
