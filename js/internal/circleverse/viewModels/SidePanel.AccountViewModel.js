
eaf.util.namespace('circleverse.viewModel.SidePanel');

//alert('hi');

circleverse.viewModel.SidePanel.AccountViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.SidePanel.AccountViewModel', circleverse.viewModel.ResizeableBase, {

        initialize: function (eventAggregator, parent) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            this.parent = parent;
            this.eventAggregator = eventAggregator;

            this.callSuper();

            this.eventAggregator.subscribe('circleverse.viewModel.CloseAccountApplication.AccountToClose.Changed', function (topic, ctx) {
                self.model(ctx);
            });

            this.accountNumber = ko.computed(function () {
                if (self.model()) {
                    return self.model().accountNumber();
                }

            }
            );

            this.accountType = ko.computed(function () {
                if (self.model() && self.model().product() && self.model().product().id()) {
                    return self.model().product().id().secondaryProductCode();
                }

            }
            );


            this.roleRelationships = ko.observableArray();

            self.syncAccountRelationships();

            self.model.subscribe(function () {
                if (self.model()) {
                    self.syncAccountRelationships();
                    self.model().relationships.subscribe(function () {
                        self.syncAccountRelationships();
                    });
                }
            });


            this.balance = ko.computed(function () {
                if (self.model()) {
                    return self.model().balance();
                }

            }
            ).extend({ money: true });

            this.availableBalance = ko.computed(function () {
                if (self.model()) {
                    return self.model().availableBalance();
                }

            }
            ).extend({ money: true });

            this.recurring = ko.computed(function () {
                if (self.model() && self.model().paymentSchedules()) {
                    return self.model().paymentSchedules().length > 0 ? 'Y' : 'N';
                }

                return 'N';
            }
            );

            this.pending = ko.computed(function () {
                if (self.model() && self.model().pendingPayments()) {
                    return self.model().pendingPayments().length > 0 ? 'Y' : 'N';
                }

                return 'N';
            }
            );


            this.isReady = ko.observable(false);



        }
        ,

        syncAccountRelationships: function () {
            var self = this;

            if (self.model() && self.model().relationships()) {
                this.roleRelationships.removeAll();

                for (var i = 0; i < self.model().relationships().length; i++) {
                    this.roleRelationships.push(self.model().relationships()[i]);
                }
            }
        }

    });
})();

