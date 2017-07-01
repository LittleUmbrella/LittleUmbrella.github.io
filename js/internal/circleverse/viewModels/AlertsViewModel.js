
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AlertsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AlertsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties


            var initSize = 60;
            self.size = ko.observable(initSize);

            self.callSuper();



            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.name('icon-bell2 icon-size-2x');
            this.icon.location = { center: true, offset: { y: -2, x: -4 } }; //ko.observable(false);//

            var len = self.rawModel().length;
            for (var i = 0; i < len; i++) {
                self.childViewModels.push(new circleverse.viewModel.AlertViewModel(self.rawModel()[i], self, globalSettings));
            }



            this.childrenOnTop = ko.observable(true);

            this.loadedChildren = ko.observable(false);

            this.info = "Balance Alerts";
            
        },

        
        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account';
            return settings;
        }

    });
})();

