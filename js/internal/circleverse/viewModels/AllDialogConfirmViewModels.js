eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.AllDialogConfirmViewModels = (function () {
    return new JS.Class('littleUmbrella.circleverse.viewModel.AllDialogConfirmViewModels', {

        initialize: function (globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            self.allDialogs = ko.observableArray();
            self.eventAggregator = globalSettings.eventAggregator;

            self.eventAggregator.subscribe('dialog.confirm.open', function (topic, data) {
                var model = data.rawModel(), vm = new littleUmbrella.circleverse.viewModel.DialogConfirmViewModel(model, data.parent, globalSettings);
                if (-1 == self.allDialogs.indexOf(vm))
                    self.allDialogs.push(vm);
                vm.toggleMainForm();
            });

        }
        ,

        closeFinished: function(){
            var self = this;

            
        }
    });


})();
