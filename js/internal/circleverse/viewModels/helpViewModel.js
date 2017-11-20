eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.helpViewModel = (function () {


    var initSize = 60;

    return new JS.Class('circleverse.viewModel.helpViewModel', circleverse.viewModel.ResizeableBase, {
        include: [circleverse.viewModel.ToolViewModel,
            becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 100;
            var minLeft = 180;

            var calcTop = (($(window).height()) - this.dimensions().height) - 25;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 1.3) - (this.dimensions().width / 1.3))) * .9;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
            ,

        onresize: function (e, data) {
            this.callSuper();


            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            //log('garbage position: ' + this.position().top);
        }
             ,

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties

            var self = this;
            self.size = ko.observable(initSize);
            this.location = ko.observable();
            //left: scale() * 300, top:,
            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            self.label("Help");

            
            var subscriptions = [];

            var evaluatevisibility = function(activeThings){
                var show = false;
                for (var i = 0; i < activeThings.length; i++){
                    var activeThing = activeThings[i]; 
                    if (activeThing.canHelp){                   

                        //purge all subscriptions
                        for (var h = 0; h < subscriptions.lenght; h++){
                            subscriptions[h].dispose(); 
                        }
                        subscriptions = [];
                        
                        //add subscriptions back TO ALL ACTIVE THINGS, in case one of them changes their mind
                        var subscription = activeThing.canHelp.subscribe(function(){
                            self.globalSettings.eventAggregator.publish('stage.activeThings.changed', self);
                        });

                        subscriptions.push(subscription);

                        if (!show && activeThing.canHelp()) show = true;
                    }
                }
                self.showMe(show);
            };

            globalSettings.eventAggregator.subscribe('stage.activeThings.changed', function(eventName, activeThings){
                evaluatevisibility(activeThings);                
            });

            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });

            self.focus(false);
            self.canCreate(false);
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(false);
            self.canRefresh(false);
            self.canSave(false);
            self.canOpen(true);
            self.canClose(false);
            self.canHelp(false);

            self.mainCss('help');
            
            this.icon.name('icon-question icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
        }
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)) {
                prom.then(function(){
                    self.globalSettings.app.openAppHelp();
                });
            }
            else{
                if (!dropViewModel.showHelp()){
                    self.showGenericHelp();
                }
            }

            return prom;
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            if (dragVm.isA(circleverse.viewModel.OpenViewModel)) {

                prom.then(function(){
                    self.globalSettings.app.openAppHelp();
                });
            }
            else{
                if (!dragVm.showHelp()){
                    self.showGenericHelp();
                }
            }

            return prom;
        }
        ,

        showGenericHelp: function(){
            var self = this;

            var dialogOptions = {template: self.helpTemplateName(), fromElement: '.screen', type: 'message', dimensions: {width: 400, height: 300}, vms: {}, title: 'Help'};
            dialogOptions.vms[self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1)] = self;

            self.eventAggregator.publish('dialog.message.open', dialogOptions); 
        }


    });
})();
