
eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.MemberCardViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('littleUmbrella.circleverse.viewModel.MemberCardViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties


            var initSize = 50;
 self.size = ko.observable(initSize);

            this.callSuper();



            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.name('icon-exchange icon-size-2x');
            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//

            //var len = self.rawModel().length;
            //for (var i = 0; i < len; i++) {
            //    self.childViewModels.push(new circleverse.viewModel.AccountTransactionViewModel(self.rawModel()[i], self, globalSettings));
            //}



            this.childrenOnTop = ko.observable(true);


            this.info = "Account Transactions (includes Pending)";

            var customer = self.parent.rawModel();

            self.memberIcon = ko.observable(object.icon);
            self.firstName = ko.observable(ko.unwrap(customer.firstName));
            self.lastName = ko.observable(ko.unwrap(customer.lastName));
            self.address = ko.computed(function(){
              return ko.unwrap(customer.addressLine1) + ((ko.unwrap(customer.addressLine2) == null) ? "": " " + ko.unwrap(customer.addressLine2)) + ", " + ko.unwrap(customer.city) + ", " + ko.unwrap(customer.state) + " " + ko.unwrap(customer.zip)
              ;
            });
            self.mobilePhone = ko.observable(ko.unwrap(customer.mobilePhone));
            self.homePhone = ko.observable(ko.unwrap(customer.homePhone));
            self.emailAddress = ko.observable(ko.unwrap(customer.emailAddress));

            self.showForm = ko.observable(false);

        }

            ,
        toggleMainForm: function () {
            this.showForm(!this.showForm());
        }

        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            return settings;
        }
            ,


        close: function () {
            this.hideCloseForm(true);
        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
            if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            }
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
            }
        }

    });
})();
