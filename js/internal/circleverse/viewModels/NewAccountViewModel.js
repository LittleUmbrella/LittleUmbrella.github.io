
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.NewAccountViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.NewAccountViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
//            this.parent = parent;
//            this.customer = parent.parent.model();

            self.__reqDiameter = 20;
            self.methodDiameter = ko.observable(39);

            self.insideDiameter = 20;


            self.hideForm = ko.observable(true);


            object = new becu_org.domain.model.Account();
            self.childViewModels = ko.observableArray([]);

            self.initLocation = ko.observable();
            self.initLocation({ left: 0, top: 0 });

            //self.callSuper(); //object, parent.insideDiameter * parent.scale(), self.methodDiameter(), parent.childViewModels, function () { return self });

            self.callSuper(object, parent, globalSettings);

            var initSize = 35;
 self.size = ko.observable(initSize);
            
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

            
            self.icon.location = { center: true, offset: { y: 0, x: 0} }; //ko.observable(false);//

            self.icon.url = ko.observable('url("/media/img/trashpiggy35x35.png")');

            self.info = "Balance Alerts";




            self.childViewModels.push(new circleverse.viewModel.PaymentSchedulesViewModel(self.model().paymentSchedules, self, globalSettings));
            self.childViewModels.push(new circleverse.viewModel.AccountRolesViewModel(self.model().relationships, self, globalSettings));
            self.childViewModels.push(new circleverse.viewModel.AlertsViewModel(self.model().alerts, self, globalSettings));

        }
        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false; // '.account';
            return settings;
        }
        ,


        close: function () {
            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            //refactor to ask service/domain to close
            //this.from.amount();
            this.hideForm(true);
            //}
        }
    });
})();

