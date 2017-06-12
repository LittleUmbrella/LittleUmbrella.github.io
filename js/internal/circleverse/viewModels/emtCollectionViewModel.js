eaf.util.namespace('circleverse.viewModel.emtCollectionViewModel');

circleverse.viewModel.emtCollectionViewModel = (function () {

    return new JS.Class("circleverse.viewModel.emtCollectionViewModel", circleverse.viewModel.ResizeableBase, {
        //include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            this.callSuper(object);



            this.self = this;
            var self = this;


            this.emts = ko.observableArray();

            for (var i = 0; i < object.length; i++) {
                this.emts.push(new circleverse.viewModel.emtViewModel(object[i], i));
            }


        }

    });
})();
