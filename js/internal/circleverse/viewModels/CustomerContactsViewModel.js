
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerContactsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomerContactsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            circleverse.viewModel.satellite,
            circleverse.viewModel.centerCircle,
            becu_org.ui.viewModel.draggableModule,
            becu_org.ui.viewModel.droppableModule,
            circleverse.viewModel.NavigableCircles,
            becu_org.ui.viewModel.labelModule
        ],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

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

            self.__size = initSize;
            

            var vm;
            for (var i = 0; i < self.rawModel().length; i++) {
                vm = new circleverse.viewModel.CustomerContactViewModel(self.rawModel()[i], self, globalSettings);
                self.innerArr.push(vm);
            }


            self.model.subscribe(function (item) {
                var vm = new circleverse.viewModel.CustomerContactViewModel(ko.mapping.toJS(item), self, globalSettings);

                self.innerArr.push(vm);
            });


            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.label("Contacts"); 
            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/persons64x64.png")');


            this.icon.name('icon-group icon-size-2x');
            
            
            
        }
        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }
    });
})();

