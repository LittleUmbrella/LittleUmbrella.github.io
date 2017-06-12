eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.earthViewModel = (function () {


    var initSize = 94;
 self.size = ko.observable(initSize);

    return new JS.Class('circleverse.viewModel.earthViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],

        __getCoords: function () {
            var minTop = 0;
            var minLeft = 210;

            var calcTop = 20;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = (($(window).width() - this.dimensions().width)) * .7;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
            ,

        onresize: function (e, data) {
            this.callSuper();


            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });
            //log('garbage position: ' + this.position().top);
        }
             ,

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;

            self.callSuper();
            //properties


            self.__backgroundPositionOrigin = -20;
            self.backgroundPosition = ko.observable(self.__backgroundPositionOrigin);

            self.icon.name('icon-star-o icon-size-3x');
            self.borderWidth = 2;

            self.location = ko.observable();
            //self.location = {};//ko.observable();
            //left: scale() * 300, top:,
            self.dimensions = ko.observable();

            var initSize = 100;
 self.size = ko.observable(initSize);


            var endSize = 100;


            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

            var coords = self.__getCoords();
            self.location({ left: coords.left, top: coords.top });
            //children need to know count as they are initialized, so need to build count now
            self.children = ko.observableArray();
            self.children.push([]);//for persons
            self.children.push([new becu_org.domain.model.BecuObservable()]);

            self.childViewModels = ko.observableArray();

            //self.becuViewModel = new littleUmbrella.circleverse.viewModel.BecuViewModel(self.children()[0], self, globalSettings);
            self.allPersonsViewModel = new littleUmbrella.circleverse.viewModel.AllPersonsViewModel(self.children()[0], self, globalSettings);
            self.allOrganizationsViewModel = new littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel(self.children()[1], self, globalSettings);
            
            //self.childViewModels.push(self.becuViewModel);
            self.childViewModels.push(self.allPersonsViewModel);
            self.childViewModels.push(self.allOrganizationsViewModel);

            self.endDimensions = { height: self.scale() * initSize, width: self.scale() * initSize};

            self.introScaleEnd = 1;
            self.endLocation = { top: self.scale() * 75 + '%', left: self.scale() * 75 + '%' };

            var coords = self.__getCoords();
            //self.location = { left: '40%', top: '40%' };
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });


            self.popDuration = null;
            self.popAnimationLength = 0.7;
        }
            ,

        droppedOn: function (dragModel) {
            //this.model().callSpec().add(dragModel);
        }
        ,

        dragxstart: function (ev, evx, dd) {
            var self = this;

            self.__backgroundPositionOrigin =self.backgroundPosition();
        },

        dragx: function (ev, evx, dd) {
            var self = this;

            self.backgroundPosition(self.__backgroundPositionOrigin + (dd.deltaX * 8));
        }
        ,

        getSettings: function () {
        var settings = this.callSuper();
        settings.drop = false;
        return settings;
    }

    });
})();
