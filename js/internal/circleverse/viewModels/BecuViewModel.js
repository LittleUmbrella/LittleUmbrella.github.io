eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.BecuViewModel = (function () {

    var error = function () {
        //todo: display error JS.Interface.ensure(this.config.tracker, ITemplateTracker);
    };

    return new JS.Class('littleUmbrella.circleverse.viewModel.BecuViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],
        __getCoords: function () {
            var minTop = 0;
            var minLeft = 10;

            var calcTop = 20;
            var top = '25%'; // (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = 10;
            var left = '25%'; //(calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
            ,

        onresize: function (e, data) {
            this.callSuper();


            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * 75, width: this.scale() * 75 });
            //log('customer position: ' + this.position().left);
        }
             ,
        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;

            //properties            
            //uri of view, assumption is that that view will reference 
            //view models it depends on as well as views that it depends on 
            //and these views, in turn, will reference view models,
            //effectively creating a chain of dependence
            //todo: figure out a way to support view model-first structure  
            self.parent = parent;
            self.eventAggregator = globalSettings.eventAggregator;

            this.hasToggleChildrenVisible = true;
            //this.requirement = requirement;
            //this.showMainForm = ko.observable(false);
            this.initDisplay = 'none';
            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            var initSize = 100;
 self.size = ko.observable(initSize);

            this.__size = 100;

            this.methodDiameter = initSize;

            self.hasIntroOcurred = ko.observable(false);

            this.initLocation = ko.observable();
            this.initLocation({ left: 0, top: 0 });


            self.callSuper(object, parent, globalSettings, {startSatellitesOnEdge: false});
            self.size(100);


            var customers = self.rawModel().customers,
                employees = self.rawModel().employees,
                services = self.rawModel().services,
                vault = self.rawModel().vault;
            
            self.children.push(customers);
            self.children.push(employees);
            self.children.push(services);
            self.children.push(vault);

            this.allMembersViewModel = new circleverse.viewModel.AllMembersViewModel(customers, this, globalSettings);
            this.allEmployeesViewModel = new circleverse.viewModel.AllEmployeesViewModel(employees, this, globalSettings);
            this.becuServicesViewModel = new circleverse.viewModel.BecuServicesViewModel(services, this, globalSettings);
            //            this.allLocationsViewModel = new circleverse.viewModel.AllLocationsViewModel(this.model(), this);
            this.becuPurseViewModel = new circleverse.viewModel.BecuPurseViewModel(vault, this, globalSettings);
            //            this.formsViewModel = new circleverse.viewModel.FormsViewModel(this.model(), this);

            this.childViewModels.push(this.allEmployeesViewModel);
            this.childViewModels.push(this.allMembersViewModel);
            this.childViewModels.push(this.becuServicesViewModel);
            this.childViewModels.push(this.becuPurseViewModel);

            //this.position = initialPosition || { top: 0, left: 0 };
            this.size(this.__size);

            var vm;

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            
            

            this.icon.url = ko.observable('url("/media/img/logo_red_transparent_sm.png")');

            this.isBusy = ko.observable(false);

        }




    });


})();

