	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CardObservable = (function () {
		return new JS.Class('becu_org.domain.model.CardObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Card = (function () {
		return new JS.Class('becu_org.domain.model.Card', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.id;

			}
		});
	})();
