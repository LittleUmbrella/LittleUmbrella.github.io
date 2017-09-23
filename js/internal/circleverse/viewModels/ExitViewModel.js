eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.ExitViewModel = (function () {

    var initSize = 60;

    return new JS.Class('circleverse.viewModel.ExitViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 250;

            var calcTop = (($(window).height()) / 2) - (((this.scale() || initSize) * initSize) / 2);
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = (($(window).width() - this.dimensions().width)) - 20;
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

            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            this.icon.name('icon-hand-o-right icon-size-2x');
            
            

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
