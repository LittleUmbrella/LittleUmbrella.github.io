	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.GeneralBankingChannelObservable = (function () {
		return new JS.Class('becu_org.domain.model.GeneralBankingChannelObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.GeneralBankingChannel = (function () {
		return new JS.Class('becu_org.domain.model.GeneralBankingChannel', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.id;

			}
		});
	})();
