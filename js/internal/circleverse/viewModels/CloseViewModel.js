eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CloseViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.CloseViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            circleverse.viewModel.ToolViewModel,
            becu_org.ui.viewModel.baseModule, 
            //circleverse.viewModel.satellite, 
            //circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule, 
            becu_org.ui.viewModel.circleModule,
            circleverse.viewModel.SpecialViewViewModel,
            becu_org.ui.viewModel.labelModule,
            circleverse.viewModel.SpecialContentViewViewModel
            ],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 310;

            var calcTop = 0;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = (($(window).width() - this.dimensions().width)) - 20;
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

            
            self.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


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

            self.memberIcon = ko.observable('icon-search icon-size-2x');


            //if (self.globalSettings['tindr'].value() == true) {
            if (opts && opts['tindr'] == true) {
                
                self.dimensions({ height: $(window).height(), width: 500 });
                
                this.location({ left: -460, top: 0 });
            }
            else{
                self.contentTemplate('standardContentTemplate');
                self.label("Close");
            }

            var subscriptions = [];

            var evaluatevisibility = function(activeThings){
                var show = false;  //purge all subscriptions
                for (var h = 0; h < subscriptions.lenght; h++){
                    subscriptions[h].dispose(); 
                }
                subscriptions = [];
                for (var i = 0; i < activeThings.length; i++){  
                    var activeThing = activeThings[i];
                    
                    if (activeThing.canClose){ 
                        
                        // //add subscriptions back TO ALL ACTIVE THINGS, in case one of them changes their mind
                        // var subscription = activeThing.canClose.subscribe(function(val){
                        //     if (val){
                        //         self.globalSettings.eventAggregator.publish('stage.activeThings.add', activeThing);
                        //     }
                        //     else{                                
                        //         self.globalSettings.eventAggregator.publish('stage.activeThings.remove', activeThing);
                        //     }
                        // });

                        // subscriptions.push(subscription);

                        if (!show && activeThing.canClose()) show = true;
                    }
                }
                self.showMe(show);
            };

            globalSettings.eventAggregator.subscribe('stage.activeThings.changed', function(eventName, activeThings){
                evaluatevisibility(activeThings);                
            });

            self.mainCss('close');
            
            this.icon.name('icon-close2 icon-size-2x');
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
