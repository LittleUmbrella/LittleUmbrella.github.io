
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.DialogConfirmViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    
    var initSize = 70;
    return new JS.Class('circleverse.viewModel.DialogConfirmViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule
            //,
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
            var top = (self.globalSettings.globalDimensions.height /2 ) - self.dimensions().height /2;
            var left = (self.globalSettings.globalDimensions.width /2 ) - self.dimensions().width /2;
            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        },
        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            self.size = ko.observable(initSize);

            self.callSuper();

            var dimensions = {};
            dimensions.width = (object.dimensions.width > globalSettings.globalDimensions.width)? globalSettings.globalDimensions.width - 160: object.dimensions.width;
            dimensions.height = (object.dimensions.height > globalSettings.globalDimensions.height)? globalSettings.globalDimensions.height - 160: object.dimensions.height; 
            
            self.dimensions(dimensions);

            self.size(dimensions.width);

            //this.label("Addresses");


            var pos = self.__getCoords();
            self.location = ko.observable(pos);
            // if (changes.length > 1){                    
            //     self.childViewModels.push(new circleverse.viewModel.CustomerAddressesViewModel(self.rawModel(), self, globalSettings));
            // }
            // else{
            //     self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel(), self, globalSettings));
            // }

            self.title = ko.observable(object.title);
            self.message = ko.observable();

            self.type = ko.observable(object.type);
            self.fromElement = ko.observable(object.fromElement);

            self.stakeholders = ko.observable(object.vms);
            
            self.messageTemplate = ko.observable(object.template);
            
            // self.rawModel().addresses.subscribe(function(changes){                
            //     self.childViewModels.removeAll();
            //     if (changes.length > 1){                    
            //         self.childViewModels.push(new circleverse.viewModel.CustomerAddressesViewModel(self.rawModel(), self, globalSettings));
            //     }
            //     else{
            //         self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel(), self, globalSettings));
            //     }

            // }, null, "change");
            
            
            self.canOpen(true);
            self.canCreate(false);
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(false);
            self.canRefresh(false);
            self.canSave(false);
            self.canClose(true);
            self.canHelp(false); 

            self.__loadedChildren = false;
        }
        ,

        showMainForm: function(){
            var self = this;
//return;
        }
        ,

        hideMainForm: function(){
            var self = this;
            
            // self.title(null);
            // self.message(null);
            // self.messageTemplate(null);
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
                vms[n].dialogClosed(vms);
            }

            self.close();
            
        }
        ,        
        publishConfirmAndClose: function () {
            var self = this, vms = self.model().vms;

            for (var n in vms){
                vms[n].dialogConfirmed(vms);
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
            //settings.drop = false;
            return settings;
        }
            ,



        close: function () {
            var self = this;

            self.globalSettings.eventAggregator.publish('stage.activeThings.remove', self);

            //self.parent.allDialogs.remove(self);
            self.deleteNow(true);
        }

    });
})();
