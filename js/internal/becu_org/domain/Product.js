	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ProductObservable = (function () {
		return new JS.Class('becu_org.domain.model.ProductObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.productId = ko.observable();
				self.name = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Product = (function () {
		return new JS.Class('becu_org.domain.model.Product', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.productId;
				self.name;

			}
		});
	})();
