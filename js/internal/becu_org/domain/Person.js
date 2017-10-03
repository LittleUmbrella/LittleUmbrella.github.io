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

	            self.fullName = ko.pureComputed(function () {
	                return self.firstName() + ' ' + self.lastName();
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
    'repeat(7)': {
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
			__key__: function (tags) {
        // Email tag is deprecated, because now you can produce an email as simple as this:
        return {fn: this.firstName, ln: this.lastName};
      },
      homePhone: '{{phone()}}',
      mobilePhone: '{{phone()}}',
      officePhone: '{{phone()}}',
			accounts: [
        {
          'repeat(2, 4)': {
						accountNumber: '{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}{{integer(1, 9)}}',
						balance: '{{integer(100, 90000)}}',
						__key__: function (tags, parent) {
							// Email tag is deprecated, because now you can produce an email as simple as this:
							return {fn: parent.__key__.fn, ln: parent.__key__.ln};
						},
						product: {
							primaryProductCode: '{{random("Checking", "Savings", "Mortgage")}}',
							secondaryProductCode: '{{random("Advantage", "Checking", "Mortgage")}}'
						},
						addresses: function(tags, parent){
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
									if (parent.__key__.ln == "Rumpelstiltskin" && tags.index() == 0){
										return [a[2]];
									}
									else if (parent.__key__.ln == "Martindale")
									{ 
										return null;
									}
									else if (parent.__key__.ln == "Woolery")
									{ 
										return null;
									}

									return a.slice(3, tags.integer(1, 4));
								}
						,
						relationships: [
							{
								'repeat(0, 4)':{
									accountRole: {
										accountRoleDescription: '{{random("Signer", "Joint", "Viewer")}}'
									},
								__key__: function (tags, parent) {
									// Email tag is deprecated, because now you can produce an email as simple as this:
									return {fn: parent.__key__.fn, ln: parent.__key__.ln};
								},
									customer:  {
												id: '{{index()}}',
												firstName: function(tags, parent){
													var a = ["Arnold", "Harry", "Oscar", "Nicolas", "Oprah"];

													if (parent.__key__.ln == "Woolery"){
																return [a[4]];
															}
													
													
													return a[tags.integer(0, 4)];
												},
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
												addresses: function(tags, parent){
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

															
															if (parent.__key__.ln == "Woolery" && this.firstName == "Oprah"){
																return [a[2]];
															}
															else if (parent.__key__.ln == "Martindale")
															{ 
																return null;
															}

															return a.slice(0, tags.integer(1, 4));
														}
											}
										
								}
							}
						]
					}
				}
      ],
      addresses: function(tags, parent){
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
						 if (this.lastName == "Martindale")
						 { 
							 return [a[tags.index()]];
						 }
						 else if (this.lastName == "Rumpelstiltskin")
						 { 
							 return [a[1], a[2] ];
						 }
						 else if (this.lastName == "Woolery")
						 { 
							 return [a[tags.index()]];
						 }
						 else {

							return a.slice(0, tags.integer(1, 4));
						 }
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



