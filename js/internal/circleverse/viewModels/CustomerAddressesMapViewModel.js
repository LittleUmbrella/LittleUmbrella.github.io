
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerAddressesMapViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomerAddressesMapViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule
            ],


        __getCoords: function () {
            var self = this;

            
            var minTop = 80;
            var minLeft = 80;

            

            var calcTop = 0;// (this.dimensions().height);
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = 0; //(this.dimensions().width));
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            // var calcTop = (($(window).height()) - self.dimensions().height) - 25;
            // var top = (calcTop < minTop) ? minTop : calcTop;

            // var calcLeft = (($(window).width() - self.dimensions().width)) - 30;
            // var left = (calcLeft < minLeft) ? minLeft : calcLeft;

//            log('garbage left: ' + left);
//            log('garbage top: ' + top);
            return { left: left, top: top };
        },

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var initSize = 70;

            //properties
            self.globalSettings = globalSettings;
            self.eventAggregator = globalSettings.eventAggregator;
            
 self.size = ko.observable(initSize);
            var coords = self.__getCoords();
            if (!self.opacity)
                self.opacity = ko.observable(1);
            self.location = ko.observable();
            self.location({ left: coords.left, top: coords.top });

            self.dimensions = ko.observable({ height: initSize, width: initSize });

            this.callSuper();

            
            self.dimensions({ height: $(window).height() - 160, width: $(window).width() -160 });

            self.showMe(false);
            //self.opacity(0);
            self.onTop(!self.onTop());
            self.zoom= ko.observable(9);
            self.center = [ko.observable(47.4899981), ko.observable(-122.2721837)]; //default to becu hq
// var settings = {
//                 itemDiameter: initSize + 5,
//                 startSatellitesOnEdge: false,
//                 startingDegree: 230,
//                 evenDistribution: false
//             };

//             self.callSuper(object, parent, globalSettings, settings);

            //this.callSuper();


            self.childViewModels = ko.observableArray();

            self.childViewModels.subscribe(function(a){                
                self.showMe(true);
                //self.opacity(1);
                self.onTop(true);

                var len = self.childViewModels().length, latlng = [];
                if (len > 0){
                    for (var i = 0; i < len; i++) {                        
                        var item = self.childViewModels()[i];

                        item.onTop(!item.onTop());
                        item.onTop(!item.onTop());
                    }
                }
            })
            
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(true);
            self.canOpen(false);
            self.canClose(false);
            self.canSave = ko.observable(false);

            self.childViewModels.subscribe(function(changes){
                if (self.childViewModels().length > 0){
                    self.canOpen(true);
                    self.canClose(true);
                }
                else{
                    self.canOpen(false);
                    self.canClose(false);
                }
            });

        }

        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.SearchViewModel)) {

                
                //self.searchInitiated(prom);

            }
            if (self.callSuper) self.callSuper();
        }
            ,

        droppedOn: function (dragModel, dragViewModel, args, prom) {
            var self = this;
            
            //this.model().callSpec().add(dragModel);
            if (dragViewModel.isA(circleverse.viewModel.SearchViewModel)) {
                
                //self.searchInitiated(prom);
            }
            if (self.callSuper) self.callSuper();
        }

    });
})();
