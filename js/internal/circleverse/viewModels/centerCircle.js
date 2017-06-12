
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.centerCircle = (function () {



        return new JS.Module("centerCircle", {

            initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                //include: [becu_org.ui.viewModel.baseModule],
                var self = this;
                self.settings = $.extend(self.settings || {}, { ignoreUnderscore: true }, opts);

                self.callSuper();
                //properties

                if (!self.size)
                    self.size = ko.observable();

                if (!self.children)
                    self.children = ko.observableArray();



                if (!self.innerArr)
                    self.innerArr = ko.observableArray().extend({ rateLimit: 200 });

                //if (!self.filterableArr)
                //    self.innerArr = ko.observableArray();

                if (!self.childViewModels)
                    self.childViewModels = ko.observableArray();//.extend({ rateLimit: 200 });

                self.globalSettings = globalSettings;

                self.modelItem = ko.computed(function () {
                    var len = self.childViewModels().length, itemDiameter = 0, itemBorderWidth = 0, item, modelItem;

                    if (0 == len) return null;

                    //get item size
                    for (var i = 0; i < len; i++) {
                        item = ko.unwrap(self.childViewModels()[i]);

                        if (item && (itemDiameter + itemBorderWidth) < (item.size() + item.borderWidth)) {
                            itemDiameter = item.size();
                            itemBorderWidth = item.borderWidth;

                            modelItem = item
                        }
                    }

                    return modelItem;
                });

                self.itemRadius = ko.computed(function () {
                    var modelItem = self.modelItem();

                    if (!modelItem) return 0;

                    return modelItem.size() / 2 + modelItem.borderWidth;
                });



                self.ringRadius = ko.computed(function () {
                    var satellite = self.modelItem();
                    if (!satellite)
                        return 0;

                    var res = littleUmbrella.circleverse.ui.shapes.satellite.getPosition.call(satellite, satellite.__settings());
                    return res.ringRadius;
                    //return (self.size() / 2) + self.borderWidth + self.itemRadius();
                });

                self.shadowActive = ko.observable(false);

                var showShadow = ko.observable(globalSettings['shadeChildren'].value());

                globalSettings.eventAggregator.subscribe('circleverse.setting.changed', function (msg, data) {
                    if (data.setting == 'shadeChildren') {
                        showShadow(data.value);
                    }

                });

                self.shadow = ko.computed(function () {
                    var ss = showShadow();

                    if (self.shadowActive()) {
                        if (!ss) return 'none';
                        if (self.globalSettings['theme'].value() == 'light') {
                            //return '0 0 0 ' + ((self.itemRadius() * 2) + 15) + 'px rgba(86, 174, 224,.3)';
                            return '0 0 0px ' + ((self.ringRadius()) + self.itemRadius() + 5) + 'px rgba(255, 255, 255,.65)';
                        }
                        else {
                            return '0 0 0px ' + ((self.ringRadius()) + self.itemRadius() + 5) + 'px rgba(0, 0, 0,.55)';
                        }
                    }

                    return 'none';
                });

                self.innerArr.subscribe(function (changes) {
                    //return;
                    var changesArrLen = changes.length;
                    //                 changes will be: [
                    //{
                    //    index: idx,
                    //    status: 'added' | 'removed',
                    //    value: obj
                    //}
                    //                 ], ...
                    
                }, self, "arrayChange");

                self.toggledRecently = false;
                self.childrenVisible = ko.observable(false);
                self.childrenVisible.subscribe(function (val) {
                    if (val) {
                        self.toggledRecently = true;
                        self.onTop((self.onTop() || 0) + 1);

                        //settimeout
                        setTimeout(function () {
                            self.toggledRecently = false;
                        }, 1000);
                    }
                });

                self.hasChildrenToggled = ko.observable(false);

            }
            ,

            reevaluateShadowState: function () {
                var self = this,
                    childViewModelsArr = self.childViewModels(),
                    childViewModelsLength = childViewModelsArr.length,
                    childViewModelsItem
                ;

                for (var i = 0; i < childViewModelsLength; i++) {
                    childViewModelsItem = ko.unwrap(childViewModelsArr[i]);

                    if (childViewModelsItem.showMe()) {

                        self.shadowActive(true);
                        return;
                    }

                }


                self.shadowActive(false);
            }

        ,

            toggleChildrenVisibility: function () {
                var self = this, arr = self.childViewModels(), len = arr.length, item;

                if (!self.hasChildrenToggled()){
                    self.hasChildrenToggled(true);
                }

                for (var i = 0; i < len; i++) {
                    item = ko.unwrap(arr[i]);
                    item.pop();
                }

                self.childrenVisible(!self.childrenVisible());

                if (self.globalSettings['autoPin'].value()) {
                    if (self.pinViewModel)
                        self.pinViewModel.togglePin([self.pinViewModel]);
                }
            }
            ,

            pin: function (except) {
                var self = this, arr = self.childViewModels(), len = arr.length;

                for (var i = 0; i < len; i++) {

                    var child = ko.unwrap(arr[i]), exceptlen = except.length, unpinChild = true;
                    for (var j = 0; j < exceptlen; j++) {
                        if (ko.unwrap(except[j]).parent == child) {
                            unpinChild = false;
                            break;
                        }
                        
                    }
                    if (unpinChild)
                        ko.unwrap(arr[i]).pop();
                }

            }


        });
    })();

