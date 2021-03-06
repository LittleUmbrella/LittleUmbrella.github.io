﻿eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.OpenViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.OpenViewModel', circleverse.viewModel.ResizeableBase, {
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

            self.memberIcon = ko.observable('icon-enter icon-size-2x');

            //if (self.globalSettings['tindr'].value() == true) {
            if (opts && opts['tindr'] && opts['tindr'] == true) {
                var calcLeft = ((($(window).width() - this.dimensions().width)) - 20);

                self.dimensions({ height: $(window).height(), width: 500 });
                
                this.location({ left: calcLeft + 40, top: 0 });
            }
            else{
                self.contentTemplate('standardContentTemplate');
                self.label("Open");
            }


            
            var subscriptions = [];

            var evaluatevisibility = function(activeThings){
                var show = false;
                //purge all subscriptions
                for (var h = 0; h < subscriptions.lenght; h++){
                    subscriptions[h].dispose(); 
                }
                subscriptions = [];
                for (var i = 0; i < activeThings.length; i++){
                    var activeThing = activeThings[i];  
                    if (activeThing.canOpen){    
                        
                        // //add subscriptions back TO ALL ACTIVE THINGS, in case one of them changes their mind
                        // var subscription = activeThing.canOpen.subscribe(function(val){
                        //     if (val){
                        //         self.globalSettings.eventAggregator.publish('stage.activeThings.add', activeThing);
                        //     }
                        //     else{                                
                        //         self.globalSettings.eventAggregator.publish('stage.activeThings.remove', activeThing);
                        //     }
                        // });

                        // subscriptions.push(subscription);

                        if (!show && activeThing.canOpen()) show = true;
                    }
                }
                self.showMe(show);
            };

            globalSettings.eventAggregator.subscribe('stage.activeThings.changed', function(eventName, activeThings){
                evaluatevisibility(activeThings);                
            });
            
            

            self.mainCss('open');
            
            this.icon.name('icon-enter icon-size-2x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }


    });
})();
