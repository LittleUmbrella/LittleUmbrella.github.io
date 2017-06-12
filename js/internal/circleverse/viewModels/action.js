eaf.util.namespace('circleverse.viewModel.action');

circleverse.viewModel.action = (function () {

    return new JS.Class("circleverse.viewModel.action", {
        //include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        initialize: function (name, url, info, action) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            //this.callSuper(object);



            this.self = this;
            var self = this;

            this.name = name;
            this.icon = new circleverse.viewModel.icon(url);
            this.info = info;
            this.action = action;



        }

    });
})();
