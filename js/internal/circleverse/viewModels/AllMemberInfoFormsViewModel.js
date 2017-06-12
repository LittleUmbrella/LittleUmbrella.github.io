eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.AllMemberInfoFormsViewModel = (function () {
    return new JS.Class('littleUmbrella.circleverse.viewModel.AllMemberInfoFormsViewModel', {

        initialize: function (globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            self.allCustomerInfosViewModel = ko.observableArray();
            self.eventAggregator = globalSettings.eventAggregator;

            self.eventAggregator.subscribe('member.view', function (topic, data) {
                var model = data.rawModel(), vm = new littleUmbrella.circleverse.viewModel.CustomerInfoFormViewModel(model, data.parent, globalSettings);
                if (-1 == self.allCustomerInfosViewModel.indexOf(vm))
                    self.allCustomerInfosViewModel.push(vm);
                vm.toggleMainForm();
            });

        }





    });


})();
