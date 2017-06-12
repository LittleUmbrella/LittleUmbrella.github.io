
eaf.util.namespace('circleverse.viewModel.SidePanel');

//alert('hi');

circleverse.viewModel.SidePanel.SummaryViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.SidePanel.SummaryViewModel', {

        initialize: function (eventAggregator, accountInformationViewModel, stepBasicViewModel, stepRecurringViewModel, stepBalanceViewModel, stepConfirmationViewModel, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            this.parent = parent;
            this.eventAggregator = eventAggregator;

            this.accountInformationViewModel = ko.observable(accountInformationViewModel);
            this.stepBasicViewModel = ko.observable(stepBasicViewModel);
            this.stepRecurringViewModel = ko.observable(stepRecurringViewModel);
            this.stepBalanceViewModel = ko.observable(stepBalanceViewModel);
            this.stepConfirmationViewModel = ko.observable(stepConfirmationViewModel);

            this.isReady = ko.observable(false);

        }


    });
})();

