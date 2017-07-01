
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AllEmployeesViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AllEmployeesViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var initSize = 60;
 self.size = ko.observable(initSize);
            //properties

            this.callSuper();

            

            this.allBusinessCentersViewModel = ko.observable();

            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/employees48x48.png")');

            this.icon.name('icon-user icon-size-2x');
            
        }

            ,
        dblclick: function (data, e) {
            var self = this;

            if (!this.allBusinessCentersViewModel())
                this.allBusinessCentersViewModel(new circleverse.viewModel.AllBusinessCentersViewModel(null, null, self.globalSettings));

            this.toggleChildrenVisibility(data, e);

        }
        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
            }
        }

    });
})();

