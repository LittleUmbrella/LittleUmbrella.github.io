	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.ProfileInfoObservable = (function () {
		return new JS.Class('becu_org.domain.model.ProfileInfoObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.firstName = ko.observable();
				self.fullName = ko.observable();
				self.lastName = ko.observable();
				self.taxId = ko.observable();
				self.contactInfo = ko.observable();
				self.address = ko.observable();

			}
		});
	})();


	becu_org.domain.model.ProfileInfo = (function () {
		return new JS.Class('becu_org.domain.model.ProfileInfo', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.firstName;
				self.fullName;
				self.lastName;
				self.taxId;
				self.contactInfo;
				self.address;
			}
		});
	})();


[
  {
    'repeat(5, 10)': {
      _id: '{{objectId()}}',
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
      address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
      
      
    }
  }
]