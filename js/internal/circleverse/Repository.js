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
    "_id": "59bba400daaf41756bddd7bc",
    "firstName": "Ingleburt",
    "lastName": "Humperdink",
    "taxId": 769752828,
    "dateOfBirth": "Fri Oct 27 2006 16:13:35 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "ingleburt.humperdink@brown.co.uk",
    "homePhone": "(846) 523-2066",
    "mobilePhone": "(853) 476-2697",
    "officePhone": "(986) 510-3179",
    "address": "605 Bartlett Place, Reno, South Dakota, 6550"
  },
  {
    "_id": "59bba400a66b71f073d77cca",
    "firstName": "Wink",
    "lastName": "Martindale",
    "taxId": 943169181,
    "dateOfBirth": "Wed Jul 22 1987 13:35:06 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "wink.martindale@brown.me",
    "homePhone": "(804) 527-2933",
    "mobilePhone": "(918) 461-2688",
    "officePhone": "(935) 484-3472",
    "address": "146 Bancroft Place, Coldiron, Northern Mariana Islands, 8327"
  },
  {
    "_id": "59bba40069d3b1fb13c016f5",
    "firstName": "Chuck",
    "lastName": "Woolery",
    "taxId": 992136988,
    "dateOfBirth": "Tue Oct 05 1982 12:01:07 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "chuck.woolery@brown.net",
    "homePhone": "(919) 548-2155",
    "mobilePhone": "(864) 587-3968",
    "officePhone": "(876) 490-3726",
    "address": "133 Dumont Avenue, Golconda, Arizona, 9361"
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
    "firstName": "Wink",
    "lastName": "Martindale",
    "taxId": 943169181,
    "dateOfBirth": "Sun Aug 31 1980 15:31:50 GMT+0000 (UTC)",
    "mothersMaidenName": "blue",
    "emailAddress": "wink.martindale@blue.me",
    "homePhone": "(871) 486-2767",
    "mobilePhone": "(894) 441-2571",
    "officePhone": "(872) 594-3108",
    "addresses": [
      {
        "line1": "219 Decatur Street",
        "city": "Hailesboro",
        "state": "Northern Mariana Islands",
        "postalCode": 79900
      },
      {
        "line1": "792 Tehama Street",
        "city": "Wright",
        "state": "Washington",
        "postalCode": 19499
      },
      {
        "line1": "768 Devoe Street",
        "city": "Ruffin",
        "state": "Idaho",
        "postalCode": 74237
      }
    ]
  },
  {
    "id": 1,
    "firstName": "Chuck",
    "lastName": "Woolery",
    "taxId": 721761799,
    "dateOfBirth": "Fri Mar 19 1971 23:30:03 GMT+0000 (UTC)",
    "mothersMaidenName": "green",
    "emailAddress": "chuck.woolery@green.us",
    "homePhone": "(811) 431-2979",
    "mobilePhone": "(919) 454-2382",
    "officePhone": "(859) 543-3457",
    "addresses": [
      {
        "line1": "723 Campus Road",
        "city": "Bowie",
        "state": "Guam",
        "postalCode": 29868
      },
      {
        "line1": "397 Downing Street",
        "city": "Savannah",
        "state": "Mississippi",
        "postalCode": 30782
      },
      {
        "line1": "810 Montague Terrace",
        "city": "Dana",
        "state": "Louisiana",
        "postalCode": 38119
      }
    ]
  },
  {
    "id": 2,
    "firstName": "Ingleburt",
    "lastName": "Humperdink",
    "taxId": 769752828,
    "dateOfBirth": "Wed Sep 24 2003 01:42:04 GMT+0000 (UTC)",
    "mothersMaidenName": "blue",
    "emailAddress": "ingleburt.humperdink@blue.name",
    "homePhone": "(872) 453-2268",
    "mobilePhone": "(856) 471-3462",
    "officePhone": "(873) 483-2834",
    "addresses": [
      {
        "line1": "347 Brigham Street",
        "city": "Kula",
        "state": "Marshall Islands",
        "postalCode": 10174
      },
      {
        "line1": "702 Lincoln Road",
        "city": "Welch",
        "state": "Wisconsin",
        "postalCode": 30195
      },
      {
        "line1": "792 McDonald Avenue",
        "city": "Nanafalia",
        "state": "Minnesota",
        "postalCode": 59476
      }
    ]
  },
  {
    "id": 3,
    "firstName": "Ingleburt",
    "lastName": "Humperdink",
    "taxId": 736522138,
    "dateOfBirth": "Tue Aug 21 2012 02:26:05 GMT+0000 (UTC)",
    "mothersMaidenName": "green",
    "emailAddress": "ingleburt.humperdink@green.net",
    "homePhone": "(902) 543-2395",
    "mobilePhone": "(868) 567-2833",
    "officePhone": "(838) 479-2892",
    "addresses": [
      {
        "line1": "278 Otsego Street",
        "city": "Wakulla",
        "state": "North Carolina",
        "postalCode": 24430
      },
      {
        "line1": "128 Williams Court",
        "city": "Coventry",
        "state": "South Dakota",
        "postalCode": 87961
      },
      {
        "line1": "184 Lombardy Street",
        "city": "Genoa",
        "state": "California",
        "postalCode": 19944
      }
    ]
  },
  {
    "id": 4,
    "firstName": "Wink",
    "lastName": "Martindale",
    "taxId": 992136988,
    "dateOfBirth": "Sun Jun 12 2016 23:05:40 GMT+0000 (UTC)",
    "mothersMaidenName": "brown",
    "emailAddress": "wink.martindale@brown.com",
    "homePhone": "(900) 472-3924",
    "mobilePhone": "(827) 463-2800",
    "officePhone": "(960) 517-3722",
    "addresses": [
      {
        "line1": "698 Mill Avenue",
        "city": "Tryon",
        "state": "Indiana",
        "postalCode": 33805
      },
      {
        "line1": "576 Brighton Court",
        "city": "Mappsville",
        "state": "Arizona",
        "postalCode": 74759
      },
      {
        "line1": "526 Evergreen Avenue",
        "city": "Blanford",
        "state": "Federated States Of Micronesia",
        "postalCode": 54930
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
