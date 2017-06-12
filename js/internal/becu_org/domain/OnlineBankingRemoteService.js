	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.OnlineBankingRemoteServiceObservable = (function () {
		return new JS.Class('becu_org.domain.model.OnlineBankingRemoteServiceObservable', becu_org.domain.model.RemoteService, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.userName = ko.observable();

			}
		});
	})();


	becu_org.domain.model.OnlineBankingRemoteService = (function () {
		return new JS.Class('becu_org.domain.model.OnlineBankingRemoteService', becu_org.domain.model.RemoteService, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.userName;

			}
		});
	})();
