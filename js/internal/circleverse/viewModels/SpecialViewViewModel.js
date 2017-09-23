eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SpecialViewViewModel = (function () {

    var initSize = 94;

    return new JS.Module('circleverse.viewModel.SpecialViewViewModel', {



        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties
             // = ko.observableArray([]);

            var self = this;
            
            self.templateName = ko.observable(self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'Template');

            //log('garbage position: ' + this.position().top);
        }
            

    });
})();
