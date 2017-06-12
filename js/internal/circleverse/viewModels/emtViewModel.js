eaf.util.namespace('circleverse.viewModel.emtViewModel');

circleverse.viewModel.emtViewModel = (function () {

    return new JS.Class("circleverse.viewModel.emtViewModel", circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],


        initialize: function (object, index) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            this.callSuper(object);
             // = ko.observableArray([]);

            this.self = this;
            var self = this;

            this.url = ko.observable(object.url);
            this.name = ko.observable(object.name);
            this.description = ko.observable(object.description);

            var left, top;

            if ((index % 2) == 0) {
                top = 120;
            }
            else
                top = 0;

            left = Math.floor(index / 2) * 90;

            this.location = ko.observable();

            this.location({ left: left, top: top });
        }
        ,

        getSettings: function () {
            return { relative: true, click: false, distance: 2, multiDragDrop: false };
        }
        ,

        getValue: function () {
            return this.description();

        }
        //,

        //        dragx: function (e, ddev, dd) {
        //            //this.callSuper();
        //            //log('drag:' + this.id);
        //            var $this = $(e.target);

        //            var parent = $this.parent();
        //            var offset = parent.offset();

        //            $this.css({
        //                top: dd.offsetY - offset.top,
        //                left: dd.offsetX - offset.left,

        //                opacity: .5
        //            });

        //        }

,

        dragxend: function (e, ddev, dd) {
            //log('dragend:' + this.id);
            retval = this.callSuper();
            //log('drag:' + this.id);
            var $this = $(e.target);

            var parent = $this.parent();
            var offset = parent.offset();

            $this.css({
                top: (parseFloat($this.css('top'))) - offset.top,
                left: (parseFloat($this.css('left')) * 2) - offset.left

            });

            return retval;

        }
    });
})();
