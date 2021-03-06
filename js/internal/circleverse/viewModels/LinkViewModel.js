﻿eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.LinkViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.LinkViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 180;

            var calcTop = 0;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 3) - (this.dimensions().width / 3))) * .6;
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

            self.label("Edit");
            
            var subscription = null;
            globalSettings.eventAggregator.subscribe('circleverse.spotlightContext', function(eventName, args){
                if (!args.canLink) return;
                
                self.showMe(args.canLink());
                if (subscription) subscription.dispose();

                subscription = args.canLink.subscribe(function(){
                    self.showMe(args.canLink());
                });
            });
            
            this.icon.name('icon-pencil icon-size-2x');
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


    });
})();
