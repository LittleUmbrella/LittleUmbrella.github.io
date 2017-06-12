	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AccountInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.AccountInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.AccountInfo = (function () {
		return new JS.Class('becu_org.domain.model.AccountInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.number;
				self.id;

			}
		});
	})();
