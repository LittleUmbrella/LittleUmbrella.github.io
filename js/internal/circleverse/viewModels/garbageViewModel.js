eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.garbageViewModel = (function () {

    var initSize = 94;

 return new JS.Class('circleverse.viewModel.garbageViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],


        __getCoords: function () {
            var minTop = 40;
            var minLeft = 250;

            var calcTop = (($(window).height()) - this.dimensions().height) - 25;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = (($(window).width() - this.dimensions().width)) - 30;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

//            log('garbage left: ' + left);
//            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties

            var self = this;
            self.size = ko.observable(initSize);
            this.location = ko.observable();
            //left: scale() * 300, top:,
            
            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });


            
            this.icon.name('icon-trash-o icon-size-3x');
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
            if (JS.Interface.implements(dragVm, becu_org.ui.IDeletable)) {
                if (dragVm.canDeleteNow()) {
                    dragVm.deleteNow(true);
                }

            }
        }


    });
})();
