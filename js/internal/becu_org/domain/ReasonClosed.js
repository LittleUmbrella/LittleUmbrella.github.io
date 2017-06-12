	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ReasonClosedObservable = (function () {
		return new JS.Class('becu_org.domain.model.ReasonClosedObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.reasonCode = ko.observable();
				self.reasonDescription = ko.observable();

			}
		});
	})();


	becu_org.domain.model.ReasonClosed = (function () {
		return new JS.Class('becu_org.domain.model.ReasonClosed', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.reasonCode;
				self.reasonDescription;

			}
		});
	})();
