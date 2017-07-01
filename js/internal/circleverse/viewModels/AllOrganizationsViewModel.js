eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel = (function () {

    var error = function () {
        //todo: display error JS.Interface.ensure(this.config.tracker, ITemplateTracker);
    };

    return new JS.Class('littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule],
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

            var initSize = 70;
 self.size = ko.observable(initSize);

            this.__size = initSize;



            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            this.initLocation = ko.observable();
            this.initLocation({ left: 0, top: 0 });

            var settings = {
                itemDiameter: initSize + 5,
                startSatellitesOnEdge: false,
                startingDegree: 230,
                evenDistribution: false
            };

            self.callSuper(object, parent, globalSettings, settings);
            //self.callSuper(object, parent, globalSettings);
            self.size(100);



            self.becuViewModel = new littleUmbrella.circleverse.viewModel.BecuViewModel(self.rawModel()[0], self, globalSettings);
            
            this.childViewModels.push(self.becuViewModel);

            //this.position = initialPosition || { top: 0, left: 0 };
            this.size(this.__size);

            var vm;

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            self.label("Orgs");

            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            
            
            this.icon.name('icon-building-o icon-size-2x');

            this.icon.url = ko.observable('url("/media/img/logo_red_transparent_sm.png")');

            this.isBusy = ko.observable(false);

        }




    });


})();

