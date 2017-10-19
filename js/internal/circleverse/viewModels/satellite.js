
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.satellite = (function () {

    

    return new JS.Module('circleverse.viewModel.satellite', {

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this, safeSettings = opts || globalSettings || {};

            if (!globalSettings.eventAggregator)
                throw new Error('opts.eventAggregator cannot be null');

            this.callSuper();
            //properties

            self.eventAggregator = globalSettings.eventAggregator;

            self.parent = parent;

            if (!self.children)
                self.children = ko.observableArray();

            self.showMe(false);


            self.showMe.subscribe(function (val) {
                self.parent.reevaluateShadowState();
            });


            this.viewIcon = {};

            this.viewIcon.name = 'icon-eye';
            this.viewIcon.color = '#56aee0';

            if (!self.childViewModels)
                self.childViewModels = ko.observableArray();

            if (!self.dimensions)
                self.dimensions = ko.observable({width: 0, top:0});
            
            if (!self.opacity)
                self.opacity = ko.observable(1);

            

            self.__overridden = false;

            self.__loc = ko.observable({ left: 0, top: 0 });

            self.__settings = ko.dependentObservable(function(){
                var parentSize = parent.size, selfSize = self.size;

                selfSize = 'undefined' == typeof (selfSize) ? 0 : selfSize();
                parentSize = 'undefined' == typeof (parentSize) ? 0 : parentSize();

                var settings = {
                    collection: 'undefined' == typeof (safeSettings.collection) ? parent.childViewModels() : ko.unwrap(safeSettings.collection)
                    , item: 'undefined' == typeof (safeSettings.item) ? self : safeSettings.item
                    , itemDiameter: selfSize //typeof (safeSettings.itemDiameter) ? selfSize : safeSettings.itemDiameter
                    , minCenterDiameter: 'undefined' == typeof (safeSettings.minCenterDiameter) ? parentSize : safeSettings.minCenterDiameter
                    , itemSeparation: 'undefined' == typeof (safeSettings.itemSeparation) ? 0 : safeSettings.itemSeparation
                    , itemPadding: 'undefined' == typeof (safeSettings.itemPadding) ? self.borderWidth : safeSettings.itemPadding
                    , evenDistribution: 'undefined' == typeof (safeSettings.evenDistribution) ? true : safeSettings.evenDistribution
                    , centerPadding: 'undefined' == typeof (safeSettings.centerPadding) ? parent.borderWidth : safeSettings.centerPadding
                    , center: 'undefined' == typeof (safeSettings.center) ? { x: parentSize / 2, y: parentSize / 2 } : safeSettings.center
                    , noOverLap: 'undefined' == typeof (safeSettings.noOverLap) ? true : safeSettings.noOverLap
                    , startingDegree: 'undefined' == typeof (safeSettings.startingDegree) ? 270 : safeSettings.startingDegree
                    , shiftItemsBy: 'undefined' == typeof (safeSettings.shiftItemsBy) ? 0 : safeSettings.shiftItemsBy
                    , startSatellitesOnEdge: 'undefined' == typeof (safeSettings.startSatellitesOnEdge) ? true : safeSettings.startSatellitesOnEdge
                };

                return settings;
            })

            self.location = ko.dependentObservable({
                read: function () {
                    return self.getCalculatedLocation();
                },
                deferEvaluation: true
                ,
                write: function (val) {
                    self.__overridden = true;
                    self.__loc(val);
                }
            });

            

            self.center = ko.pureComputed({
                read: function () {
                    return {top: self.location().top + (self.dimentions().height/2), left: self.location().left + (self.dimentions().width/2)};
                },
                deferEvaluation: true
                
            });

            self.popDuration = null;
            self.popAnimationLength = 0.7;

            self.popped = false; //need a non-observable for binding that doesn't trigger the binding again'

            self.popToggle = ko.observable(self.popped);

            self.popToggle.subscribe(function(val){
                self.popped = val;
            });

            self.__popAnimationEndedTemplate = function () {
                
                if (!self.popToggle()) {
                    self.showMe(false);
                }
                else {
                    self.eventAggregator.publish('circleverse.viewModel.satellite.popped.out', self);
                }
            };

            self.popAnimationEnded = self.__popAnimationEndedTemplate;

            if (!self.isA(circleverse.viewModel.PinViewModel))
                self.pinViewModel = new circleverse.viewModel.PinViewModel(object, self, globalSettings, opts);
        }
        ,

        getCalculatedLocation: function () {
            var self = this;

            if (self.__overridden)
                return self.__loc();

            var settings = self.__settings();

            var pos = { x: 0, y: 0 };

            settings.collection = settings.collection.filter(function (data) {
                if (null == ko.unwrap(data)) return true;
                return !ko.unwrap(data).isA(circleverse.viewModel.SatelliteNavigatorViewModel);
            });

            if (0 < settings.collection.length) {
                if (settings.item.isA && settings.item.isA(circleverse.viewModel.NavigableSatellite)) {
                    var items = settings.collection.filter(function (data) {
                        return ko.unwrap(data) == settings.item;
                    });

                    if (items.length > 0) {
                        settings.item = items[0];
                        pos = littleUmbrella.circleverse.ui.shapes.satellite.getPosition(settings);
                    }

                }
                else if (settings.collection.indexOf(settings.item) > -1) {
                    pos = littleUmbrella.circleverse.ui.shapes.satellite.getPosition(settings);
                }
            }

            if (self.__loc().left != pos.x || self.__loc().top != pos.y)
                self.__loc({ left: pos.x, top: pos.y });

            return self.__loc();
        }
        ,

        //togglePin: function (pinnable) {
        //    var self = this;
        //    if (!pinnable) return;

        //    var len = pinnable.length;

        //    for (var i = 0; i < len; i++) {
        //        var pin = pinnable[i];

        //        pin.pinState(!pin.pinState());
        //    }
        //}
        //,


        popAnimationEnded: undefined
        ,


        pop: function () {
            var self = this;
            
            var deferred = jQuery.Deferred();

            self.popAnimationEnded = function(){
                if (self.showMe() != self.popToggle()) //if no change, don't bother, but do release promise
                    self.__popAnimationEndedTemplate();
                deferred.resolve();
            }


            self.popToggle(!self.popToggle());
            if (self.popToggle()) {
                self.showMe(true);
            }

            return deferred;
        }
    });
})();


//child in lime light
//in lime light, with child in lime light
//
circleverse.viewModel.pedigreeState = (function () {

    return new JS.Class('circleverse.viewModel.pedigreeState', circleverse.viewModel.ResizeableBase, {
    });

})();


circleverse.viewModel.PinViewModel = (function () {



    return new JS.Class('circleverse.viewModel.PinViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            circleverse.viewModel.satellite,
            becu_org.ui.viewModel.draggableModule,
            becu_org.ui.viewModel.droppableModule,
        ],

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;

            self.parent = parent;
            var initSize = 20; self.size = ko.observable(initSize);
            //properties
            var settings = {
                collection: [self],
                minCenterDiameter: parent.size() - ((initSize*2) + 6),
                startSatellitesOnEdge: true,
                startingDegree: 320,
                evenDistribution: false,
                eventAggregator: globalSettings.eventAggregator, dropFilter: '.pin'
            };

            self.callSuper(object, parent, globalSettings, settings);
            //properties

            self.size(initSize);
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });



            self.icon.name('icon-thumb-tack fa-rotate-90');
            self.icon.color('#8fc9eb');


            //self.pinPals
            self.pinState = ko.observable(false);

            self.pinState.subscribe(function (state) {
                if (state)
                    self.icon.name('icon-thumb-tack');
                else
                    self.icon.name('icon-thumb-tack fa-rotate-90');
            });
        }
        ,

        togglePin: function () {
            var self = this;
            var others = self.dragPals();

            //need new array.  don't want to add to the dragpals directly
            if (!others)
                others = [];
            else
                others = others.slice(0, others.length);

            others.push(self);

            var len = others.length;

            for (var i = 0; i < len; i++) {
                var pin = others[i];
                pin.pinState(!pin.pinState());
            }

            self.parent.parent.pin(ko.unwrap(others));

        }
        ,

        dragEnded: function (dragModel, dragViewModel) {

            var self = this;

            self.togglePin();
            self.callSuper();
        }
        ,

        getSettings: function () {

            var self = this, settings = self.callSuper();
            return $.extend(settings, { drop: '.pin' });
        }
    });
})();
