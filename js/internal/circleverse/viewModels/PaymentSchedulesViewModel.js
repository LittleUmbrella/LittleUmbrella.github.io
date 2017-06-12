
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.PaymentSchedulesViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.PaymentSchedulesViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties


            var initSize = 60;
            self.size = ko.observable(initSize);

            this.callSuper();



            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.name('icon-calendar icon-size-2x');
            this.icon.location = { center: true, offset: { y: -2, x: -4 } }; //ko.observable(false);//

            var len = self.rawModel().length;
            for (var i = 0; i < len; i++) {
                self.childViewModels.push(new circleverse.viewModel.PaymentScheduleViewModel(self.rawModel()[i], self, globalSettings));
            }

            
            this.childrenOnTop = ko.observable(true);

            this.loadedChildren = ko.observable(false);

            this.loadedChildren = ko.observable(false);

            this.info = "Scheduled Payments/Transfers";
        }
        ,

        droppedOn: function (dragModel, dragViewModel) {
            var self = this;


            if (dragViewModel.isA(circleverse.viewModel.PaymentScheduleViewModel)) {
                self.model().push(dragModel);

                self.childViewModels.push(new circleverse.viewModel.PaymentScheduleViewModel(dragModel, self, self.globalSettings));

                dragViewModel.showMe(false);
                var oldArray = dragViewModel.parent.model();

                oldArray.splice(oldArray.indexOf(dragModel), 1);
            }
        }
           ,

        getSettings: function () {
            var settings = this.callSuper();
            //settings.drop = '.account';
            return settings;
        }
            
    });
})();

