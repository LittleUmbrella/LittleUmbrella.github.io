
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AccountTransactionViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AccountTransactionViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties

            
            var initSize = 50;
 self.size = ko.observable(initSize);

            this.callSuper();

            

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.icon.name('icon-user icon-size-2x');
            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//

            this.info = "Account Transactions (includes Pending)";

            
        }
        ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account';
            return settings;
        }
    });
})();

