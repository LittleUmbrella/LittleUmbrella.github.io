﻿
eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.CustomerAccountTransactionsViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('littleUmbrella.circleverse.viewModel.CustomerAccountTransactionsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            //properties


            var initSize = 50;
 self.size = ko.observable(initSize);

            this.callSuper();

            

            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.name('icon-exchange icon-size-2x');
            this.icon.location = { center: true, offset: { y: -2, x: -4} }; //ko.observable(false);//

            //var len = self.rawModel().length;
            //for (var i = 0; i < len; i++) {
            //    self.childViewModels.push(new circleverse.viewModel.AccountTransactionViewModel(self.rawModel()[i], self, globalSettings));
            //}



            this.childrenOnTop = ko.observable(true);


            this.info = "Account Transactions (includes Pending)";

            var acct = self.parent.rawModel();

            self.accountIconClass = ko.observable(self.parent.icon.name());
            self.accountName = ko.observable(acct.accountNumber);
            self.balance = ko.observable(acct.balance);

            self.showForm = ko.observable(false);

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

