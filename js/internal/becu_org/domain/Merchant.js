	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.MerchantObservable = (function () {
		return new JS.Class('becu_org.domain.model.MerchantObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Merchant = (function () {
		return new JS.Class('becu_org.domain.model.Merchant', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;

			}
		});
	})();
