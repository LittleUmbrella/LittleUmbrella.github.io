eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.OpenViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.OpenViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            //circleverse.viewModel.satellite, 
            //circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule, 
            becu_org.ui.viewModel.circleModule,
            circleverse.viewModel.SpecialViewViewModel,
            becu_org.ui.viewModel.labelModule
            ],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 180;

            var calcTop = 0;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 2) - (this.dimensions().width / 2)));
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;
            this.location = ko.observable();

            var settings = {
                itemDiameter: initSize + 5,
                startSatellitesOnEdge: false,
                startingDegree: 230,
                evenDistribution: false
            };
            
            self.callSuper(object, parent, globalSettings, settings);

            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            self.settings = $.extend(self.settings || {}, { dropFilter: '.searchable' }, opts);

            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            //properties
             // = ko.observableArray([]);

            self.size = ko.observable(initSize);
            //this.location = ko.observable();
            //left: scale() * 300, top:,

            
            //this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.animationSettings = ko.observable({width: self.parent.dimensions().width, height: self.parent.dimensions().height, callback: self.toggleFormAnimationEnded});

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });

            self.memberIcon = ko.observable('icon-enter icon-size-2x');

            self.label("Open");
            
            var subscription = null;
            globalSettings.eventAggregator.subscribe('circleverse.spotlightContext', function(eventName, args){
                self.showMe(args.canOpen());
                if (subscription) subscription.dispose();

                subscription = args.canClose.subscribe(function(){
                    self.showMe(args.canOpen());
                });
            });
            
            this.icon.name('icon-enter icon-size-2x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }
            ,

        toggleChildrenVisibility: function(){
            var self = this;
            self.callSuper();

            
            if (!self.parent.mainFormOpen){
                self.parent.searchRequested(self);
            }
        }
        ,

        toggleMainForm: function(){
            var self = this;

            self.parent.toggleMainForm(self);
        }
        ,

        toggleFormAnimationEnded: function(){
            var self = this;

            self.parent.toggleFormAnimationEnded(self);
            if (!self.parent.mainFormOpen){
                self.toggleChildrenVisibility();
            }
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
