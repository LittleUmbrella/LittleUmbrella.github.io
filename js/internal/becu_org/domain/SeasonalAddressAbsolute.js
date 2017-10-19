	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.SeasonalAddressAbsoluteObservable = (function () {
		return new JS.Class('becu_org.domain.model.SeasonalAddressAbsoluteObservable', becu_org.domain.model.Address, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.startDate = ko.observable();
				self.endDate = ko.observable();
			}
		});
	})();


	becu_org.domain.model.SeasonalAddressAbsolute = (function () {
		return new JS.Class('becu_org.domain.model.SeasonalAddressAbsolute', becu_org.domain.model.Address, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.startDate;
				self.endDate;

			}
		});
	})();
