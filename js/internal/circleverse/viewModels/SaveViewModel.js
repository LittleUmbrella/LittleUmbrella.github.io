eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SaveViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.SaveViewModel', circleverse.viewModel.ResizeableBase, {
        include: [circleverse.viewModel.ToolViewModel,becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule,
        becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 180;

            var calcTop = 0;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 3) - (this.dimensions().width / 3))) * .9;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties
             // = ko.observableArray([]);

            var self = this;
            self.size = ko.observable(initSize);
            this.location = ko.observable();
            //left: scale() * 300, top:,

            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });

            self.label("Submit");
            
            var subscription = null;
            globalSettings.eventAggregator.subscribe('circleverse.spotlightContext', function(eventName, args){
                self.showMe(args.canSave());
                if (subscription) subscription.dispose();

                subscription = args.canSave.subscribe(function(){
                    self.showMe(args.canSave());
                });
            });

            
            this.icon.name('icon-checkmark icon-size-2x');
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
//            if (JS.Interface.implements(dragVm, becu_org.ui.IDeletable)) {
//                if (dragVm.canDeleteNow()) {
//                    dragVm.deleteNow(true);
//                }

//            }
        }


    });
})();
