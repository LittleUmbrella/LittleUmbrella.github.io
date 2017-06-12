
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.MoneyViewModel = (function () {



    return new JS.Class('circleverse.viewModel.MoneyViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

        initialize: function (object, index, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper();
            //properties
             // = ko.observableArray([]);

            var self = this.self = this;

            this.index = index;

            this.amount = ko.observable(0);

            this.location = ko.observable({ left: ((index) * 60) + 20, top: '0' });
            this.dimension = ko.observable({ width: '50', height: '50' });

            this.isIncrementingVisible = ko.observable(false);

            if (this.model() && JS.Interface.implements(this.model(), becu_org.ui.IQuantity)) {
                var amt = this.model().amount();
                var len = amt.toString().length;

                if (len > 3)
                    this.dimension({ width: 20 + (15 * len), height: '50' });
                this.amount(amt);
                this.model.subscribe(function (value) {
                    self.amount(self.model().amount());
                });
            }


        }
            ,

        showIncrementing: function () {
            this.isIncrementingVisible(false);
        }
        ,


        hideIncrementing: function () {
            this.isIncrementingVisible(false);
        }
        ,

        droppedOn: function (dragModel) {
            //this.model().callSpec().add(dragModel);
        }
        ,

        increase: function () {
            this.amount(this.amount() + this.model().amount());
        }
        ,

        decrease: function () {
            this.amount(this.amount() - this.model().amount());
        }
        ,
        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.amount';
            return settings;
        }
    });
})();
