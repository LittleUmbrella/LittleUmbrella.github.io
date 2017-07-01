
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CalculatorViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CalculatorViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            this.parent = parent;
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(39);


            this.amount = ko.observable();

            var subscription =
            this.amount.subscribe(function (value) {

                self.calculator.fixCurrent.call(self.calculator, value);
            });

            this.calculator = new circleverse.tools.Calculator(function (value) {
                subscription.dispose();
                self.amount(value);
                subscription =
                self.amount.subscribe(function (value) {

                    self.calculator.fixCurrent.call(self.calculator, value);
                });
            });



            var initSize = 35;
 self.size = ko.observable(initSize);

            this.callSuper(); //object, parent.size(), parent.insideDiameter * parent.scale(), this.methodDiameter(), parent.childrenViewModels, function () { return self });

            

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: 0, x: 0} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/alert30x30.png")');

            this.info = "Calculator";
            
            this.show = ko.observable(true);
        }
        ,

        toggleShow: function(){
            this.show(!this.show());
        }
        ,
        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.amount';
            return settings;
        }
            ,


        close: function () {
            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            //refactor to ask service/domain to close
            //this.from.amount();
            this.show(false);
            //}
        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
            if (JS.Interface.implements(dragViewModel, becu_org.ui.IQuantity)) {
                this.amount(parseFloat(this.amount() || 0) + (dragViewModel.amount() || 0));
            }
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
            }
        }

    });
})();

