	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.SeasonalAddressRecurringObservable = (function () {
		return new JS.Class('becu_org.domain.model.SeasonalAddressRecurringObservable', becu_org.domain.model.Address, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.startMonth = ko.observable();
				self.startDay = ko.observable();

				self.endMonth = ko.observable();
				self.endDay = ko.observable();

			}
		});
	})();


	becu_org.domain.model.SeasonalAddressRecurring = (function () {
		return new JS.Class('becu_org.domain.model.SeasonalAddressRecurring', becu_org.domain.model.Address, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.startMonth;
				self.startDay;

				self.endMonth;
				self.endDay;

			}
		});
	})();
