
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.EmptyNavigableSatelliteViewModel = (function () {



    return new JS.Class("circleverse.viewModel.EmptyNavigableSatelliteViewModel", circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule,
            circleverse.viewModel.satellite,
            circleverse.viewModel.NavigableSatellite,
            becu_org.ui.viewModel.draggableModule,
            becu_org.ui.viewModel.droppableModule,
            circleverse.viewModel.NavigableSatellite],

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //include: [becu_org.ui.viewModel.baseModule],
            var self = this;
            self.parent = parent;
            
                        
            self.callSuper();
            //properties

            ////overwrite location, as otherwise it will share with copy
            //self.location = ko.observable({ left: 0, top: 0 });
            self.dimensions({ width: 0, height: 0 });

            if (!self.size)
                self.size = ko.observable();

            self.shadow = ko.observable();
        }
        ,


        pop: function () {
        }

        
    });
})();

