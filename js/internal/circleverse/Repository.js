eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//example of fake
//
//var deferred = jQuery.Deferred();

//setTimeout(function () {
//    deferred.resolve(id);
//}, 5000);


//return deferred.promise();

//example of Real
//
//return jQuery.ajax({
//    'type': 'GET',
//    //contentType: 'text/plain;  charset=utf-8',
//    'contentType': 'application/json',
//    'url': self._svcBaseUri + '/location/' + id + '/waittime',
//    //'data': request,
//    'dataType': 'json',
//    'headers': {
//        'RequestVerificationToken': self._af
//    }
//}).promise();

littleUmbrella.circleverse.Repository = (function () {
    var standardWaitTime = 1000, longWaitTime = 3000, shortWaitTime = 300;

    var mapping = {};

    mapping.customer = {
        //'eStatementState': {
        //    create: function (options) {

        //        var state = ko.mapping.fromJS(options.data);
        //        return state;//new myChildModel(options.data);
        //    }
        //},
        'addresses': {
            create: function (options) {
                if (options.data != null){                    
                    var address = new becu_org.domain.model.AddressObservable();
                    
                    ko.mapping.fromJS(options.data, mapping.customer, address);                        
                    
                    return address;//new myChildModel(options.data);
                }
                

            }
            //,

        },
        'accounts': {
            create: function (options) {
                if (options.data != null){                    
                    var acct = new becu_org.domain.model.AccountObservable();
                    
                    ko.mapping.fromJS(options.data, mapping.customer, acct);                        
                    
                    return acct;//new myChildModel(options.data);
                }
                

            }
            //,

        },
        'product': {
            create: function (options) {
                if (options.data != null){                    
                    var product = new becu_org.domain.model.ProductObservable();
                    
                    ko.mapping.fromJS(options.data, mapping.customer, product);                        
                    
                    return product;//new myChildModel(options.data);
                }
                

            }
            //,

        },
        'relationships': {
            create: function (options) {
                if (options.data != null){                    
                    var rel = new becu_org.domain.model.AccountRelationshipObservable();
                    
                    ko.mapping.fromJS(options.data, mapping.customer, rel);                        
                    
                    return rel;//new myChildModel(options.data);
                }
                

            }
            //,

        },
        'accountRole': {
            create: function (options) {
                if (options.data != null){                    
                    var role = new becu_org.domain.model.AccountRoleObservable();
                    
                    ko.mapping.fromJS(options.data, mapping.customer, role);                        
                    
                    return role;//new myChildModel(options.data);
                }
                

            }
            //,

        },
        'customer': {
            create: function (options) {
                if (options.data != null){                    
                    var cust = new becu_org.domain.model.CustomerObservable();
                    
                    ko.mapping.fromJS(options.data, mapping.customer, cust);                        
                    
                    return cust;//new myChildModel(options.data);
                }
                

            }
            //,

        }
    };
    var updateMapping = {
        'subModels': {
            update: function (options) {


                ko.mapping.fromJS(options.data, options, options.target.subModels);
                return sub;//new myChildModel(options.data);
            }
        }
    }


    return new JS.Class('littleUmbrella.circleverse.Repository', {

        initialize: function (svcBaseUri, globalSettings, af) {
            var self = this;

            if (null == svcBaseUri || svcBaseUri.length == 0)
                throw new Error('svcBaseUri cannot be null or empty');

            self.useCache = true;
            self.__svcBaseUri = svcBaseUri;
            self.__globalSettings = globalSettings;
            self._af = af;
        },


        getTransactions: function (id, continuous) {
            var self = this;

            var deferred = jQuery.Deferred(), transactions = [];

            var tras = ["Check  ", "Check  ", "External Deposit - THE BOEING COMPA  - DIR DEP  ", "Electronic Check - AMERICAN EXPRESS (ARC PMT) Accounts Receivable Entry SERIAL #: 7235  ", "Check  ", "Check  ", "Electronic Check - JPMChase Bank NA (CHECK PYMT) Accounts Receivable Entry SERIAL #: 7237  ", "Electronic Check - City of Bonney L (CHECK PMTS) Accounts Receivable Entry SERIAL #: 7236  ", "POS Withdrawal - CHEVRON 0200325 17008 FOREST CANYON RD SUMNER       WAUS - Card Ending In 9584  ", "POS Withdrawal - FRED MEYER 801 AUBURN WAY N       AUBURN       WAUS - Card Ending In 9584  ", "POS Withdrawal - LOWE'S #1089 1232 A STREET NORTHEASTAUBURN       WAUS - Card Ending In 9584  ", "Dividend/Interest  ", "POS Withdrawal - RED WING SHOE #887 2016 S. 314TH STREET   FEDERAL WAY  WAUS - Card Ending In 9584  ", "Check  ", "Check  ", "External Deposit - THE BOEING COMPA  - DIR DEP  ", "POS Withdrawal - WINCO FOODS 6621 166th Avenue E    Sumner       WAUS - Card Ending In 9584  ", "POS Withdrawal - 2011015 WINCO FOO 6621 166th A Sumner       WAUS - Card Ending In 9584  ", "Check  ", "ATM Withdrawal - BECU 1201 VALLEY AVE E      SUMNER       WAUS - Card Ending In 9584  ", "ATM Deposit - BECU 1201 VALLEY AVE E      SUMNER       WAUS - Card Ending In 9584  ", "Electronic Check - JPMChase Bank NA (CHECK PYMT) Accounts Receivable Entry SERIAL #: 7227  ", "Electronic Check - AMERICAN EXPRESS (ARC PMT) Accounts Receivable Entry SERIAL #: 7228  ", "POS Withdrawal - FRED MEYER 1201 VALLEY AVE.       SUMNER       WAUS - Card Ending In 9584  ", "Electronic Check - Retail Home Equi (CHECK PYMT) Accounts Receivable Entry SERIAL #: 7226  ", "Withdrawal - Online Banking Transfer To Visa XXXXXXXXXXXX8961  ", "ATM Deposit - BECU 700 15TH ST            AUBURN       WAUS - Card Ending In 9584  ", "POS Withdrawal - BUCKYS INC 111 BRIDGE ST S        360-8933808  WAUS - Card Ending In 9584  ", "External Deposit - JESSICA FOX ONLNE TRNSFR88871085 - SENDER  ", "External Deposit - JESSICA FOX ONLNE TRNSFR88871085 - SENDER  ", "POS Withdrawal - PUERTO VALLARTA 1414 LAKE TAPPS PKWY E AUBURN       WAUS - Card Ending In 9584  ", "POS Withdrawal - 2011015 WINCO FOO 6621 166th A Sumner       WAUS - Card Ending In 9584  ", "Check  ", "POS Withdrawal - WINCO FOODS 6621 166th Avenue E    Sumner       WAUS - Card Ending In 9584  ", "POS Withdrawal - AGRISHOP AUBURN 308 WEST MAIN          AUBURN       WAUS - Card Ending In 9584"];


            setTimeout(function () {
                for (var t = 0; t < eaf.util.getRandomInt(10, 30) ; t++) {

                    tran = new becu_org.domain.model.AccountTransaction();
                    //tran.id;
                    tran.amount = Math.random() * 100;
                    tran.transactionDate = new Date(2012, 5, eaf.util.getRandomInt(20, 25));
                    tran.effectiveDate = new Date(2012, 5, eaf.util.getRandomInt(20, 25));
                    tran.principal;
                    tran.createDate;
                    tran.initiator;
                    tran.checkNumber;
                    tran.transactionDescription = tras[t];

                    transactions.push(tran);
                }

                deferred.resolve(transactions);
            }, longWaitTime);

            return deferred.promise();
        }
        ,

        getTopics: function () {
            var self = this;

            var deferred = jQuery.Deferred();

            setTimeout(function () {
                var topics =
                    //new becu_org.ob.AppointmentTopic("Topics",
                    //[new becu_org.ob.AppointmentTopic(0, "Home Loans",
                    //    [new becu_org.ob.AppointmentTopic(1, "Purchase"),
                    //        new becu_org.ob.AppointmentTopic(2, "Refinance"),
                    //        new becu_org.ob.AppointmentTopic(3, "Construction"),
                    //        new becu_org.ob.AppointmentTopic(4, "Home Equity")
                    //    ]),
                    //new becu_org.ob.AppointmentTopic(5, "Business Banking"),
                    //new becu_org.ob.AppointmentTopic(6, "Personal Banking")
                    //];
                    

                deferred.resolve(topics);
            }, 200);

            return deferred.promise();
        },

        


        searchMemberAddress: function(request){
            var self = this;

            var deferred = jQuery.Deferred();

            setTimeout(function () {
                var arr = [
                    '1600 Pennsylvania Avenue, Washington DC 20500', //white house
                    '1600 Pennsylvania Avenue NE, Washington DC 20500',
                    '1600 Pennsylvania Avenue N, Washington DC 20500',
                    '11 Wall Street New York, NY 10004', 
                    '11 Wall Street New York, NY 10005', //stock exchange
                    '11 Wall Street New York, NY 10006',
                    '350 Fifth Avenue New York, NY 10118', //Empire State Building,
                    '350 Fifth A New York, NY 10118', //Empire State Building,
                    '350 Fifth Ave New York, NY 10118', //Empire State Building
                    '4059 Mt Lee Dr. Hollywood, CA 90068', //holleywood State Building
                    '4059 Mt Lee Dr. Hollywood, CA 90068',
                    '951 Silver Spring Ct St Augustine, FL 32092'
                ];

                for(var i = 0; i < arr.length; i++){
                    if (arr[i].indexOf(request) == -1){
                        arr.splice(i, 1);
                        i--;
                    }
                }
                deferred.resolve(arr);
            }, 1000);

            return deferred.promise();

        }
        ,

        saveMemberAddress: function(request){
            var self = this;

            var deferred = jQuery.Deferred();

            setTimeout(function () {

                deferred.resolve();
            }, 1000);

            return deferred.promise();

        }
        ,

        searchLocationsPreloaded: function (searchArgument) {
            var self = this;

            return self.searchLocations(searchArgument);
        },

        getWaitTime: function (id) {
            var self = this;

            var deferred = jQuery.Deferred();

            setTimeout(function () {
                if (id == 'error')
                    deferred.reject();
                else {
                    deferred.resolve(id);
                }
            }, 1000);


            return deferred.promise();


        }
        ,

        searchLocations: function (request) {
            var self = this;

            var deferred = jQuery.Deferred();

            setTimeout(function () {
                var arr = [];
                if (request.search == '00000')
                    deferred.reject({ responseText: "I'm lost, mommy" });
                else {
                    //arr.push({ id: "7", selected: ko.observable(false), location: 'Downtown Seattle', address: '1527 2nd Ave', city: 'Seattle', state: 'WA', postalCode: '98101', distance: '0.52 mi' });
                    //arr.push({ id: "8", selected: ko.observable(false), location: 'Broadway Market', address: '401 Broadway E', city: 'Seattle', state: 'WA', postalCode: '98102', distance: '0.62 mi' });
                    //arr.push({ id: "9", selected: ko.observable(false), location: 'Queen Anne', address: '29 West Mercer St', city: 'Seattle', state: 'WA', postalCode: '98119', distance: '0.72 mi' });
                    //arr.push({ id: "10", selected: ko.observable(false), location: 'North U Village', address: '5105 25th Ave NE', city: 'Seattle', state: 'WA', postalCode: '98105', distance: '1.62 mi' });
                    ////arr.push({ id: "4", selected: ko.observable(false), location: 'Ballard Square', address: '2232 NW Market St', city: 'Seattle', state: 'WA', postalCode: '98107', distance: '5.62 mi' });
                    ////arr.push({ id: "5", selected: ko.observable(false), location: 'Downtown Bellevue', address: '200 Bellevue Way NE', city: 'Seattle', state: 'WA', postalCode: '98004', distance: '10.62 mi' });
                    ////arr.push({ id: "6", selected: ko.observable(false), location: 'Seattle - Roxbury Safeway', address: '9620 28th Ave SW', city: 'Seattle', state: 'WA', postalCode: '98126', distance: '10.62 mi' });
                    ////arr.push({ id: "11", selected: ko.observable(false), location: 'Northgate', address: '551 NE Northgate Way., Suite B', city: 'Seattle', state: 'WA', postalCode: '98125', distance: '15.62 mi' });


                    deferred.resolve(arr);
                }
            }, 200);


            return deferred.promise();


        },

        findIndividuals: function (cmd) {
            var self = this;

            var deferred = $.Deferred();

            setTimeout(function () {
                var arr = 
                [
  {
    "id": 0,
    "lastName": "Martindale",
    "firstName": "Wink",
    "taxId": 462241293,
    "dateOfBirth": "Sun Mar 25 1979 00:05:06 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "green",
    "emailAddress": "wink.martindale@green.com",
    "homePhone": "(899) 424-2179",
    "mobilePhone": "(951) 463-3436",
    "officePhone": "(810) 400-2708",
    "address": {
      "line1": "1600 Pennsylvania Avenue",
      "city": "Washington",
      "state": "DC",
      "postalCode": "20500"
    }
  },
  {
    "id": 1,
    "lastName": "Woolery",
    "firstName": "Chuck",
    "taxId": 318553887,
    "dateOfBirth": "Sat Apr 25 1998 03:22:25 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "brown",
    "emailAddress": "chuck.woolery@brown.com",
    "homePhone": "(910) 589-2022",
    "mobilePhone": "(921) 500-2453",
    "officePhone": "(893) 454-2720",
    "address": {
      "line1": "792 Tehama Street",
      "city": "Wright",
      "state": "WA",
      "postalCode": "19499"
    }
  },
  {
    "id": 2,
    "lastName": "Humperdink",
    "firstName": "Ingleburt",
    "taxId": 637791872,
    "dateOfBirth": "Mon Apr 16 1979 17:43:21 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "brown",
    "emailAddress": "ingleburt.humperdink@brown.com",
    "homePhone": "(907) 484-2971",
    "mobilePhone": "(870) 568-3429",
    "officePhone": "(888) 556-2720",
    "address": {
      "line1": "350 Fifth Avenue",
      "city": "New York",
      "state": "NY",
      "postalCode": "10118"
    }
  },
  {
    "id": 3,
    "lastName": "Rumpelstiltskin",
    "firstName": "Frank",
    "taxId": 281123753,
    "dateOfBirth": "Thu May 14 2015 11:34:53 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "green",
    "emailAddress": "frank.rumpelstiltskin@green.com",
    "homePhone": "(993) 558-2143",
    "mobilePhone": "(856) 492-2824",
    "officePhone": "(822) 546-3981",
    "address": {
      "line1": "1600 Pennsylvania Avenue",
      "city": "Washington",
      "state": "DC",
      "postalCode": "20500"
    }
  },
  {
    "id": 4,
    "lastName": "Noris",
    "firstName": "Chuck",
    "taxId": 164141344,
    "dateOfBirth": "Mon Jun 10 1974 21:33:25 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "green",
    "emailAddress": "chuck.noris@green.com",
    "homePhone": "(924) 563-3550",
    "mobilePhone": "(951) 541-3459",
    "officePhone": "(904) 510-2917",
    "address": {
      "line1": "4059 Mt Lee Dr.",
      "city": "Hollywood",
      "state": "CA",
      "postalCode": "90068"
    }
  },
  {
    "id": 5,
    "lastName": "Pendleton",
    "firstName": "Frank",
    "taxId": 674586791,
    "dateOfBirth": "Mon May 26 1980 12:14:54 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "blue",
    "emailAddress": "frank.pendleton@blue.com",
    "homePhone": "(962) 540-3712",
    "mobilePhone": "(853) 544-2777",
    "officePhone": "(896) 598-3885",
    "address": {
      "line1": "4059 Mt Lee Dr.",
      "city": "Hollywood",
      "state": "CA",
      "postalCode": "90068"
    }
  },
  {
    "id": 6,
    "lastName": "Northup",
    "firstName": "Frank",
    "taxId": 444583887,
    "dateOfBirth": "Sat Feb 25 1984 08:00:05 GMT-0800 (Pacific Standard Time)",
    "mothersMaidenName": "blue",
    "emailAddress": "frank.northup@blue.com",
    "homePhone": "(914) 478-3071",
    "mobilePhone": "(890) 582-2640",
    "officePhone": "(920) 535-3859",
    "address": {
      "line1": "11 Wall Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10005"
    }
  }
];
                
                if (cmd){
                    if (!eaf.util.isNullOrWhitespace(cmd.firstName)){
                        for(var i = 0; i < arr.length; i++){
                            if (eaf.util.isNullOrWhitespace(arr[i].firstName) || arr[i].firstName.toLowerCase().indexOf(cmd.firstName.toLowerCase()) == -1){
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    if (!eaf.util.isNullOrWhitespace(cmd.lastName)){
                        for(var i = 0; i < arr.length; i++){
                            if (eaf.util.isNullOrWhitespace(arr[i].lastName) || arr[i].lastName.toLowerCase().indexOf(cmd.lastName.toLowerCase()) == -1){
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    if (!eaf.util.isNullOrWhitespace(cmd.taxId)){
                        for(var i = 0; i < arr.length; i++){
                            if (eaf.util.isNullOrWhitespace(arr[i].taxId) || arr[i].taxId.toLowerCase().indexOf(cmd.taxId.toLowerCase()) == -1){
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }

                deferred.resolve(arr);
            }, 200);


            return deferred.promise();

        }
        ,

        getIndividual: function (request) {
            var self = this;

            var deferred = jQuery.Deferred();

            setTimeout(function () {
                var arr = [
  {
    "id": 0,
    "lastName": "Martindale",
    "firstName": "Wink",
    "taxId": 462241293,
    "dateOfBirth": "Fri Aug 26 1977 07:41:10 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "wink.martindale@brown.com",
    "__key__": {
      "fn": "Wink",
      "ln": "Martindale"
    },
    "homePhone": "(833) 422-2510",
    "mobilePhone": "(956) 556-2578",
    "officePhone": "(943) 437-3359",
    "accounts": [
      {
        "accountNumber": 3567152215,
        "balance": 42679,
        "__key__": {
          "fn": "Wink",
          "ln": "Martindale"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": null,
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 0,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 861157389,
              "dateOfBirth": "Sat Jun 01 1985 14:47:24 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "harry.houdini@green.com",
              "homePhone": "(993) 450-2004",
              "mobilePhone": "(955) 563-2414",
              "officePhone": "(917) 590-3731",
              "addresses": null
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 657361419,
              "dateOfBirth": "Mon Sep 10 2012 03:18:04 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "arnold.schwarzenegger@green.com",
              "homePhone": "(895) 484-3785",
              "mobilePhone": "(910) 515-2152",
              "officePhone": "(819) 520-2778",
              "addresses": null
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 2,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 962634165,
              "dateOfBirth": "Thu Feb 26 1987 07:43:59 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(907) 556-3637",
              "mobilePhone": "(810) 531-3190",
              "officePhone": "(826) 557-2284",
              "addresses": null
            }
          }
        ]
      },
      {
        "accountNumber": 9356198248,
        "balance": 20303,
        "__key__": {
          "fn": "Wink",
          "ln": "Martindale"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": null,
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar",
              "lastName": "Wilde",
              "taxId": 668728631,
              "dateOfBirth": "Tue May 29 2001 13:40:11 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oscar.wilde@brown.com",
              "homePhone": "(899) 487-2788",
              "mobilePhone": "(805) 522-2330",
              "officePhone": "(841) 499-2791",
              "addresses": null
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 489571347,
              "dateOfBirth": "Mon Mar 23 2009 05:24:07 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(890) 591-2799",
              "mobilePhone": "(965) 585-3509",
              "officePhone": "(973) 491-2427",
              "addresses": null
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 2,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 471149738,
              "dateOfBirth": "Wed Aug 10 2011 18:14:55 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(888) 564-3431",
              "mobilePhone": "(842) 432-3172",
              "officePhone": "(976) 469-2301",
              "addresses": null
            }
          }
        ]
      },
      {
        "accountNumber": 6334216343,
        "balance": 37205,
        "__key__": {
          "fn": "Wink",
          "ln": "Martindale"
        },
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": null,
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar",
              "lastName": "Wilde",
              "taxId": 513353957,
              "dateOfBirth": "Fri Dec 19 2003 14:47:23 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oscar.wilde@brown.com",
              "homePhone": "(896) 595-3088",
              "mobilePhone": "(845) 456-2662",
              "officePhone": "(813) 424-3492",
              "addresses": null
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Wink",
              "ln": "Martindale"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 961478595,
              "dateOfBirth": "Fri Dec 24 2010 12:16:01 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(939) 442-3940",
              "mobilePhone": "(932) 575-3302",
              "officePhone": "(852) 515-2634",
              "addresses": null
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "11 Wall Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10005",
        "latitude": 47.36,
        "longitude": -122.20
      }
    ]
  },
  {
    "id": 1,
    "lastName": "Woolery",
    "firstName": "Chuck",
    "taxId": 318553887,
    "dateOfBirth": "Sun Oct 05 1986 23:38:47 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "chuck.woolery@brown.com",
    "__key__": {
      "fn": "Chuck",
      "ln": "Woolery"
    },
    "homePhone": "(995) 530-2514",
    "mobilePhone": "(807) 583-2291",
    "officePhone": "(827) 531-2869",
    "accounts": [
      {
        "accountNumber": 9463845876,
        "balance": 75416,
        "__key__": {
          "fn": "Chuck",
          "ln": "Woolery"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": null,
        "relationships": []
      },
      {
        "accountNumber": 6766679816,
        "balance": 70705,
        "__key__": {
          "fn": "Chuck",
          "ln": "Woolery"
        },
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Checking"
        },
        "addresses": null,
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Chuck",
              "ln": "Woolery"
            },
            "customer": {
              "id": 0,
              "firstName": [
                "Chuck Jr."
              ],
              "lastName": "Woolery",
              "taxId": 946123186,
              "dateOfBirth": "Fri Aug 26 2011 18:45:57 GMT+0000 (UTC)",
              "mothersMaidenName": "blue",
              "emailAddress": "oprah.winfrey@blue.com",
              "homePhone": "(894) 491-3470",
              "mobilePhone": "(945) 421-2463",
              "officePhone": "(872) 576-3998",
              "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Chuck",
              "ln": "Woolery"
            },
            "customer": {
              "id": 1,
              "firstName": [
                "Oprah"
              ],
              "lastName": "Winfrey",
              "taxId": 593977286,
              "dateOfBirth": "Fri Jul 11 2014 04:53:50 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(933) 435-2630",
              "mobilePhone": "(971) 480-2382",
              "officePhone": "(866) 591-2286",
              "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
    ]
  },
  {
    "id": 2,
    "lastName": "Humperdink",
    "firstName": "Ingleburt",
    "taxId": 637791872,
    "dateOfBirth": "Wed Dec 10 1980 10:58:16 GMT+0000 (UTC)",
    "mothersMaidenName": "green",
    "emailAddress": "ingleburt.humperdink@green.com",
    "__key__": {
      "fn": "Ingleburt",
      "ln": "Humperdink"
    },
    "homePhone": "(987) 560-3557",
    "mobilePhone": "(828) 496-2233",
    "officePhone": "(952) 474-2240",
    "accounts": [
      {
        "accountNumber": 4748526539,
        "balance": 52785,
        "__key__": {
          "fn": "Ingleburt",
          "ln": "Humperdink"
        },
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
        ],
        "relationships": []
      },
      {
        "accountNumber": 1793246645,
        "balance": 62299,
        "__key__": {
          "fn": "Ingleburt",
          "ln": "Humperdink"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "__key__": {
              "fn": "Ingleburt",
              "ln": "Humperdink"
            },
            "customer": {
              "id": 0,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 144449717,
              "dateOfBirth": "Tue Jun 07 2005 04:53:21 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(873) 410-3650",
              "mobilePhone": "(836) 543-2888",
              "officePhone": "(804) 409-3014",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": 90068
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Ingleburt",
              "ln": "Humperdink"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 282492123,
              "dateOfBirth": "Fri Dec 15 1995 09:19:16 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "arnold.schwarzenegger@green.com",
              "homePhone": "(932) 439-3024",
              "mobilePhone": "(840) 454-3030",
              "officePhone": "(806) 507-3245",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": 20500
      }
    ]
  },
  {
    "id": 3,
    "lastName": "Rumpelstiltskin",
    "firstName": "Frank",
    "taxId": 281123753,
    "dateOfBirth": "Wed Oct 31 2001 13:44:59 GMT+0000 (UTC)",
    "mothersMaidenName": "blue",
    "emailAddress": "frank.rumpelstiltskin@blue.com",
    "__key__": {
      "fn": "Frank",
      "ln": "Rumpelstiltskin"
    },
    "homePhone": "(944) 414-2801",
    "mobilePhone": "(927) 484-3223",
    "officePhone": "(983) 416-2811",
    "accounts": [
      {
        "accountNumber": 2713278521,
        "balance": 24067,
        "__key__": {
          "fn": "Frank",
          "ln": "Rumpelstiltskin"
        },
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Checking"
        },
        "addresses": [
          {
            "line1": "350 Fifth Avenue",
            "city": "New York",
            "state": "NY",
            "postalCode": 10118
          }
        ],
        "relationships": []
      },
      {
        "accountNumber": 4735282717,
        "balance": 11564,
        "__key__": {
          "fn": "Frank",
          "ln": "Rumpelstiltskin"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [],
        "relationships": []
      },
      {
        "accountNumber": 2299676439,
        "balance": 41970,
        "__key__": {
          "fn": "Frank",
          "ln": "Rumpelstiltskin"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Rumpelstiltskin"
            },
            "customer": {
              "id": 0,
              "firstName": "Dumple",
              "lastName": "Rumpelstiltskin",
              "taxId": 477779611,
              "dateOfBirth": "Wed Dec 29 2004 08:05:11 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "Dumple.Rumpelstiltskin@green.com",
              "homePhone": "(918) 413-2409",
              "mobilePhone": "(999) 404-2647",
              "officePhone": "(879) 430-2779",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": 90068
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "11 Wall Street",
        "city": "New York",
        "state": "NY",
        "postalCode": 10005
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": 10118
      }
    ]
  },
  {
    "id": 4,
    "lastName": "Noris",
    "firstName": "Chuck",
    "taxId": 164141344,
    "dateOfBirth": "Thu Apr 29 2004 20:32:32 GMT+0000 (UTC)",
    "mothersMaidenName": "blue",
    "emailAddress": "chuck.noris@blue.com",
    "__key__": {
      "fn": "Chuck",
      "ln": "Noris"
    },
    "homePhone": "(888) 588-3811",
    "mobilePhone": "(897) 580-3458",
    "officePhone": "(942) 582-2180",
    "accounts": [
      {
        "accountNumber": 6469167584,
        "balance": 46860,
        "__key__": {
          "fn": "Chuck",
          "ln": "Noris"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
        ],
        "relationships": []
      },
      {
        "accountNumber": 9643379112,
        "balance": 10100,
        "__key__": {
          "fn": "Chuck",
          "ln": "Noris"
        },
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Chuck",
              "ln": "Noris"
            },
            "customer": {
              "id": 0,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 198256356,
              "dateOfBirth": "Wed Jul 30 1975 21:17:27 GMT+0000 (UTC)",
              "mothersMaidenName": "blue",
              "emailAddress": "oprah.winfrey@blue.com",
              "homePhone": "(982) 415-2193",
              "mobilePhone": "(939) 428-3087",
              "officePhone": "(945) 549-3656",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": 20500
      },
      {
        "line1": "11 Wall Street",
        "city": "New York",
        "state": "NY",
        "postalCode": 10005
      }
    ]
  },
  {
    "id": 5,
    "lastName": "Pendleton",
    "firstName": "Frank",
    "taxId": 674586791,
    "dateOfBirth": "Wed Jul 23 1980 16:54:30 GMT+0000 (UTC)",
    "mothersMaidenName": "blue",
    "emailAddress": "frank.pendleton@blue.com",
    "__key__": {
      "fn": "Frank",
      "ln": "Pendleton"
    },
    "homePhone": "(921) 481-2099",
    "mobilePhone": "(946) 525-2656",
    "officePhone": "(888) 575-3617",
    "accounts": [
      {
        "accountNumber": 8518775298,
        "balance": 12860,
        "__key__": {
          "fn": "Frank",
          "ln": "Pendleton"
        },
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Checking"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 0,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 638155915,
              "dateOfBirth": "Sun Dec 19 2010 19:31:27 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(966) 407-2043",
              "mobilePhone": "(834) 439-3902",
              "officePhone": "(969) 472-3646",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 1623932743,
        "balance": 39868,
        "__key__": {
          "fn": "Frank",
          "ln": "Pendleton"
        },
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 0,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 662375513,
              "dateOfBirth": "Sun Aug 15 1976 06:35:26 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(963) 432-2214",
              "mobilePhone": "(910) 599-2561",
              "officePhone": "(950) 521-3725",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 1,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 831699967,
              "dateOfBirth": "Sat Jun 12 1982 09:27:14 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "harry.houdini@green.com",
              "homePhone": "(971) 430-3766",
              "mobilePhone": "(836) 491-3228",
              "officePhone": "(878) 562-3532",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 5859369393,
        "balance": 53806,
        "__key__": {
          "fn": "Frank",
          "ln": "Pendleton"
        },
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Checking"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 0,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 424819294,
              "dateOfBirth": "Tue Jul 02 1974 19:09:49 GMT+0000 (UTC)",
              "mothersMaidenName": "blue",
              "emailAddress": "oprah.winfrey@blue.com",
              "homePhone": "(977) 526-3227",
              "mobilePhone": "(890) 515-2488",
              "officePhone": "(858) 404-2925",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": 90068
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 894897638,
              "dateOfBirth": "Thu Jul 15 2010 05:18:06 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(817) 563-3492",
              "mobilePhone": "(883) 468-2891",
              "officePhone": "(950) 594-2415",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 7638555856,
        "balance": 88419,
        "__key__": {
          "fn": "Frank",
          "ln": "Pendleton"
        },
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar",
              "lastName": "Wilde",
              "taxId": 436851885,
              "dateOfBirth": "Sat Apr 01 1989 00:52:02 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "oscar.wilde@green.com",
              "homePhone": "(965) 548-2324",
              "mobilePhone": "(932) 446-3918",
              "officePhone": "(867) 464-3649",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Pendleton"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 699147364,
              "dateOfBirth": "Wed Jun 04 1975 06:43:55 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(800) 534-2991",
              "mobilePhone": "(928) 414-2037",
              "officePhone": "(863) 485-2285",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": 20500
      },
      {
        "line1": "11 Wall Street",
        "city": "New York",
        "state": "NY",
        "postalCode": 10005
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": 10118
      }
    ]
  },
  {
    "id": 6,
    "lastName": "Northup",
    "firstName": "Frank",
    "taxId": 444583887,
    "dateOfBirth": "Sat Oct 07 1972 06:47:42 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "frank.northup@brown.com",
    "__key__": {
      "fn": "Frank",
      "ln": "Northup"
    },
    "homePhone": "(862) 551-3091",
    "mobilePhone": "(865) 589-3401",
    "officePhone": "(976) 473-3812",
    "accounts": [
      {
        "accountNumber": 3249483929,
        "balance": 67901,
        "__key__": {
          "fn": "Frank",
          "ln": "Northup"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Northup"
            },
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 346152415,
              "dateOfBirth": "Wed Jul 21 1993 14:25:26 GMT+0000 (UTC)",
              "mothersMaidenName": "blue",
              "emailAddress": "nicolas.cage@blue.com",
              "homePhone": "(935) 519-3614",
              "mobilePhone": "(831) 549-3403",
              "officePhone": "(947) 508-2550",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": 90068
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Northup"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 941186875,
              "dateOfBirth": "Sun Oct 19 1997 04:57:38 GMT+0000 (UTC)",
              "mothersMaidenName": "green",
              "emailAddress": "oprah.winfrey@green.com",
              "homePhone": "(888) 425-3092",
              "mobilePhone": "(906) 451-3090",
              "officePhone": "(899) 549-2734",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": 90068
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 7222469999,
        "balance": 66806,
        "__key__": {
          "fn": "Frank",
          "ln": "Northup"
        },
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Northup"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar",
              "lastName": "Wilde",
              "taxId": 632675395,
              "dateOfBirth": "Mon Nov 06 2006 13:44:30 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "oscar.wilde@brown.com",
              "homePhone": "(800) 563-2003",
              "mobilePhone": "(844) 451-2409",
              "officePhone": "(987) 449-3514",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 4864172877,
        "balance": 71407,
        "__key__": {
          "fn": "Frank",
          "ln": "Northup"
        },
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "4059 Mt Lee Dr.",
            "city": "Hollywood",
            "state": "CA",
            "postalCode": 90068
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Northup"
            },
            "customer": {
              "id": 0,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 254672459,
              "dateOfBirth": "Mon Dec 23 1985 23:01:15 GMT+0000 (UTC)",
              "mothersMaidenName": "blue",
              "emailAddress": "harry.houdini@blue.com",
              "homePhone": "(901) 593-3002",
              "mobilePhone": "(903) 542-3288",
              "officePhone": "(880) 459-3130",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "__key__": {
              "fn": "Frank",
              "ln": "Northup"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 814525928,
              "dateOfBirth": "Fri Feb 18 1994 18:20:14 GMT+0000 (UTC)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(918) 402-3450",
              "mobilePhone": "(863) 530-3643",
              "officePhone": "(909) 549-3165",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": 20500
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10005
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": 10118
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": 90068
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": 20500
      },
      {
        "line1": "11 Wall Street",
        "city": "New York",
        "state": "NY",
        "postalCode": 10005
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": 10118
      }
    ]
  }
];
                //arr.push({ id: "5", selected: ko.observable(false), location: 'Downtown Bellevue', address: '200 Bellevue Way NE', city: 'Seattle', state: 'WA', postalCode: '98004', distance: '10.62 mi' });
                //arr.push({ id: "6", selected: ko.observable(false), location: 'Seattle - Roxbury Safeway', address: '9620 28th Ave SW', city: 'Seattle', state: 'WA', postalCode: '98126', distance: '10.62 mi' });
                //arr.push({ id: "11", selected: ko.observable(false), location: 'Northgate', address: '551 NE Northgate Way., Suite B', city: 'Seattle', state: 'WA', postalCode: '98125', distance: '15.62 mi' });

                if (request.confirmationCode && request.confirmationCode == '000000000') {
                    deferred.reject({ responseText: 'mommy!' });
                }

                else if (request.individualId && parseInt(request.individualId.replace("error", "")) == request.individualId.replace("error", "")) {
                    deferred.reject({ responseText: request.individualId.replace("error", ""), getResponseHeader: function () { return "login"; } });
                }
                else {
                    
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i];
                        if (element.taxId == request.taxId){
                            
                            var individual = new becu_org.domain.model.CustomerObservable();
                            ko.mapping.fromJS(element, mapping.customer, individual);

                            
                            

                            deferred.resolve(individual);

                            //self.eventAggregator.publish('becu_org.ob.services.getAppointments.complete', { request: request, result: element });


                        }
                    }
                    
                    deferred.fail();
                }
            }, 200);


            return deferred.promise();


        },

        getProfileInfo: function (loginRequest) {
            var self = this;

            var deferred = jQuery.Deferred();


            setTimeout(function () {
                var profileResult = { "firstName": "Wink", "lastName": "Martindale", "email": "Wink.Martindale@yahoo.com", "homePhone": "5555555555", "cellPhone": null, "individualId": "me1046883" };


                if (loginRequest.userName && parseInt(loginRequest.userName.replace("error", "")) == loginRequest.userName.replace("error", "")) {
                    deferred.reject({ responseText: loginRequest.userName.replace("error", ""), getResponseHeader: function () { return "login"; } });
                }
                else
                    deferred.resolve(profileResult);
                self.eventAggregator.publish('becu_org.ob.services.getProfileInfo.complete', profileResult);
            }, 200);


            return deferred.promise();


        },

        getCustomer: function (getArgs) {
            var self = this;

            var deferred = jQuery.Deferred();


            setTimeout(function () {
                if (!getArgs) throw new Error('getArgs cannot be null');
                if (!getArgs.userName) throw new Error('getArgs.userName cannot be null');
                if (!getArgs.password) throw new Error('getArgs.password cannot be null');

                var self = this;
                var cust = new becu_org.domain.model.Customer(), a, c, info, tran, r, role, aalert, s, t, prod, limit = 8;
                // c = cust;




                cust.firstName = "Wink";
                cust.lastName = "Martindale";
                cust.addressLine1 = '1600 Pennsylvania Ave NW';
                cust.city = 'Washington';
                cust.state = 'DC';
                cust.zip ='20006';
                cust.country = 'USA';
                cust.homePhone = "5555555555";
                cust.mobilePhone = "5555555555";
                cust.officePhone = "5555555555";
                cust.emailAddress = "winkmartindale@tictac.dough"
                cust.icon = "/media/img/member4.png";

                for (var i = 0, pIdx = 0; i < limit; i++, pIdx++) {
                    a = new becu_org.domain.model.Account();

                    a.accountNumber = '012345678' + i;

                    a.balance = 4000 * (i + 1);

                    prod = new becu_org.domain.model.Product();

                    prod.id = new becu_org.domain.model.ProductId();
                    prod.id.primaryProductCode = 'Checking';
                    prod.id.secondaryProductCode = 'Advantage';

                    a.product = prod;

                    for (var j = 0; j < 2; j++, pIdx++) {
                        p = new becu_org.domain.model.Customer();



                        p.firstName = "Ms. Member";
                        p.lastName = "#" + i + j;
                        p.addressLine1 = '1600';
                        p.city = 'Washington';
                        p.state = 'DC';
                        p.zip ='20006';
                        p.country = 'USA';
                        p.icon = "/media/imgseq/" + (pIdx + 1) + ".jpg";

                        cust.contacts.push(p);

                        if (i < 2) {
                            role = new becu_org.domain.model.AccountRole();
                            role.accountRoleDescription = 'signer';
                            r = new becu_org.domain.model.AccountRelationship(role, cust);
                            a.relationships.push(r);
                        }
                        //else{
                        if (j > 0) {
                            //                                    role = new becu_org.domain.model.AccountRole = 'signer';
                            //                                    r = new becu_org.domain.model.AccountRelationship(role, cust);
                            //                                    a.relationships.push(r);
                            role = new becu_org.domain.model.AccountRole();
                            role.accountRoleDescription = 'signer';
                        }
                        else {
                            role = new becu_org.domain.model.AccountRole();
                            role.accountRoleDescription = 'joint';
                        }
                        r = new becu_org.domain.model.AccountRelationship(role, c);
                        //}
                        a.relationships.push(r);

                        aalert = new becu_org.domain.model.AlertScheduleBalance();
                        a.alerts.push(aalert);

                        s = new becu_org.domain.model.PaymentSchedule();
                        a.paymentSchedules.push(s);


                    }

                    cust.accounts.push(a);

                }


                deferred.resolve(cust);
            }, 200);


            return deferred.promise();


        },

        getLocation: function (id) {
            var self = this;

            var deferred = jQuery.Deferred();


            setTimeout(function () {
                self.searchLocations().done(function (locations) {
                    var length = locations.length, location;
                    for (var i = 0; i < length; i++) {
                        var tmp = locations[i];
                        if (tmp.id == id) {
                            location = tmp;
                            break;
                        }
                    }
                    deferred.resolve(location);
                }).fail(function (e) {
                    deferred.reject(e);
                });
            }, 200);


            return deferred.promise();
        },

        saveAppointment: function (cmd) {
            var self = this;

            var deferred = $.Deferred();

            setTimeout(function () {

                deferred.resolve("123456789");
            }, 200);


            return deferred.promise();

        },

        getTopicLocationRelationships: (function () {

            var buildRelationships = function (relationships, topic) {
                if (topic.locations) {
                    var length = topic.locations.length, locations = [];

                    for (var i = 0; i < length; i++) {
                        var location = topic.locations[i];

                        locations.push(location.id);
                    }

                    relationships.push({ id: topic.id, locations: locations });
                }

                if (topic.children) {
                    var topicLength = topic.children.length;
                    for (var v = 0; v < topicLength; v++) {
                        var topicChild = topic.children[v];

                        buildRelationships(relationships, topicChild);
                    }
                }
            }

            return function () {
                var self = this;

                var deferred = jQuery.Deferred();

                //setTimeout(function () {
                //    var relationships = [];
                //    relationships.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                //    relationships.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                //    relationships.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                //    relationships.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                //    relationships.push([3, 4, 5, 6, 7, 8, 9]);
                //    relationships.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                //    relationships.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);



                //    deferred.resolve(relationships);
                //}, 200);



                //return deferred.promise();

                var topicPpromise = self.getTopics().done(function (topics) {
                    if (topics) {
                        var length = topics.length, relationships = [];
                        for (var i = 0; i < length; i++) {
                            var topic = topics[i];

                            buildRelationships(relationships, topic);
                        }
                    }

                    deferred.resolve(relationships);
                }).fail(function (e) {

                    deferred.reject(e);
                });

                return deferred.promise();
            }
        })(),

        getAvailableTimes: function (request) {

            var self = this;


            var deferred = jQuery.Deferred();


            setTimeout(function () {

                deferred.resolve();
            }, 200);


            return deferred.promise();

            
        }





    });


})();
