
eaf.util.namespace('circleverse.controls.viewModel');


circleverse.controls.viewModel.WizardStepViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.controls.viewModel.WizardStepViewModel', {

        initialize: function (id, name, template, model) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            self.id = id;
            self.name = ko.observable(name);
            self.template = template;
            self.model = ko.observable(model);

        }
        ,

        getTemplate: function () {
            var self = this;
            return self.template;
        }

    });
})();


circleverse.controls.viewModel.WizardViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.controls.viewModel.WizardViewModel', {

        initialize: function (eventAggregator, items, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;
            self.stepModels = ko.observableArray();

            self.currentStep = ko.observable();

            self.eventAggregator = eventAggregator;

            self.currentIndex = ko.dependentObservable(function () {
                return self.stepModels.indexOf(self.currentStep());
            });


            if (items) {
                for (var i = 0; i < items.length; i++) {
                    self.stepModels.push(items[i]);
                }
            }


            self.__canGoNext = ko.observable(true);

            self.__canGoPrevious = ko.observable(true);


            self.goNextPredicate = null;

            self.goPreviousPredicate = null;

            self.canGoNext = ko.computed({
                read: function () {
                    var self = this;

                    var retVal = self.currentIndex() < self.stepModels().length - 1;

                    //                            if ('undefined' == typeof opts.canGoNext)
                    //                                return retVal;

                    //todo: error check    
                    return (retVal && self.__canGoNext());
                },
                //if the value changes, make sure that we store a number back to price
                write: function (newValue) {
                    this.__canGoNext(newValue);
                },
                owner: self
            });


            self.canGoPrevious = ko.computed({
                read: function () {
                    var self = this;

                    var retVal = self.currentIndex() > 0;

                    //                            if ('undefined' == typeof opts.canGoNext)
                    //                                return retVal;

                    //todo: error check    
                    return (retVal && self.__canGoPrevious());
                },
                //if the value changes, make sure that we store a number back to price
                write: function (newValue) {
                    this.__canGoPrevious(newValue);
                },
                owner: self
            });

        }
        ,

        makeCurrentStep: function (step) {
            var self = this;
            self.currentStep(step);
        }
        ,

        getTemplate: function (data) {
            var self = this;
            return self.currentStep().template();
        }
        ,

        goNext: function () {
            var self = this, can = self.canGoNext();

            if (self.goNextPredicate) {
                //todo: check goNextPredicate is function
                can = self.goNextPredicate();
            }

            if (can) {
                var was = self.currentIndex(), is = self.currentIndex() + 1;
                self.currentStep(self.stepModels()[is]);
                self.eventAggregator.publish('circleverse.controls.viewModel.WizardStepViewModel.currentIndexChanged', { currentIndex: is, lastCurrentIndex: was });

            }

            self.eventAggregator.publish('circleverse.controls.viewModel.WizardStepViewModel.goNext', can);
        }
        ,

        goPrevious: function () {
            var self = this, can = self.canGoPrevious();

            if (self.goPreviousPredicate) {
                //todo: check goNextPredicate is function
                can = self.goPreviousPredicate();
            }

            if (can) {
                var was = self.currentIndex(), is = self.currentIndex() - 1;
                self.currentStep(self.stepModels()[is]);
                self.eventAggregator.publish('circleverse.controls.viewModel.WizardStepViewModel.currentIndexChanged', { currentIndex: is, lastCurrentIndex: was });

            }

            self.eventAggregator.publish('circleverse.controls.viewModel.WizardStepViewModel.goPrevious', can);
        }

    });
})();



