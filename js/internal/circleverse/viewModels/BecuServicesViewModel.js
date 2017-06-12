
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.BecuServicesViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.BecuServicesViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var initSize = 60;
 self.size = ko.observable(initSize);
            //properties

            this.callSuper();

            



            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/services48x48.png")');

            this.icon.name('icon-products2 icon-size-2x');
            
            
            //this.closeAccountVm = new circleverse.viewModel.CloseAccountViewModel(this.model(), this);

            //this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);

            
        }

            ,
        dblclick: function (data, e) {
            //show help




        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }
        //            ,


        //        close: function () {
        //            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
        //            //refactor to ask service/domain to close
        //            //this.from.amount();
        //            this.closeAccountVm.hideCloseForm(true);
        //            //}
        //        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
        }

    });
})();

