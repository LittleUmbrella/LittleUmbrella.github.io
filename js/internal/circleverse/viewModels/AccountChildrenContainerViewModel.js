
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AccountChildrenContainerViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AccountChildrenContainerViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],
        //, circleverse.viewModel.satellite
        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            this.hideCloseForm = ko.observable(true);


            var initSize = 100;
 self.size = ko.observable(initSize);
            //this.callSuper(object, (parent.__size * parent.scale()) + 0, this.methodDiameter(), parent.model().accounts);
            this.callSuper();
            

            this.childrenViewModels = ko.observableArray();
            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/trashpiggy35x35.png")');

            
        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help .new';
            return settings;
        }

            ,


        close: function () {
            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            //refactor to ask service/domain to close
            //this.from.amount();
            this.hideCloseForm(true);
            //}
        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
            if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
                this.transferVm.from(dragModel);
                this.transferVm.to(this.model());
                this.transferVm.changeVisibility(false);
                //this.hideCloseForm(false);
            }
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
                this.hideCloseForm(false);
            }
        }
            ,

    });
})();

