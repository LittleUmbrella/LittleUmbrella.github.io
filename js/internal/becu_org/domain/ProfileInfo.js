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

/*
[
  {
    'repeat(5, 10)': {
      id: '{{index()}}',
      firstName: '{{random("Wink", "Chuck", "Ingleburt", "Paronskaft", "Charles")}}',
      lastName: function () {
				var a = {"Wink": "Martindale", "Chuck": "Woolery", "Ingleburt": "Humperdink", "Paronskaft": "Rumpelstiltskin", "Charles": "Noris"};
        return a[this.firstName];
      },
      taxId: '{{random(462241293, 318553887, 637791872, 281123753, 164141344, 674586791)}}',
      dateOfBirth: '{{date()}}',
      mothersMaidenName: '{{random("blue", "brown", "green")}}',
			emailAddress: function (tags) {
        // Email tag is deprecated, because now you can produce an email as simple as this:
        return (this.firstName + '.' + this.lastName + '@' + this.mothersMaidenName + '.com').toLowerCase();
      },
      homePhone: '{{phone()}}',
      mobilePhone: '{{phone()}}',
      officePhone: '{{phone()}}',
      address: function(tags){
						var a = [
                    {
											line1: '1600 Pennsylvania Avenue',
											city: 'Washington',
											state: 'DC',
											postalCode: '20500'
										},
										{
											line1: '11 Wall Street',
											city: 'New York',
											state: 'NY',
											postalCode: '10005'
										},
										{
											line1: '350 Fifth Avenue',
											city: 'New York',
											state: 'NY',
											postalCode: '10118'
										},
										{
											line1: '4059 Mt Lee Dr.',
											city: 'Hollywood',
											state: 'CA',
											postalCode: '90068'
										},
										{
											line1: '792 Tehama Street',
											city: 'Wright',
											state: 'WA',
											postalCode: '19499'
										}
                ];
						return a[tags.integer(0, a.length - 1)];
					}
      
      
    }
  }
]

[
  '{{repeat(7)}}', {
      id: '{{index()}}',
      lastName: function (tags) {
				var a = ["Martindale", "Woolery", "Humperdink", "Rumpelstiltskin", "Noris", "Pendleton", "Northup"];
        return a[tags.index()];
      } ,
      firstName: function () {
				var a = {"Martindale": "Wink", "Woolery": "Chuck", "Humperdink": "Ingleburt", "Rumpelstiltskin": "Frank", "Noris": "Chuck", "Pendleton": "Frank", "Northup": "Frank"};
        return a[this.lastName];
      },
      taxId: function(tags){
		  var a = [462241293, 318553887, 637791872, 281123753, 164141344, 674586791, 444583887];
		  return a[tags.index()];
	  },
      dateOfBirth: '{{date()}}',
      mothersMaidenName: '{{random("blue", "brown", "green")}}',
			emailAddress: function (tags) {
        // Email tag is deprecated, because now you can produce an email as simple as this:
        return (this.firstName + '.' + this.lastName + '@' + this.mothersMaidenName + '.com').toLowerCase();
      },
      homePhone: '{{phone()}}',
      mobilePhone: '{{phone()}}',
      officePhone: '{{phone()}}',
      address: function(tags){
						var a = [
                    {
											line1: '1600 Pennsylvania Avenue',
											city: 'Washington',
											state: 'DC',
											postalCode: '20500'
										},
										{
											line1: '11 Wall Street',
											city: 'New York',
											state: 'NY',
											postalCode: '10005'
										},
										{
											line1: '350 Fifth Avenue',
											city: 'New York',
											state: 'NY',
											postalCode: '10118'
										},
										{
											line1: '4059 Mt Lee Dr.',
											city: 'Hollywood',
											state: 'CA',
											postalCode: '90068'
										},
										{
											line1: '792 Tehama Street',
											city: 'Wright',
											state: 'WA',
											postalCode: '19499'
										}
                ];
						return a[tags.integer(0, a.length - 1)];
					}
      
      
    }
  
]


*/



