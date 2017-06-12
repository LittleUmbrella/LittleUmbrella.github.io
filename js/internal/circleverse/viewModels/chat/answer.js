eaf.util.namespace('circleverse.viewModel.chat');

circleverse.viewModel.chat.answer = (function () {

    return new JS.Class("circleverse.viewModel.chat.answer", circleverse.viewModel.chat.message, {
        //include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        initialize: function (obj) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            this.callSuper(obj);

            //properties
            // // = ko.observableArray([]);



            var self = this;


            this.question = ko.observable();

        }

    });
})();
