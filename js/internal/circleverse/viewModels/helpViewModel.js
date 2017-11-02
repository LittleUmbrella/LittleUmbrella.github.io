eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.helpViewModel = (function () {


    var initSize = 94;

    return new JS.Class(circleverse.viewModel.ResizeableBase, {
        include: [circleverse.viewModel.ToolViewModel,
            becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        __getCoords: function () {
            var minTop = 100;
            var minLeft = 180;

            var calcTop = (($(window).height()) - this.dimensions().height) - 25;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 1.3) - (this.dimensions().width / 1.3))) * .9;
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

        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties

            var self = this;
            self.size = ko.observable(initSize);
            this.location = ko.observable();
            //left: scale() * 300, top:,
            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });

            self.mainCss('help');
            
            this.icon.name('icon-question icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
        }
            ,

        droppedOn: function (dragModel) {
            //this.model().callSpec().add(dragModel);
        }


    });
})();
