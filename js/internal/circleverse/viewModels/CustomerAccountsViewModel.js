
eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.CustomerAccountsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    return new JS.Class('circleverse.viewModel.CustomerAccountsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            circleverse.viewModel.satellite,
            circleverse.viewModel.centerCircle,
            becu_org.ui.viewModel.draggableModule,
            becu_org.ui.viewModel.droppableModule,
            circleverse.viewModel.NavigableCircles,
            becu_org.ui.viewModel.labelModule
        ],

        initialize: function (object, parent, globalSettings) {

            var self = this;
            var initSize = 70;
 self.size = ko.observable(initSize);
            //properties


            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            //mapping can't take an array as a root object, so this is a work-around
            self.callSuper({ temp: object }, parent, globalSettings, {
                dropFilter: '.account'
                ,
                visibleCnt: Math.floor(littleUmbrella.circleverse.ui.shapes.satellite.howManyOuter((150 / 2) + 2, 52))
            });

            //mapping can't take an array as a root object, so this is a work-around
            self.model(ko.unwrap(self.model().temp));
            self.rawModel(self.rawModel().temp);



            var vm;
            for (var i = 0; i < self.rawModel().length; i++) {
                vm = new circleverse.viewModel.accountViewModel(self.rawModel()[i], self, globalSettings);
                self.innerArr.push(vm);
            }
            

            self.model.subscribe(function (item) {
                var vm = new circleverse.viewModel.accountViewModel(ko.mapping.toJS(item), self, globalSettings);

                self.innerArr.push(vm);
            });

            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

            self.label("Accounts");

            self.newAccountViewModel = new circleverse.viewModel.NewAccountViewModel(new becu_org.domain.model.Account(), self, globalSettings);

            self.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            self.icon.url = ko.observable('url("/media/img/accounts64x64.png")');

            self.icon.name('icon-umbrella icon-size-2x');//'icon-briefcase icon-size-2x';

        }

            ,
        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help, .new';
            return settings;
        }
            
    });
})();

