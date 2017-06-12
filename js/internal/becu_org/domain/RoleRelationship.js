	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.RoleRelationshipObservable = (function () {
		return new JS.Class('becu_org.domain.model.RoleRelationshipObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.accountRole = ko.observable();
				self.entityId = ko.observable();
				self.entityType = ko.observable();

			}
		});
	})();


	becu_org.domain.model.RoleRelationship = (function () {
		return new JS.Class('becu_org.domain.model.RoleRelationship', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.accountRole;
				self.entityId;
				self.entityType;

			}
		});
	})();
