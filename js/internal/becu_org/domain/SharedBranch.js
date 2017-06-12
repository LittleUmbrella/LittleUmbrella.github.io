	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.SharedBranchObservable = (function () {
		return new JS.Class('becu_org.domain.model.SharedBranchObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name = ko.observable();
				self.location = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.SharedBranch = (function () {
		return new JS.Class('becu_org.domain.model.SharedBranch', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.name;
				self.location;
				self.id;

			}
		});
	})();
