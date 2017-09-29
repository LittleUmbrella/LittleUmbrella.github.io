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
                    
                    ko.mapping.fromJS(options.data, options, address);                        
                    
                    return address;//new myChildModel(options.data);
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
                    '221 B Baker St, London, England', //holmes
                    '221 B Baker St, London, England', 
                    '221 B Baker St, London, England', 
                    '221B Baker St, Marylebone, London NW1 6XE, UK', 
                    '221B Baker St, Marylebone, London NW1 6XE, UK', 
                    '221B Baker St, Marylebone, London NW1 6XE, UK', 
                    '4059 Mt Lee Dr. Hollywood, CA 90068', //holleywood State Building
                    '4059 Mt Lee Dr. Hollywood, CA 90068'
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
                var arr = [
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
    "dateOfBirth": "Fri Apr 29 1983 00:16:59 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "green",
    "emailAddress": "wink.martindale@green.com",
    "homePhone": "(833) 401-2244",
    "mobilePhone": "(929) 536-3079",
    "officePhone": "(929) 414-3609",
    "accounts": [
      {
        "accountNumber": 8192231637,
        "balance": 36225,
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar ",
              "taxId": 362639413,
              "dateOfBirth": "Wed Jun 06 1984 15:59:06 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(861) 439-3351",
              "mobilePhone": "(827) 429-2651",
              "officePhone": "(938) 438-3808",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 8793751391,
        "balance": 7751,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 868762848,
              "dateOfBirth": "Fri Jan 18 1974 10:11:17 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "nicolas.cage@brown.com",
              "homePhone": "(841) 416-2045",
              "mobilePhone": "(992) 466-3908",
              "officePhone": "(871) 495-3585",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Oscar ",
              "taxId": 227656354,
              "dateOfBirth": "Tue Jun 21 2016 09:43:33 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "oscar .undefined@brown.com",
              "homePhone": "(872) 429-3167",
              "mobilePhone": "(811) 593-2069",
              "officePhone": "(805) 565-3152",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 8492588174,
        "balance": 74929,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "792 Tehama Street",
            "city": "Wright",
            "state": "WA",
            "postalCode": "19499"
          }
        ],
        "relationships": []
      },
      {
        "accountNumber": 3256259855,
        "balance": 41419,
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": []
      }
    ],
    "addresses": [
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": "10118"
      },
      {
        "line1": "792 Tehama Street",
        "city": "Wright",
        "state": "WA",
        "postalCode": "19499"
      },
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": "20500"
      }
    ]
  },
  {
    "id": 1,
    "lastName": "Woolery",
    "firstName": "Chuck",
    "taxId": 318553887,
    "dateOfBirth": "Sat Nov 02 1985 16:28:08 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "green",
    "emailAddress": "chuck.woolery@green.com",
    "homePhone": "(993) 561-2502",
    "mobilePhone": "(950) 459-3321",
    "officePhone": "(805) 482-3243",
    "accounts": [
      {
        "accountNumber": 8652537614,
        "balance": 39221,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "70 Bowman St. South",
            "city": "Windsor",
            "state": "CT",
            "postalCode": "06074"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 0,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 446699571,
              "dateOfBirth": "Sat Jan 23 2010 17:41:09 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(992) 438-2538",
              "mobilePhone": "(804) 527-3800",
              "officePhone": "(979) 467-3119",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 611899776,
              "dateOfBirth": "Mon Aug 23 1999 19:49:33 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(921) 553-2972",
              "mobilePhone": "(819) 505-3067",
              "officePhone": "(842) 412-3250",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 2,
              "firstName": "Oscar ",
              "taxId": 996337552,
              "dateOfBirth": "Sat May 04 2002 05:52:21 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oscar .undefined@green.com",
              "homePhone": "(849) 489-3449",
              "mobilePhone": "(849) 477-3436",
              "officePhone": "(924) 476-2460",
              "addresses": [
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 3,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 722996714,
              "dateOfBirth": "Thu Aug 14 1997 01:26:34 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "nicolas.cage@blue.com",
              "homePhone": "(872) 514-2933",
              "mobilePhone": "(805) 448-2224",
              "officePhone": "(875) 433-2690",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 6846658292,
        "balance": 32644,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 0,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 445574179,
              "dateOfBirth": "Mon Jun 22 1992 20:10:44 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "arnold.schwarzenegger@brown.com",
              "homePhone": "(867) 501-2237",
              "mobilePhone": "(829) 548-2254",
              "officePhone": "(991) 420-2899",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 995412276,
              "dateOfBirth": "Tue Jun 05 2001 01:55:47 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "nicolas.cage@green.com",
              "homePhone": "(917) 519-2906",
              "mobilePhone": "(822) 406-2267",
              "officePhone": "(997) 438-3111",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 1411563895,
        "balance": 27562,
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar ",
              "taxId": 636193245,
              "dateOfBirth": "Wed Jan 10 1973 23:42:36 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(999) 463-3546",
              "mobilePhone": "(935) 563-2811",
              "officePhone": "(927) 496-2445",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 821352333,
              "dateOfBirth": "Sat Nov 01 1975 20:57:17 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "oprah.winfrey@brown.com",
              "homePhone": "(963) 556-2378",
              "mobilePhone": "(865) 413-3009",
              "officePhone": "(906) 565-2388",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 2,
              "firstName": "Oscar ",
              "taxId": 625132554,
              "dateOfBirth": "Thu Jun 17 2004 22:08:45 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oscar .undefined@green.com",
              "homePhone": "(903) 460-2011",
              "mobilePhone": "(865) 558-3770",
              "officePhone": "(820) 564-3388",
              "addresses": [
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 3,
              "firstName": "Oscar ",
              "taxId": 696915788,
              "dateOfBirth": "Wed May 03 1972 02:16:11 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oscar .undefined@green.com",
              "homePhone": "(856) 514-2530",
              "mobilePhone": "(987) 451-3063",
              "officePhone": "(829) 445-3829",
              "addresses": [
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 4726888637,
        "balance": 4805,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Checking"
        },
        "addresses": [
          {
            "line1": "11 Wall Street",
            "city": "New York",
            "state": "NY",
            "postalCode": "10005"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 647632661,
              "dateOfBirth": "Tue May 10 1994 22:04:09 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "nicolas.cage@brown.com",
              "homePhone": "(924) 573-2399",
              "mobilePhone": "(842) 543-2767",
              "officePhone": "(884) 474-3349",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
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
        "postalCode": "90068"
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": "10118"
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": "10118"
      },
      {
        "line1": "4059 Mt Lee Dr.",
        "city": "Hollywood",
        "state": "CA",
        "postalCode": "90068"
      },
      {
        "line1": "792 Tehama Street",
        "city": "Wright",
        "state": "WA",
        "postalCode": "19499"
      }
    ]
  },
  {
    "id": 2,
    "lastName": "Humperdink",
    "firstName": "Ingleburt",
    "taxId": 637791872,
    "dateOfBirth": "Mon Sep 17 2012 05:07:50 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "brown",
    "emailAddress": "ingleburt.humperdink@brown.com",
    "homePhone": "(880) 423-2064",
    "mobilePhone": "(916) 474-2972",
    "officePhone": "(805) 406-3267",
    "accounts": [
      {
        "accountNumber": 6581874157,
        "balance": 32347,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Checking"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 782451315,
              "dateOfBirth": "Tue Dec 05 1989 00:00:02 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "nicolas.cage@blue.com",
              "homePhone": "(976) 532-2166",
              "mobilePhone": "(878) 570-3495",
              "officePhone": "(982) 423-3535",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 289771235,
              "dateOfBirth": "Fri Feb 10 2006 07:53:04 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oprah.winfrey@green.com",
              "homePhone": "(826) 518-2532",
              "mobilePhone": "(879) 457-2846",
              "officePhone": "(932) 572-3475",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 2,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 458247443,
              "dateOfBirth": "Sat Oct 20 2012 13:34:02 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "harry.houdini@brown.com",
              "homePhone": "(852) 507-3318",
              "mobilePhone": "(986) 404-3850",
              "officePhone": "(885) 581-2851",
              "addresses": [
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 3,
              "firstName": "Oscar ",
              "taxId": 133154276,
              "dateOfBirth": "Tue Apr 21 1981 10:37:13 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(875) 434-2849",
              "mobilePhone": "(921) 440-2037",
              "officePhone": "(975) 477-3321",
              "addresses": [
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 8421199927,
        "balance": 17054,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 0,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 868247693,
              "dateOfBirth": "Wed Dec 14 1983 17:18:07 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "arnold.schwarzenegger@green.com",
              "homePhone": "(828) 494-2359",
              "mobilePhone": "(985) 401-2702",
              "officePhone": "(916) 537-2348",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 1,
              "firstName": "Oscar ",
              "taxId": 688392687,
              "dateOfBirth": "Thu Oct 31 1996 21:28:55 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(826) 595-3716",
              "mobilePhone": "(974) 590-3376",
              "officePhone": "(871) 410-3968",
              "addresses": [
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 2,
              "firstName": "Oscar ",
              "taxId": 653936476,
              "dateOfBirth": "Fri Mar 18 1994 09:35:28 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(948) 553-2563",
              "mobilePhone": "(996) 527-2674",
              "officePhone": "(974) 471-3299",
              "addresses": [
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 8434716255,
        "balance": 52453,
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "71 Pilgrim Avenue",
            "city": "Chevy Chase",
            "state": "MD",
            "postalCode": "20815"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar ",
              "taxId": 767311479,
              "dateOfBirth": "Wed Dec 12 1973 13:21:29 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oscar .undefined@green.com",
              "homePhone": "(822) 507-3994",
              "mobilePhone": "(967) 585-3086",
              "officePhone": "(968) 471-2787",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 851368987,
              "dateOfBirth": "Thu Nov 26 2015 13:39:46 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "arnold.schwarzenegger@green.com",
              "homePhone": "(991) 520-2893",
              "mobilePhone": "(868) 575-2631",
              "officePhone": "(851) 566-3756",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 2,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 799388316,
              "dateOfBirth": "Thu Nov 06 1986 17:39:02 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "arnold.schwarzenegger@green.com",
              "homePhone": "(930) 520-3778",
              "mobilePhone": "(856) 460-3940",
              "officePhone": "(964) 548-2232",
              "addresses": [
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 3,
              "firstName": "Oscar ",
              "taxId": 487571484,
              "dateOfBirth": "Tue May 03 1988 20:20:31 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oscar .undefined@green.com",
              "homePhone": "(853) 551-3828",
              "mobilePhone": "(919) 519-2559",
              "officePhone": "(955) 432-3095",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "792 Tehama Street",
        "city": "Wright",
        "state": "WA",
        "postalCode": "19499"
      }
    ]
  },
  {
    "id": 3,
    "lastName": "Rumpelstiltskin",
    "firstName": "Frank",
    "taxId": 281123753,
    "dateOfBirth": "Fri Nov 23 1984 00:57:06 GMT-0800 (Pacific Standard Time)",
    "mothersMaidenName": "brown",
    "emailAddress": "frank.rumpelstiltskin@brown.com",
    "homePhone": "(905) 484-3326",
    "mobilePhone": "(997) 461-3547",
    "officePhone": "(932) 549-3068",
    "accounts": [
      {
        "accountNumber": 3962111645,
        "balance": 59009,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 211485797,
              "dateOfBirth": "Mon Nov 24 1975 20:15:03 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oprah.winfrey@blue.com",
              "homePhone": "(831) 475-2080",
              "mobilePhone": "(851) 469-2795",
              "officePhone": "(912) 559-3556",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 1,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 558896677,
              "dateOfBirth": "Fri Nov 09 1973 00:42:36 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "arnold.schwarzenegger@green.com",
              "homePhone": "(870) 592-3402",
              "mobilePhone": "(925) 525-3873",
              "officePhone": "(947) 495-3854",
              "addresses": [
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 2,
              "firstName": "Oscar ",
              "taxId": 966732133,
              "dateOfBirth": "Tue Mar 03 2015 06:26:20 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "oscar .undefined@brown.com",
              "homePhone": "(970) 494-2369",
              "mobilePhone": "(972) 538-2678",
              "officePhone": "(847) 403-2627",
              "addresses": [
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 3,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 334349829,
              "dateOfBirth": "Wed Jun 23 1982 23:45:16 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "nicolas.cage@green.com",
              "homePhone": "(982) 400-3294",
              "mobilePhone": "(941) 522-3804",
              "officePhone": "(838) 479-3357",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 4831531251,
        "balance": 54140,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "792 Tehama Street",
            "city": "Wright",
            "state": "WA",
            "postalCode": "19499"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 757725846,
              "dateOfBirth": "Wed Jun 14 2017 05:37:44 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "arnold.schwarzenegger@blue.com",
              "homePhone": "(961) 459-2065",
              "mobilePhone": "(822) 600-2316",
              "officePhone": "(876) 578-2907",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
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
        "postalCode": "10005"
      },
      {
        "line1": "4059 Mt Lee Dr.",
        "city": "Hollywood",
        "state": "CA",
        "postalCode": "90068"
      },
      {
        "line1": "11 Wall Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10005"
      }
    ]
  },
  {
    "id": 4,
    "lastName": "Noris",
    "firstName": "Chuck",
    "taxId": 164141344,
    "dateOfBirth": "Thu Jul 03 2003 03:57:06 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "brown",
    "emailAddress": "chuck.noris@brown.com",
    "homePhone": "(892) 503-2920",
    "mobilePhone": "(984) 423-3474",
    "officePhone": "(941) 524-3950",
    "accounts": [
      {
        "accountNumber": 7877414849,
        "balance": 76357,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [
          {
            "line1": "1600 Pennsylvania Avenue",
            "city": "Washington",
            "state": "DC",
            "postalCode": "20500"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar ",
              "taxId": 657536828,
              "dateOfBirth": "Wed Dec 06 1972 00:46:43 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(847) 562-2876",
              "mobilePhone": "(989) 510-3941",
              "officePhone": "(937) 515-2558",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Oscar ",
              "taxId": 672652699,
              "dateOfBirth": "Wed Nov 07 1979 20:03:29 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(911) 582-3921",
              "mobilePhone": "(894) 561-3620",
              "officePhone": "(886) 469-2058",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 4613418963,
        "balance": 17732,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Checking"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 192796638,
              "dateOfBirth": "Tue Dec 09 2014 14:18:54 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "harry.houdini@green.com",
              "homePhone": "(879) 553-3594",
              "mobilePhone": "(826) 527-3888",
              "officePhone": "(899) 598-3660",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Oscar ",
              "taxId": 411679174,
              "dateOfBirth": "Wed Jun 12 1991 21:53:49 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "oscar .undefined@brown.com",
              "homePhone": "(879) 477-3889",
              "mobilePhone": "(878) 587-2157",
              "officePhone": "(884) 486-3705",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 2,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 851914883,
              "dateOfBirth": "Mon Jul 16 2001 11:53:22 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "harry.houdini@brown.com",
              "homePhone": "(855) 445-2807",
              "mobilePhone": "(800) 429-2770",
              "officePhone": "(844) 492-3914",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 3,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 847846292,
              "dateOfBirth": "Mon Aug 04 2014 18:27:24 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oprah.winfrey@blue.com",
              "homePhone": "(997) 527-3507",
              "mobilePhone": "(954) 417-2484",
              "officePhone": "(966) 562-3161",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 3898256439,
        "balance": 12308,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Checking"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar ",
              "taxId": 315237526,
              "dateOfBirth": "Thu Mar 16 2006 18:09:43 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(816) 490-2925",
              "mobilePhone": "(834) 517-2660",
              "officePhone": "(972) 590-3004",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 1,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 417857587,
              "dateOfBirth": "Thu Jan 21 1988 18:18:11 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "nicolas.cage@brown.com",
              "homePhone": "(944) 482-2545",
              "mobilePhone": "(923) 435-3365",
              "officePhone": "(982) 494-3606",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 2,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 448549747,
              "dateOfBirth": "Tue Jan 27 1970 15:36:40 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "oprah.winfrey@green.com",
              "homePhone": "(939) 410-2961",
              "mobilePhone": "(820) 425-2882",
              "officePhone": "(966) 440-2372",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 6287648613,
        "balance": 27469,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 0,
              "firstName": "Arnold",
              "lastName": "schwarzenegger",
              "taxId": 636443488,
              "dateOfBirth": "Thu Jul 10 1986 10:29:59 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "arnold.schwarzenegger@blue.com",
              "homePhone": "(813) 548-3591",
              "mobilePhone": "(910) 559-2935",
              "officePhone": "(872) 465-3003",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 8494937346,
        "balance": 8981,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "4 Goldfield Rd.",
            "city": "Honolulu",
            "state": "HI",
            "postalCode": "96815"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Joint"
            },
            "customer": {
              "id": 0,
              "firstName": "Oscar ",
              "taxId": 124463672,
              "dateOfBirth": "Tue Oct 01 1974 02:28:57 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(801) 521-3492",
              "mobilePhone": "(842) 552-3123",
              "officePhone": "(867) 521-2752",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Oscar ",
              "taxId": 972334897,
              "dateOfBirth": "Fri Feb 10 1989 23:12:31 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oscar .undefined@blue.com",
              "homePhone": "(860) 511-3288",
              "mobilePhone": "(957) 444-3927",
              "officePhone": "(876) 474-2287",
              "addresses": [
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 2,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 581866833,
              "dateOfBirth": "Mon Nov 10 1997 00:17:02 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "nicolas.cage@blue.com",
              "homePhone": "(881) 578-3655",
              "mobilePhone": "(885) 417-3986",
              "officePhone": "(833) 403-3272",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          }
        ]
      }
    ],
    "addresses": [
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": "10118"
      }
    ]
  },
  {
    "id": 5,
    "lastName": "Pendleton",
    "firstName": "Frank",
    "taxId": 674586791,
    "dateOfBirth": "Mon Mar 18 2002 09:32:53 GMT-0700 (Pacific Daylight Time)",
    "mothersMaidenName": "brown",
    "emailAddress": "frank.pendleton@brown.com",
    "homePhone": "(830) 514-2148",
    "mobilePhone": "(820) 523-2260",
    "officePhone": "(957) 404-3400",
    "accounts": [
      {
        "accountNumber": 9779485472,
        "balance": 70734,
        "product": {
          "primaryProductCode": "Savings",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [
          {
            "line1": "792 Tehama Street",
            "city": "Wright",
            "state": "WA",
            "postalCode": "19499"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Signer"
            },
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 873765435,
              "dateOfBirth": "Wed Oct 26 1983 13:44:06 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "green",
              "emailAddress": "nicolas.cage@green.com",
              "homePhone": "(884) 590-2710",
              "mobilePhone": "(915) 563-2475",
              "officePhone": "(972) 496-3881",
              "addresses": [
                {
                  "line1": "350 Fifth Avenue",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10118"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Harry",
              "lastName": "Houdini",
              "taxId": 753762925,
              "dateOfBirth": "Sun Dec 04 1983 18:04:42 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "brown",
              "emailAddress": "harry.houdini@brown.com",
              "homePhone": "(945) 461-3783",
              "mobilePhone": "(925) 401-3542",
              "officePhone": "(837) 570-3873",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 1345525919,
        "balance": 49995,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Checking"
        },
        "addresses": [],
        "relationships": []
      },
      {
        "accountNumber": 2499773644,
        "balance": 53042,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Mortgage"
        },
        "addresses": [
          {
            "line1": "4 Goldfield Rd.",
            "city": "Honolulu",
            "state": "HI",
            "postalCode": "96815"
          }
        ],
        "relationships": []
      }
    ],
    "addresses": [
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": "20500"
      },
      {
        "line1": "1600 Pennsylvania Avenue",
        "city": "Washington",
        "state": "DC",
        "postalCode": "20500"
      }
    ]
  },
  {
    "id": 6,
    "lastName": "Northup",
    "firstName": "Frank",
    "taxId": 444583887,
    "dateOfBirth": "Thu Nov 28 1985 14:54:26 GMT-0800 (Pacific Standard Time)",
    "mothersMaidenName": "blue",
    "emailAddress": "frank.northup@blue.com",
    "homePhone": "(945) 451-2767",
    "mobilePhone": "(851) 557-3758",
    "officePhone": "(875) 426-3240",
    "accounts": [
      {
        "accountNumber": 9981796281,
        "balance": 23820,
        "product": {
          "primaryProductCode": "Mortgage",
          "secondaryProductCode": "Checking"
        },
        "addresses": [
          {
            "line1": "70 Bowman St. South",
            "city": "Windsor",
            "state": "CT",
            "postalCode": "06074"
          }
        ],
        "relationships": []
      },
      {
        "accountNumber": 8777729638,
        "balance": 14729,
        "product": {
          "primaryProductCode": "Checking",
          "secondaryProductCode": "Advantage"
        },
        "addresses": [
          {
            "line1": "350 Fifth Avenue",
            "city": "New York",
            "state": "NY",
            "postalCode": "10118"
          }
        ],
        "relationships": [
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 623378596,
              "dateOfBirth": "Sat Jan 22 1977 19:26:08 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "green",
              "emailAddress": "nicolas.cage@green.com",
              "homePhone": "(925) 428-2523",
              "mobilePhone": "(883) 504-2537",
              "officePhone": "(870) 549-3932",
              "addresses": [
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          }
        ]
      },
      {
        "accountNumber": 7633859618,
        "balance": 87920,
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
            "customer": {
              "id": 0,
              "firstName": "Nicolas",
              "lastName": "Cage",
              "taxId": 269746231,
              "dateOfBirth": "Thu Jun 07 2001 05:24:27 GMT-0700 (Pacific Daylight Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "nicolas.cage@blue.com",
              "homePhone": "(881) 459-3655",
              "mobilePhone": "(965) 442-3733",
              "officePhone": "(824) 594-3571",
              "addresses": [
                {
                  "line1": "4059 Mt Lee Dr.",
                  "city": "Hollywood",
                  "state": "CA",
                  "postalCode": "90068"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
                }
              ]
            }
          },
          {
            "accountRole": {
              "accountRoleDescription": "Viewer"
            },
            "customer": {
              "id": 1,
              "firstName": "Oprah",
              "lastName": "Winfrey",
              "taxId": 843913257,
              "dateOfBirth": "Tue Nov 04 1975 00:58:23 GMT-0800 (Pacific Standard Time)",
              "mothersMaidenName": "blue",
              "emailAddress": "oprah.winfrey@blue.com",
              "homePhone": "(897) 551-2280",
              "mobilePhone": "(810) 575-2310",
              "officePhone": "(971) 503-2222",
              "addresses": [
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "1600 Pennsylvania Avenue",
                  "city": "Washington",
                  "state": "DC",
                  "postalCode": "20500"
                },
                {
                  "line1": "11 Wall Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10005"
                },
                {
                  "line1": "792 Tehama Street",
                  "city": "Wright",
                  "state": "WA",
                  "postalCode": "19499"
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
        "postalCode": "20500"
      },
      {
        "line1": "792 Tehama Street",
        "city": "Wright",
        "state": "WA",
        "postalCode": "19499"
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": "10118"
      },
      {
        "line1": "350 Fifth Avenue",
        "city": "New York",
        "state": "NY",
        "postalCode": "10118"
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
