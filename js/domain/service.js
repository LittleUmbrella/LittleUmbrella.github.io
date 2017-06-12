JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain');

    /*
    uri: the service uri
    templateUri: the uri for the template for this service (determines how the service 
    ui element of the serviceMethod itself looks/behaves
    resultTemplateUri: uri the template of the resulting object (determines how the
    ui element of resulting object (e.g. customer) looks/behaves
    */
    becu_org.communication.serviceConfig = new JS.Class({
        initialize: function () {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            this.uri;
            this.templateId;
            this.templateUri;
            this.viewUri;
            this.name;
            this.id;
            // By default templates are pulled from the same server path as the html file making the request.
            // If you keep your templates in a separate directory, specify it here as a relative path to the html document making the request
            // For example, /Templates for a sub dir, or ../Templates for going up a dir level and dropping into a Templates folder
            //this.uri = "";

            //  We want to be able to apply any naming conventions you have for your template resource files without cluttering the name itself up.
            //  So, if you have a convention to name your templates with a ".tpl.html" extension/suffix, then specify ".tpl.html" here
            this.templateSuffix = ".html";

            //  If you prefer to prefix your templates with a convention, specify it here.
            this.templatePrefix = "";
        }
    });

    becu_org.domain.service = (function () {



        return new JS.Class({
            initialize: function (serviceMethods, config) {
                //properties

                this.serviceMethods = ko.observableArray(); //[]; // 
                this.name;
                this.id;
                this.activatorId;
                this.dependentTypeUris = [];

                //this.config = config;
                if (serviceMethods) {
                    for (var i = 0; i < serviceMethods.length; i++) {
                        this.serviceMethods.push(serviceMethods[i]);
                    }
                }
            }
        });

    })();
});