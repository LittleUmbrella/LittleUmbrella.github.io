
eaf.util.namespace('circleverse.viewModel.SidePanel');

//alert('hi');

circleverse.viewModel.SidePanel.HelpViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.SidePanel.HelpViewModel', {

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            this.parent = parent;

            this.isReady = ko.observable(false);

        }


    });
})();

