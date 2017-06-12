	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ScheduleObservable = (function () {
		return new JS.Class('becu_org.domain.model.ScheduleObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.startDate = ko.observable();
				self.scheduleFrequency = ko.observable();
				self.maxTransfers = ko.observable();
				self.expirationDate = ko.observable();
				self.scheduleStatus = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Schedule = (function () {
		return new JS.Class('becu_org.domain.model.Schedule', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.startDate;
				self.scheduleFrequency;
				self.maxTransfers;
				self.expirationDate;
				self.scheduleStatus;

			}
		});
	})();
