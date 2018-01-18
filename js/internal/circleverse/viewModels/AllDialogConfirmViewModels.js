eaf.util.namespace('littleUmbrella.circleverse.viewModel');

//alert('hi');

littleUmbrella.circleverse.viewModel.AllDialogConfirmViewModels = (function () {
    var initSize = 0;
    return new JS.Class('littleUmbrella.circleverse.viewModel.AllDialogConfirmViewModels', {
        __getCoords: function () {
            var self = this;

            var minTop = 0;
            var minLeft = 210;

            // var calcTop = 20;
            // var top = (calcTop < minTop) ? minTop : calcTop;

            // var calcLeft = (($(window).width() - this.dimensions().width)) * .7;
            // var left = (calcLeft < minLeft) ? minLeft : calcLeft;
            var top = 75;
            var left = 75;
            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        },

        initialize: function (globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            self.allDialogs = ko.observableArray();
            self.eventAggregator = globalSettings.eventAggregator;
            self.globalSettings = globalSettings;

            self.dimensions = ko.observable({ height: globalSettings.globalDimensions.height - 150, width: globalSettings.globalDimensions.width - 150 });

            //this.label("Addresses");


            var pos = self.__getCoords();
            self.location = ko.observable(pos);

            self.eventAggregator.subscribe('dialog.confirm.open', function (topic, data) {
                var dialogVm = new circleverse.viewModel.DialogViewModel(data, self, globalSettings);
                if (-1 == self.allDialogs.indexOf(dialogVm))
                    self.allDialogs.push(dialogVm);
                //dialogVm.toggleMainForm();
                self.globalSettings.eventAggregator.publish('stage.activeThings.add', dialogVm);
            });
            self.eventAggregator.subscribe('dialog.message.open', function (topic, data) {
                var dialogVm = new circleverse.viewModel.DialogViewModel(data, self, globalSettings);
                if (-1 == self.allDialogs.indexOf(dialogVm))
                    self.allDialogs.push(dialogVm);
                //dialogVm.toggleMainForm();
                self.globalSettings.eventAggregator.publish('stage.activeThings.add', dialogVm);
            });

            

        }
        ,

        closeFinished: function(){
            var self = this;


        }
    });


})();
