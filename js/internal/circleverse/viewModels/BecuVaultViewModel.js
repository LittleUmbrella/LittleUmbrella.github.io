
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AllLocationsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AllLocationsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var that = this;
            //properties
            this.parent = parent;
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(192);
            this.insideDiameter = 80;

            var initSize = 188;
 self.size = ko.observable(initSize);
            this.callSuper(object, parent.__size * parent.scale(), this.methodDiameter(), parent.model.accounts); //.accountViewModels);

            



            this.accountChildrenVms = ko.observableArray();
            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = "";// ko.observable('url("/media/img/trashpiggy35x35.png")');

            this.closeAccountVm = new circleverse.viewModel.CloseAccountViewModel(this.model, this);

            //this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);

            this.onTop = ko.observable(true);
        }

            ,
        applyBindings: function (namespace, node) {
            var ns = namespace || 'serviceMethod';
            if (node)
                ko.applyBindings(this, node);
            //        var arr = []; //[0,1,2,3,4,5,6,7,8,9];

            //        var num = 3;

            //        for (var z = 0; z < num; z++) {
            //            arr.push(z);
            //        }





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
            if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
                this.transferVm.fromAccount(dragModel);
                this.transferVm.toAccount(this.model);
                this.transferVm.changeVisibility(false);
                //this.hideCloseForm(false);
            }

            if (dragViewModel.isA(circleverse.viewModel.PaymentScheduleViewModel)) {
                this.model.paymentSchedules.push(dragModel);

                dragViewModel.hide(true);
                dragViewModel.parent.parent.model.remove(dragModel);
                //dragViewModel.parent.childrenViewModels.remove(dragViewModel);
                //                this.transferVm.toAccount(this.model);
                //                this.transferVm.changeVisibility(false);
                //this.hideCloseForm(false);
            }
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            //this.model.callSpec().add(dragModel);
            var self = this;
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
                self.onTop(!self.onTop()); //just change so that it's re-evaluated
                self.closeAccountVm.hideCloseForm(false);
            }
        }

    });
})();

