
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CustomerContactViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.CustomerContactViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule,
            circleverse.viewModel.satellite,
            circleverse.viewModel.centerCircle,
            becu_org.ui.viewModel.draggableModule,
            becu_org.ui.viewModel.droppableModule,
            circleverse.viewModel.NavigableSatellite
        ],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;

            self.hasIntroOcurred = ko.observable(false);
            self.kickoffIntro = ko.observable(false);

            var initSize = 100;
            self.size = ko.observable(initSize);



            self.callSuper(object, parent, globalSettings, {
                dropFilter: '.account',
                minCenterDiameter: 150,
                mapping: {
                    map: globalSettings.mappings['becu_org_domain_model_Customer']
                }
            });

            
            self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

            self.icon.location = { center: true, offset: { y: -35 } }; //ko.observable(false);//

            self.icon.url = "";// ko.observable('url("/media/img/trashpiggy35x35.png")');


            self.icon.name('icon-user icon-size-2x');
            self.icon.location = { center: true, offset: { y: -2, x: -4 } }; //ko.observable(false);//

        }

            ,

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.contact, .trash, .settings, .help';
            return settings;
        }
        //            ,


        //        close: function () {
        //            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
        //            //refactor to ask service/domain to close
        //            //this.from.amount();
        //            this.closeAccountVm.hideCloseForm(true);
        //            //}
        //        }
            ,

        //dropxstart: function (e, ev, dd) {
        //    if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel))
        //        return false;

        //    this.callSuper();
        //}
        //,


        droppedOn: function (dragModel, dragViewModel) {
            var self = this;

            if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
                self.__globalSettings.eventAggregator.publish('circleverse.account.transfer.requested', { from: dragModel, to: self.model() });

            }

            if (dragViewModel.isA(circleverse.viewModel.PaymentScheduleViewModel)) {
                self.model().paymentSchedules.push(dragModel);

                dragViewModel.hide(true);
                dragViewModel.parent.parent.model().remove(dragModel);
            }
        }
            ,

        dropped: function (dropModel, dropViewModel, args) {
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
                this.closeAccountVm.hideCloseForm(false);
            }
        }

    });
})();

