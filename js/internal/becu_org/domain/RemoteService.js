	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.RemoteServiceObservable = (function () {
		return new JS.Class('becu_org.domain.model.RemoteServiceObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.lastUsedDate = ko.observable();
				self.previouslyUsed = ko.observable();

			}
		});
	})();


	becu_org.domain.model.RemoteService = (function () {
		return new JS.Class('becu_org.domain.model.RemoteService', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.lastUsedDate;
				self.previouslyUsed;

			}
		});
	})();
