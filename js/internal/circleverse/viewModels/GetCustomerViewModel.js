eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.GetCustomerViewModel = (function () {
    return new JS.Class('littleUmbrella.circleverse.viewModel.GetCustomerViewModel', {
        
        initialize: function (globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            
            var self = this;
            self.foundCustomers = ko.observableArray();
            self.eventAggregator = globalSettings.eventAggregator;

            self.eventAggregator.subscribe('customer.found', function (topic, data) {
                var cust = new littleUmbrella.circleverse.viewModel.CustomerViewModel(data, self, globalSettings);
                self.foundCustomers.push(cust);
            });

        }
            




    });


})();

