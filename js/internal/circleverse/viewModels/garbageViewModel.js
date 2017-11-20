eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.garbageViewModel = (function () {

    var initSize = 60;

 return new JS.Class('circleverse.viewModel.garbageViewModel', circleverse.viewModel.ResizeableBase, {
        include: [circleverse.viewModel.ToolViewModel,
            becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule,
            becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 40;
            var minLeft = 250;

            var calcTop = (($(window).height()) - this.dimensions().height) - 25;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = (($(window).width() - this.dimensions().width)) - 30;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

//            log('garbage left: ' + left);
//            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties

            var self = this;
            self.size = ko.observable(initSize);
            this.location = ko.observable();
            //left: scale() * 300, top:,
            
            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });


            self.label("Trash");
            
            var subscriptions = [];

            var evaluatevisibility = function(activeThings){
                var show = false;
                for (var i = 0; i < activeThings.length; i++){
                    var activeThing = activeThings[i]; 
                    if (activeThing.canDelete){                   

                        //purge all subscriptions
                        for (var h = 0; h < subscriptions.lenght; h++){
                            subscriptions[h].dispose(); 
                        }
                        subscriptions = [];
                        
                        //add subscriptions back TO ALL ACTIVE THINGS, in case one of them changes their mind
                        var subscription = activeThing.canDelete.subscribe(function(){
                            self.globalSettings.eventAggregator.publish('stage.activeThings.changed', self);
                        });

                        subscriptions.push(subscription);

                        if (!show && activeThing.canDelete()) show = true;
                    }
                }
                self.showMe(show);
            };

            globalSettings.eventAggregator.subscribe('stage.activeThings.changed', function(eventName, activeThings){
                evaluatevisibility(activeThings);                
            });
            


            self.mainCss('trash');
            
            this.icon.name('icon-trash-o icon-size-2x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
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
        droppedOn: function (dragModel, dragVm) {
            // if (JS.Interface.implements(dragVm, becu_org.ui.IDeletable)) {
            //     if (dragVm.canDeleteNow()) {
            //         dragVm.deleteNow(true);
            //     }

            // }
        }


    });
})();
