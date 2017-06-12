JS.require('JS.Class', function () {

    eaf.util.namespace('becu_org.communication.service');
    eaf.util.namespace('becu_org.domain');

    var IServiceMethodConfig = new JS.Interface([
    'uri', 'templateId', 'templateUri', 'instanceTemplateUri', 'viewUri', 'instanceViewUri',
    'callSpec', 'name', 'id', 'businessClass', 'tracker'
]);

    /*
    uri: the service uri
    templateUri: the uri for the template for this service (determines how the service 
    ui element of the serviceMethod itself looks/behaves
    resultTemplateUri: uri the template of the resulting object (determines how the
    ui element of resulting object (e.g. customer) looks/behaves
    callSpec: strategy for determining when service method can be called
    tracker: tracks both template types (to avoid dups) and template instances (for outside use, usually some gloabal changes)
    */
    becu_org.communication.serviceMethodConfig = new JS.Class({
        initialize: function () {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            this.uri; // = uri;
            this.templateId; // = templateId;
            this.templateUri; // = templateUri;
            this.instanceTemplateUri; // = instanceTemplateUri;
            this.viewUri; // = viewUri;
            this.instanceViewUri; // = instanceViewUri;
            this.callSpec; // = callSpec;
            this.name; // = name;
            this.id; // = id;
            this.businessClass; // = businessClass;
            this.tracker; // = tracker;
            // By default templates are pulled from the same server path as the html file making the request.
            // If you keep your templates in a separate directory, specify it here as a relative path to the html document making the request
            // For example, /Templates for a sub dir, or ../Templates for going up a dir level and dropping into a Templates folder
            //this.templateUrl = "";

            //  We want to be able to apply any naming conventions you have for your template resource files without cluttering the name itself up.
            //  So, if you have a convention to name your templates with a ".tpl.html" extension/suffix, then specify ".tpl.html" here
            this.templateSuffix = ".html";

            //  If you prefer to prefix your templates with a convention, specify it here.
            this.templatePrefix = "";
        }
    });


    becu_org.communication.templateTracker = (function () {

        var types = [];
        var instances = [];

        return new JS.Class({
            initialize: function () {
                //properties
                this.types = types;
                this.instances = instances;

            }
        ,


            add: function (obj, type) {
                this.types.push(type);
                this.instances.push(obj);
            }

        });

    })();



    becu_org.communication.callSpecRequirementDetail = (function () {

        //        var need = [];
        //        var have = [];
        //        var remaining = [];

        return new JS.Class({
            initialize: function () {
                this.type;
                //array holding field names 
                //if empty, assumption is that all fields are required
                //unless in this.nonRequiredFields
                this.requiredFields = []; //ko.observableArray();
                //array holding field names 
                //if empty, assumption is that all fields are non-required
                //unless in this.requiredFields
                this.nonRequiredFields = []; // ko.observableArray();
                //this.missingFields = ko.observableArray(); //[];//
                this.requirementMetIconUrl;
                this.requirementUnmetIconUrl;
                //this.
                //                )
                //                ;

                //                this.personName.subscribe(function (newValue) {
                //                    alert("The person's new name is " + newValue);
                //                });

                this.viewModel; //a class that is the view model for the method
                this.undefinedIsFalse = true;
            }
            ,

//            _inMissingFields: function (field) {
//                for (var idx = 0; idx < this.missingFields().length; idx++) {
//                    if (this.missingFields()[idx].field == field)
//                        return idx;
//                }

//                return -1;
//            }
//            ,

//            _allUnmet: function (model) {
//                //for (var i = 0; i < this.missingFields.length; i++) {
//                //array holding field names 
//                //if empty, assumption is that all fields are required
//                //unless in this.nonRequiredFields
//                //this.requiredFields = ko.observableArray();
//                var requiredFields = this.requiredFields; //();
//                var nonRequiredFields = this.nonRequiredFields; //();

//                if (requiredFields && requiredFields.length > 0) {

//                    var requiredField;
//                    var found = false;
//                    var n;
//                    for (var idx = 0; idx < requiredFields.length; idx++) {
//                        requiredField = (requiredFields[idx]);
//                        if (this._inMissingFields(requiredField) == -1) {
//                            this.missingFields.push({ field: requiredField, description: '' });
//                        }
//                    }
//                }
//                //array holding field names 
//                //if empty, assumption is that all fields are required
//                //unless in this.nonRequiredFields
//                //this.requiredFields = ko.observableArray();
//                if (nonRequiredFields && nonRequiredFields.length > 0) {
//                    //var nonRequiredField;
//                    var found = false;
//                    var nonField;
//                    for (nonField in model) {

//                        for (var nonIdx = 0; nonIdx < nonRequiredFields.length; nonIdx++) {
//                            found = false;
//                            nonRequiredField = nonRequiredFields[nonIdx];
//                            //props can be functions, so don't rule them out
//                            //if field is non-required, then break
//                            if (nonField == nonRequiredField) {

//                                found = true;
//                                break;
//                            }
//                        }

//                        //if field not found in the non-required fields collection, and the field does not hold a value, then error condition
//                        if (!found) {
//                            if (this._inMissingFields(nonField) == -1) {
//                                this.missingFields.push({ field: nonField, description: '' });
//                            }
//                        }
//                    }
//                }

//                //this.missingFields
//                //}
//            }
//            ,

//            satisfiedBy: function (model) {
//                if (this.getMissingFields(model).length == 0)
//                    return true;
//                return false;
//            }
//            ,

//            getMissingFields: function (model) {
//                if (model == undefined)
//                    if (this.undefinedIsFalse) {
//                        this._allUnmet(model);
//                        return this.missingFields();
//                    }
//                    //return false;
//                    else
//                        return this.missingFields();

//                if (!(model.isA(this.type))) {
//                    this._allUnmet(model);
//                    return this.missingFields();
//                }
//                //return false;
//                //if (this.requirement) {
//                //var missing = [];

//                var requiredFields = this.requiredFields; //();
//                var nonRequiredFields = this.nonRequiredFields; //();

//                var missingIdx;
//                if (requiredFields && requiredFields.length > 0) {
//                    var requiredField;
//                    var found = false;
//                    var n;
//                    for (var idx = 0; idx < requiredFields.length; idx++) {
//                        found = false;
//                        //array holding field names 
//                        //if empty, assumption is that all fields are required
//                        //unless in this.nonRequiredFields
//                        //this.requiredFields = ko.observableArray();
//                        requiredField = requiredFields[idx];
//                        for (n in model) {
//                            //props can be functions, so don't rule them out
//                            if (n == requiredField && (ko.utils.unwrapObservable(model[n]) != undefined)) {
//                                found = true;
//                                break;
//                            }
//                        }

//                        if (!found) {

//                            //return false;
//                            if (this._inMissingFields(requiredField) == -1) {
//                                this.missingFields.push({ field: requiredField, description: '' });
//                            }
//                        }
//                        else {
//                            missingIdx = this._inMissingFields(requiredField);
//                            if (missingIdx != -1)
//                                this.missingFields.splice(missingIdx, 1);
//                        }
//                    }
//                }


//                //array holding field names 
//                //if empty, assumption is that all fields are required
//                //unless in this.nonRequiredFields
//                //this.requiredFields = ko.observableArray();
//                if (nonRequiredFields && nonRequiredFields.length > 0) {
//                    var nonRequiredField;
//                    var found = false;
//                    var nonField;
//                    for (nonField in model) {

//                        for (var nonIdx = 0; nonIdx < nonRequiredFields.length; nonIdx++) {
//                            found = false;
//                            nonRequiredField = nonRequiredFields[nonIdx];
//                            //props can be functions, so don't rule them out
//                            //if field is non-required, then break
//                            if (nonField == nonRequiredField) {

//                                found = true;
//                                break;
//                            }

//                        }

//                        //if field not found in the non-required fields collection, and the field does not hold a value, then error condition
//                        if (!found && (ko.utils.unwrapObservable(model[nonfield]) == undefined)) {
//                            //return false;
//                            if (this._inMissingFields(nonField) == -1) {
//                                this.missingFields.push({ field: nonField, description: '' });
//                            }
//                        }
//                        else {
//                            missingIdx = this._inMissingFields(nonField);
//                            if (missingIdx != -1)
//                                this.missingFields.splice(missingIdx, 1);
//                        }
//                    }
//                }

//                //array holding field names 
//                //if empty, assumption is that all fields are non-required
//                //unless in this.requiredFields
//                //this.nonRequiredFields = ko.observableArray();

//                //}

//                return this.missingFields();


//            }
            //            ,

            //            missingFields:


            //            //resetFields: 
            //            function (model) {
            //                return (this.getMissingFields(model).length != 0);
            //            }
        });

    })();


    becu_org.communication.callSpec = (function () {

        //        var need = [];
        //        var have = [];
        //        var remaining = [];

        var error = function () {
            //todo: display error JS.Interface.ensure(this.config.tracker, ITemplateTracker);
        };

        return new JS.Class({
            initialize: function (needs) {
                //properties
                //array of becu_org.communication.callSpecRequirementDetail
                this.need = ko.observableArray(needs || []); //[]; //needs;
                this.have = ko.observableArray(); //[]; //
                //this.remaining = ko.observableArray(this.need()); //[]; //



                var that = this;

                //                this.isReady = ko.dependentObservable(function () {

                //                    for (var i = 0; i < that.need().length; i++) {
                //                        var type = that.need()[i].type;
                //                        var found = false;

                //                        for (var j = 0; j < that.have().length; j++) {
                //                            var instance = that.have()[j];
                //                            if (instance.isA(type)) {
                //                                found = true;
                //                                break;
                //                            }
                //                        }

                //                        if (!found) {
                //                            return false;
                //                        }
                //                    }

                //                    return true;
                //                });
            }
        ,

            add: function (obj) {
                if (JS.Interface.implements(obj, becu_org.ui.IValidateable)) {
                    if (obj.isValid())
                    {                        
                        this.have.push(obj);
                    }
                }
                else
                    this.have.push(obj);
                //this.necessaryRemaining();
            }
        ,

            flush: function () {
                this.have([]);
                //this.remaining(need.slice(0));
            }
        ,

            necessaryRemaining: function () {

                for (var i = 0; i < this.need().length; i++) {
                    var type = this.need()[i].type;
                    var found = false;

                    for (var j = 0; j < this.have().length; j++) {
                        var instance = this.have()[j];
                        if (instance.isA(type)) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        //remove from remaining
                        for (var h = 0; h < this.remaining().length; h++) {
                            if (this.remaining()[h] == type) {
                                this.remaining.splice(h, 1);
                                break;
                            }
                        }
                    }
                }
            }
        });

    })();



    becu_org.domain.serviceMethod = (function () {

        var currentObjects = [];
        var defaults = { flushWhenFinished: false };
        var template;

        var assertConfigArg = function () {
            JS.Interface.ensure(this.config, IServiceMethodConfig);
        };

        var assertCallSpec = function () {
            JS.Interface.ensure(this.config.callSpec, ICallSpec);
        };

        var assertTracker = function () {
            JS.Interface.ensure(this.config.tracker, ITemplateTracker);
        };

        var error = function () {
            JS.Interface.ensure(this.config.tracker, ITemplateTracker);
        };

        return new JS.Class({
            //see becu_org.communication.serviceConfig
            initialize: function (config) {
                //properties
                //this.config = config;
                //this.opts = ('undefined' == typeof (opts)) ? defaults : $.extend(opts, defaults);

                this.uri; // = uri;
                this.templateId; // = templateId;
                this.templateUri; // = templateUri;
                this.instanceTemplateUri; // = instanceTemplateUri;
                this.viewUri; // = viewUri;
                this.instanceViewUri; // = instanceViewUri;
                this.callSpec = ko.observable(); // = callSpec;
                this.name; // = name;
                this.id; // = id;
                this.businessClasses; // = businessClass;
                this.tracker; // = tracker;
                this.parent; //should be service
                // By default templates are pulled from the same server path as the html file making the request.
                // If you keep your templates in a separate directory, specify it here as a relative path to the html document making the request
                // For example, /Templates for a sub dir, or ../Templates for going up a dir level and dropping into a Templates folder
                //this.templateUrl = "";

                //  We want to be able to apply any naming conventions you have for your template resource files without cluttering the name itself up.
                //  So, if you have a convention to name your templates with a ".tpl.html" extension/suffix, then specify ".tpl.html" here
                this.templateSuffix = ".html";

                //  If you prefer to prefix your templates with a convention, specify it here.
                this.templatePrefix = "";

                //            if (this.templateUri)
                //                this.getTemplate();
            }
        ,

            process: function () {
                //view first, then the template

                if (this.viewUri)
                    this.processView();

                if (this.templateUri)
                    this.processTemplate();


            }
        ,

            processTemplate: function () {
                if (template) {
                    return template;
                }
                else {
                    //do ajax call
                    eaf.communications.htmlGetter.get(
                    this.templateUri
                    ,
                    eaf.core.createDelegate(this, function (response) {
                        //set template
                        //todo: perhaps create a ui strategy.  this is somewhat
                        //bleeding into ui concerns
                        var node = document.createElement("script");
                        node.type = "text/javascript";
                        node.id = templateId;
                        node.text = response;
                        document.body.appendChild(node);
                    })
                    ,
                    eaf.core.createDelegate(this, error)

                    );

                }
            },

            processInstanceTemplate: function () {
                if (template) {
                    return template;
                }
                else {
                    //do ajax call
                    eaf.communications.htmlGetter.get(
                    this.templateUri
                    ,
                    eaf.core.createDelegate(this, function (response) {
                        //set template
                        //todo: perhaps create a ui strategy.  this is somewhat
                        //bleeding into ui concerns
                        var node = document.createElement("script");
                        node.type = "text/javascript";
                        node.id = templateId;
                        node.text = response;
                        document.body.appendChild(node);
                    })
                    ,
                    eaf.core.createDelegate(this, error)

                    );
                }
            },

            processView: function () {
                if (template) {
                    return template;
                }
                else {
                    //do ajax call

                    eaf.communications.htmlGetter.get(
                    this.templateUri
                    ,
                    eaf.core.createDelegate(this, function (response) {
                        //set template
                        //todo: perhaps create a ui strategy.  this is somewhat
                        //bleeding into ui concerns
                        $(document.body).append(response);
                    })
                    ,
                    eaf.core.createDelegate(this, error)

                    );
                }
            },

            processInstanceView: function () {
                if (template) {
                    return template;
                }
                else {
                    //do ajax call

                    eaf.communications.htmlGetter.get(
                    this.templateUri
                    ,
                    eaf.core.createDelegate(this, function (response) {
                        //set template
                        //todo: perhaps create a ui strategy.  this is somewhat
                        //bleeding into ui concerns
                        $(document.body).append(response);
                    })
                    ,
                    eaf.core.createDelegate(this, error)

                    );
                }
            },

            call: function (flushWhenFinished, succ, err) {
                var flush = flushWhenFinished || this.opts.flushWhenFinished;

                //do ajax call


                if (flush) {
                    if ('object' == typeof (this.callSpec)) {
                        this.callSpec.flush();
                    }
                }
            },

            isReadyToCall: function () {
                var retVal = false;

                assertCallSpec();

                retVal = this.callSpec.isReady(currentObjects);


                return retVal;
            },

            necessaryRemaining: function () {


                assertCallSpec();

                return this.callSpec.necessaryRemaining;


            },

            //responde to an event
            addedObject: function (obj) {
                assertCallSpec();

                this.callSpec.add(obj);
            }

        });

    })();
});