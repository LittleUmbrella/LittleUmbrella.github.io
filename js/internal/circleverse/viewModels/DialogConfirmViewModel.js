
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.DialogConfirmViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
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
            var top = (self.globalSettings.globalDimensions.height /2 ) - initSize /2;
            var left = (self.globalSettings.globalDimensions.width /2 ) - initSize /2;
            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        },
        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            var initSize = 70;
            self.size = ko.observable(initSize);
            //properties
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(initSize);
            this.insideDiameter = 40;

 self.size = ko.observable(initSize);

            this.callSuper();

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            //this.label("Addresses");

            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.name('icon-address icon-size-2x');

            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//

            var pos = __getCoords();
            self.position = ko.observable(pos);
            // if (changes.length > 1){                    
            //     self.childViewModels.push(new circleverse.viewModel.CustomerAddressesViewModel(self.rawModel(), self, globalSettings));
            // }
            // else{
            //     self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel(), self, globalSettings));
            // }

            self.title = ko.observable();
            self.message = ko.observable();
            
            self.messageTemplate = ko.observable();
            
            // self.rawModel().addresses.subscribe(function(changes){                
            //     self.childViewModels.removeAll();
            //     if (changes.length > 1){                    
            //         self.childViewModels.push(new circleverse.viewModel.CustomerAddressesViewModel(self.rawModel(), self, globalSettings));
            //     }
            //     else{
            //         self.childViewModels.push(new circleverse.viewModel.CustomerAddressViewModel(self.rawModel(), self, globalSettings));
            //     }

            // }, null, "change");

            
            self.canSave(false);
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
            
            self.title(undefined);
            self.message(undefined);
            self.messageTemplate(undefined);
        }
            ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen){                        
                        self.hideMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                    else{
                        self.showMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    self.showMainForm().then(function(){
                        //if (self.callSuper) self.callSuper();
                    });
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.SaveViewModel) || dropViewModel.isA(circleverse.viewModel.SaveViewModel)) {
                prom.then(function(){
                    self.findIndividuals();
                });

                
                if (self.callSuper) self.callSuper();
            }
            else{
                
                if (self.callSuper) self.callSuper();
            }

            
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            if (dragVm.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    if (self.mainFormOpen){                        
                        self.hideMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                    else{
                        self.showMainForm().then(function(){
                            //if (self.callSuper) self.callSuper();
                        });
                    }
                });
            }
            else if (dragVm.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    self.showMainForm().then(function(){
                        //if (self.callSuper) self.callSuper();
                    });
                });
            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel) || dragVm.isA(circleverse.viewModel.SaveViewModel)) {               

                prom.then(function(){
                    self.findIndividuals();
                });

                if (self.callSuper) self.callSuper();
            }
            else{
                
                if (self.callSuper) self.callSuper();
            }
        }
        ,

        toggleMainForm: function () {
            this.showForm(!this.showForm());
        }

        ,

        getSettings: function () {
            var settings = this.callSuper();
            //settings.drop = false;
            return settings;
        }
            ,



        close: function () {
            this.hideCloseForm(true);
        }

    });
})();
