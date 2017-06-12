eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.EditViewModel = (function () {

    var initSize = 94;

    return new JS.Class('circleverse.viewModel.EditViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        __getCoords: function () {
            var minTop = 100;
            var minLeft = 180;

            var calcTop = (($(window).height()) - this.dimensions().height) - 20;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 3) - (this.dimensions().width / 3))) * .5;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties
             // = ko.observableArray([]);

            var self = this;
            self.size = ko.observable(initSize);
            this.location = ko.observable();
            //left: scale() * 300, top:,

            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });


            
            this.icon.name('icon-pencil icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
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
        droppedOn: function (dragModel, dragVm) {
//            if (JS.Interface.implements(dragVm, becu_org.ui.IDeletable)) {
//                if (dragVm.canDeleteNow()) {
//                    dragVm.deleteNow(true);
//                }

//            }
        }


    });
})();
