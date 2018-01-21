eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

circleverse.viewModel.ResizeableBase = //(function () {



//return 
        new JS.Class('circleverse.viewModel.ResizeableBase', circleverse.viewModel.Base, {

            initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                this.callSuper();
                var self = this;
                //properties                

                self.eventAggregator = globalSettings.eventAggregator;

                self.borderWidth = 2;
                //this.size = function (val) { if (val) { } else return 100; }; // ko.observable();
                if (!self.size)
                self.size = ko.observable();

                self.isAvailable = ko.observable(false);
                self.globalSettings = globalSettings;
                if (self.contentTemplate){                    
                }
                else
                    self.contentTemplate = ko.observable('standardContentTemplate');
                    
                self.mainCss = ko.observable();
                //self.eventAggregator.subscribe('circleverse.ui.viewModel.draggableModule.dragEnd', function (dd) {
                //    //                    if (dd && dd.available && self.id) {
                //    //                        var el;
                //    //                        for (var i = 0; i < dd.available; i++) {
                //    //                            if ($(el).is(self.id())) {
                //    //                                self.isAvailable(false);
                //    //                                return;
                //    //                            }
                //    //                        }
                //    //                    }

                //    self.isAvailable(false);
                //});


                //this.eventAggregator.subscribe('circleverse.ui.viewModel.draggableModule.dragStart', function (dd) {
                //    self.setIsAvailable.call(self, dd);
                //});

                self.dimensions = ko.observable();

                this.environment = eaf.Environment;

                this.__h = ko.observable(this.environment.window.height);
                this.__w = ko.observable(this.environment.window.width);

                $(this.environment).bind("resize", function (e, data) {
                    //var e;
                    //                    self.__h = self.environment.window.height;
                    //                    self.__w = self.environment.window.width;
                    self.__h(data.height);
                    self.__w(data.width);
                    //log('h: ' + self.__h + ' w: ' + self.__w);
                });

                //this.location = ko.observable();
                this.scale = ko.dependentObservable(function () {


                    if ('undefined' != typeof this.userPreferences) {
                    }



                    var NORMAL_HEIGHT = 786;
                    var NORMAL_WIDTH = 1028;

                    var scale = 1 * (Math.min((this.__h() / NORMAL_HEIGHT), this.__w() / NORMAL_WIDTH));

                    //log('scale: ' + scale);
                    return scale > 1 ? 1 : 1;

                }.bind(this));


                self.faded = ko.observable(false);
                
                self.faded.subscribe(function(val){
                    if (val){
                        self.addClass(self.mainCss, 'faded');
                    }
                    else{
                        self.removeClass(self.mainCss, 'faded');
                    }
                });

                self.connectionWidthStaticAdjustment = ko.observable(); //useful for transparent backgrounds, where the connection should go further than the edge of the container circle

                self.connectionWidthAdjustment = ko.pureComputed(function(){
                    var static = self.connectionWidthStaticAdjustment(),
                    relative = ((self.dimensions().width/2) || 0) * -1;

                    if (static == null){
                        return relative;
                    }
                    return static;
                }); 

                self.lineStartAt = ko.observable('edge');    


                self.helpTemplateName = ko.observable(self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'HelpTemplate');          

                self.helpTitleTemplateName = ko.observable();
                
                self.confirmTemplateName = ko.observable(self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'ConfirmTemplate');          

                self.confirmTitleTemplateName = ko.observable();


                self.confirmDeleteTemplateName = ko.observable(self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'ConfirmDeleteTemplate');          

                self.confirmDeleteTitleTemplateName = ko.observable();

                self.animationSettings = ko.observable();

                

                self.focus = ko.observable(false);

                self.canCreate = ko.observable(true);
                self.canEdit = ko.observable(false);
                self.canDelete = ko.observable(true);
                self.canSearch = ko.observable(false);
                self.canRefresh = ko.observable(false);
                self.canSave = ko.observable(false);
                self.canOpen = ko.observable(true);
                self.canClose = ko.observable(true);
                self.canHelp = ko.observable(true);

                self.move = ko.observable({top: null, left: null}); //used to initiate animated movement.  see binding related to same

                self.hideChildren = ko.observable(false);

                self.canMoveRoot = ko.observable(true);
            },
            
            dialogClosed: function(){
                //let descendent classes override and handle, otherwise do nothing by default
            },
            
            dialogConfirmed: function(){
                //let descendent classes override and handle, otherwise do nothing by default
            }

            
            ,        

            moveRoot: function(config){
                var self = this;
                

                if (self.parent && self.parent.isRoot && self.parent.isRoot()){
                    if (self.parent.canMoveRoot())
                        self.parent.move(config.movement);
                }
                else if (self.parent && self.parent.moveRoot){
                    if (self.parent.canMoveRoot())
                        self.parent.moveRoot(config);
                }
                else{
                    if (self.canMoveRoot())
                        self.move(config.movement);
                }
            },

            moveEnded: function(){

            }

            ,addClass: function(classNames, css){
                var tem, C= (classNames()||'').split(/\s+/), A=[];    
                while(C.length){
                    tem= C.shift();
                    if(tem && tem!= css) A[A.length]= tem;
                }
                A[A.length]= css;
                return classNames(A.join(' '));   
            }
            ,removeClass: function(classNames, css){
                var C= classNames();    
                
                if (C && C.indexOf(css) > -1)
                    C = C.replace(css, '');
                return classNames(C);   
            }
            ,
            setIsAvailable: function (dragItem, dropItem) {
                var self = this;

                //todo: implement by un-commenting below
                var dd = dragItem;
                //                var dragItem = $(args[2].drag);
                //                var dragData = dragItem.data("dragdata");
                //                var dragViewModel = dragData.viewModel;
                //                if ('undefined' == typeof dragViewModel)
                //                    return;

                //                var dragModel = dragViewModel.model;

                //                var dropItem = $(args[0].target);
                //                var dropData = dropItem.data("dropdata");
                //                var dropViewModel = dropData.viewModel;
                //                if ('undefined' == typeof dropViewModel)
                //                    return;

                //                var dropModel = dropViewModel.model;

                if (dd && dd.available && self.id) {
                    var el;
                    for (var i = 0; i < dd.available.length; i++) {
                        el = dd.available[i];

                        if ($(el).is('#' + self.id())) {
                            self.isAvailable(true);
                            dd.update();
                            return;
                        }
                    }
                }

                self.isAvailable(false);
            }
            
        ,

        othersDragEnded: function (dragModel, dragViewModel, args, prom) {
            var self = this;
            
            if (!self.showMe())
                return;

            if (dragViewModel.isA(circleverse.viewModel.ToolViewModel) && self.isA(circleverse.viewModel.ToolViewModel) && !self.isA(circleverse.viewModel.helpViewModel) && !dragViewModel.isA(circleverse.viewModel.helpViewModel)){
                return;
            }

            
            if (self.isA(circleverse.viewModel.OpenViewModel) && dragViewModel.canOpen()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.NewViewModel) && dragViewModel.canCreate()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.SaveViewModel) && dragViewModel.canSave()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.EditViewModel) && dragViewModel.canEdit()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.TravelViewModel) && dragViewModel.canTravel && dragViewModel.canTravel()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.garbageViewModel) && dragViewModel.canDelete()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.CloseViewModel) && dragViewModel.canClose()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.SearchViewModel) && dragViewModel.canSearch()){
                self.isAvailable(false);
            }
            else if (self.isA(circleverse.viewModel.helpViewModel) && dragViewModel.canHelp()){
                self.isAvailable(false);
            }

            else if (dragViewModel.isA(circleverse.viewModel.OpenViewModel) && self.canOpen()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.NewViewModel) && self.canCreate()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.SaveViewModel) && self.canSave()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.EditViewModel) && self.canEdit()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.TravelViewModel) && self.canTravel && self.canTravel()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.garbageViewModel) && self.canDelete()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.CloseViewModel) && self.canClose()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.SearchViewModel) && self.canSearch()){
                self.isAvailable(false);
            }
            else if (dragViewModel.isA(circleverse.viewModel.helpViewModel) && self.canHelp()){
                self.isAvailable(false);
            }
        }
        ,

        othersDragStarted: function (dragModel, dragViewModel, args, prom) {
            var self = this;
            
            if (!self.showMe())
                return;

            if (dragViewModel.isA(circleverse.viewModel.ToolViewModel) && self.isA(circleverse.viewModel.ToolViewModel) && !self.isA(circleverse.viewModel.helpViewModel) && !dragViewModel.isA(circleverse.viewModel.helpViewModel)){
                return;
            }

            if (self.isA(circleverse.viewModel.OpenViewModel) && dragViewModel.canOpen()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.NewViewModel) && dragViewModel.canCreate()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.SaveViewModel) && dragViewModel.canSave()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.EditViewModel) && dragViewModel.canEdit()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.TravelViewModel) && dragViewModel.canTravel && dragViewModel.canTravel()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.garbageViewModel) && dragViewModel.canDelete()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.CloseViewModel) && dragViewModel.canClose()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.SearchViewModel) && dragViewModel.canSearch()){
                self.isAvailable(true);
            }
            else if (self.isA(circleverse.viewModel.helpViewModel) && dragViewModel.canHelp()){
                self.isAvailable(true);
            }

            else if (dragViewModel.isA(circleverse.viewModel.OpenViewModel) && self.canOpen()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.NewViewModel) && self.canCreate()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.SaveViewModel) && self.canSave()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.EditViewModel) && self.canEdit()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.TravelViewModel) && self.canTravel && self.canTravel()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.garbageViewModel) && self.canDelete()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.CloseViewModel) && self.canClose()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.SearchViewModel) && self.canSearch()){
                self.isAvailable(true);
            }
            else if (dragViewModel.isA(circleverse.viewModel.helpViewModel) && self.canHelp()){
                self.isAvailable(true);
            }
            
            // if (!self.__upTree(self, dragViewModel) && !self.__downTree(self, dragViewModel) && self.showMe())
            //     self.isAvailable(true);
        }
        ,
        // showHelp: function(){
        //     //overriders should return true;
        //     return false;
        // }
        // ,

        showHelp: function(){
            var self = this;

            var dialogOptions = {template: self.helpTemplateName(), fromElement: '.screen', type: 'message', dimensions: {width: 400, height: 400}, vms: {}, title: 'Help'};
            dialogOptions.vms[self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1)] = self;

            self.eventAggregator.publish('dialog.message.open', dialogOptions); 
        }
        ,

        __upTree: function(me, dragViewModel){
            var self = this;

            if (dragViewModel == me){
                return true;
            }

            if (me.parent)
                return self.__upTree(me.parent, dragViewModel);

            return false; 
        }
        ,

        __downTree: function(me, dragViewModel){
            var self = this;

            if (dragViewModel == me){
                return true;
            }

            if (me.childViewModels){
                var children = me.childViewModels(), len = children.length;

                for (var i = 0; i < len; i++) {
                    if (self.__downTree(children[i], dragViewModel))
                        return true;
                }
            }

            return false; 
        }
        });
    //})();

