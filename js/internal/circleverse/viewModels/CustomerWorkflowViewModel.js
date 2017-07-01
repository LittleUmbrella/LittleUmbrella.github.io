
eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.CustomerWorkflowViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    return new JS.Class('circleverse.viewModel.CustomerWorkflowViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {

            var self = this;
            var initSize = 70;
 self.size = ko.observable(initSize);
            //properties
            self.__reqDiameter = 20;
            self.methodDiameter = ko.observable(initSize);
            self.insideDiameter = 40;


            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);


            self.callSuper();

            self.size(initSize);
            self.__size = initSize;

            self.childSize = self.methodDiameter();

            //var vm;
            //for (var i = 0; i < self.model().accounts().length; i++) {
            //    vm = new circleverse.viewModel.accountViewModel(self.model().accounts()[i], self);
            //    self.childSize = vm.dimensions().height;

            //    self.childViewModels.push(vm);
            //}

            //self.model().accounts.subscribe(function (item) {
            //    var vm = new circleverse.viewModel.accountViewModel(item, self);

            //    self.childViewModels.push(vm);
            //});


            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });


            self.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            self.icon.url = ko.observable('url("/media/img/accounts64x64.png")');

            self.icon.name('icon-tasks icon-size-2x');


        }

            ,
        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help, .new';
            return settings;
        }
    });
})();

