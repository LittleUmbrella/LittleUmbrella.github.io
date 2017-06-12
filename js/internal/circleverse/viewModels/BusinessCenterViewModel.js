
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.BusinessCenterViewModel = (function () {

    return new JS.Class('circleverse.viewModel.BusinessCenterViewModel', circleverse.viewModel.ResizeableBase, {
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

            this.eventAggregator = globalSettings.eventAggregator;
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(128);
            this.insideDiameter = 80;

            var initSize = 120;
 self.size = ko.observable(initSize);
            this.callSuper();

            




            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ""; // ko.observable('url("/media/img/trashpiggy35x35.png")');

            this.isBusy = ko.observable(false);


        }
            ,

        dragxend: function () {
            this.callSuper();

        }
            ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            return settings;
        }

        ,

        changeVisibility: function (cmd) {
        }
        ,

        droppedOn: function (dragModel, dragViewModel) {
        }



    });
})();
