	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ProductIdObservable = (function () {
		return new JS.Class('becu_org.domain.model.ProductIdObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.primaryProductCode = ko.observable();
				self.secondaryProductCode = ko.observable();

			}
		});
	})();


	becu_org.domain.model.ProductId = (function () {
		return new JS.Class('becu_org.domain.model.ProductId', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.primaryProductCode;
				self.secondaryProductCode;

			}
		});
	})();
