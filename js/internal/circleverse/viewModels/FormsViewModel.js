
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.FormsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.FormsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties
            this.__reqDiameter = 20;
            this.methodDiameter = ko.observable(196);
            this.insideDiameter = 80;

            var initSize = 188;
 self.size = ko.observable(initSize);
            this.callSuper();

            



            //, new circleverse.viewModel.MoneyViewModel(new becu_org.domain.Money(100), 4)

            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            
            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = "";// ko.observable('url("/media/img/trashpiggy35x35.png")');

            this.closeAccountVm = new circleverse.viewModel.CloseAccountViewModel(this.model(), this);

            //this.closeReasonCodes = ko.observableArray([{ reasonCodeId: 1, reasonCodeDisplayText: 'Fraud' }, { reasonCodeId: 2, reasonCodeDisplayText: 'Other'}]);

            
        }

            ,
        applyBindings: function (namespace, node) {
            var ns = namespace || 'serviceMethod';
            if (node)
                ko.applyBindings(this, node);
            //        var arr = []; //[0,1,2,3,4,5,6,7,8,9];

            //        var num = 3;

            //        for (var z = 0; z < num; z++) {
            //            arr.push(z);
            //        }





        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help';
            return settings;
        }

    });
})();

