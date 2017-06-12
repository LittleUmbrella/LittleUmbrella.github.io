eaf.util.namespace('becu_org.communication');

becu_org.communication.service = (function () {

    var template;

    return new JS.Class({
        initialize: function (serviceMethods, templateUri, templateId, name, id) {
            //properties
            this.serviceMethods = ko.observable(serviceMethods);
            this.templateUri = templateUri;
            this.templateId = templateId;
            this.name = name;
            this.id = id;


            if (this.templateUri)
                this.getTemplate();
        },

        getTemplate: function () {
            if (template) {
                return template;
            }
            else {
                //do ajax call

                //set template
            }
        }

    });

})();