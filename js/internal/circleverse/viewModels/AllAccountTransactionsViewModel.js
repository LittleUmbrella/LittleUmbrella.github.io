eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.AllAccountTransactionsViewModel = (function () {
    return new JS.Class('littleUmbrella.circleverse.viewModel.AllAccountTransactionsViewModel', {

        initialize: function (globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            self.accountTransactionsViewModels = ko.observableArray();
            self.eventAggregator = globalSettings.eventAggregator;

            self.eventAggregator.subscribe('transactions.found', function (topic, data) {
                var model = data.rawModel(), vm = new littleUmbrella.circleverse.viewModel.CustomerAccountTransactionsViewModel(model, data.parent, globalSettings);
                if (-1 == self.accountTransactionsViewModels.indexOf(vm))
                    self.accountTransactionsViewModels.push(vm);
                vm.toggleMainForm();
            });

        }





    });


})();



