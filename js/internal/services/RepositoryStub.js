
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

        
    });
})();


