eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SpecialContentViewViewModel = (function () {

    var initSize = 94;

    return new JS.Module('circleverse.viewModel.SpecialContentViewViewModel', {



        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties
             // = ko.observableArray([]);

            var self = this;
            
            if (self.contentTemplate)
                self.contentTemplate(self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'ContentTemplate');
            else
                self.contentTemplate = ko.observable(self.klass.displayName.substring(self.klass.displayName.lastIndexOf(".") + 1) + 'ContentTemplate');

            //log('garbage position: ' + this.position().top);
        }
            

    });
})();
