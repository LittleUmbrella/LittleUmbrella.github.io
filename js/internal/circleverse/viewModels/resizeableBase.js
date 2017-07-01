eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

circleverse.viewModel.ResizeableBase = //(function () {



//return 
        new JS.Class('circleverse.viewModel.ResizeableBase', circleverse.viewModel.Base, {

            initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                this.callSuper();
                var self = this;
                //properties                

                self.eventAggregator = globalSettings.eventAggregator;

                self.borderWidth = 2;
                //this.size = function (val) { if (val) { } else return 100; }; // ko.observable();
                if (!self.size)
                self.size = ko.observable();

                self.isAvailable = ko.observable(false);

                self.contentTemplate = ko.observable('standardContentTemplate');
                self.mainCss = ko.observable();
                //self.eventAggregator.subscribe('circleverse.ui.viewModel.draggableModule.dragEnd', function (dd) {
                //    //                    if (dd && dd.available && self.id) {
                //    //                        var el;
                //    //                        for (var i = 0; i < dd.available; i++) {
                //    //                            if ($(el).is(self.id())) {
                //    //                                self.isAvailable(false);
                //    //                                return;
                //    //                            }
                //    //                        }
                //    //                    }

                //    self.isAvailable(false);
                //});


                //this.eventAggregator.subscribe('circleverse.ui.viewModel.draggableModule.dragStart', function (dd) {
                //    self.setIsAvailable.call(self, dd);
                //});

                self.dimensions = ko.observable();

                this.environment = eaf.Environment;

                this.__h = ko.observable(this.environment.window.height);
                this.__w = ko.observable(this.environment.window.width);

                $(this.environment).bind("resize", function (e, data) {
                    //var e;
                    //                    self.__h = self.environment.window.height;
                    //                    self.__w = self.environment.window.width;
                    self.__h(data.height);
                    self.__w(data.width);
                    //log('h: ' + self.__h + ' w: ' + self.__w);
                });

                //this.location = ko.observable();
                this.scale = ko.dependentObservable(function () {


                    if ('undefined' != typeof this.userPreferences) {
                    }



                    var NORMAL_HEIGHT = 786;
                    var NORMAL_WIDTH = 1028;

                    var scale = 1 * (Math.min((this.__h() / NORMAL_HEIGHT), this.__w() / NORMAL_WIDTH));

                    //log('scale: ' + scale);
                    return scale > 1 ? 1 : 1;

                }.bind(this));



                self.hideChildren = ko.observable(false);

            }
            ,
            setIsAvailable: function (dragItem, dropItem) {
                var self = this;

                //todo: implement by un-commenting below
                var dd = dragItem;
                //                var dragItem = $(args[2].drag);
                //                var dragData = dragItem.data("dragdata");
                //                var dragViewModel = dragData.viewModel;
                //                if ('undefined' == typeof dragViewModel)
                //                    return;

                //                var dragModel = dragViewModel.model;

                //                var dropItem = $(args[0].target);
                //                var dropData = dropItem.data("dropdata");
                //                var dropViewModel = dropData.viewModel;
                //                if ('undefined' == typeof dropViewModel)
                //                    return;

                //                var dropModel = dropViewModel.model;

                if (dd && dd.available && self.id) {
                    var el;
                    for (var i = 0; i < dd.available.length; i++) {
                        el = dd.available[i];

                        if ($(el).is('#' + self.id())) {
                            self.isAvailable(true);
                            dd.update();
                            return;
                        }
                    }
                }

                self.isAvailable(false);
            }



        });
    //})();

