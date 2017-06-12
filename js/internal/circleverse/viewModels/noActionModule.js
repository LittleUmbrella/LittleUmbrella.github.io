eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

circleverse.viewModel.noActionModule = (function () {



    return new JS.Class({

        included: function () {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties     
            this.actionInfo = ko.observable('no action');
            alert('me');
        }
        //            ,
        //            actionInfo: ko.observable('no action')
    });
})();

