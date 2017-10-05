﻿
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AllMembersViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AllMembersViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            /*circleverse.viewModel.satellite, */
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule,
            becu_org.ui.viewModel.circleModule,
            //becu_org.ui.viewModel.labelModule
            ],


        __getCoords: function () {
            var self = this;

            var minTop = 0;
            var minLeft = 210;

            // var calcTop = 20;
            // var top = (calcTop < minTop) ? minTop : calcTop;

            // var calcLeft = (($(window).width() - this.dimensions().width)) * .7;
            // var left = (calcLeft < minLeft) ? minLeft : calcLeft;
            var top = (self.globalSettings.globalDimensions.height /2 ) - self.size() /2;
            var left = (self.globalSettings.globalDimensions.width /2 ) - self.size() /2;
            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        },

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var initSize = 70;

            //properties
            self.globalSettings = globalSettings;
            self.eventAggregator = globalSettings.eventAggregator;
            
 self.size = ko.observable(initSize);
            var coords = self.__getCoords();
            if (!self.opacity)
                self.opacity = ko.observable(1);
            self.location = ko.observable();
            self.location({ left: coords.left, top: coords.top });

            self.dimensions = ko.observable({ height: initSize, width: initSize });

            this.callSuper();

            
            self.dimensions({ height: initSize, width: initSize });


// var settings = {
//                 itemDiameter: initSize + 5,
//                 startSatellitesOnEdge: false,
//                 startingDegree: 230,
//                 evenDistribution: false
//             };

//             self.callSuper(object, parent, globalSettings, settings);

            //this.callSuper();



            self.foundItems = ko.observableArray();

            globalSettings.eventAggregator.subscribe('customer.login.attempt', function (topic, data) {
                self.getCustomer(data);
            });

            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/male-female48x48.png")');
            this.icon.name('icon-group icon-size-2x');

            
            self.searchViewModel = new circleverse.viewModel.SearchMembersViewModel(null, self, globalSettings);

            self.childViewModels.push(self.searchViewModel);


            
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(true);
            self.canOpen(false);
            self.canClose(false);
            self.canSave = ko.observable(false);

            self.childViewModels.subscribe(function(changes){
                if (self.childViewModels().length > 0){
                    self.canOpen(true);
                    self.canClose(true);
                }
                else{
                    self.canOpen(false);
                    self.canClose(false);
                }
            });

            //self.label("All Members");

            //search
            self.taxId = ko.observable();
            self.id = ko.observable();
        }

            ,
        dblclick: function (data, e) {
            //show help




        }
        
        // ,

        // getSettings: function () {
        //     var settings = this.callSuper();
        //     settings.drop = '.account, .trash, .settings, .help, .search';
        //     return settings;
        // }
        //            ,


        //        close: function () {
        //            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
        //            //refactor to ask service/domain to close
        //            //this.from.amount();
        //            this.closeAccountVm.hideCloseForm(true);
        //            //}
        //        }
            ,

        findCustomers: function () {
        }
        ,

        popAnimationEnded: function () {
            var self = this;

        }
        ,


        pop: function () {
            var self = this;


        }
        ,
        getCustomer: function (getArgs) {            
            var self = this;

            self.repository.getCustomer(getArgs).then(function(cust){
                self.eventAggregator.publish('customer.found', cust);
            });
        }
        ,

        showSearch: function(){
            var self = this;


        }
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.SearchViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                
                self.searchInitiated(prom);

            }
        }
            ,

        droppedOn: function (dragModel, dragViewModel, args, prom) {
            var self = this;
            
            //this.model().callSpec().add(dragModel);
            if (dragViewModel.isA(circleverse.viewModel.SearchViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                
                self.searchInitiated(prom);
            }
        }
        ,

        searchInitiated: function(prom){
            var self = this;

            prom.then(function(){
                var popProm = self.toggleChildrenVisibility();
                popProm.then(function(){
                    //self.searchRequested(self.searchViewModel);
                    self.searchViewModel.showMainForm();
                });
            });
        }

    });
})();
