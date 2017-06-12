eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.app = (function () {





    var flagStartedConversation = false;
    var flagBoundDisplay = false;
    var flagBoundChat = false;
    var flagBoundForm = false;



    return new JS.Class("circleverse.viewModel.app", {



        initialize: function (spRemote) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            //this.callSuper(text);

            var self = this;

            this.self = this;

            this.id = null;


            this.localMessenger = { name: "you" };
            this.eventAggregator = PubSub;

            this.systemSender = { name: 'system' };

            this.__spRemote = spRemote || false;

            //this.eventAggregator = eventAggregator;

            this.mainEditor = null;

            this.mainEditorQTip = null;
            this.formState = ko.observable('draft');

            this.busCase = new circleverse.viewModel.businessCase(this.eventAggregator);
            this.provider = new circleverse.viewModel.chat.provider();


            this.state = ko.observable("initialDecision");
            this.busCase.state(this.state());

            this.mode = ko.observable('view');

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

            this.visibleView = ko.observable('initialDecision');

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


            this.tableMapper = function (options, name) {

                var rows = [];
                var row;
                for (var i = 0; i < options.data.rows.length; i++) {
                    row = options.data.rows[i];
                    var dataRow = { name: row.name, data: {}, func: function () {
                        var total = 0;
                        for (var j = 0; j < this.values().length; j++) {
                            total += parseFloat(this.values()[j].value());
                        }
                        return total;
                    }
                    };

                    var col;
                    for (var j = 0; j < row.values.length; j++) {
                        col = row.values[j];
                        dataRow.data[col.name] = col.value;
                    }

                    //table.addRow(dataRow);
                    rows.push(dataRow);
                }
                var table = new circleverse.viewModel.table(name, this.busCase.columns, rows);

                return table;

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
                        return self.tableMapper(options, 'Capital');
                    }
                }
                            ,
                'operatingExpensesTable': {
                    create: function (options) {
                        return self.tableMapper(options, 'Operating Expenses');
                    }
                }
                            ,
                'benefitTable': {
                    create: function (options) {
                        return self.tableMapper(options, 'Benefit');
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
                    if ('complete' == this.busCase.state()) {
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
                    if (this.busCase.canSave()) {
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

            this.eventAggregator.subscribe('saveMe', function (topic, args) {
                //log("got message");
                this.save();
            } .bind(this));

            this.busCase.canSave.subscribe(function () {
                this.resetActions();

            }, this);

            
            this.eventAggregator.subscribe('saveAsDraft', function (topic, args) {
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
                var src = 'http://eprocessint/SiteAssets/SPNavigator.htm#' + encodeURIComponent(document.location.href);

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
                this.spsvc.getItemById('ProjectRequest', '/ProjectRequest', qid, { "formdata": "ows_formdata" }, function (item) {
                    if (item == null || item.id == null) {
                        self.__showError(self.__buildErrorMsg('getting item'));
                    }
                    else
                        self.initData = dojox.json.ref.fromJson(item.formdata);
                    //var model = ko.toJS();

                    self.__setupQuestions();
                    self.bind();
                });
            }
            else {

                this.bind();
                this.__setupQuestions();
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
        },


        __setupEditors: function () {
            var self = this;

            //            tinyMCE.init({
            //                // Location of TinyMCE script
            //                //script_url: 'http://tvmobdev04:8020/3rdParty/js/tinymce/tiny_mce.js',

            //                // General options
            //                mode: "textareas",

            //                theme: "advanced",
            //                //plugins: "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
            //                plugins: "style,layer,table,advhr,contextmenu,paste,xhtmlxtras",

            //                // Theme options
            //                //                        theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            //                //                        theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
            //                //                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
            //                //                        theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
            //                theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,bullist,numlist,link,unlink,styleselect,formatselect,fontselect,fontsizeselect",
            //                //                        theme_advanced_buttons2: ",anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
            //                //                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
            //                //theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
            //                theme_advanced_toolbar_location: "top",
            //                theme_advanced_toolbar_align: "left",
            //                theme_advanced_statusbar_location: "bottom",
            //                theme_advanced_resizing: true

            //                // Example content CSS (should be your site CSS)
            //                //content_css: "css/content.css",

            //                // Drop lists for link/image/media/template dialogs
            //                //                        template_external_list_url: "lists/template_list.js",
            //                //                        external_link_list_url: "lists/link_list.js",
            //                //                        external_image_list_url: "lists/image_list.js",
            //                //                        media_external_list_url: "lists/media_list.js",

            //                // Replace values for the template plugin
            //                //                        template_replace_values: {
            //                //                            username: "Some User",
            //                //                            staffid: "991234"
            //                //                        }
            //            });

            return;
            //
            if (this.__shouldFormatControls()) {
                $(".textarea[id!='message']").tinymce({
                    // Location of TinyMCE script
                    script_url: 'http://tvmobdev04:8020/3rdParty/js/tinymce/tiny_mce.js',

                    // General options
                    theme: "advanced",
                    //plugins: "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
                    plugins: "style,layer,table,advhr,contextmenu,paste,xhtmlxtras",

                    // Theme options
                    //                        theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
                    //                        theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                    //                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                    //                        theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
                    theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,bullist,numlist,link,unlink,styleselect,formatselect,fontselect,fontsizeselect",
                    //                        theme_advanced_buttons2: ",anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                    //                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                    //theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
                    theme_advanced_toolbar_location: "top",
                    theme_advanced_toolbar_align: "left",
                    theme_advanced_statusbar_location: "bottom",
                    theme_advanced_resizing: true

                    // Example content CSS (should be your site CSS)
                    //content_css: "css/content.css",

                    // Drop lists for link/image/media/template dialogs
                    //                        template_external_list_url: "lists/template_list.js",
                    //                        external_link_list_url: "lists/link_list.js",
                    //                        external_image_list_url: "lists/image_list.js",
                    //                        media_external_list_url: "lists/media_list.js",

                    // Replace values for the template plugin
                    //                        template_replace_values: {
                    //                            username: "Some User",
                    //                            staffid: "991234"
                    //                        }
                });

                return;


                $(".textarea[id!='message']").each(function () {
                    var $this = $(this);

                    $this.tinymce({
                        // Location of TinyMCE script
                        //script_url: 'http://tvmobdev04:8020/3rdParty/js/tinymce/tiny_mce.js',

                        // General options
                        theme: "advanced",
                        //plugins: "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
                        plugins: "style,layer,table,advhr,contextmenu,paste,xhtmlxtras",

                        // Theme options
                        //                        theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
                        //                        theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                        //                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                        //                        theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
                        theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,bullist,numlist,link,unlink,styleselect,formatselect,fontselect,fontsizeselect",
                        //                        theme_advanced_buttons2: ",anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                        //                        theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                        //theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
                        theme_advanced_toolbar_location: "top",
                        theme_advanced_toolbar_align: "left",
                        theme_advanced_statusbar_location: "bottom",
                        theme_advanced_resizing: true

                        // Example content CSS (should be your site CSS)
                        //content_css: "css/content.css",

                        // Drop lists for link/image/media/template dialogs
                        //                        template_external_list_url: "lists/template_list.js",
                        //                        external_link_list_url: "lists/link_list.js",
                        //                        external_image_list_url: "lists/image_list.js",
                        //                        media_external_list_url: "lists/media_list.js",

                        // Replace values for the template plugin
                        //                        template_replace_values: {
                        //                            username: "Some User",
                        //                            staffid: "991234"
                        //                        }
                    });

                    var id = $this.prop('id');
                    var editor = tinyMCE.get(id);

                    var parent = $this.parent();
                    var pos;
                    if (parent && parent.parent() && parent.parent().hasClass('right')) {
                        pos = {
                            my: 'right center',
                            at: 'left top'
                        };
                    }
                    else {
                        pos = {
                            my: 'left center',
                            at: 'right top'
                        };
                    }


                    if (self.busCase[id] && self.busCase[id].info()) {
                        //                        editor[0].$frame.mouseenter(editor[0].$area[0], function (e) {
                        //                            $(this).qtip({
                        //                                position: pos,
                        //                                show: {
                        //                                    //solo: true, // ...and hide all other tooltips...
                        //                                    ready: true
                        //                                },
                        //                                //                            adjust: {
                        //                                //					            screen: 'flip'
                        //                                //				            },
                        //                                //hide: false,
                        //                                //                                hide: {
                        //                                //                                    event: 'mouseleave'
                        //                                //                                },
                        //                                content: self.busCase[e.data.id].info(),
                        //                                style: 'ui-tooltip-dark ui-tooltip-rounded'
                        //                            });
                        //                        });
                    }







                    //                    var editor = $this
                    //                                .cleditor({ width: 370,
                    //                                    height: 200, controls:     // controls to add to the toolbar
                    //                        "bold italic underline | font size " +
                    //                        "style | color highlight removeformat | bullets numbering | " +
                    //                        "link unlink | pastetext"
                    //                        , docCSSFile: "http://tvmobdev04:8005/css/main.css"
                    //                        , bodyStyle: "font-family:sans-serif, Arial, Helvetica, lucinda console; font-size:10pt; letter-spacing: 0.1em; line-height: 1.333em;"
                    //                                });

                    //                    //todo: fix qtip and make flip/fit work
                    //                    var parent = $this.parent();
                    //                    var pos;
                    //                    if (parent && parent.parent() && parent.parent().hasClass('right')) {
                    //                        pos = {
                    //                            my: 'right center',
                    //                            at: 'left top'
                    //                        };
                    //                    }
                    //                    else {
                    //                        pos = {
                    //                            my: 'left center',
                    //                            at: 'right top'
                    //                        };
                    //                    }

                    //                    var id = editor[0].$area[0].id;
                    //                    if (self.busCase[id] && self.busCase[id].info()) {
                    //                        editor[0].$frame.mouseenter(editor[0].$area[0], function (e) {
                    //                            $(this).qtip({
                    //                                position: pos,
                    //                                show: {
                    //                                    //solo: true, // ...and hide all other tooltips...
                    //                                    ready: true
                    //                                },
                    //                                //                            adjust: {
                    //                                //					            screen: 'flip'
                    //                                //				            },
                    //                                //hide: false,
                    //                                //                                hide: {
                    //                                //                                    event: 'mouseleave'
                    //                                //                                },
                    //                                content: self.busCase[e.data.id].info(),
                    //                                style: 'ui-tooltip-dark ui-tooltip-rounded'
                    //                            });
                    //                        });
                    //                    }
                    //self.__tabFix(editor);

                    //                    self.editors.push(editor[0]);

                    //self.__tabFix(editor);

                });

                return;

                //                var mainEditor = $("#message").cleditor({ width: '358px',
                //                    height: '190px', controls:     // controls to add to the toolbar
                //                                "bold italic underline | font size " +
                //                                "style | color highlight removeformat | bullets numbering | " +
                //                                "link unlink | pastetext"
                //                                , docCSSFile: "http://tvmobdev04:8005/css/main.css"
                //                                , bodyStyle: "font-family:sans-serif, Arial, Helvetica, lucinda console; font-size:10pt; letter-spacing: 0.1em; line-height: 1.333em;"
                //                })

                //                this.mainEditor = mainEditor[0];

                //            this.mainEditor.$frame.load(function () {
                //                self.mainEditor.refresh();
                //            });


                //            $(this.mainEditor.doc).ready(function () {
                //                $(window).resize();
                //                self.mainEditor.refresh();
                //            });

                //    setTimeout(function () {
                //        $(window).resize(); mainEditor.refresh();
                //    }, 3000);

                this.mainEditorQTip;

                self.__tabFix(mainEditor);

                this.mainEditor.$frame.mouseenter(function () {
                    var $self = $(this);
                    if (self.mainEditorQTip == null)
                        self.mainEditorQTip = $self.qtip({
                            position: {
                                my: 'left center',
                                at: 'right top'
                            },
                            show: {
                                ready: true
                            },
                            content: 'To paste, please use the toolbar option'
                                ,
                            hide: {
                                event: 'mouseleave'
                            },

                            style: 'ui-tooltip-dark ui-tooltip-rounded'
                        }); //.qtip('api');
                });
            }
            else {

                $("textarea").each(function () {
                    var $this = $(this);
                    var parent = $this.parent();
                    var pos;
                    if (parent && parent.hasClass('right')) {
                        pos = {
                            my: 'right center',
                            at: 'left top'
                        };
                    }
                    else {
                        pos = {
                            my: 'left center',
                            at: 'right top'
                        };
                    }

                    var id = this.id;

                    if (self.busCase[id] && self.busCase[id].info()) {
                        $this.qtip({
                            position: pos,
                            show: 'focus',
                            hide: 'blur',
                            content: self.busCase[id].info(),
                            style: 'ui-tooltip-dark ui-tooltip-rounded'
                        });

                    }

                });
                this.mainEditor = $("#message");
            }




















        }
                                ,
        print: function () {
            this.changeView('display');
            this.changeMode('print');
            window.print();
        }
                                ,

        bind: function () {



            this.__setupEditors();



            this.chatClient = new circleverse.viewModel.chat.client(this.eventAggregator, this.localMessenger, this.mainEditor);

            this.coordinator = new circleverse.viewModel.chat.formCoordinator(this.eventAggregator, this.chatClient, this.provider, this.systemSender);

            //map from initData
            for (p in this.initData) {
                var modelProp = this.busCase[p];
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

            //seems to have leak
            //            ko.mapping.fromJS(this.initData, this.busMapping, this.busCase);
            if ('complete' == this.busCase.state()) {
                this.state('display');
            }
            this.busCase.capitalTable.push(this.tableMapper({ data: this.initData.capitalTable[0] }, 'Capital'));
            this.busCase.operatingExpensesTable.push(this.tableMapper({ data: this.initData.operatingExpensesTable[0] }, 'Operating Expenses'));
            this.busCase.benefitTable.push(this.tableMapper({ data: this.initData.benefitTable[0] }, 'Benefit'));

            //this.busCase.init();

            ko.applyBindings(this, $('#choice')[0]);
            ko.applyBindings(this, $('#systemMessages')[0]);

            ko.applyBindings(this, $('#chatToolbar')[0]);

            ko.applyBindings(this, $('.action-menu')[0]);


            //                ko.applyBindings(this.busCase.benefitTable, $('#Benefits')[0]);
            //                ko.applyBindings(this.busCase.capitalTable, $('#Capital')[0]);
            //                ko.applyBindings(this.busCase.operatingExpensesTable, $('#OperatingExpenses')[0]);


            var emts = [
            { url: 'http://tvmobdev04:8005/media/img/TomBerquist.jpg', name: 'TomBerquist', description: 'Tom Berquist' }
            , { url: 'http://tvmobdev04:8005/media/img/ParkerCann.jpg', name: 'ParkerCann', description: 'Parker Cann' }
            , { url: 'http://tvmobdev04:8005/media/img/KathyElser.jpg', name: 'KathyElser', description: 'Kathy Elser' }
            , { url: 'http://tvmobdev04:8005/media/img/butch.jpg', name: 'butch', description: 'Butch Leonardson' }
            , { url: 'http://tvmobdev04:8005/media/img/GraceSemingsen.jpg', name: 'GraceSemingsen', description: 'Grace Semingsen' }
            , { url: 'http://tvmobdev04:8005/media/img/AnneShannon.jpg', name: 'AnneShannon', description: 'Anne Shannon' }
            , { url: 'http://tvmobdev04:8005/media/img/ScottStrand.jpg', name: 'ScottStrand', description: 'Scott Strand' }



            ];


            var emtCollectionVm = new circleverse.viewModel.emtCollectionViewModel(emts);



            ko.applyBindings(emtCollectionVm, $('#emtCollection')[0]);

        }

                                ,

        __standardQuestionSetup: function (prop, defaultText, id, inside, idOfOutsideControlToDisplayIn, shouldAnswerBeFormatted) {
            if ('undefined' != typeof this.busCase[prop].info && this.busCase[prop].info() != '') {
                defaultText = this.busCase[prop].info();
            }

            var self = this;

            var question = new circleverse.viewModel.chat.question(defaultText, this.systemSender);
            question.idOfControlToDisplay(id);
            question.shouldAnswerBeFormatted(('boolean' == typeof shouldAnswerBeFormatted) ? shouldAnswerBeFormatted : true);
            question.displayInside(inside || false);
            question.idOfOutsideControlToDisplayIn(idOfOutsideControlToDisplayIn);

            var subscriptionToVM; // = subscribeToVM(question, prop, localMessenger);
            var subscriptionToAnswer; // = subscribeToAnswer(question, prop, this.systemSender);


            function subscribeToVM(q, prop, localSender) {
                return self.busCase[prop].subscribe(function (val) {
                    subscriptionToAnswer.dispose();
                    //                                    if ('undefined' != typeof busCase[prop].isValid && !busCase[prop].isValid()) {
                    //                                        this.answer(null);
                    //                                        this.chatClient.sendMessage(new circleverse.viewModel.chat.message(this.busCase[prop].error, this.systemSender));
                    //                                    }
                    if (val != null) {
                        q.answer(new circleverse.viewModel.chat.message(val, localSender));
                    }

                    subscriptionToAnswer = subscribeToAnswer(question, prop, self.systemSender);

                });
            }

            function subscribeToAnswer(q, prop, sender) {
                return question.answer.subscribe(function (a) {
                    log("ansered");

                    subscriptionToVM.dispose();

                    if (null == a)
                        this.busCase[prop](a);
                    else {
                        this.busCase[prop](a.text());

                        if ('undefined' != typeof this.busCase[prop].isValid && !this.busCase[prop].isValid()) {
                            q.answer(null);
                            this.chatClient.sendMessage(new circleverse.viewModel.chat.message(this.busCase[prop].error, sender));
                        }
                    }

                    subscriptionToVM = subscribeToVM(question, prop, self.localMessenger);

                } .bind(self));
            }

            subscriptionToVM = subscribeToVM(question, prop, this.localMessenger);
            subscriptionToAnswer = subscribeToAnswer(question, prop, this.systemSender);


            this.provider.addMessage(question);
            return question;
        }
                                ,

        __controlQuestionSetup: function (prop, defaultText, id, inside, idOfOutsideControlToDisplayIn) {
            if ('undefined' != typeof this.busCase[prop] && 'undefined' != typeof this.busCase[prop].info && this.busCase[prop].info() != '') {
                defaultText = this.busCase[prop].info();
            }

            var self = this;

            var question = new circleverse.viewModel.chat.question(defaultText, this.systemSender);
            question.idOfControlToDisplay(id);
            question.displayInside(inside);
            question.idOfOutsideControlToDisplayIn(idOfOutsideControlToDisplayIn);



            function subscribeToVM(q, prop, localSender) {
                return self.busCase[prop].subscribe(function (val) {
                    //                                    if ('undefined' != typeof busCase[prop].isValid && !busCase[prop].isValid()) {
                    //                                        this.answer(null);
                    //                                        this.chatClient.sendMessage(new circleverse.viewModel.chat.message(this.busCase[prop].error, self.systemSender));
                    //                                    }
                    if (val != null) {
                        q.answer(new circleverse.viewModel.chat.message(val, localSender));
                    }


                });
            }
            subscribeToVM(question, prop, this.localMessenger);

            this.provider.addMessage(question);

            return question;
        }
                                ,

        __controlQuestionWithoutPropSetup: function (defaultText, id, inside, idOfOutsideControlToDisplayIn) {


            var self = this;

            var question = new circleverse.viewModel.chat.question(defaultText, this.systemSender);
            question.idOfControlToDisplay(id);
            question.displayInside(inside);
            question.idOfOutsideControlToDisplayIn(idOfOutsideControlToDisplayIn);


            this.provider.addMessage(question);

            return question;
        }
                                ,

        __setupQuestions: function () {
            var self = this;
            var defaultText;

            var question;

            if (this.id) {

                question = new circleverse.viewModel.chat.message("I remember you.", this.systemSender);

                this.provider.addMessage(question);
                question = new circleverse.viewModel.chat.message("We had a conversation.", this.systemSender);

                this.provider.addMessage(question);
                question = new circleverse.viewModel.chat.message("You wanted to talk about a business case.", this.systemSender);

                this.provider.addMessage(question);


                question = new circleverse.viewModel.chat.message("Let me see if I remember the details...", this.systemSender);

                this.provider.addMessage(question);


                //                                        question = new circleverse.viewModel.chat.message("I'm a computer, so I should be able to.", this.systemSender);

                //                                        this.provider.addMessage(question);
            }
            else {
                question = new circleverse.viewModel.chat.message("I understand you have a project in mind.  I'd like to ask you about it.", this.systemSender);

                this.provider.addMessage(question);
            }

            this.__standardQuestionSetup('projectName', "What is the name of the project?", null, null, null, false);

            question = new circleverse.viewModel.chat.message("That's just what I was going to name my project!", this.systemSender);

            this.provider.addMessage(question);

            this.__standardQuestionSetup('emtSponsor', "Who is the EMT Sponsor? (Drag a photo or type their name.)", 'emtCollection', false, 'rightPlaceHolder', false);
            this.__standardQuestionSetup('vpOwner', "Who is the VP Owner?", null, null, null, false);
            this.__controlQuestionSetup('projectType', "What type of project is it?", "answerProjectType", true);
            this.__standardQuestionSetup('projectDescription', "What is the Definition of the Project?");
            question = new circleverse.viewModel.chat.message("It's like you're stealing my idea here!", this.systemSender);

            this.provider.addMessage(question);

            this.__standardQuestionSetup('teamMembers', "Who are the team members?");

            question = new circleverse.viewModel.chat.message("I've worked with those folks.  Sounds like a solid team", this.systemSender);

            this.provider.addMessage(question);

            this.__standardQuestionSetup('businessNeed', "What is the Business Need?");
            this.__standardQuestionSetup('expectedOutcome', "What are the expected outcomes?");
            this.__standardQuestionSetup('strategicAlignment', "What are the Strategic Alignments?");
            this.__standardQuestionSetup('risksIssues', "What are the Risks / Issues?");
            this.__standardQuestionSetup('processesAndRoles', "What are the Processes and Roles involved?");
            this.__standardQuestionSetup('practicesEnding', "What are we Stopping?");

            question = new circleverse.viewModel.chat.message("I know I'm not going to miss that!", this.systemSender);

            this.provider.addMessage(question);

            this.__standardQuestionSetup('scheduleAndResources', "What is the Schedule and Resources?");
            this.__standardQuestionSetup('assumptionsConstraintsDependencies', "What are the Assumptions / Constraints / Dependencies?");
            this.__standardQuestionSetup('successMeasures', "What are the Success Measures");

            var tablequestion = this.__controlQuestionWithoutPropSetup("Please fill out the table below and tell me (click send button) when you're done", 'tables', false, 'tablePlaceHolder');
            //auto-answer if user filled out question following. kludgy? yes.
            var subscription = this.busCase.roi.subscribe(function (val) {
                if (val) {
                    tablequestion.answer(new circleverse.viewModel.chat.answer('tables', self.localMessenger));
                }
                subscription.dispose();
            });

            this.__standardQuestionSetup('commentsfinancials', "Provide comments about the financials");

            //idOfOutsideControlToDisplayIn

            this.__standardQuestionSetup('roi', "What is the ROI?");
            this.__standardQuestionSetup('npv', "What is the NPV?");
            this.__standardQuestionSetup('breakEven', "What is the Breakeven?");

            this.__controlQuestionSetup('treasuryReviewed', "Reviewed by Treasury?", 'treasuryReviewed', true);
            this.__controlQuestionSetup('fteChange', "Is there a change expected in FTE count?", 'fteChange', true);

            //            this.__controlQuestionSetup('fteChangeType', "What is the change type?", 'fteChangeType', true);
            //            this.__controlQuestionSetup('fteChangeCount', "What is the change in count?", 'fteChangeCount', true);
            //            this.__controlQuestionSetup('fteChangeCountInAnnualPlan', "Are these changes in the Annual Plan?", 'fteChangeCountInAnnualPlan', true);
            //required: { message: reqText, params: true }, htmlNotEmpty: true, 


            question = new circleverse.viewModel.chat.message("Are the project dollars in the Annual Plan for...", this.systemSender);

            this.provider.addMessage(question);

            this.__controlQuestionSetup('revenue', "Revenue?", 'revenue', true);
            this.__controlQuestionSetup('savings', "Cost Savings?", 'savings', true);
            this.__controlQuestionSetup('projectCosts', "Capital?", 'projectCosts', true);
            //this.__controlQuestionSetup('planImpactInAnnualPlan', "Are these changes in the Annual Plan?", 'planImpactInAnnualPlan', true);
            this.__controlQuestionSetup('operatingExpenses', "Operating Expenses?", 'operatingExpenses', true);
            this.__standardQuestionSetup('expenseToAverageAssets', "Describe impact on Strategic Objective, Expense to Average Assets (Quantify if Possible)?");

            question = new circleverse.viewModel.chat.message("Wow, that's what I call an impact!", this.systemSender);

            this.provider.addMessage(question);
            this.__standardQuestionSetup('npsRelational', "Describe impact on Strategic Objective, NPS (relational) (Quantify if Possible)?");
            this.__standardQuestionSetup('engagedMembersExpectedEffect', "Describe impact on Strategic Objective, Number of engaged members (Quantify if Possible)?");
            this.__standardQuestionSetup('membershipToPopulationExpectedEffect', "Describe impact on Strategic Objective, Membership to 8 County Population (Quantify if Possible)?");
            this.__standardQuestionSetup('qualitativeBenefits', "Describe the qualitative benefits");
            this.__standardQuestionSetup('alternativesConsidered', "What alternatives were considered?");


            question = new circleverse.viewModel.chat.message("Looks like you've done your homework", this.systemSender);

            this.provider.addMessage(question);

            question = new circleverse.viewModel.chat.message("I think I've asked enough questions... for now :)", this.systemSender);
            //                          
            this.provider.addMessage(question);
            question = new circleverse.viewModel.chat.message("Don't forget to save your changes (scroll up and find the disk or pencil buttons)", this.systemSender);
            //                          
            this.provider.addMessage(question);

            //                            question = new circleverse.viewModel.chat.question("That was it.", this.systemSender);
            //                            //                          
            //                            this.provider.addMessage(question);
            //                            question = new circleverse.viewModel.chat.question("Don't forget to save your changes", this.systemSender);
            //                            //                          
            //                            this.provider.addMessage(question);
            //                            this.__standardQuestionSetup('projectName', "What");
            //                            this.__standardQuestionSetup('projectName', "What");
            //                            this.__standardQuestionSetup('projectName', "What");
            //                            this.__standardQuestionSetup('projectName', "What");



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

        __save: function (callback, opName) {
            var self = this;
            var model = ko.toJS(this.busCase);
            var str = dojox.json.ref.toJson(model);


            var benTotal = this.busCase.benefitTable().length == 0 ? 0 : this.busCase.benefitTable()[0].allColumnAggregate();
            var capitalTotal = this.busCase.capitalTable().length == 0 ? 0 : this.busCase.capitalTable()[0].allColumnAggregate();
            var opTotal = this.busCase.operatingExpensesTable().length == 0 ? 0 : this.busCase.operatingExpensesTable()[0].allColumnAggregate();


            var spFieldMapper = { 'Title': this.__encode(this.busCase.projectName() || 'autoDraft').toString().substring(0, 250)

                                                                    , 'emtSponsor': this.__encode(this.busCase.emtSponsor()).toString().substring(0, 250) || ''
                                                                    , 'vpOwner': this.__encode(this.busCase.vpOwner()).toString().substring(0, 250) || ''
                                                                    , 'projectType': this.__encode(this.busCase.projectType()) || ''
                                                                    , 'projectDescription': this.__encode(this.busCase.projectDescription()) || ''
                                                                    , 'roi': this.__encode(this.busCase.roi()).toString().substring(0, 250) || ''
                                                                    , 'npv': this.__encode(this.busCase.npv()).toString().substring(0, 250) || ''
                                                                    , 'breakEven': this.__encode(this.busCase.breakEven()).toString().substring(0, 250) || ''
                                                                    , 'totalBenefit': this.__encode(benTotal)
                                                                    , 'totalCapital': this.__encode(capitalTotal)
                                                                    , 'totalOperational': this.__encode(opTotal)
                                                                    , 'total': this.__encode(this.busCase.netTotal()) || ''
                                                                    , 'State': this.formState()
                                                                    , 'formdata': this.__encode(str)
            };

            //                            $.blockUI({ css: { border: '0px solid #aaa', color: 'white', backgroundColor: 'transparent'
            //                            }
            //                            });
            if (this.id) {
                spFieldMapper.ID = this.id;

                this.spsvc.updateListItem('ProjectRequest', '/ProjectRequest', spFieldMapper, function (item) {
                    //self.id = item.id;
                    if (item == null || item.id == null) {
                        self.__showError(self.__buildErrorMsg(opName));
                    }
                    if (callback) callback();

                    // $.unblockUI();
                });
            }
            else {

                this.spsvc.createListItem('ProjectRequest', '/ProjectRequest', spFieldMapper, function (item) {

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
