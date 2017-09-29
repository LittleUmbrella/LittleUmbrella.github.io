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
      firstName: '{{random("Wink", "Chuck", "Ingleburt", "Paronskaft")}}',
      lastName: function () {
				var a = {"Wink": "Martindale", "Chuck": "Woolery", "Ingleburt": "Humperdink", "Paronskaft": "Rumpelstiltskin"};
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
			accounts: [
        {
          'repeat(2, 5)': {
						accountNumber: '{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}',
						balance: {{integer(100, 90000)}},
						product: {
							primaryProductCode: '{{random("Checking", "Savings", "Mortgage")}}',
							secondaryProductCode: '{{random("Advantage", "Checking", "Mortgage")}}'
						},
						addresses: [
							{
								'repeat(0, 1)': function(tags){
									var a = [
													'1600 Pennsylvania Avenue, Washington DC 20500', //white house
													'11 Wall Street New York, NY 10005', //stock exchange
													'350 Fifth Avenue New York, NY 10118', //Empire State Building,
													'4059 Mt Lee Dr. Hollywood, CA 90068', //holleywood State Building
													'792 Tehama Street Wright, Washington 19499',
													'123 6th St. Melbourne, FL 32904',
													'4 Goldfield Rd. Honolulu, HI 96815',
													'71 Pilgrim Avenue Chevy Chase, MD 20815',
													'44 Shirley Ave. West Chicago, IL 60185',
													'70 Bowman St. South Windsor, CT 06074'
											];
									return a[tags.integer(0, a.length - 1)];
								}
							}
						],
						relationships: [
							{
								'repeat(0, 4)': {
									accountRole: {
										accountRoleDescription: '{{random("Signer", "Joint", "Viewer")}}'
									},
									customer: [
										{
											'repeat(5, 10)': {
												id: '{{index()}}',
												firstName: '{{random("Wink", "Chuck", "Ingleburt", "Paronskaft")}}',
												lastName: function () {
													var a = {"Wink": "Martindale", "Chuck": "Woolery", "Ingleburt": "Humperdink", "Paronskaft": "Rumpelstiltskin"};
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
														'repeat(1, 5)': function(tags){
															var a = [
																			'1600 Pennsylvania Avenue, Washington DC 20500', //white house
																			'11 Wall Street New York, NY 10005', //stock exchange
																			'350 Fifth Avenue New York, NY 10118', //Empire State Building,
																			'4059 Mt Lee Dr. Hollywood, CA 90068', //holleywood State Building
																			'792 Tehama Street Wright, Washington 19499'
																	];
															return a[tags.integer(0, a.length - 1)];
														}
													}
												]
											}
										}
									]
								}
							}
						]
					}
        }
      ],
      addresses: [
        {
          'repeat(1, 5)': function(tags){
						var a = [
                    '1600 Pennsylvania Avenue, Washington DC 20500', //white house
                    '11 Wall Street New York, NY 10005', //stock exchange
                    '350 Fifth Avenue New York, NY 10118', //Empire State Building,
                    '4059 Mt Lee Dr. Hollywood, CA 90068', //holleywood State Building
										'792 Tehama Street Wright, Washington 19499'
                ];
						return a[tags.integer(0, a.length - 1)];
					}
        }
      ]
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
			accounts: [
        
          '{{repeat(2, 5)}}', {
						accountNumber: '{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}',
						balance: '{{integer(100, 90000)}}',
						product: {
							primaryProductCode: '{{random("Checking", "Savings", "Mortgage")}}',
							secondaryProductCode: '{{random("Advantage", "Checking", "Mortgage")}}'
						},
						addresses: [
							
								'{{repeat(0, 1)}}', function(tags){
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
														},
														{
															line1: '123 6th St.',
															city: 'Melbourne',
															state: 'FL',
															postalCode: '32904'
														},
														{
															line1: '4 Goldfield Rd.',
															city: 'Honolulu',
															state: 'HI',
															postalCode: '96815'
														},
														{
															line1: '71 Pilgrim Avenue',
															city: 'Chevy Chase',
															state: 'MD',
															postalCode: '20815'
														},
														{
															line1: '44 Shirley Ave. West',
															city: 'Chicago',
															state: 'IL',
															postalCode: '60185'
														},
														{
															line1: '70 Bowman St. South',
															city: 'Windsor',
															state: 'CT',
															postalCode: '06074'
														}
											];
									return a[tags.integer(0, a.length - 1)];
								}
							
						],
						relationships: [
							
								'{{repeat(0, 4)}}', {
									accountRole: {
										accountRoleDescription: '{{random("Signer", "Joint", "Viewer")}}'
									},
									customer:  {
												id: '{{index()}}',
												firstName: '{{random("Arnold", "Harry", "Oscar ", "Nicolas", "Oprah")}}',
												lastName: function () {
													var a = {"Arnold": "schwarzenegger", "Harry": "Houdini", "Oscar": "Wilde", "Nicolas": "Cage", "Oprah": "Winfrey"};
													return a[this.firstName];
												},
												taxId: '{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}',
												dateOfBirth: '{{date()}}',
												mothersMaidenName: '{{random("blue", "brown", "green")}}',
												emailAddress: function (tags) {
													// Email tag is deprecated, because now you can produce an email as simple as this:
													return (this.firstName + '.' + this.lastName + '@' + this.mothersMaidenName + '.com').toLowerCase();
												},
												homePhone: '{{phone()}}',
												mobilePhone: '{{phone()}}',
												officePhone: '{{phone()}}',
												addresses: [
													
														'{{repeat(1, 5)}}', function(tags){
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
													
												]
											}
										
								}
							
						]
					}
        
      ],
      addresses: [
        
          '{{repeat(1, 5)}}', function(tags){
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
        
      ]
    }
  
]


*/

// {
//             line1: '{{integer(100, 999)}} {{street()}}',
// 			city: '{{city()}}',
// 			state: '{{state()}}',
// 			postalCode: '{{integer(10000, 90000)}}'
//           }




