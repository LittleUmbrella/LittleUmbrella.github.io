﻿eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.NewViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.NewViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule, 
            becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 100;
            var minLeft = 20;

            var calcTop = (($(window).height()) - (this.dimensions().height * 3)) - 25;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = 20;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper(object, parent, globalSettings);
            //properties

            var self = this;
            this.location = ko.observable();
            //left: scale() * 300, top:,

            self.size = ko.observable(initSize);
            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            self.settings = $.extend(self.settings || {}, { dropFilter: '.filterable' }, opts);

            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });

            self.label("New");
            
            var subscription = null;
            globalSettings.eventAggregator.subscribe('circleverse.spotlightContext', function(eventName, args){
                self.showMe(args.canCreate());
                if (subscription) subscription.dispose();

                subscription = args.canClose.subscribe(function(){
                    self.showMe(args.canCreate());
                });
            });

            this.icon.name('icon-plus icon-size-2x');
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
