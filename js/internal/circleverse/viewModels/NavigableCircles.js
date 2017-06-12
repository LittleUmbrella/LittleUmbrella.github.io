
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.NavigableCircles = (function () {

        var isInRenderedArray = function (item, renderedArray) {
            var length = renderedArray.length;

            for (var i = 0; i < length; i++) {
                if (ko.unwrap(renderedArray[i]) == item)
                    return true;

            }

            return false;
        }

        return new JS.Module("circleverse.viewModel.NavigableCircles", {

            initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                //include: [becu_org.ui.viewModel.baseModule],
                var self = this;

                self.callSuper();
                //properties

                if (!self.size)
                    self.size = ko.observable();
                
                //self.settings = opts;

                var defaults = { visibleCnt: 'fitCount', iconName: 'icon-arrows-h icon-size-3x', iconColor: '#56aee0', iconBorderColor: '#56aee0' };
                self.settings = $.extend(self.settings || {}, defaults, opts);

                if (!self.innerArr)
                    self.innerArr = ko.observableArray().extend({ rateLimit: 200 });
                else
                    self.innerArr.extend({ rateLimit: 200 });
                
                if (!self.childViewModels)
                    self.childViewModels = ko.observableArray();//.extend({ rateLimit: 200 });
                //else
                //    self.childViewModels.extend({ rateLimit: 200 });
                
                if (!self.innerWellArr)
                    self.innerWellArr = [];

                self.fitCnt = ko.computed(function () {
                    var len = self.innerArr().length;

                    if (0 == len) return 0;


                    return Math.floor(littleUmbrella.circleverse.ui.shapes.satellite.howManyOuter((self.size() / 2) + self.borderWidth, self.itemRadius()));

                });


                self.visiblCnt = self.settings.visibleCnt;

                if ('fitCount' == self.settings.visibleCnt) {
                    self.visiblCnt = self.fitCnt() || 1;
                    self.fitCnt.subscribe(function (val) {
                        self.visiblCnt = val;
                    });
                }

                self.icon.name(self.settings.iconName);
                self.icon.color(self.settings.iconColor);
                self.borderColor(self.settings.iconBorderColor);



                //self.childViewModels = ko.observableArray();
                var arrLen = self.innerArr().length;

                for (var ni = 0; ni < arrLen; ni++) {
                    var item = arr[ni];
                    
                    if (self.settings.visiblCnt > self.childViewModels().length) {
                        self.childViewModels.push(ko.observable(item));
                        //self.childViewModels.push(item);
                    }
                }

                self.overflowing = false;

                var navigator = self.navigator = new circleverse.viewModel.SatelliteNavigatorViewModel({}, self, globalSettings, { dropFilter: self.settings.dropFilter }),
                    itemsWereRemoved = false;
                                        
                
                self.innerArr.subscribe(function (changes) {
                    //return;
                    //                 changes will be: [
                    //{
                    //    index: idx,
                    //    status: 'added' | 'removed',
                    //    value: obj
                    //}
                    //                 ], ...
                    
                    //the below (commented out) is a bit too complicated.
                    //let's just build the state we need and then set it in place (childViewModels)

                    //the first thing we need to do is make sure our cache of all items is up-to-date with
                    //all possible values (view-models), as we don't know how to create view-models and don't want to impose
                    //a factory method on descendents
                    //the well/cache will just contain all view-models ever added, so that, when filtering, we can recycle
                    //ones that were previously removed


                    var well = self.innerWellArr,
                        wellDepth = well.length,
                        wellItem,
                        idealState = [],
                        innerArr = self.innerArr()
                    ;

                    //keeping cache up-to-date
                    var changesArrLen = changes.length, found = false;
                    for (var cidx = 0; cidx < changesArrLen; cidx++) {
                        var item = changes[cidx];

                        if ('added' == item.status) {
                            wellDepth = well.length;
                            //keep going if already in well.  can't use indexOf, as changes isn't a simple array
                            for (var wellIdx = 0; wellIdx < wellDepth; wellIdx++) {
                                if (well[wellIdx] == item.value) {
                                    found = true;
                                    break;
                                }
                            }

                            if (!found) {
                                well.push(item.value);
                            }

                            //reset
                            found = false;
                        }
                    }

                    //now that our cache is up-to-date, build our ideal state
                    wellDepth = well.length;
                    for (var wellIdx = 0; wellIdx < wellDepth; wellIdx++) {
                        wellItem = well[wellIdx];
                                                
                        if (-1 != innerArr.indexOf(wellItem))
                            idealState.push(wellItem);

                    }

                    var childViewModelsArr = self.childViewModels(),
                        childViewModelsIdx = 0,
                        childViewModelsItem,
                        childViewModelsContainer,
                        childViewModelsLength = childViewModelsArr.length,
                        emptyChildViewModelsItem,
                        idealStateItem,
                        idealStateIdx = 0,
                        idealStateLength = idealState.length,
                        
                        hasNavigator = false;
                    ;


                    //we have our ideal state, so make it real and so mote it be.
                    //we could either loop the ideal state and plop into the view-model collection until either is maxxed-out
                    //or we could loop the view-model collection.  Doing the latter
                    //when we do this kind of long swap (throughout an array, between items)
                    //first we need to grab the start state of all items, so we don't lose values in swaps

                    //grab current state
                    var tempStateArr = [], tempState;
                    for (childViewModelsIdx = 0; childViewModelsIdx < childViewModelsLength; childViewModelsIdx++) {
                        childViewModelsContainer = childViewModelsArr[childViewModelsIdx];
                        childViewModelsItem = childViewModelsContainer();

                        //don't care about navigator
                        if (childViewModelsItem.isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                            hasNavigator = true;
                            continue;
                        }

                        tempStateArr.push(self.__getNewSatelliteState(childViewModelsItem));
                    }

                    //make current state ideal state
                    for (childViewModelsIdx = 0, idealStateIdx = 0; childViewModelsIdx < childViewModelsLength; childViewModelsIdx++, idealStateIdx++) {
                        childViewModelsContainer = childViewModelsArr[childViewModelsIdx];
                        childViewModelsItem = childViewModelsContainer();

                        //don't care about navigator
                        if (childViewModelsItem.isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                            idealStateIdx--;
                            continue;
                        }

                        tempState = tempStateArr[idealStateIdx];

                        //if there is an ideal item corresponding (by index), use it, otherwise put in an empty
                        if (idealStateIdx < idealStateLength) {
                            idealStateItem = idealState[idealStateIdx];

                            idealStateItem.isBeingFiltered = true;
                            self.__copyState(idealStateItem, tempState);
                            //idealStateItem.location(tempLocation.location);
                            //idealStateItem.popToggle(tempLocation.popToggle);
                            idealStateItem.opacity(1);
                            idealStateItem.pulse(true);
                            idealStateItem.popToggle(self.childrenVisible());
                            idealStateItem.showMe(self.childrenVisible());

                            console.log('replacing ' + childViewModelsItem.klass.displayName);// + ko.mapping.toJS(childViewModelsItem));
                            console.log('with ' + idealStateItem.klass.displayName + JSON.stringify(ko.mapping.toJS(tempState)));

                            childViewModelsContainer(idealStateItem);
                            idealStateItem.isBeingFiltered = false;

                        }
                        else {
                            emptyChildViewModelsItem = new circleverse.viewModel.EmptyNavigableSatelliteViewModel(null, self, globalSettings, opts);

                            emptyChildViewModelsItem.isBeingFiltered = true;
                            self.__copyState(emptyChildViewModelsItem, tempState);
                            emptyChildViewModelsItem.showMe(false);

                            console.log('subbing in an empty ' + emptyChildViewModelsItem.klass.displayName + JSON.stringify(ko.mapping.toJS(tempState)));
                            //emptyChildViewModelsItem.location(tempLocation.location);
                            //emptyChildViewModelsItem.popToggle(tempLocation.popToggle);
                            childViewModelsContainer(emptyChildViewModelsItem);
                            emptyChildViewModelsItem.isBeingFiltered = false;
                        }

    
                    }


                    //for (var l = 0; l < childViewModelsLength; l++) {
                    //    //the navigator is a special case
                        
                    //    if (childViewModelsArr[l]().isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                    //        hasNavigator = true;
                    //        continue;
                    //    }

                    //}

                    

                    //var visibleLengthComparer = hasNavigator ? self.visiblCnt + 1 : self.visiblCnt;

                    //so now the existing view-model collection is set right, what about if we need to create more view-models?
                    //we left off the ideal at idealStateIdx, so we have to begin there
                    if (idealStateLength > childViewModelsLength){// && childViewModelsLength < visibleLengthComparer){
                        while (idealStateIdx < self.visiblCnt && idealStateIdx < idealStateLength) {
                            idealStateItem = idealState[idealStateIdx];
                            idealStateItem.opacity(1);
                            idealStateItem.showMe(self.childrenVisible());

                            self.childViewModels.push(ko.observable(idealStateItem));

                            idealStateIdx++;
                        }
                    }


                    //navigator logic: show/no show
                    //childViewModelsArr = self.childViewModels();
                    childViewModelsLength = childViewModelsArr.length;

                    if (idealStateLength > self.visiblCnt) {

                        var last = ko.unwrap(childViewModelsArr[childViewModelsLength - 1]);
                        navigator.location({ left: last.location().left, top: last.location().top });

                        if (!hasNavigator) {
                            navigator.dimensions({ width: last.dimensions().width, height: last.dimensions().height });

                            navigator.size(last.size());

                            self.childViewModels.push(ko.observable(navigator));
                        }

                        navigator.showMe(self.childrenVisible());
                        self.overflowing = true;
                    }
                    else {
                        navigator.showMe(false);
                        self.overflowing = false;
                    }

                    self.reevaluateShadowState();
                    //var innerArrLength = self.innerArr().length,
                    //    childViewModelsArr = self.childViewModels(),
                    //    childViewModelsItem,
                    //    tempChildViewModelsItem,
                    //    shifted = false,
                    //    fillerItem,
                    //    childViewModelsLength = self.childViewModels().length,
                    //    next,
                    //    from = null,
                    //    removedIdxs = [],
                    //    notRemovedIdxs = [],
                    //    childContainer,
                    //    tempContainer
                    //;

                    ////handle removeds first


                    //for (var cidx = 0; cidx < changesArrLen; cidx++) {
                    //    var item = changes[cidx];

                    //    if ('deleted' == item.status) {
                            
                    //        for (var i = 0; i < childViewModelsLength; i++) {
                    //            childVmContainer = childViewModelsArr[i];

                    //            var rawModel = childVmContainer().rawModel()
                    //            if (rawModel == item.value.rawModel()) {
                    //                wasRemoved = true;

                    //                var empty = new circleverse.viewModel.EmptyNavigableSatelliteViewModel(null, self, globalSettings, opts),
                    //                    container = childVmContainer();

                    //                self.__copyState(empty, container);

                    //                childVmContainer(empty);
                    //                itemsWereRemoved = true;
                    //                break;
                    //            }
                    //        }

                    //        if (wasRemoved)
                    //            removedIdxs.push(i);
                    //        ////can't really tell what wasn't removed from above; infer it from what WAS removed
                    //        //else
                    //        //    notRemovedIdxs.push(i);



                    //    }

                    //    //reset
                    //    wasRemoved = false;
                    //}

                    ////this is where some serious sorting algorithms could help, but I'm too lazy right now, so I'ma brute it

                    //if (itemsWereRemoved){
                    //    var removedLength = removedIdxs.length, notRemovedLength = childViewModelsLength - removedLength;
                    //    if (removedLength >= notRemovedLength) {
                    //        for (var i = 0; i < removedLength; i++) {
                    //            childContainer = childViewModelsArr[removedIdxs[i]];
                    //            childViewModelsItem = childContainer();
                    //            tempContainer = childViewModelsArr[notRemovedIdxs[i]];
                    //            tempChildViewModelsItem = tempContainer();

                    //            self.__swapState(childViewModelsItem, tempChildViewModelsItem);
                    //            tempContainer(childViewModelsItem);
                    //            childContainer(tempContainer);
                    //        }
                    //    }
                    //    else {
                    //        //there are more survivors than deaths

                    //        //shift survivors into dead slots

                    //        ////track the swappers
                    //        //var swappersArr = [];
                    //        for (var i = 0; i < removedLength; i++) {
                    //            //always true if (i < notRemovedLength) {
                    //                childContainer = childViewModelsArr[removedIdxs[i]];
                    //                childViewModelsItem = childContainer();
                    //                tempContainer = childViewModelsArr[notRemovedIdxs[i]];
                    //                tempChildViewModelsItem = tempContainer();

                    //                self.__swapState(childViewModelsItem, tempChildViewModelsItem);
                    //                tempContainer(childViewModelsItem);
                    //                childContainer(tempContainer);

                    //                //swappersArr.push(i
                    //                //continue;
                    //            //}
                    //        }
                    //        //have to now scootch down the other survivors into the survivors slots that moved
                    //        if (childViewModelsItem().isA(circleverse.viewModel.EmptyNavigableSatelliteViewModel)) {
                    //            //reset 
                    //            shifted = false;

                    //            for (var j = i + 1; j < childViewModelsLength; j++) {

                    //                if (!tempChildViewModelsItem().isA(circleverse.viewModel.EmptyNavigableSatelliteViewModel) &&
                    //                    !tempChildViewModelsItem().isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                    //                    var tempContained = childViewModelsItem();

                    //                    self.__swapState(tempContained, tempChildViewModelsItem());
                    //                    childViewModelsItem(tempChildViewModelsItem());
                    //                    childViewModelsItem().showMe(self.childrenVisible());
                    //                    tempChildViewModelsItem(tempContained);
                    //                    shifted = true;
                    //                }
                    //            }

                    //            if (!shifted) {
                    //                //try to fill up the rest
                    //                if (innerArrLength > 0) {
                    //                    do {
                    //                        if (next) from = next;
                    //                        next = self.getNext(from, true);
                    //                    } while (self.__inFilteredOut(changes, next));
                    //                }

                    //                if (next) {
                    //                    next.showMe(self.childrenVisible());
                    //                    childViewModelsItem(next);
                    //                }
                    //                else {
                    //                    //set the rest to invisible
                    //                    for (var k = i + 1; k < childViewModelsLength; k++) {
                    //                        //the navigator is a special case
                    //                        tempChildViewModelsItem = childViewModelsArr[k];

                    //                        if (tempChildViewModelsItem().isA(circleverse.viewModel.EmptyNavigableSatelliteViewModel) || tempChildViewModelsItem().isA(circleverse.viewModel.SatelliteNavigatorViewModel))
                    //                            continue;

                    //                        tempChildViewModelsItem.showMe(false);
                    //                    }

                    //                    break;
                    //                }
                    //            }
                    //        }
                            
                    //    }
                        
                    //}



                    //var hasNavigator = false;
                    //for (var l = 0; l < childViewModelsLength; l++) {
                    //    //the navigator is a special case
                    //    tempChildViewModelsItem = childViewModelsArr[l];

                    //    if (tempChildViewModelsItem().isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                    //        hasNavigator = true;
                    //        continue;
                    //    }

                    //}




                    ////else {
                    ////for (var cidx = 0; cidx < changesArrLen; cidx++) {
                    ////var item = changes[cidx];


                    ////if ('added' == item.status) {
                    //var visibleLengthComparer = hasNavigator ? self.visiblCnt + 1 : self.visiblCnt;


                    ////how many vm containers are now containing null. if there are any, fill'm up 
                    //var nullIdx, nullableLength = self.childViewModels().length, nullContainer, nullVms = [];
                    //for (var nullIdx = 0; nullIdx < nullableLength; nullIdx++) {
                    //    nullContainer =  self.childViewModels()[nullIdx];
                    //    if (nullContainer().isA(circleverse.viewModel.EmptyNavigableSatelliteViewModel))
                    //        nullVms.push(nullContainer);
                    //}

                    //var nullLength = nullVms.length;
                    //for (nullIdx = 0; nullIdx < nullLength; nullIdx++) {
                    //    if (self.innerArr().length > 0) {
                    //        //can't grab next if it is filtered out
                    //        do{
                    //            if (next) from = next;
                    //            next = self.getNext(from, true);
                    //        } while (self.__inFilteredOut(changes, next));

                    //        if (!next)
                    //            break;
                    //    }
                    //    else
                    //        break;
                    //    nullContainer = nullVms[nullIdx];

                    //    next.showMe(self.childrenVisible());

                    //    self.__copyState(next, nullContainer());

                    //    nullContainer(next);

                    //}

                    //from = null; next = null;
                    //while (visibleLengthComparer > self.childViewModels().length){// && innerArrLength > (childViewModelsLength - nullLength)) {
                    //    if (self.innerArr().length > 0){
                    //        do {
                    //            if (next) from = next;
                    //            next = self.getNext(from, true);
                    //        } while (self.__inFilteredOut(changes, next));
                    //        if (!next)
                    //            break;
                    //    }
                    //    else
                    //        break;

                    //    next.showMe(self.childrenVisible());
                    //    self.childViewModels.push(ko.observable(next));

                    //}

                    //if (!hasNavigator)
                    //    for (l = 0; l < childViewModelsLength; l++) {
                    //        //the navigator is a special case
                    //        tempChildViewModelsItem = childViewModelsArr[l];

                    //        if (tempChildViewModelsItem().isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                    //            hasNavigator = true;
                    //            continue;
                    //        }
                    //    }

                    ////navigator logic: show/no show
                    //if (self.innerArr().length > self.visiblCnt && self.childViewModels().length >= self.visiblCnt) {

                    //    var last = ko.unwrap(self.childViewModels()[self.childViewModels().length - 1]);
                    //    navigator.location({ left: last.location().left, top: last.location().top });

                    //    if (!hasNavigator) {
                    //        navigator.dimensions({ width: last.dimensions().width, height: last.dimensions().height });

                    //        navigator.size(last.size());

                    //        self.childViewModels.push(ko.observable(navigator));
                    //    }

                    //    navigator.showMe(self.childrenVisible());
                    //    self.overflowing = true;
                    //}
                    //else {
                    //    navigator.showMe(false);
                    //}
                    ////}  
                    ////}
                    ////}

                    ////for (l = 0; l < childViewModelsLength; l++) {
                    ////    //the navigator is a special case
                    ////    tempChildViewModelsItem = childViewModelsArr[l]();

                    ////    if (!tempChildViewModelsItem.isA(circleverse.viewModel.SatelliteNavigatorViewModel)) {
                    ////        tempChildViewModelsItem.location(tempChildViewModelsItem.getCalculatedLocation());
                    ////    }
                    ////}

                    ////reset
                    //itemsWereRemoved = false;
                }, self, "arrayChange");



                self.totalCnt = self.innerArr().length;
                //var arr = newArr;

                self.lastSwappedIndex = self.visiblCnt - 1;

                //var childViewModels = newArr.slice(0, visibleCnt);
                //self.childViewModelsPlusNav = childViewModels.slice(0, childViewModels.length);
                if (self.visiblCnt < self.innerArr().length && !self.overflowing) {

                    var last = ko.unwrap(self.childViewModels()[self.childViewModels().length - 1]);
                    navigator.location({ left: last.location().left, top: last.location().top });
                    navigator.dimensions({ width: last.dimensions().width, height: last.dimensions().height });
                    navigator.size(last.size());

                    self.childViewModels.push(ko.observable(navigator));
                    //self.childViewModels.push(navigator);
                }



                self.atEnd = ko.computed(function () {
                    var self = this;
                    if (self.visibleCnt - 1 == self.lastSwappedIndex) {
                        return true;
                    }
                    return false;
                }).bind(this);

                self.atBeginning = ko.computed(function () {
                    var self = this;
                    if (self.lastSwappedIndex == 0) {
                        return true;
                    }
                    return false;
                }).bind(this);

                //self.renderCollection = self.childViewModels;
                
                //we start on the last item, so we don't want to nav away from it, if going forward
                self.startNavItem = null;
                self.__hasNavved = false;
            }
            ,
            
            __inFilteredOut: function (filteredOut, item) {
                var changesArrLen = filteredOut.length;
                //                 changes will be: [
                //{
                //    index: idx,
                //    status: 'added' | 'removed',
                //    value: obj
                //}
                //                 ], ...
                    
                //handle removeds first
                for (var cidx = 0; cidx < changesArrLen; cidx++) {
                    var filteredItem = filteredOut[cidx];

                    if ('deleted' == filteredItem.status) {
                        if (filteredItem.value == item)
                            return true;
                    }
                }
            }
            
        ,
            __setFilterableProps: function () {
                var self = this;

                


                var arr = self.getRawChildren();

                if (!arr)
                    throw new Error('filterable getRawChildren returned falsy');

                if (arr.length == 0)
                    return [];


                self.__hasSetFilterableProps = true;

                var val, filterableProps = [], sample = arr[0];
                for (n in sample) {
                    if (!sample.hasOwnProperty(n)) continue;
                    if (n.indexOf("__") == 0 && self.settings.ignoreUnderscore) continue;

                    val = sample[n];
                    if (typeof val == 'string' || val instanceof String || typeof val == 'number' || val instanceof Number || (val instanceof Date && !isNaN(val.valueOf())) || typeof val == 'boolean' || val instanceof Boolean) {
                        filterableProps.push(n);
                    }
                }

                self.filterableProps = filterableProps;
            }
            ,

            getRawChildren: function () {
                var self = this;

                return self.rawModel();
            }
            ,

            filter: function (filterValue) {
                var self = this;

                if (!self.__hasSetFilterableProps)
                    self.__setFilterableProps();

                //var filterable = self.filterable, basicFilter = self.basicFilter(), props = self.filterableProps;

                //if (!filterable || null == basicFilter || props.length == 0) return;

                var arr = self.getRawChildren();

                if (!arr)
                    throw new Error('filterable getRawChildren returned falsy');

                var length = arr.length, item, props = self.filterableProps, propLength = props.length, val, filteredArr = [];


                for (var i = 0; i < length; i++) {
                    item = arr[i];
                    //var addToFiltered = false;

                    for (var j = 0; j < propLength; j++) {
                        val = item[props[j]];

                        if ('string' != typeof val) {
                            val = val.toString();
                        }

                        if (val.indexOf(filterValue) > -1) {
                            //addToFiltered = true;
                            filteredArr.push(item);
                            break;
                        }
                    }
                }
                //var args = filteredArr;
                //args.unshift(0, args.length);


                
                self.innerArr.remove(function (item) {
                    if (-1 == filteredArr.indexOf(item.rawModel()))
                        return true;

                    return false;
                });

                var filteredArrayLength = filteredArr.length, model;
                for (var f = 0; f < filteredArrayLength; f++) {
                    model = filteredArr[f];

                    var innerArrLength = self.innerArr().length, found = false, innerVm;
                    for (var j = 0; j < innerArrLength; j++) {
                        innerVm = self.innerArr()[j];
                        if (innerVm.rawModel() == model) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        var wellDepth = self.innerWellArr.length, wellItem, wellItemFound = false;
                        for (var w = 0; w < wellDepth; w++) {
                            wellItem = self.innerWellArr[w];

                            if (wellItem.rawModel() == model) {
                                self.innerArr.push(wellItem);
                                wellItemFound = true;
                            }
                        }
                        if (!wellItemFound) {
                            throw new Error('could not find a cached item to add back to the list');
                        }
                    }

                }

                //self.children().splice.apply(self.children(), args);
                //filterable.setFiltered(filteredArr);
            }
        ,
            setFilterableArray: function (arr) {
                var self = this, args = arr;
                args.unshift(0, args.length);

                self.filterableArr.splice.apply(self.filterableArr, args);
            }
        ,
                    
            
            getNext: function (from, suppressThrow) {
                var self = this, next, idx, start, arr = self.innerArr(), isInArray;

                if (from)
                    idx = start = arr.indexOf(from);
                else {
                    idx = -1;
                    start = -1;
                }
                //if (start == -1) start = 0;

                do {

                    if (arr.length - 1 == idx) {
                        idx = -1;
                    }

                    next = arr[++idx];
                        
                        
                    if (start == idx) {
                        if (suppressThrow) break;
                        throw new Error("could not find next after " + start);
                    }
                    if (!from) start = 0;

                    isInArray = isInRenderedArray(next, self.childViewModels());
                } while (isInArray);
                

                return isInArray? null : next;
            },
            getPrevious: function (from) {
                var self = this, prev, start, arr = self.innerArr();


                var idx = start = arr.indexOf(from);

                do {
                    if (0 == idx) {
                        idx = arr.length;
                    }

                    prev = arr[--idx];

                    if (start == idx) {
                        throw new Error("could not find prev after " + start);
                    }

                } while (isInRenderedArray(prev, self.childViewModels()));


                self.__hasNavved = true;

                return prev;
            }
            ,

            navigate: function (dropped) {
                var self = this;

                var direction = self.navigator.direction;

                var droppedContainer = self.childViewModels().filter(function (data) {
                    return ko.unwrap(data) == dropped;
                })[0];

                if (!self.__hasNavved && self.startNavItem == null) {
                    self.startNavItem = dropped;
                }

                dropped.navState('inactive');
                //flip the one we are navigating away from 
                //base it on direction and lastSwappedIndex...
                //"away from" is defined as two dropped items, and the direction of the drag is "pointing" to the second
                //"pointing" is defined as the difference between the two dropped items
                //if moving away from dropped item, and moving clockwise, if dropped item isn't current index make next
                //if moving away from dropped item, and moving counterclockwise, if dropped item isn't current index + visible count make previous
                    
                //safety
                //if (!droppedContainer) return dropped;


                //var droppedIdx = $.inArray(dropped, self.childViewModels()), 
                var newItem = dropped, pulse = self.__globalSettings['navigationEffect'].value();


                if (direction > 0) {
                    if (dropped != self.startNavItem || self.__hasNavved) {

                        //console.log(dropped.icon.name);
                        newItem = self.getNext(dropped);
                        //console.log(next.icon.name);
                        newItem.startPosition.x = dropped.startPosition.x;
                        newItem.startPosition.y = dropped.startPosition.y;
                        newItem.location({
                            left: (dropped.location().left),
                            top: (dropped.location().top)
                        });
                        newItem.opacity(dropped.opacity());
                        newItem.navState(dropped.navState());
                        newItem.showMe(dropped.showMe());
                        newItem.popToggle(dropped.popToggle());
                        newItem.pulse(pulse);

                        droppedContainer(newItem);
                        //self.childViewModels.splice(droppedIdx, 1, newItem);
                        self.__hasNavved = true;
                    }
                }
                else {
                    //if ((droppedIdx == 0 ? self.innerArr().length - 1 : droppedIdx - 1) != self.lastSwappedIndex) {

                    //console.log(dropped.icon.name);
                    newItem = self.getPrevious(dropped);
                    //console.log(next.icon.name);
                    newItem.startPosition.x = dropped.startPosition.x;
                    newItem.startPosition.y = dropped.startPosition.y;
                    newItem.location({
                        left: (dropped.location().left),
                        top: (dropped.location().top)
                    });
                    newItem.opacity(dropped.opacity());
                    newItem.navState(dropped.navState());
                    newItem.showMe(dropped.showMe());
                    newItem.popToggle(dropped.popToggle());
                    newItem.pulse(pulse);
                    droppedContainer(newItem);
                    //self.childViewModels.splice(droppedIdx, 1, newItem);
                        self.__hasNavved = true;
                    //}
                }


                    
                return newItem;

                
            }
            ,

            dragEnded: function (el) {
                var self = this, len = self.innerArr().length;

                for (var i = 0; i < len; i++) {
                    var item = self.innerArr()[i];

                    item.dragEnded();
                }
            }
            ,

            dragStarted: function (el) {
                var self = this, len = self.innerArr().length;

                for (var i = 0; i < len; i++) {
                    var item = self.innerArr()[i];

                    item.dragStarted();
                }
            }
            ,

            __copyState: function (to, from) {
                to.size(from.size());
                to.startPosition.x = from.startPosition.x;
                to.startPosition.y = from.startPosition.y;
                to.location({
                    left: (from.location().left),
                    top: (from.location().top)
                });
                to.opacity(from.opacity());
                to.navState(from.navState());
                to.showMe(from.showMe()); //
                to.popToggle(from.popToggle());
                to.pulse(from.pulse());
            }
            ,
            
            __getNewSatelliteState: function (from) {
                return {
                    size: ko.observable(from.size()),
                    startPosition: ko.observable({ x: from.startPosition.x, y: from.startPosition.y }),
                    location: ko.observable({ left: from.location().left, top: from.location().top }),
                    opacity: ko.observable(from.opacity()),
                    popToggle: ko.observable(from.popToggle()),
                    pulse: ko.observable(from.pulse()),
                    navState: ko.observable(from.navState()),
                    showMe: ko.observable(from.showMe())
                };
            }
            //__swapState: function (to, from) {
            //    var self = this, size, startPosition = {}, location = {}, opacity, navState, showMe, popToggle, pulse;

            //    size = to.size();
            //    startPosition.x = to.startPosition.x;
            //    startPosition.y = to.startPosition.y;
            //    location.left = to.location().left;
            //    location.top = to.location().top;
            //    opacity = to.opacity();
            //    navState = to.navState();
            //    showMe = to.showMe();
            //    popToggle = to.popToggle();
            //    pulse = to.pulse();

            //    self.__copyState(to, from);                

            //    from.size(size);
            //    from.startPosition.x = startPosition.x;
            //    from.startPosition.y = startPosition.y;
            //    from.location({
            //        left: (location.left),
            //        top: (location.top)
            //    });
            //    from.opacity(opacity);
            //    from.navState(navState);
            //    from.showMe(showMe); //showMe
            //    from.popToggle(popToggle);
            //    from.pulse(pulse);
            //}
        });
    })();

