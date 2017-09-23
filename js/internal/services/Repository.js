
eaf.util.namespace('becu_org.ob.services');
becu_org.ob.services.Repository = (function () {

    var mapping = {
        //'eStatementState': {
        //    create: function (options) {

        //        var state = ko.mapping.fromJS(options.data);
        //        return state;//new myChildModel(options.data);
        //    }
        //},
        'subModels': {
            create: function (options) {
                var sub = new becu_org.ob.visa.VisaAccountViewModel(options.parent._visaService);

                ko.mapping.fromJS(options.data, options, sub);
                return sub;//new myChildModel(options.data);
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

    //var _cache = null;
    //var _topicDeferred = null;
    //var _locationDeferred = null;
    //var _dateGraphDeferred = null;
    //var _relationshipDeferred = null;
    //var _availableTimesDeferred = null;
    //var _cacheFilled = false;

    return new JS.Class('becu_org.ob.services.Repository', {

        initialize: function (svcBaseUri, eventAggregator, af) {
            var self = this;

            if (null == svcBaseUri || svcBaseUri.length == 0)
                throw new Error('svcBaseUri cannot be null or empty');

            self.useCache = true;
            self._svcBaseUri = svcBaseUri;
            self.eventAggregator = eventAggregator;
            self._af = af;
        },

        getTopics: function () {
            var self = this;

            //var deferred = jQuery.Deferred();

            //setTimeout(function () {
            //    var topics =
            //        //new becu_org.ob.AppointmentTopic("Topics",
            //        [new becu_org.ob.AppointmentTopic(0, "Home Loans",
            //            [new becu_org.ob.AppointmentTopic(1, "Purchase"),
            //                new becu_org.ob.AppointmentTopic(2, "Refinance"),
            //                new becu_org.ob.AppointmentTopic(3, "Construction"),
            //                new becu_org.ob.AppointmentTopic(4, "Home Equity")
            //            ]),
            //        new becu_org.ob.AppointmentTopic(5, "Business Banking"),
            //        new becu_org.ob.AppointmentTopic(6, "Personal Banking")
            //        ];


            //    deferred.resolve(topics);
            //}, 1000);
            return jQuery.ajax({
                'type': 'GET',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/topic',
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            }).promise();
        },

        searchLocationsPreloaded: function (searchArgument) {
            var self = this;

            return self.searchLocations(searchArgument);
        },

        getWaitTime: function (id) {
            var self = this;

            //var deferred = jQuery.Deferred();

            //setTimeout(function () {
            //    deferred.resolve(id);
            //}, 5000);


            //return deferred.promise();


            return jQuery.ajax({
                'type': 'GET',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/location/' + id + '/waittime',
                //'data': request,
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            }).promise();
        }
        ,

        searchLocations: function (request) {
            var self = this;

            //var deferred = jQuery.Deferred();

            //setTimeout(function () {
            //    var arr = [];

            //    arr.push({ id: "7", selected: ko.observable(false), location: 'Downtown Seattle', address: '1527 2nd Ave', city: 'Seattle', state: 'WA', postalCode: '98101', distance: '0.52 mi' });
            //    arr.push({ id: "8", selected: ko.observable(false), location: 'Broadway Market', address: '401 Broadway E', city: 'Seattle', state: 'WA', postalCode: '98102', distance: '0.62 mi' });
            //    arr.push({ id: "9", selected: ko.observable(false), location: 'Queen Anne', address: '29 West Mercer St', city: 'Seattle', state: 'WA', postalCode: '98119', distance: '0.72 mi' });
            //    arr.push({ id: "10", selected: ko.observable(false), location: 'North U Village', address: '5105 25th Ave NE', city: 'Seattle', state: 'WA', postalCode: '98105', distance: '1.62 mi' });
            //    //arr.push({ id: "4", selected: ko.observable(false), location: 'Ballard Square', address: '2232 NW Market St', city: 'Seattle', state: 'WA', postalCode: '98107', distance: '5.62 mi' });
            //    //arr.push({ id: "5", selected: ko.observable(false), location: 'Downtown Bellevue', address: '200 Bellevue Way NE', city: 'Seattle', state: 'WA', postalCode: '98004', distance: '10.62 mi' });
            //    //arr.push({ id: "6", selected: ko.observable(false), location: 'Seattle - Roxbury Safeway', address: '9620 28th Ave SW', city: 'Seattle', state: 'WA', postalCode: '98126', distance: '10.62 mi' });
            //    //arr.push({ id: "11", selected: ko.observable(false), location: 'Northgate', address: '551 NE Northgate Way., Suite B', city: 'Seattle', state: 'WA', postalCode: '98125', distance: '15.62 mi' });
            


            //    deferred.resolve(arr);
            //}, 1000);


            //return deferred.promise();


            return jQuery.ajax({
                'type': 'GET',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/location',
                'data': request,
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            }).promise();
        },

        cancelAppointment: function (cmd) {
            var self = this;

            //var deferred = $.Deferred();

            //setTimeout(function () {

            //    deferred.resolve();
            //}, 1000);


            //return deferred.promise();


            return jQuery.ajax({
                'type': 'DELETE',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/appointment',
                'data': jQuery.stringify(cmd),
                //'data': cmd,
                'headers': {
                    'RequestVerificationToken': self._af
                }
            }).promise();
        }
        ,

        getAppointments: function (request) {
            var self = this;

            //var deferred = jQuery.Deferred();

            //setTimeout(function () {
            //    var arr = [];

            //    arr.push({ id: "7", selected: ko.observable(false), location: 'Downtown Seattle', address: '1527 2nd Ave', city: 'Seattle', state: 'WA', postalCode: '98101', distance: '0.52 mi' });
            //    arr.push({ id: "8", selected: ko.observable(false), location: 'Broadway Market', address: '401 Broadway E', city: 'Seattle', state: 'WA', postalCode: '98102', distance: '0.62 mi' });
            //    arr.push({ id: "9", selected: ko.observable(false), location: 'Queen Anne', address: '29 West Mercer St', city: 'Seattle', state: 'WA', postalCode: '98119', distance: '0.72 mi' });
            //    arr.push({ id: "10", selected: ko.observable(false), location: 'North U Village', address: '5105 25th Ave NE', city: 'Seattle', state: 'WA', postalCode: '98105', distance: '1.62 mi' });
            //    arr.push({ id: "4", selected: ko.observable(false), location: 'Ballard Square', address: '2232 NW Market St', city: 'Seattle', state: 'WA', postalCode: '98107', distance: '5.62 mi' });
            //    //arr.push({ id: "5", selected: ko.observable(false), location: 'Downtown Bellevue', address: '200 Bellevue Way NE', city: 'Seattle', state: 'WA', postalCode: '98004', distance: '10.62 mi' });
            //    //arr.push({ id: "6", selected: ko.observable(false), location: 'Seattle - Roxbury Safeway', address: '9620 28th Ave SW', city: 'Seattle', state: 'WA', postalCode: '98126', distance: '10.62 mi' });
            //    //arr.push({ id: "11", selected: ko.observable(false), location: 'Northgate', address: '551 NE Northgate Way., Suite B', city: 'Seattle', state: 'WA', postalCode: '98125', distance: '15.62 mi' });



            //    deferred.resolve(arr);
            //}, 1000);


            //return deferred.promise();


            return jQuery.ajax({
                'type': 'GET',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/appointment',
                'data': request,
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            })
            .done(function (result) {
                self.eventAggregator.publish('becu_org.ob.services.getAppointments.complete', {request: request, result: result});
            }).promise();
        },

        getProfileInfo: function (loginRequest) {
            var self = this;

            //var deferred = jQuery.Deferred();


            //setTimeout(function () {
            //    var profileResult = { success: true, errorMsg: null, profile: { firstName: 'Wink', lastName: 'Martindale', email: 'wink.martindale@tictacdough.com', homePhone: '5555551111' } };


            //    deferred.resolve(profileResult);
            //    self.eventAggregator.publish('becu_org.ob.services.getProfileInfo.complete', profileResult);
            //}, 1000);


            //return deferred.promise();


            return jQuery.ajax({
                'type': 'POST',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/individual',//saveappointment
                'data': jQuery.stringify(loginRequest),
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            })
            .done(function (result) {
                self.eventAggregator.publish('becu_org.ob.services.getProfileInfo.complete', result);
            }).promise();
        },

        getCarriers: function () {
            var self = this;

            //var deferred = jQuery.Deferred();


            //setTimeout(function () {
            //    var profileResult = { success: true, errorMsg: null, profile: { firstName: 'Wink', lastName: 'Martindale', email: 'wink.martindale@tictacdough.com', homePhone: '5555551111' } };


            //    deferred.resolve(profileResult);
            //    self.eventAggregator.publish('becu_org.ob.services.getProfileInfo.complete', profileResult);
            //}, 1000);


            //return deferred.promise();


            return jQuery.ajax({
                'type': 'GET',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/carrier',//saveappointment
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            })
            .done(function (result) {
                self.eventAggregator.publish('becu_org.ob.services.getCarriers.complete', result);
            }).promise();
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
            }, 1000);


            return deferred.promise();
        },

        saveAppointment: function (cmd) {
            var self = this;

            return jQuery.ajax({
                'type': 'POST',
                //contentType: 'text/plain;  charset=utf-8',
                'contentType': 'application/json',
                'url': self._svcBaseUri + '/appointment',//saveappointment
                'data': jQuery.stringify(cmd),
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            }).promise();
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
                //}, 1000);



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

            var ajax = jQuery.ajax({
                'type': 'GET',
                'contentType': 'application/json',
                'url': '/api/calendar',
                'data': request,
                'dataType': 'json',
                'headers': {
                    'RequestVerificationToken': self._af
                }
            })
            .done(function (result) {
                deferred.resolve(result);
            })
            .fail(function (e) {
                deferred.reject(e);
            });

            return deferred.promise();
        }
    });
})();


