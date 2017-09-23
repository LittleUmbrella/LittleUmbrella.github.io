

eaf.util.namespace('littleUmbrella.circleverse.ui.shapes');

eaf.util.indexOf = function (list, item) {
    if (list.indexOf) return list.indexOf(item);
    var i = list.length;
    while (i--) {
        if (list[i] === item) return i;
    }
    return -1;
};

littleUmbrella.circleverse.ui.shapes.satellite = {

    getPosition: function (settings) {
        //settings must have itemCnt, itemIndex, itemDiameter, minCenterDiameter, itemSeparation, center

        var itemIndex = eaf.util.indexOf(settings.collection, settings.item);
        var itemCnt = settings.collection.length;
        var degree = 0;
        var degreeOfSeparation = (360 / itemCnt); // + (this.diameter/100 + arr.length);

        //angle-angle-side
        //a-A-B
        var a = settings.itemDiameter + (settings.itemSeparation || 0);
        var A = degreeOfSeparation;
        var B = /*half of 180 as the two other angles are the same*/(180 - A) / 2;

        var b = a * sind(B) / sind(A);

        //log('settings.itemPadding=' + settings.itemPadding);

        var offset = (settings.itemDiameter / 2) + (settings.itemPadding || 0); // 1; //

        b = Math.max(b, (settings.minCenterDiameter / 2) + offset); // + (settings.itemDiameter));

        var radianDegree = degreeOfSeparation * (Math.PI / 180);
        //log('b=' + b);
        //log('settings.center.x=' + settings.center.x);
        //log('settings.center.y=' + settings.center.y);

        var i = radianDegree * (itemIndex + 1);
        var x = (Math.cos(i) * b) + (settings.center.x - offset);
        var y = (Math.sin(i) * b) + (settings.center.y - offset);
        //Point childPoint = new Point(Math.Cos(_angle) * radiusX, -Math.Sin(_angle) * radiusY);

        return { 'x': x, 'y': y };
    }
    ,

    getAllPositions: function (settings) {
        //settings must have itemCnt, itemIndex, itemDiameter, minCenterDiameter, itemSeparation, center
        var point;
        var points = [];
        var collection = settings.collection;

        for (var i = 0; i < collection.length; i++) {
            //item = collection[i];

            settings.item = collection[i]

            points.push(littleUmbrella.circleverse.ui.shapes.satellite.getPosition(settings));
        }
        return points;
    }
};

function sind(x) {
    return Math.sin(x * Math.PI / 180);
}


littleUmbrella.circleverse.ui.pointsAndPolygon = function (arr, minCenter, separation) {

    separation = separation || 4;

    //var methodsArr = arr;
    var diameter = minCenter;
    var degree = 0;
    var degreeStep = (360 / arr.length); // + (this.diameter/100 + arr.length);
    //alert(degreeStep );



    var mX = diameter;
    var mY = diameter;



    var printArr = [];


    var minX;
    var minY;
    var maxX;
    var maxY;

    var angle;
    var x; // = (Math.cos(angle))* diameter; //  * (((num+2)/4) * diameter);//
    var y; // = (Math.sin(angle))* diameter; // * (((num+2)/4) * diameter);//
    var arrCnt = arr.length;

    for (var i = 0; i < arrCnt; i++) {
        angle = Math.PI * degree / 180.0;
        //        x = (Math.cos(angle)) * (((arrCnt < separation ? arrCnt + 1 : arrCnt) / separation) * diameter); //* diameter; //
        //        y = (Math.sin(angle)) * (((arrCnt < separation ? arrCnt + 1 : arrCnt) / separation) * diameter); //* diameter; //
        x = (Math.cos(angle)) * (((arrCnt < separation ? arrCnt + 1 : arrCnt) / separation) * diameter); //* diameter; //
        y = (Math.sin(angle)) * (((arrCnt < separation ? arrCnt + 1 : arrCnt) / separation) * diameter); //* diameter; //


        //log('x: ' + x + ' y: ' + y);

        printArr.push({ x: x, y: y });




        //alert(pointArr );

        //        if (undefined === minX || x < minX)
        //            minX = x;

        //        if (undefined === maxX || x > maxX)
        //            maxX = x;

        //        if (undefined === minY || y < minY)
        //            minY = y;

        //        if (undefined === maxY || y > maxY)
        //            maxY = y;

        //child.RenderTransform = new RotateTransform(degree, 0, 0);   
        //child.Arrange(new Rect(mX + x, mY + y, child.DesiredSize.Width, child.DesiredSize.Height));   

        degree += degreeStep;
    }

    //alert('x: ');

    //    var width = Math.abs(minX) + Math.abs(maxX) + diameter;
    //    var height = Math.abs(minY) + Math.abs(maxY) + diameter;

    //var cRad = Math.sqrt(maxDist); //Math.sqrt(side1 *side1 + side2 *side2 );


    //    var maxDim = Math.max(width, height);

    //            var $canvas = $('#canvas');


    //            $canvas.width(maxDim);

    //            $canvas.height(maxDim);
    //            $canvas.addClass('circle');

    //alert('x: ');
    /*
  
    var polygon = [
    {'x':770, 'y':400},
    {'x':529, 'y':643},
    {'x':320, 'y':494},
    {'x':424, 'y':381},
    {'x':459, 'y':369}
    ];*/

    var con = new Polygon(printArr);
    var center = con.center();
    var radius = con.radius(diameter, diameter);

    var pp = { points: printArr, polygon: con };

    return pp;

    //alert('x: ' + center.x + ' y: ' + center.y);
    //alert('radius: ' + radius );

    var addX = radius; //Math.abs(Math.min(0, minX));//cRad /2;//
    var addY = radius; //Math.abs(Math.min(0, minY));//cRad /2;//

}

ko.bindingHandlers['eventJq'] =
{
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof jQuery == "undefined") {
            throw new Error("jQuery undefined, should use normal 'event' binding");
        }

        var eventsToHandle = valueAccessor() || {};
        for (var eventNameOutsideClosure in eventsToHandle) {
            (function () {
                var eventName = eventNameOutsideClosure; // Separate variable to be captured by event handler closure   

                if (typeof (eventName) == "string") {
                    var eventobj = valueAccessor()[eventName];
                    $(element).bind(eventName, eventobj.data.apply(viewModel, arguments), function (event) {
                        var handlerReturnValue;
                        var handlerFunction = eventobj.func;
                        if (!handlerFunction)
                            return;
                        var allBindings = allBindingsAccessor();
                        //try {
                        handlerReturnValue = handlerFunction.apply(viewModel, arguments);
                        //}
                        //finally {
                        if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.                                
                            if (event.preventDefault)
                                event.preventDefault();
                            else
                                event.returnValue = false;
                        }
                        //}
                        var bubble = allBindings[eventName + 'Bubble'] !== false;
                        if (!bubble) {
                            event.cancelBubble = true;
                            if (event.stopPropagation)
                                event.stopPropagation();
                        }
                    });
                }

            })();

        }

    } //parseJson
};


ko.bindingHandlers.dataContext = {
    init: function (element, valueAccessor) {
        var $element = $(element);
        var config = {
            template: $element.html()
        };
        $element.data('dataContext.config', config);
        // Why reset data-bind attributes? Because the point of this
        // binding is so that nested bindings apply to the value, not
        // to the current model. This prevents Knockout from continuing
        // to apply the current model to nested elements. Remember, the
        // nested bindings are still captured by `config.template` above.

        //namespace friendly
        var ns = '';
        if (typeof ko.currentlyBindingNamespace != 'undefined' && ko.currentlyBindingNamespace != '')
            ns = '-' + ko.currentlyBindingNamespace;

        $element.find('[data-bind' + ns + ']').attr('data-bind' + ns, '');

    },
    update: function (element, valueAccessor) {
        var $element = $(element)
        var config = $element.data('dataContext.config');
        var value = ko.utils.unwrapObservable(valueAccessor());
        var i, item;


        if (value) {
            $element.html(config.template);

            var ns = '';
            if (typeof ko.currentlyBindingNamespace != 'undefined' && ko.currentlyBindingNamespace != '')
                ns = ko.currentlyBindingNamespace;

            //if the value has data specified, then use it as value...
            if (eaf.util.isDefined(value, 'data')) {//(value.data) {
                item = {
                    ctx: value.data
                };

                if (typeof (value.options) != "undefined") {
                    $.extend(item, value.options);
                }
            }
            else {
                item = {
                    ctx: value
                };
            }

            if (item.ctx && ko.utils.unwrapObservable(item.ctx)) {
                // Only bind the new model to child elements, not the current
                // element, so that other binding handlers on the current
                // element continue to work.
                var children = $element.children();
                for (i = 0; i < children.length; i++) {
                    ko.applyBindings(item, ns, children[i]);
                }
                $element.show();
            }
            else {
                $element.hide().empty();
            }
        }
        else {
            $element.hide().empty();
        }
    }
};

ko.bindingHandlers.each = {
    init: function (element, valueAccessor) {
        element = $(element);

        var value = valueAccessor();
        var config = {
            template: element.html()
        };

        element.data('each.config', config);

        // Why reset data-bind attributes? Because the point of this
        // binding is so that nested bindings apply to the value, not
        // to the current model. This prevents Knockout from continuing
        // to apply the current model to nested elements. Remember, the
        // nested bindings are still captured by `config.template` above.
        element.find('[data-bind]').attr('data-bind', '');

    },
    update: function (element, valueAccessor) {
        element = $(element);
        var config = element.data('each.config');
        var value = ko.utils.unwrapObservable(valueAccessor());

        //if the value has a templateId specified, then use it's html...
        if (value.templateId) {
            var templateHtml = $("#" + value.templateId).html();
            config.template = templateHtml;
            value = value.data;
        }

        element.html(''); //clear out the element html so we can replace it with the template list.
        if (value) {
            value = ko.utils.unwrapObservable(value);
            for (idx in value) {
                var item = value[idx];
                if (typeof (item) != "object") {
                    //if the values in the array are simple types, not objects then we need to 
                    //set it as an object to allow us to bind to it.
                    item = { value: item };
                }
                var listItemContainer = $(config.template);
                //this.element.html(this.template);
                // Only bind the new model to child elements, not the current
                // element, so that other binding handlers on the current
                // element continue to work.

                for (var i = 0; i < listItemContainer.length; i++) {
                    ko.applyBindings(item, listItemContainer[i]);
                    element.append($(listItemContainer[i]));
                }
            }
            element.show();
        }
        else {
            element.hide().empty();
        }
    }
};


ko.bindingHandlers.foreach = {
    init: function (element, valueAccessor) {
        var $element = $(element);

        var value = valueAccessor();
        var config = {
            template: $element.html()
        };

        $element.data('foreach.config', config);

        // Why reset data-bind attributes? Because the point of this
        // binding is so that nested bindings apply to the value, not
        // to the current model. This prevents Knockout from continuing
        // to apply the current model to nested elements. Remember, the
        // nested bindings are still captured by `config.template` above.

        //namespace friendly
        var ns = '';
        if (typeof ko.currentlyBindingNamespace != 'undefined' && ko.currentlyBindingNamespace != '')
            ns = '-' + ko.currentlyBindingNamespace;

        $element.find('[data-bind' + ns + ']').attr('data-bind' + ns, '');

        //        $element.find('*').each(function () {
        //            var att;
        //            for (var i = 0; i < this.attributes.length; i++) {
        //                att = this.attributes[i];
        //                if (att.name.indexOf('data-bind') == 0) {
        //                    this.setAttribute(att.name, '');
        //                }
        //            }
        //            //attr('data-bind' + namespace, '');
        //        });

    },
    update: function (element, valueAccessor) {
        var $element = $(element);
        var config = $element.data('foreach.config'), idx;
        var value = ko.utils.unwrapObservable(valueAccessor());
        var val;

        //if the value has a templateId specified, then use it's html...
        if (value.templateId) {
            var templateHtml = $("#" + value.templateId).html();
            config.template = templateHtml;
            val = value.data;
        }

        //if the value has data specified, then use it as value...
        else if (value.data) {
            val = value.data;
        }
        else {
            val = value;
        }


        $element.html(''); //clear out the element html so we can replace it with the template list.


        if (val) {
            val = ko.utils.unwrapObservable(val);
            var items = [], idx, item, listItemContainer, i;

            //namespace friendly
            var ns = '';
            if (typeof ko.currentlyBindingNamespace != 'undefined' && ko.currentlyBindingNamespace != '')
                ns = ko.currentlyBindingNamespace;


            for (idx = 0; idx < val.length; idx++) {
                item = {
                    value: val[idx],
                    data: val,
                    index: idx
                };

                if (eaf.util.isDefined(value, 'options')) {//(typeof (value.options) != "undefined") {
                    $.extend(item, value.options);
                }

                if (eaf.util.isDefined(value, 'options')) {//(typeof (value.afterRender) != "undefined") {
                    item.afterRender = value.afterRender;
                }

                items.push(item);
            }

            //for (idx in value) {
            for (idx = 0; idx < val.length; idx++) {


                listItemContainer = $(config.template);
                //this.element.html(this.template);
                // Only bind the new model to child elements, not the current
                // element, so that other binding handlers on the current
                // element continue to work.

                for (i = 0; i < listItemContainer.length; i++) {
                    item = items[idx];
                    ko.applyBindings(item, ns, listItemContainer[i]);
                    $element.append($(listItemContainer[i]));
                    if (typeof item.afterRender != 'undefined') {
                        item.afterRender(listItemContainer[i], item);
                    }
                }
            }
            $element.show();
        }
        else {
            $element.hide().empty();
        }
    }
};

ko.bindingHandlers.dynamicDataContext = {
    init: function (element, valueAccessor, allBindingAccessors, viewModel) {
        element = $(element);
        var config = {
            template: element.html()
        };

        var propertyName = valueAccessor();
        //value will be a string representing the property of the viewmodel to dynamically bind to.
        //if the property is undefined, then we create it as an observable, this way if later on the model becomes 
        //available, we can handle it.
        if (!viewModel[propertyName]) {
            viewModel[propertyName] = ko.observable();
        }

        element.data('dynamicDataContext.config', config);
        // Why reset data-bind attributes? Because the point of this
        // binding is so that nested bindings apply to the value, not
        // to the current model. This prevents Knockout from continuing
        // to apply the current model to nested elements. Remember, the
        // nested bindings are still captured by `config.template` above.
        element.find('[data-bind]').attr('data-bind', '');

    },
    update: function (element, valueAccessor, allBindingAccessors, viewModel) {
        element = $(element)
        var config = element.data('dynamicDataContext.config');
        var propertyName = ko.utils.unwrapObservable(valueAccessor());
        var value = ko.utils.unwrapObservable(viewModel[propertyName]);
        if (value) {
            element.html(config.template);
            // Only bind the new model to child elements, not the current
            // element, so that other binding handlers on the current
            // element continue to work.
            var children = element.children();
            for (var i = 0; i < children.length; i++) {
                ko.applyBindings(value, children[i]);
            }
            element.show();
        }
        else {
            element.hide().empty();
        }
    }
};

ko.bindingHandlers.pagedArray = {
    init: function (element, valueAccessor, allBindingAccessors) {

        element = $(element);
        var value = valueAccessor();

        var options;
        if (allBindingAccessors().pagedArrayOptions) {
            options = ko.utils.unwrapObservable(allBindingAccessors().pagedArrayOptions);
        }

        attachPagedArrayBehavior(value, element, options);

        var itemTemplate = element.find("[data-template=itemTemplate]").first().html();
        element.find("[data-template=itemTemplate] [data-bind]").attr('data-bind', '');
        element.find("[data-template=itemTemplate]").first().html('');

        var config = {
            template: element.html(),
            itemTemplate: itemTemplate

        };

        element.data('each.config', config);

        // Why reset data-bind attributes? Because the point of this
        // binding is so that nested bindings apply to the value, not
        // to the current model. This prevents Knockout from continuing
        // to apply the current model to nested elements. Remember, the
        // nested bindings are still captured by `config.template` above.
        element.find('[data-bind]').attr('data-bind', '');
    },
    update: function (element, valueAccessor, allbindingAccessor, viewModel) {
        element = $(element);
        var config = element.data('each.config');
        var value = ko.utils.unwrapObservable(valueAccessor());

        //if the value has a templateId specified, then use it's html...
        if (value.templateId) {
            var templateHtml = $("#" + value.templateId).html();
            config.template = templateHtml;
            value = value.data;
        }

        element.html(''); //clear out the element html so we can replace it with the template list.
        if (value) {
            value = ko.utils.unwrapObservable(value);
            var pagedArray = element.data('pagedArray');
            //wireup the overall element to bind to the view model, the iterated items, and pager will bind later.
            element.hide();
            element.html(config.template);
            for (var i = 0; i < element.children().length; i++) {
                ko.applyBindings(pagedArray, element.children()[i]);
            }

            //Create the container paged list, and bind it up. we will populate the children in the loop below
            for (idx in pagedArray.currentPageItems()) {
                var item = pagedArray.currentPageItems()[idx];
                if (item) {
                    if (typeof (item) != "object") {
                        //if the values in the array are simple types, not objects then we need to 
                        //set it as an object to allow us to bind to it.
                        item = { value: item };
                    }
                    var listContainer = element.find("[data-template=itemTemplate]").first();

                    var listItemTemplate = $(config.itemTemplate);
                    //this.element.html(this.template);
                    // Only bind the new model to child elements, not the current
                    // element, so that other binding handlers on the current
                    // element continue to work.
                    for (var i = 0; i < listItemTemplate.length; i++) {
                        ko.applyBindings(item, listItemTemplate[i]);
                        listContainer.append($(listItemTemplate[i]));
                    }
                }
            }

            element.show();
        }
        else {
            element.hide().empty();
        }
    }
};


function attachPagedArrayBehavior(array, element, options) {
    model = ko.utils.unwrapObservable(array);
    var pagedArrayViewModel = {
        actualPage: ko.observable(),
        itemsPerPage: ko.observable(),
        nearbyPageRange: ko.observable(),
        array: array
    }

    defaultOptions = {
        itemsPerPage: 10,
        startPage: 1,
        nearbyPageRange: 5
    }

    $.extend(defaultOptions, options)

    if (defaultOptions.itemsPerPage) {
        pagedArrayViewModel.itemsPerPage(ko.utils.unwrapObservable(defaultOptions.itemsPerPage));
    };

    if (defaultOptions.startPage) {
        pagedArrayViewModel.actualPage(ko.utils.unwrapObservable(defaultOptions.startPage));
    };

    if (defaultOptions.nearbyPageRange) {
        pagedArrayViewModel.nearbyPageRange(ko.utils.unwrapObservable(defaultOptions.nearbyPageRange));
    }

    pagedArrayViewModel.pageCount = ko.dependentObservable(function () {
        var length = ko.utils.unwrapObservable(array).length;
        var pageCount = length / this.itemsPerPage();
        if (parseInt(pageCount) != pageCount) {
            pageCount = parseInt(pageCount) + 1;
        }
        return pageCount;
    }, pagedArrayViewModel);

    pagedArrayViewModel.page = ko.dependentObservable({
        read: function () {
            return pagedArrayViewModel.actualPage();
        },
        write: function (value) {
            if (value <= pagedArrayViewModel.pageCount()) {
                pagedArrayViewModel.actualPage(value);
            }
        }
    }, pagedArrayViewModel);

    pagedArrayViewModel.getPageItems = function (pageNumber) {
        var currentItemsPerPage = this.itemsPerPage();
        //if the requested page > the page count, set page to the last page.
        if (pageNumber > this.pageCount()) {
            this.page(this.pageCount());
        }

        var currentPage = pageNumber;
        var length = ko.utils.unwrapObservable(array).length;

        var currentStartingIdx = (parseInt(currentPage) - 1) * (parseInt(currentItemsPerPage));

        var currentEndIdx = currentStartingIdx + parseInt(currentItemsPerPage) <= length ? currentStartingIdx + parseInt(currentItemsPerPage) : length

        return array.slice(currentStartingIdx, currentEndIdx);
    };

    pagedArrayViewModel.nearbyPages = ko.dependentObservable(function () {
        var pagesArray = []
        var minPage = parseInt(this.page()) - parseInt(this.nearbyPageRange());
        var maxPage = parseInt(this.page()) + parseInt(this.nearbyPageRange());

        if (minPage < 1) minPage = 1;
        if (maxPage > this.pageCount()) maxPage = this.pageCount();

        for (var i = minPage; i <= maxPage; i++) {
            pagesArray.push({
                pageNumber: i,
                currentPage: pagedArrayViewModel.page(),
                isCurrentPage: pagedArrayViewModel.page() == i,
                show: function () {
                    pagedArrayViewModel.page(this.pageNumber);
                }
            });
        }
        return pagesArray;
    }, pagedArrayViewModel);



    pagedArrayViewModel.currentPageItems = ko.dependentObservable(function () {
        return this.getPageItems(this.page());
    }, pagedArrayViewModel);

    pagedArrayViewModel.hasNextPage = ko.dependentObservable(function () {
        return this.page() < this.pageCount();
    }, pagedArrayViewModel);

    pagedArrayViewModel.nextPage = function () {
        if (this.hasNextPage()) {
            this.page(this.page() + 1);
        }
    }

    pagedArrayViewModel.hasPreviousPage = ko.dependentObservable(function () {
        return this.page() > 1;
    }, pagedArrayViewModel);

    pagedArrayViewModel.previousPage = function () {
        if (this.hasPreviousPage()) {
            this.page(this.page() - 1);
        }
    };

    pagedArrayViewModel.lastPage = function () {
        this.page(this.pageCount());
    };

    pagedArrayViewModel.firstPage = function () {
        this.page(1);
    }

    element.data('pagedArray', pagedArrayViewModel);
};

ko.bindingHandlers.textWithPlaceholder = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers.text.update(element, function () {
            return value || '---';
        });
    }
};


ko.bindingHandlers['fadeDelete'] = {
    'update': function (element, valueAccessor) {
        var options = valueAccessor();
        if (options() === true)
            $(element).fadeOut('slow', function () { $(this).remove(); });
    }
};

//http://siderite.blogspot.com/2009/07/jquery-firexof-error-could-not-convert.html
/** Binding to make content appear with 'fade' effect */
ko.bindingHandlers['fadeIn'] = {
    init: function (element, valueAccessor, allBindingAccessors) {

        var $element = $(element);
        var value = valueAccessor();
        if (value === true) {
            $element.finish(true, true);
            $element.fadeIn('slow');
            //alert('in');
            //$(element).hide('slow');
        }
    }
    , 'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value === true) {
            //alert('in');
            $element.finish(true, true);
            $element.fadeIn('slow');
        }
    }
};
/** Binding to make content disappear with 'fade' effect */
ko.bindingHandlers['fadeOut'] = {
    init: function (element, valueAccessor, allBindingAccessors) {

        var $element = $(element);
        var value = valueAccessor();
        if (value === true) {
            $element.finish(true, true);
            $element.fadeOut('slow');
            //$(element).hide('slow');
        }
    }
    ,
    'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value === true) {
            $element.finish(true, true);
            $element.fadeOut('slow');
            //$(element).hide('slow');
        }
    }
};

ko.bindingHandlers['grayScale'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value === true)
            grayscale(element);
    }
};

ko.bindingHandlers['jqCss'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).css(value);
    }
};

function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

ko.bindingHandlers['pos'] = {
    //    'init': function (element, valueAccessor, allBindingAccessors) {
    //        var $element = $(element);
    //        value = ko.utils.unwrapObservable(valueAccessor());
    //        var x = 0, y = 0, xCenter = false, yCenter = false, offsetX = 0, offsetY = 0,
    //        center = false, xUnit = "px", yUnit = "px", offsetXUnit = "px",
    //        offsetYUnit = "px", unit = 'px', offsetUnit = 'px';


    //        //if the value has a templateId specified, then use it's html...
    //        if ('undefined' != typeof value.center && value.center) {
    //            center = xCenter = yCenter = true;
    //        }

    //        //if the value has a templateId specified, then use it's html...
    //        if ('undefined' != typeof value.unit) {
    //            unit = offsetUnit = xUnit = yUnit = value.unit;
    //        }

    //        //if the value has a templateId specified, then use it's html...
    //        if ('undefined' != typeof value.offset) {

    //            //if the value has a templateId specified, then use it's html...
    //            if ('undefined' != typeof value.offset.unit) {

    //                offsetUnit = offsetXUnit = offsetYUnit = value.offset.unit;

    //            }

    //            //if the value has a templateId specified, then use it's html...
    //            if ('undefined' != typeof value.offset.x) {
    //                if ('undefined' != typeof value.offset.x.value) {

    //                    var offsetx = value.offset.x.value;

    //                    if (isNumber(offsetx))
    //                        offsetX = offsetx;
    //                }
    //                else {
    //                    var offsetx = value.offset.x;

    //                    if (isNumber(offsetx))
    //                        offsetX = offsetx;
    //                }

    //                if ('undefined' != typeof value.offset.x.unit) {
    //                    offsetXUnit = value.offset.x.unit;
    //                }
    //            }

    //            //if the value has a templateId specified, then use it's html...
    //            if ('undefined' != typeof value.offset.y) {
    //                if ('undefined' != typeof value.offset.y.value) {

    //                    var offsety = value.offset.y.value;

    //                    if (isNumber(offsety))
    //                        offsetY = offsety;
    //                }
    //                else {
    //                    var offsety = value.offset.y;

    //                    if (isNumber(offsety))
    //                        offsetY = offsety;
    //                }

    //                if ('undefined' != typeof value.offset.y.unit) {
    //                    offsetYUnit = value.offset.y.unit;
    //                }
    //            }
    //        }

    //        log('offsetY' + offsetY);

    //        //if the value has a templateId specified, then use it's html...
    //        if ('undefined' != typeof value.y) {
    //            if ('undefined' != typeof value.y.value) {

    //                var yVal = value.y.value;

    //                if (isNumber(yVal))
    //                    y = yVal;
    //            }
    //            else {
    //                var yVal = value.y;

    //                if (isNumber(yVal))
    //                    y = yVal;
    //            }

    //            if ('undefined' != typeof value.y.unit) {
    //                yUnit = value.y.unit;
    //            }

    //        }


    //        //if the value has a templateId specified, then use it's html...
    //        if ('undefined' != typeof value.x) {
    //            if ('undefined' != typeof value.x.value) {

    //                var xVal = value.x.value;

    //                if (isNumber(xVal))
    //                    x = xVal;
    //            }
    //            else {
    //                var xVal = value.x;

    //                if (isNumber(xVal))
    //                    x = xVal;
    //            }

    //            if ('undefined' != typeof value.x.unit) {
    //                xUnit = value.x.unit;
    //            }

    //        }


    //        if (yCenter && xCenter) {
    //            $element.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ($element.outerHeight() / 2) + offsetY + offsetYUnit + ' 0 0 -' + ($element.outerWidth() / 2) + offsetX + offsetXUnit });
    //        }
    //        else if (yCenter) {
    //            $element.css({ position: 'absolute', top: '50%', left: x + xUnit, margin: '-' + ($element.outerHeight() / 2) + offsetY + offsetYUnit + ' 0 0 -' + offsetX + offsetXUnit });
    //        }
    //        else if (xCenter) {
    //            $element.css({ position: 'absolute', top: y + yUnit, left: '50%', margin: '-' + offsetY + offsetYUnit + ' 0 0 -' + ($element.outerWidth() / 2) + offsetX + offsetXUnit });
    //        }
    //        else
    //            $element.css({ top: y + yUnit, left: x + xUnit, margin: '-' + offsetY + offsetYUnit + ' 0 0 -' + offsetX + offsetXUnit });
    //    }
    //    , 
    'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());
        var x = 0, y = 0, xCenter = false, yCenter = false, offsetX = 0, offsetY = 0,
        center = false, xUnit = "px", yUnit = "px", offsetXUnit = "px",
        offsetYUnit = "px", unit = 'px', offsetUnit = 'px';


        //if the value has a templateId specified, then use it's html...
        if ('undefined' != typeof value.center && value.center) {
            center = xCenter = yCenter = true;
        }

        //if the value has a templateId specified, then use it's html...
        if ('undefined' != typeof value.unit) {
            unit = offsetUnit = xUnit = yUnit = value.unit;
        }

        //if the value has a templateId specified, then use it's html...
        if ('undefined' != typeof value.offset) {

            //if the value has a templateId specified, then use it's html...
            if ('undefined' != typeof value.offset.unit) {

                offsetUnit = offsetXUnit = offsetYUnit = value.offset.unit;

            }

            //if the value has a templateId specified, then use it's html...
            if ('undefined' != typeof value.offset.x) {
                if ('undefined' != typeof value.offset.x.value) {

                    var offsetx = value.offset.x.value;

                    if (isNumber(offsetx))
                        offsetX = offsetx;
                }
                else {
                    var offsetx = value.offset.x;

                    if (isNumber(offsetx))
                        offsetX = offsetx;
                }

                if ('undefined' != typeof value.offset.x.unit) {
                    offsetXUnit = value.offset.x.unit;
                }
            }

            //if the value has a templateId specified, then use it's html...
            if ('undefined' != typeof value.offset.y) {
                if ('undefined' != typeof value.offset.y.value) {

                    var offsety = value.offset.y.value;

                    if (isNumber(offsety))
                        offsetY = offsety;
                }
                else {
                    var offsety = value.offset.y;

                    if (isNumber(offsety))
                        offsetY = offsety;
                }

                if ('undefined' != typeof value.offset.y.unit) {
                    offsetYUnit = value.offset.y.unit;
                }
            }
        }

        //log('offsetY: ' + offsetY);

        //if the value has a templateId specified, then use it's html...
        if ('undefined' != typeof value.y) {
            if ('undefined' != typeof value.y.value) {

                var yVal = value.y.value;

                if (isNumber(yVal))
                    y = yVal;
            }
            else {
                var yVal = value.y;

                if (isNumber(yVal))
                    y = yVal;
            }

            if ('undefined' != typeof value.y.unit) {
                yUnit = value.y.unit;
            }

        }


        //if the value has a templateId specified, then use it's html...
        if ('undefined' != typeof value.x) {
            if ('undefined' != typeof value.x.value) {

                var xVal = value.x.value;

                if (isNumber(xVal))
                    x = xVal;
            }
            else {
                var xVal = value.x;

                if (isNumber(xVal))
                    x = xVal;
            }

            if ('undefined' != typeof value.x.unit) {
                xUnit = value.x.unit;
            }

        }

        //        var center = $element;
        //        center.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ((center.outerHeight() / 2) + offsetY) + offsetYUnit + ' 0 0 -' + (center.outerWidth() / 2) + 'px' });
        //        //$element.css({ position: 'absolute', top: '50%', left: '50%', margin: '-' + ($element.outerHeight() / 2) + offsetY + offsetYUnit + ' 0 0 -' + ($element.outerWidth() / 2) + offsetX + offsetXUnit });
        //        return;
        if (yCenter && xCenter) {
            $element.css({ position: 'absolute', top: (50 + offsetY) + '%', left: (50 + offsetX) + '%', margin: '-' + (($element.outerHeight() / 2)) + offsetYUnit + ' 0 0 -' + (($element.outerWidth() / 2)) + offsetXUnit });
        }
        else if (yCenter) {
            $element.css({ position: 'absolute', top: (50 + offsetY) + '%', left: x + xUnit, margin: '-' + (($element.outerHeight() / 2)) + offsetYUnit + ' 0 0 -' + offsetX + offsetXUnit });
        }
        else if (xCenter) {
            $element.css({ position: 'absolute', top: y + yUnit, left: (50 + offsetX) + '%', margin: '-' + offsetY + offsetYUnit + ' 0 0 -' + (($element.outerWidth() / 2)) + offsetXUnit });
        }
        else
            $element.css({ top: (y + yUnit), left: (x + xUnit), margin: '-' + offsetY + offsetYUnit + ' 0 0 -' + offsetX + offsetXUnit });
    }
};

ko.bindingHandlers['infoize'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        //alert(value);

        $(element).qtip(
            {
                content: {
                    text: value //'me' 
                    //attr: 'tip' // Use the ALT attribute of the area map for the content
                }
                ,

                style: {
                    classes: 'ui-tooltip-tipsy ui-tooltip-shadow'
                }
                ,

                show: {
                    effect: function () {
                        var $this = $(this);
                        $this.show('fast', function () { $this.animate({ opacity: 0 }, 3000); });
                    } //effect: function () { $(this).show('explode', { pieces: 1 }, 200).hide('explode', null, 3500); } //.animate({ opacity: 0 }, 800); }
                }

                ,
                hide: {
                    effect: function () {
                        $(this).finish(true).hide();
                    }
                }
            });


    }
};


ko.bindingHandlers['scale'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        //alert(value);
        var $this = $(element);
        $this.finish(true, true);

        if ('undefined' != typeof value.speed) {

            //$this.addClass("active");
            $this.animate({ scale: value.percent }, value.speed);
        }
        else {
            $this.animate({ scale: value }, 0);
        }


    }
};


ko.bindingHandlers['busy'] = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        //alert(value);
        var $this = $(element), options;
        //$this.stop(true, true);

        if ('undefined' != typeof value.options) {
            options = value.options;
            value = value.busy;
        }
//        else {
//            options = { message: 'Please wait...' };
//        }

        //todo: copy all scale, border-radius and rotation settings
        //for now, just hardcode to circle
        var transformMimicryOps = {
            overlayCSS: {
                '-webkit-border-radius': '50%',
                '-moz-border-radius': '50%',
                'border-radius': '50%'
            }
        }

        var options = $.extend(transformMimicryOps, options);

        if (value == true) {
            $this.block(options);
        }
        else {
            $this.unblock();
        }


    }

    
};
