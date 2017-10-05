eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.TravelViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.TravelViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule],


        __getCoords: function () {
            var minTop = 100;
            var minLeft = 20;

            var calcTop = (($(window).height()) - (this.dimensions().height * 3)) - 25;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() - this.dimensions().width)) - 30);
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

            self.label("Travel");
            
            var subscription = null;
            globalSettings.eventAggregator.subscribe('circleverse.spotlightContext', function(eventName, args){
                if (args.canTravel){
                    self.showMe(args.canTravel());
                    if (subscription) subscription.dispose();

                    subscription = args.canTravel.subscribe(function(){
                        self.showMe(args.canTravel());
                    });
                }
                else{                    
                    self.showMe(false);
                }
            });
            
            this.icon.name('icon-airplane icon-size-2x');
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
