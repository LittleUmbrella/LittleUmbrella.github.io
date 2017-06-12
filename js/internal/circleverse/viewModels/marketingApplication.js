eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.MarketingApplication = (function () {





    var flagStartedConversation = false;
    var flagBoundDisplay = false;
    var flagBoundChat = false;
    var flagBoundForm = false;



    return new JS.Class("circleverse.viewModel.MarketingApplication", {



        initialize: function (spRemote) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            //this.callSuper(text);

            var self = this;

            this.self = this;

            this.id = null;


            this.localMessenger = { name: "you" };
            this.eventAggregator = amplify;

            this.systemSender = { name: 'system' };

            this.__spRemote = spRemote || false;

            //this.eventAggregator = eventAggregator;

            this.mainEditor = null;

            this.mainEditorQTip = null;
            this.formState = ko.observable('draft');

            this.marketingProject = new circleverse.viewModel.MarketingProject(this.eventAggregator);
            this.marketingProject.collateralPlans.push(new becu_org.domain.marketing.CollateralPlan());

            this.userGroupService = new becu_org.sharePoint.UserGroupService();
            this.productLineService = new becu_org.service.ProductLineService();
            this.collateralTargetService = new becu_org.marketing.service.CollateralTargetService();

            //            var pmms = new JS.SortedSet(this.userGroupService.getEmployees('pmm'));
            //            this.pmms(pmms);
            //            this.designers(new JS.SortedSet(this.userGroupService.getEmployees('designer')));
            //            this.copyWriters(new JS.SortedSet(this.userGroupService.getEmployees('copy')));
            //            this.productLines(new JS.SortedSet(this.productLineService.getProductLines()));
            //            this.collateralTargets(new JS.SortedSet(this.collateralTargetService.getTargets()));


            this.pmms = ko.observableArray((new JS.SortedSet(this.userGroupService.getEmployees('pmm')))._members);
            this.designers = ko.observableArray((new JS.SortedSet(this.userGroupService.getEmployees('designer')))._members);
            this.copyWriters = ko.observableArray((new JS.SortedSet(this.userGroupService.getEmployees('copy')))._members);
            this.productLines = ko.observableArray((new JS.SortedSet(this.productLineService.getProductLines()))._members);
            this.collateralTargets = ko.observableArray((new JS.SortedSet(this.collateralTargetService.getTargets()))._members);


            //this.provider = new circleverse.viewModel.chat.provider();


            this.state = ko.observable("initialDecision");
            this.marketingProject.state(this.state());

            this.mode = ko.observable('edit');

            this.systemMessages = ko.observable();

            this.actions = ko.observableArray();

            this.editors = [];

            function availableActions() {
                this.all = [
                    new circleverse.viewModel.action('edit', "http://tvmobdev04:8005/media/img/pencil24x24.png", "Edit form", 'changeModeByAction')
                    ,
                    new circleverse.viewModel.action('view', "http://tvmobdev04:8005/media/img/view24x24.png", "View form", 'changeModeByAction')
                    ,
                    new circleverse.viewModel.action('saveDisabled', "http://tvmobdev04:8005/media/img/savedisabled24x24.png", 'Save. Unable to save form in current state', null)
                    ,
                    new circleverse.viewModel.action('save', "http://tvmobdev04:8005/media/img/save24x24.png", 'Save', 'save')
                    ,
                    new circleverse.viewModel.action('saveDraft', "http://tvmobdev04:8005/media/img/scroll24x24.png", 'Save draft', 'saveDraft')
                    ,
                    new circleverse.viewModel.action('print', "http://tvmobdev04:8005/media/img/print24x24.png", 'Print', 'print')
                ];


                this.getByName = function (name) {
                    for (n in this.all) {
                        if (name == this.all[n].name) {
                            return this.all[n];
                        }
                    }
                }
            }

            this.availableActions = new availableActions();

            this.visibleView = ko.observable('form');

            this.initData = {
                "columns": [{ "name": "Upfront Costs", "type": "money" }
                        , { "name": "Year 1", "type": "money" }
                        , { "name": "Year 2", "type": "money" }
                        , { "name": "Year 3", "type": "money" }
                        , { "name": "Year 4", "type": "money" }
                        , { "name": "Year 5", "type": "money"}]
                        , "operatingExpensesTable": [{ "self": { "$ref": "#operatingExpensesTable.0" }
                        , "rows": [
                                { "values": [{ "name": "UpfrontCosts", "value": 0 }
                                , { "name": "Year1", "value": 0 }
                                , { "name": "Year2", "value": 0 }
                                , { "name": "Year3", "value": 0 }
                                , { "name": "Year4", "value": 0 }
                                , { "name": "Year5", "value": 0}]
                                    , "hadInitialValue": true, "name": "Compensation", "agg": 0
                                }
                                ,
                                { "values": [{ "name": "UpfrontCosts", "value": 0 }
                                , { "name": "Year1", "value": 0 }
                                , { "name": "Year2", "value": 0 }
                                , { "name": "Year3", "value": 0 }
                                , { "name": "Year4", "value": 0 }
                                , { "name": "Year5", "value": 0}]
                                    , "hadInitialValue": true, "name": "Occupancy / Equip Exp", "agg": 0
                                }
                                ,
                                { "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Product Costs Servicing", "agg": 0 }, { "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Marketing", "agg": 0 }, { "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Professional Services", "agg": 0 }, { "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Other Operating", "agg": 0 }, { "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "G & A", "agg": 0}], "title": "Operating Expenses", "selectedItem": undefined, "dimensions": { "width": 100, "height": 100 }, "columns": [], "allRowAggregate": undefined, "allColumnAggregate": undefined, "allAggregate": NaN, "colTotalUpfrontCosts": 0, "colTotalYear1": 0, "colTotalYear2": 0, "colTotalYear3": 0, "colTotalYear4": 0, "colTotalYear5": 0
                        }], "capitalTable": [{ "self": { "$ref": "#capitalTable.0" }, "rows": [{ "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Capital", "agg": 0}], "title": "Capital", "selectedItem": undefined, "dimensions": { "width": 100, "height": 100 }, "columns": [], "allRowAggregate": undefined, "allColumnAggregate": undefined, "allAggregate": NaN, "colTotalUpfrontCosts": 0, "colTotalYear1": 0, "colTotalYear2": 0, "colTotalYear3": 0, "colTotalYear4": 0, "colTotalYear5": 0}]
                        , "benefitTable": [{ "self": { "$ref": "#benefitTable.0" }, "rows": [{ "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Revenue", "agg": 0 }, { "values": [{ "name": "UpfrontCosts", "value": 0 }, { "name": "Year1", "value": 0 }, { "name": "Year2", "value": 0 }, { "name": "Year3", "value": 0 }, { "name": "Year4", "value": 0 }, { "name": "Year5", "value": 0}], "hadInitialValue": true, "name": "Cost Savings", "agg": 0}], "title": "Benefit", "selectedItem": undefined, "dimensions": { "width": 100, "height": 100 }, "columns": [], "allRowAggregate": undefined, "allColumnAggregate": undefined, "allAggregate": NaN, "colTotalUpfrontCosts": 0, "colTotalYear1": 0, "colTotalYear2": 0, "colTotalYear3": 0, "colTotalYear4": 0, "colTotalYear5": 0}], "isBusy": false
            };



            this.busMapping = {
                //seems to be something wrong with mapping plugin.
                //something in the table stuff, so just ignore for now
                'ignore': ['self', 'state', 'displayStyle', 'columns', 'upfrontCostsTotal'
                                        , 'year1Total', 'year2Total', 'year3Total', 'year4Total', 'year5Total'
                                        , 'netTotal', 'benefitTable', 'capitalTable', 'operatingExpensesTable']
                            ,
                'capitalTable': {
                    create: function (options) {
                        //return self.tableMapper(options, 'Capital');
                    }
                }
                            ,
                'operatingExpensesTable': {
                    create: function (options) {
                        //return self.tableMapper(options, 'Operating Expenses');
                    }
                }
                            ,
                'benefitTable': {
                    create: function (options) {
                        //return self.tableMapper(options, 'Benefit');
                    }
                }
            };

            var chatMapping = {
                'ignore': ['self']

                            ,
                'sender': {
                    create: function (options) {
                        return options.data.name == this.systemSender.name ? this.systemSender : this.localMessenger;
                    }
                }
            };

        }
        ,

        changeModeByAction: function (action) {
            this.changeMode(action.name);
        }
        ,

        changeMode: function (mode) {
            var currentMode = this.mode();
            switch (mode) {
                case 'edit':
                    this.mode('edit');
                    $('body').removeClass('form-print');
                    if ('display' == this.visibleView()) {
                        this.changeView('form');
                    }
                    break;
                case 'view':
                    this.mode('view');
                    $('body').removeClass('form-print');
                    if ('display' != this.visibleView()) {
                        this.changeView('display');
                    }

                    break;
                case 'print':
                    this.mode('print');
                    //if ('display' == this.visibleView()){
                    $('body').addClass('form-print');
                    //}
                    if ('display' != this.visibleView()) {
                        this.changeView('display');
                    }
                    break;
                default:

            }
            if (currentMode != this.mode()) {
                this.eventAggregator.publish('changedMode', this.mode());
                //                //refresh if necessary
                //                this.changeView(this.visibleView());
                this.resetActions();
            }
        }
        ,


        changeDisplayType: function (displayType) {
            //return;

            switch (displayType) {
                case 'interactive':
                    this.changeView(displayType);
                    this.changeMode('edit');
                    break;

                case 'traditional':
                    if ('complete' == this.marketingProject.state()) {
                        this.changeView('display');
                        this.changeMode('view');
                    }
                    else {
                        this.changeView('form');
                        this.changeMode('edit');
                    }
                    break;
            }
        }
        ,

        changeView: function (view) {
            var currentView = this.visibleView();



            //return;

            switch (view) {
                case 'interactive':
                    if (!flagBoundChat) {
                        ko.applyBindings(this, $('#chat')[0]);
                        flagBoundChat = true;
                    }

                    this.visibleView('interactive');

                    if (!flagStartedConversation)
                        this.coordinator.startMessaging();
                    flagStartedConversation = true;
                    break;

                case 'form':
                    if (!flagBoundForm) {
                        ko.applyBindings(this, $('#form')[0]);
                        flagBoundForm = true;
                    }

                    this.visibleView('form');
                    break;

                case 'display':

                    if (!flagBoundDisplay) {
                        ko.applyBindings(this, $('#display')[0]);
                        flagBoundDisplay = true;
                    }

                    this.visibleView('display');
                    break;
            }

            if (currentView != this.visibleView()) {
                this.eventAggregator.publish('changedView', this.visibleView());
                this.resetActions();
            }
        }
        ,

        resetActions: function () {
            var state = this.visibleView();
            var mode = this.mode();


            this.actions.removeAll();

            switch (mode) {
                case 'view':
                    this.actions.push(this.availableActions.getByName('edit'));
                    this.actions.push(this.availableActions.getByName('print'));
                    break;
                default:
                    //edit
                    if (this.marketingProject.canSave()) {
                        this.actions.push(this.availableActions.getByName('save'));
                    }
                    else {
                        this.actions.push(this.availableActions.getByName('saveDisabled'));
                    }

                    this.actions.push(this.availableActions.getByName('saveDraft'));
                    this.actions.push(this.availableActions.getByName('view'));
                    this.actions.push(this.availableActions.getByName('print'));

                    break;
            }

            //            switch (state) {
            //                case 'print':
            //                    
            //                    break;
            //                default: //form or chat
            //                    
            //                    break;

            //            }
        }
        ,

        init: function () {


            var self = this;

            this.eventAggregator.subscribe('saveMe', function (args) {
                //log("got message");
                this.save();
            } .bind(this));

            //            this.busCase.canSave.subscribe(function () {
            //                this.resetActions();

            //            }, this);


            this.eventAggregator.subscribe('saveAsDraft', function (args) {
                //log("got message");
                var self = this;
                modalq.show();
                this.__save(function () {

                    modalq.hide();
                    self.__confirmSave();
                }, 'saving');
            } .bind(this));




            this.spsvc = new becu_org.sp.service();
            var bus; //= new becu_org.serialMessageBus($, iframe[0]);

            if (this.__spRemote) {
                var src = 'http://tvmshagiri:3000/SiteAssets/SPNavigator.aspx#' + encodeURIComponent(document.location.href);

                var iframe = $('<iframe " src="' + src + '" width="1px" height="1px" scrolling="no" frameborder="0"><\/iframe>');

                iframe.appendTo('#iframe');

                log('remote');

                bus = new becu_org.serialMessageBus($, iframe[0]);
            }
            else {
                bus = {};
                bus.send = function (data, func) { data.complete = func; jQuery.ajax(data); };
                bus.subscribe = function () { };
            }
            this.spsvc.setBus(bus);



            //            this.confirmQ = {};

            //            this.confirmQ.show = this.confirmQ.hide = function () { };

            this.isModernBrowser = false;

            if (!$.browser.msie && parseInt($.browser.version) > 7) {
                this.isModernBrowser = true;
            }



            var qid = getQueryString()['ID'];
            if (qid) {
                self.id = qid;
                this.spsvc.getItemById('ProjectRequest', '/Marketing', qid, { "Data": "ows_Data" }, function (item) {
                    if (item == null || item.id == null) {
                        self.__showError(self.__buildErrorMsg('getting item'));
                    }
                    else
                        self.initData = dojox.json.ref.fromJson(item.Data);
                    //var model = ko.toJS();

                    self.bind();
                });
            }
            else {

                this.bind();
            }




            this.resetActions();




            this.startAutosaveCycle();
        }
        ,

        __shouldFormatControls: function () {
            return true; //this.isModernBrowser;
        }
                                ,
        __showError: function (content) {
            content = content || '<div>Error processing request.  <p>Please contact the help desk</p></div>';

            var modalError = $('#modalError').qtip(
                        {
                            id: 'modalError', // Since we're only creating one modal, give it an ID so we can style it
                            content: {
                                text: content + '<button class="button red">Ok</button>',
                                title: {
                                    text: 'Error',
                                    button: true
                                }
                            },
                            position: {
                                my: 'center', // ...at the center of the viewport
                                at: 'center',
                                target: $(window)
                            },
                            show: {
                                solo: true, // ...and hide all other tooltips...
                                modal: true // ...and make it modal
                            },
                            hide: false,
                            events: {
                                // Hide the tooltip when any buttons in the dialogue are clicked
                                render: function (event, api) {
                                    $('button', api.elements.content).click(api.hide);
                                }
                    ,
                                // Destroy the tooltip once it's hidden as we no longer need it!
                                hide: function (event, api) { api.destroy(); }
                            },
                            style: 'ui-tooltip-dark ui-tooltip-rounded'
                        }).qtip('api');

            modalError.show();
        }
                                ,

        __confirmSave: function () {
            var confirmQ = $('#modalConfirm').qtip(
            {
                id: 'modal2', // Since we're only creating one modal, give it an ID so we can style it
                content: {
                    text: $('<div>Save complete.  <p>&nbsp;</p><button class="button red">Ok</button> <button class="button red close">Ok (and close)</button></div>')
         ,
                    title: {
                        text: 'Confirmation',
                        button: true
                    }
                },
                position: {
                    my: 'center', // ...at the center of the viewport
                    at: 'center',
                    target: $(window)
                },
                show: {
                    solo: true, // ...and hide all other tooltips...
                    modal: true // ...and make it modal
                },
                //                hide: false,
                style: 'ui-tooltip-dark ui-tooltip-rounded',
                hide: false,
                events: {
                    // Hide the tooltip when any buttons in the dialogue are clicked
                    render: function (event, api) {
                        $('button', api.elements.content).click(api.hide);

                        $('button.close', api.elements.content).click(function () {
                            //todo: move out to pubsub.  sp-specific stuff
                            if (window.frameElement && window.frameElement.commitPopup) {
                                window.frameElement.commitPopup();
                            }
                        });
                    }
                    ,
                    // Destroy the tooltip once it's hidden as we no longer need it!
                    hide: function (event, api) { api.destroy(); }
                }
            }).qtip('api');

            confirmQ.show();
        }
                                ,
        print: function () {
            this.changeView('display');
            this.changeMode('print');
            window.print();
        }
                                ,

        bind: function () {

            //this.productLines(new JS.SortedSet(this.productLineService.getProductLines()));
            //            this.pmms = ko.observableArray();
            //            this.designers = ko.observableArray();
            //            this.copyWriters = ko.observableArray();
            //            this.productLines = ko.observableArray();
            //            this.collateralTargets = ko.observableArray();


//            //map from initData
                        for (p in this.initData) {
                            var modelProp = this.marketingProject[p];
                            if (modelProp) {
                                if (p != 'benefitTable' && p != 'operatingExpensesTable' && p != 'capitalTable') {
                                    if ('object' != typeof modelProp) {
                                        if (ko.isWriteableObservable(modelProp)) {
                                            modelProp(ko.unwrap(this.initData[p]));
                                        }
                                    }
                                }
                            }

                        }

            //            //seems to have leak
            //ko.mapping.fromJS(this.initData, null, this.marketingProject);
            //            if ('complete' == this.busCase.state()) {
            //                this.state('display');
            //            }
            //            this.busCase.capitalTable.push(this.tableMapper({ data: this.initData.capitalTable[0] }, 'Capital'));
            //            this.busCase.operatingExpensesTable.push(this.tableMapper({ data: this.initData.operatingExpensesTable[0] }, 'Operating Expenses'));
            //            this.busCase.benefitTable.push(this.tableMapper({ data: this.initData.benefitTable[0] }, 'Benefit'));

            //this.busCase.init();

            //ko.applyBindings(this, $('#form')[0]);
            //ko.applyBindings(this, $('#systemMessages')[0]);

            //ko.applyBindings(this, $('#chatToolbar')[0]);

            //ko.applyBindings(this, $('.action-menu')[0]);


            //                ko.applyBindings(this.busCase.benefitTable, $('#Benefits')[0]);
            //                ko.applyBindings(this.busCase.capitalTable, $('#Capital')[0]);
            //                ko.applyBindings(this.busCase.operatingExpensesTable, $('#OperatingExpenses')[0]);


            //            var emts = [
            //            { url: 'http://tvmobdev04:8005/media/img/TomBerquist.jpg', name: 'TomBerquist', description: 'Tom Berquist' }
            //            , { url: 'http://tvmobdev04:8005/media/img/ParkerCann.jpg', name: 'ParkerCann', description: 'Parker Cann' }
            //            , { url: 'http://tvmobdev04:8005/media/img/KathyElser.jpg', name: 'KathyElser', description: 'Kathy Elser' }
            //            , { url: 'http://tvmobdev04:8005/media/img/butch.jpg', name: 'butch', description: 'Butch Leonardson' }
            //            , { url: 'http://tvmobdev04:8005/media/img/GraceSemingsen.jpg', name: 'GraceSemingsen', description: 'Grace Semingsen' }
            //            , { url: 'http://tvmobdev04:8005/media/img/AnneShannon.jpg', name: 'AnneShannon', description: 'Anne Shannon' }
            //            , { url: 'http://tvmobdev04:8005/media/img/ScottStrand.jpg', name: 'ScottStrand', description: 'Scott Strand' }



            //            ];


            //            var emtCollectionVm = new circleverse.viewModel.emtCollectionViewModel(emts);



            //ko.applyBindings(emtCollectionVm, $('#emtCollection')[0]);

        }

                               ,

        save: function () {
            this.formState('Complete');
            var self = this;
            modalq.show();
            this.__save(function () {

                modalq.hide();
                self.__confirmSave();
            }, 'saving');
        }
                                ,

        startAutosaveCycle: function () {
            var self = this;
            return setInterval(function () {


                self.systemMessages('Auto-save in progress...');
                self.__save(function () {
                    var objToday = new Date(),
                        weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                        dayOfWeek = weekday[objToday.getDay()],
                        domEnder = new Array('nth', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'),
                        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
                        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                        curMonth = months[objToday.getMonth()],
                        curYear = objToday.getFullYear(),
                        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
                        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
                        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
                        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
                    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem; //+ " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

                    self.systemMessages('Last auto-save occured at: ' + today);

                }, 'auto-saving');
            }, 120000);
        }
                                ,

        __buildErrorMsg: function (opName) {
            opName = opName || 'processing request';

            return 'Error ' + opName + '.  <p>Please contact the help desk</p>';

        }
        ,

                                save: function () {
                                    this.eventAggregator.publish('saveMe', this);
                                }
                                ,

                                saveDraft: function () {
                                    this.eventAggregator.publish('saveAsDraft', this);
                                }
                                ,


        __save: function (callback, opName) {
            var self = this;
            var model = ko.toJS(this.marketingProject);
            var str = dojox.json.ref.toJson(model);


            //            var benTotal = this.marketingProject.benefitTable().length == 0 ? 0 : this.busCase.benefitTable()[0].allColumnAggregate();
            //            var capitalTotal = this.marketingProject.capitalTable().length == 0 ? 0 : this.busCase.capitalTable()[0].allColumnAggregate();
            //            var opTotal = this.marketingProject.operatingExpensesTable().length == 0 ? 0 : this.busCase.operatingExpensesTable()[0].allColumnAggregate();


            var spFieldMapper = { 'Title': this.__encode(this.marketingProject.projectName() || 'autoDraft').toString().substring(0, 250)

                //                                                                    , 'emtSponsor': this.__encode(this.busCase.emtSponsor()).toString().substring(0, 250) || ''
                //                                                                    , 'vpOwner': this.__encode(this.busCase.vpOwner()).toString().substring(0, 250) || ''
                //                                                                    , 'projectType': this.__encode(this.busCase.projectType()) || ''
                //                                                                    , 'projectDescription': this.__encode(this.busCase.projectDescription()) || ''
                //                                                                    , 'roi': this.__encode(this.busCase.roi()).toString().substring(0, 250) || ''
                //                                                                    , 'npv': this.__encode(this.busCase.npv()).toString().substring(0, 250) || ''
                //                                                                    , 'breakEven': this.__encode(this.busCase.breakEven()).toString().substring(0, 250) || ''
                //                                                                    , 'totalBenefit': this.__encode(benTotal)
                //                                                                    , 'totalCapital': this.__encode(capitalTotal)
                //                                                                    , 'totalOperational': this.__encode(opTotal)
                //                                                                    , 'total': this.__encode(this.busCase.netTotal()) || ''
                                                                    , 'State': this.formState()
                                                                    , 'Data': this.__encode(str)
            };

            //                            $.blockUI({ css: { border: '0px solid #aaa', color: 'white', backgroundColor: 'transparent'
            //                            }
            //                            });
            if (this.id) {
                spFieldMapper.ID = this.id;

                this.spsvc.updateListItem('ProjectRequest', '/Marketing', spFieldMapper, function (item) {
                    //self.id = item.id;
                    if (item == null || item.id == null) {
                        self.__showError(self.__buildErrorMsg(opName));
                    }
                    if (callback) callback();

                    // $.unblockUI();
                });
            }
            else {

                this.spsvc.createListItem('ProjectRequest', '/Marketing', spFieldMapper, function (item) {

                    //$.unblockUI();
                    if (item == null || item.id == null) {
                        //todo: error 
                        self.__showError(self.__buildErrorMsg(opName));
                    }
                    else {
                        self.id = item.id;
                        if (callback) callback();

                    }
                });
            }



        }
                                    ,

        __encode: function (string) {
            if (string == null) return '';
            //return encodeURIComponent(string);
            return string.toString().replace(/\&/g, '&' + 'amp;').replace(/</g, '&' + 'lt;')
        .replace(/>/g, '&' + 'gt;').replace(/\'/g, '&' + 'apos;').replace(/\"/g, '&' + 'quot;');
        }


    });
})();
