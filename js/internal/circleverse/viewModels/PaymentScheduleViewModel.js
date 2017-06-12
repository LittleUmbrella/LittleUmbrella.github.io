
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.PaymentScheduleViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.PaymentScheduleViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {


            var self = this;
            //properties


            var initSize = 60;
            self.size = ko.observable(initSize);

            this.callSuper();



            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.location = { center: true, offset: { y: -2, x: -4 } }; //ko.observable(false);//

            this.icon.name('icon-calendar icon-size-2x');
            
            

            this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);

            this.info = "Scheduled Payments/Transfers";

            this.hide = ko.observable(false);
        }

            ,

        getSettings: function () {
            var settings = this.callSuper();
            //settings.drop = '.account';
            return settings;
        }
            
    });
})();

