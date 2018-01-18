eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.DialogViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance
    
    var initSize = 70;
    return new JS.Class('circleverse.viewModel.DialogViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule
        ],

        initialize: function (config, parent, globalSettings) {

            //properties
            var self = this;
            self.size = ko.observable(initSize);

            self.callSuper();

            var globalDimensions = globalSettings.globalDimensions, 
                dimensions = {
                    width: (config.dimensions.width > globalDimensions.width)? globalDimensions.width - globalSettings.actionArea.size: config.dimensions.width,
                    height: (config.dimensions.height > globalDimensions.height)? globalDimensions.height - globalSettings.actionArea.size: config.dimensions.height
                };    
            
            self.dimensions(dimensions);

            self.size(dimensions.width);

            var pos = self.__getCoords();
            self.location = ko.observable(pos);

            self.title = ko.observable(config.title);
            self.message = ko.observable();
            self.type = ko.observable(config.type);
            self.fromElement = ko.observable(config.fromElement);
            self.stakeholders = ko.observable(config.vms);            
            self.messageTemplate = ko.observable(config.template);
            
            
            //action settings
            self.canOpen(true);
            self.canCreate(false);
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(false);
            self.canRefresh(false);
            self.canSave(false);
            self.canClose(true);
            self.canHelp(false); 
        }
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)) {
                
                self.publishCloseAndClose();
            }
            else if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)) {
                prom.then(function(){
                    self.publishConfirmAndClose();
                });
            }
        }
        ,

        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            if (dragVm.isA(circleverse.viewModel.CloseViewModel)) {
                
                self.publishCloseAndClose();
            }
            else if (dragVm.isA(circleverse.viewModel.OpenViewModel)) {
                prom.then(function(){
                    self.publishConfirmAndClose();
                });
            }
        }
        ,        

        publishCloseAndClose: function () {
            var self = this, vms = self.model().vms;

            for (var n in vms){
                if (vms[n].dialogClosed) vms[n].dialogClosed(vms);
            }

            self.close();
            
        }
        ,        

        publishConfirmAndClose: function () {
            var self = this, vms = self.model().vms;

            for (var n in vms){
                if (vms[n].dialogConfirmed) vms[n].dialogConfirmed(vms);
            }
            
            self.close();
        }
        ,

        toggleMainForm: function () {
            this.showForm(!this.showForm());
        }
        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = ".open, .close";
            settings.bounceBackOnDropEnd = false;

            return settings;
        }
        ,

        close: function () {
            var self = this;

            self.globalSettings.eventAggregator.publish('stage.activeThings.remove', self);

            self.deleteNow(true);
        }
        ,
        
        __getCoords: function () {
            var self = this;

            var minTop = 0,
                minLeft = 210,
                globalDimensions = self.globalSettings.globalDimensions,
                top = (globalDimensions.height /2 ) - self.dimensions().height /2,
                left = (globalDimensions.width /2 ) - self.dimensions().width /2;
                
            return { left: left, top: top };
        }
    });
})();
