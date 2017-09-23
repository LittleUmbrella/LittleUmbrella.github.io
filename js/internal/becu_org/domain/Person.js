	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.PersonObservable = (function () {
	    return new JS.Class('becu_org.domain.model.PersonObservable', becu_org.domain.model.Base, {
	        initialize: function () {
	            var self = this; self.callSuper();
	            //properties
	            self.firstName = ko.observable();
	            self.middleName = ko.observable();
	            self.lastName = ko.observable();
	            self.taxId = ko.observable();
	            self.dateOfBirth = ko.observable();
	            self.mothersMaidenName = ko.observable();
	            self.homePhone = ko.observable();
	            self.mobilePhone = ko.observable();
	            self.officePhone = ko.observable();
	            self.faxNumber = ko.observable();
	            self.emailAddress = ko.observable();
				self.addresses = ko.observableArray();

	            self.icon = ko.observable();

	            self.fullName = ko.computed(function () {
	                self.firstName() + ' ' + self.lastName();
	            });
	        }
	    });
	})();


	becu_org.domain.model.Person = (function () {
		return new JS.Class('becu_org.domain.model.Person', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.firstName;
				self.middleName;
				self.lastName;
				self.taxId;
				self.dateOfBirth;
				self.mothersMaidenName;
				self.homePhone;
				self.mobilePhone;
				self.officePhone;
				self.faxNumber;
				self.emailAddress;
				self.addresses;
				self.icon;

			}
		});
	})();

/*
[
  {
    'repeat(5, 10)': {
      id: '{{index()}}',
      firstName: '{{random("Wink", "Chuck", "Ingleburt")}}',
      lastName: function () {
				var a = {"Wink": "Martindale", "Chuck": "Woolery", "Ingleburt": "Humperdink"};
        return a[this.firstName];
      },
      taxId: '{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}',
      dateOfBirth: '{{date()}}',
      mothersMaidenName: '{{random("blue", "brown", "green")}}',
	  	emailAddress: function (tags) {
        // Email tag is deprecated, because now you can produce an email as simple as this:
        return (this.firstName + '.' + this.lastName + '@' + this.mothersMaidenName + tags.domainZone()).toLowerCase();
      },
      homePhone: '{{phone()}}',
      mobilePhone: '{{phone()}}',
      officePhone: '{{phone()}}',
      addresses: [
        {
          'repeat(3)': {
            line1: '{{integer(100, 999)}} {{street()}}',
			city: '{{city()}}',
			state: '{{state()}}',
			postalCode: '{{integer(10000, 90000)}}'
          }
        }
      ]
    }
  }
]
*/