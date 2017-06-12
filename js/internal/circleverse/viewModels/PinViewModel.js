
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

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
            var initSize = 20;
 self.size = ko.observable(initSize);
            //properties
            var settings = {
                collection: [self],
                minCenterDiameter: parent.size() - initSize,
                startSatellitesOnEdge: false,
                startingDegree: 320,
                evenDistribution: false,
                eventAggregator: opts.eventAggregator
            };

            self.callSuper(object, parent, settings, { dropFilter: '.pin' });
            //properties

            self.size(initSize);
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });



            self.icon.name('icon-thumb-tack');
            self.icon.color('#56aee0');


        }
        ,
        
        draggedOverStarted: function (dragModel, dragViewModel) {
            
            var self = this;

            self.pinPals(self);
        }
        ,

        togglePinSelf: function () {
            var self = this;
            var others = self.pinPals();

            if (!others) others=[];

            others.push(self);

            self.parent.pin(others);

            dragViewModel.pinPals.removeAll();
        }

    });
})();


