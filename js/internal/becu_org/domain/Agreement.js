	becu_org_util_namespace('becu_org.domain.model');
	becu_org.domain.model.AgreementObservable = (function () {
		return new JS.Class('becu_org.domain.model.AgreementObservable', becu_org.domain.model.Object, {
			initialize:  function(){
var self = this;
				//properties
				self.accountNumber = ko.observable();
				self.personNumber = ko.observable();
				self.firstName = ko.observable();
				self.lastName = ko.observable();
				self.agreementNumber = ko.observable();
				self.agreementType = ko.observable();
				self.extendedCardNumber = ko.observable();
				self.currentStatus = ko.observable();
				self.issueDate = ko.observable();
				self.expireDate = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Agreement = (function () {
		return new JS.Class('becu_org.domain.model.Agreement', becu_org.domain.model.Object, {
			initialize:  function(){
var self = this;
				//properties
				self.accountNumber;
				self.personNumber;
				self.firstName;
				self.lastName;
				self.agreementNumber;
				self.agreementType;
				self.extendedCardNumber;
				self.currentStatus;
				self.issueDate;
				self.expireDate;

			}
		});
	})();
