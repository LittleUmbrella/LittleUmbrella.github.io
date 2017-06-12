
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.NavigableSatellite = (function () {



        return new JS.Module("circleverse.viewModel.NavigableSatellite", {

            initialize: function (object, parent, settings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                //include: [becu_org.ui.viewModel.baseModule],
                var self = this;

                self.callSuper();
                //properties

                self.startPosition = { x: 0, y: 0 };


                self.startPosition.x = self.location().left;
                self.startPosition.y = self.location().top;

                self.isBeingFiltered = false;

                self.navState = ko.observable();
                self.opacity = ko.observable(1);
                self.pulse = ko.observable(false);
            }
            ,

            dragEnded: function () {
                var self = this;


                self.startPosition.x = self.location().left;
                self.startPosition.y = self.location().top;
            }
            ,

            dragStarted: function () {
                var self = this;


                self.startPosition.x = self.location().left;
                self.startPosition.y = self.location().top;
            }
            ,


            dropx: function (e, ev, dd) {
                var self = this;

                if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                    //var data = $(e.target).data("dropdata");
                    //if (data.viewModel != self) {
                    //    console.log('swap ' + self.model().accountNumber());
                    //    data.viewModel = self;
                    //}

                    return false;
                }

                self.callSuper();
            }
        ,

            dropxover: function (e, ev, dd) {
                if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel))
                    return false;

                this.callSuper();
            }
        ,

            dropxout: function (e, ev, dd) {
                if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel))
                    return false;

                this.callSuper();
            }
        ,

        //    dropxend: function (e, ev, dd) {
        //        if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel))
        //            return false;

        //        this.callSuper();
        //    }
        //,

            dropxend: function (e, ev, dd) {
                var self = this;
                if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {

                    if (-1 == dd.drop.indexOf(e.target)) {
                        var vm = self.parent.navigate(self);

                    //    var data = $(e.target).data("dropdata");
                    //    if (data.viewModel != vm) {
                    //        console.log('swap ' + self.model().accountNumber() + '  for ' + vm.model().accountNumber());
                    //        data.viewModel = vm;
                    //    }
                    }
                    return false;
                }

                this.callSuper();
            }
        ,

            dropxselect: function (e, ev, dd) {
                if (dd.drag && ko.dataFor(dd.drag).isA(circleverse.viewModel.SatelliteNavigatorViewModel))
                    return false;

                this.callSuper();
            }
        
        });
    })();

