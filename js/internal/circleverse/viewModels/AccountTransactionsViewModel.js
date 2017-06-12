
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AccountTransactionsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AccountTransactionsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties


            var initSize = 50;
 self.size = ko.observable(initSize);

            this.callSuper();

            

            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.name('icon-exchange icon-size-2x');
            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//

            //var len = self.rawModel().length;
            //for (var i = 0; i < len; i++) {
            //    self.childViewModels.push(new circleverse.viewModel.AccountTransactionViewModel(self.rawModel()[i], self, globalSettings));
            //}



            this.childrenOnTop = ko.observable(true);

            this.loadedChildren = ko.observable(false);

            this.info = "Account Transactions (includes Pending)";

            var acct = self.parent.rawModel();

            self.accountIconClass = ko.observable(self.parent.icon.name());
            self.accountName = ko.observable(acct.accountNumber);
            self.balance = ko.observable(acct.balance);

            self.showForm = ko.observable(false);

        }
        ,

        toggleChildrenVisibility: function () {
            var self = this, isFormVisible = self.showForm();
            
            if (self.__isKidsLoaded)
                self.__globalSettings.eventAggregator.publish('transactions.found', self);

            if (!self.__isKidsLoaded && !isFormVisible) {
                self.__isKidsLoaded = true;

                self.isBusy(true);
                var transactions = self.rawModel();
                self.__globalSettings.repository.getTransactions(self.rawModel().accountNumber, true).then(
                    function (val) {
                        if (val && val.length > 0) {
                            val.unshift(0);
                            transactions.splice.apply(transactions, val);
                            self.__globalSettings.eventAggregator.publish('transactions.found', self);
                        }

                        self.isBusy(false);
                    }
                    ,
                    null
                    , function (val) {
                        if (val && val.length > 0) {
                            val.unshift(0);
                            transactions.splice.apply(transactions, val);
                            self.__globalSettings.eventAggregator.publish('transactions.found', self);
                        }

                        self.isBusy(false);
                    }
                    
                );
            }

        }
            ,
        toggleMainForm: function () {
            this.showForm(!this.showForm());
        }

        ,
        
        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            settings.not = '.koGrid, .koGrid div, .kgRow, .kgCell div, .kgHeaderCell div, .kgTopPanel, .kgColMenu, .kgFooterPanel, .kgColListItem, .kgRow.odd, .kgRow.even, .kgRow.selected, .kgGroupIcon';
            return settings;
        }
            ,


        close: function () {
            this.hideCloseForm(true);
        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
            if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
            }
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
            }
        }

    });
})();

