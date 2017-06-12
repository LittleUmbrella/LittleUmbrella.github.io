	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.OrganizationObservable = (function () {
	    return new JS.Class('becu_org.domain.model.OrganizationObservable', becu_org.domain.model.Base, {
	        initialize: function () {
	            var self = this; self.callSuper();
	            //properties
	            self.firstName = ko.observable();
	            self.middleName = ko.observable();
	            self.lastName = ko.observable();
	            self.taxId = ko.observable();
	            self.dateOfBirth = ko.observable();
	            self.mothersMaidenName = ko.observable();
	            self.addressLine1 = ko.observable();
	            self.addressLine2 = ko.observable();
	            self.city = ko.observable();
	            self.state = ko.observable();
	            self.zip = ko.observable();
	            self.country = ko.observable();
	            self.homePhone = ko.observable();
	            self.mobilePhone = ko.observable();
	            self.officePhone = ko.observable();
	            self.faxNumber = ko.observable();
	            self.emailAddress = ko.observable();

	            self.icon = ko.observable();

	            self.fullName = ko.computed(function () {
	                self.firstName() + ' ' + self.lastName();
	            });
	        }
	    });
	})();


	becu_org.domain.model.Organization = (function () {
		return new JS.Class('becu_org.domain.model.Organization', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.firstName;
				self.middleName;
				self.lastName;
				self.taxId;
				self.dateOfBirth;
				self.mothersMaidenName;
				self.addressLine1;
				self.addressLine2;
				self.city;
				self.state;
				self.zip;
				self.country;
				self.homePhone;
				self.mobilePhone;
				self.officePhone;
				self.faxNumber;
				self.emailAddress;
				self.icon;

			}
		});
	})();
