eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.AllMemberCards = (function () {
    return new JS.Class('littleUmbrella.circleverse.viewModel.AllMemberCards', {

        initialize: function (globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            self.allMemberCards = ko.observableArray();
            self.eventAggregator = globalSettings.eventAggregator;

            self.eventAggregator.subscribe('member.cards.view', function (topic, data) {
                var model = data.rawModel(), vm = new littleUmbrella.circleverse.viewModel.MemberCardViewModel(model, data.parent, globalSettings);
                if (-1 == self.allMemberCards.indexOf(vm))
                    self.allMemberCards.push(vm);
                vm.toggleMainForm();
            });

        }
    });


})();
