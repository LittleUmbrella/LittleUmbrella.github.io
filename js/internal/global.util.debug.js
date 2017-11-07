

eaf.util.namespace('littleUmbrella.circleverse.ui.shapes');

(function () {
    /*the law of cosines: 
                            
                cc = aa + bb - 2ab cos(C), where c is the satellite diameter a and b are the legs
                            
                solving for cos C, cos C = ( aa + bb - cc ) / 2ab
    
                Math.acos((a * a + b * b - c * c) / (2 * a * b)) = C
                */
    eaf.util.solveAngle = function (a, b, c) {  // Returns angle C using law of cosines
        var temp = (a * a + b * b - c * c) / (2 * a * b);
        if (temp >= -1 && temp <= 1)
            return eaf.util.radToDeg(Math.acos(temp));
        else
            return 0;//throw "No solution";
    }

    //http://gamedev.stackexchange.com/questions/11905/rotating-an-object-from-sourceangle-to-destangle-both-0-359-clockwise-or-count
    eaf.util.getCircularDirection = function (aStart, aEnd) {
        return (((aStart - aEnd + 360) % 360) > 180) ? 1 : -1;
    }

    eaf.util.radToDeg = function (x) {
        return x / Math.PI * 180;
    }

    eaf.util.degToRad = function (x) {
        return x * (Math.PI / 180);
    }

    eaf.util.angleForTwoPoints = function (p1, p2) {
        var deltaY = p2.y - p1.y,
        deltaX = p2.x - p1.x;
        //Then calculate the angle.

        //var angleInDegrees = arctan(deltaY / deltaX) * 180 / PI;
        //If your language includes an atan2 function it becomes the following instead:

        return Math.atan2(deltaY, deltaX) * 180 / PI;
    }
})();

littleUmbrella.circleverse.ui.shapes.satellite = {



    howManyOuter: function (innerRadius, outerRadius) {
        //http://answers.yahoo.com/question/index?qid=20110628082501AAoiWp4
        //#outer circles = 360 / arccos[((r1+r2)² - 2r2²) / (r1+r2)²]
        //#inner circles = arccos[((r1+r2)² - 2r2²) / (r1+r2)²]
        //var outerCnt = 360 / Math.acos(((r1+r2)² - 2r2²) / (r1+r2)²);
        var r1 = innerRadius, r2 = outerRadius;
        var outerCnt = 360 / littleUmbrella.circleverse.ui.shapes.satellite.howManyInner(r1, r2);
        //var outerCnt = 360 / Math.acos(( Math.pow(innerRadius + outerRadius, 2) - Math.pow(2 * outerRadius, 2) / Math.pow(innerRadius+outerRadius,2)); 
        return outerCnt;
    }
    ,

    howManyInner: function (innerRadius, outerRadius) {
        //http://answers.yahoo.com/question/index?qid=20110628082501AAoiWp4
        //#outer circles = 360 / arccos[((r1+r2)² - 2r2²) / (r1+r2)²]
        //#inner circles = arccos[((r1+r2)² - 2r2²) / (r1+r2)²]
        //var outerCnt = 360 / Math.acos(((r1+r2)² - 2r2²) / (r1+r2)²);
        //seem to always have to do  * (Math.PI / 180)

        var r1 = innerRadius, r2 = outerRadius;
        var f2 = Math.pow(r1 + r2, 2);
        var f1 = f2 - (2 * Math.pow(r2, 2));
        
        var innerCnt = Math.acos(f1 / f2) * 180 / Math.PI;
        //var outerCnt = 360 / Math.acos(( Math.pow(innerRadius + outerRadius, 2) - Math.pow(2 * outerRadius, 2) / Math.pow(innerRadius+outerRadius,2)); 
        return innerCnt;
    }
    ,

    //settings must have: collection (array), itemDiameter (number), minCenterDiameter (number), center (json with x, y numbers)
    //optional: itemPadding (number), evenDistribution (boolean), centerPadding (boolean), noOverLap (boolean)
    getPosition: function (settings) {
        //backwards compat
        settings.centerPadding = settings.centerPadding || settings.itemPadding;
        settings.noOverLap = typeof settings.noOverLap == 'undefined' ? true : settings.noOverLap;
        settings.startingDegree = settings.startingDegree || 270;
        settings.startSatellitesOnEdge = typeof settings.startSatellitesOnEdge == 'undefined' ? true : settings.startSatellitesOnEdge;

        var itemIndex = $.inArray(settings.item, settings.collection);
        var itemCnt = settings.collection.length || 1;
        var satelliteSide = settings.itemDiameter + (settings.itemSeparation || 0) + (settings.itemPadding || 0);
        var evenDistribution = typeof settings.evenDistribution == 'undefined' ? true : settings.evenDistribution;
        var degreeOfSeparation = ((itemCnt < 2) ? 0 : (360 / itemCnt));
        
        /*
        we know all three sides:
        one side is the diameter of the satellite itself (plus any padding). the other two
        are the parent radius + the radius of the satellite itself (plus any padding).

        given that, we need to find the angle of separation using the law of cosines (eaf.util.solveAngle)
        */
        //if (!evenDistribution) {
        var side1 = ((satelliteSide / 2)) + ((settings.minCenterDiameter + (2 * settings.centerPadding)) / 2);
        var side2 = satelliteSide;;


        var degreeOfSeparationBasedOnSatellite = eaf.util.solveAngle(side1, side1, side2); //Math.acos(((((side1 * side1) + (side2 * side2)) - (side2 * side2)) / (side2 * side2 * 2)) / 180 * Math.PI) * Math.PI;
        // even seems like it should be separation based on satellite
        degreeOfSeparation = evenDistribution ? degreeOfSeparation : settings.noOverLap ? Math.min(degreeOfSeparation, degreeOfSeparationBasedOnSatellite) : degreeOfSeparationBasedOnSatellite;

        //}
        //angle-angle-side
        //a-A-B
        var a = satelliteSide;
        var A = degreeOfSeparation;
        /*
        the three angles of any triangle add up to 180.  We know one angle (degreeOfSeparation)
        and we know the other two are equivalent to each other, so...
        */
        var B = (180 - A) / 2;

        //b is length necessary to fit all satellites, might be too short to be outside of base circle
        var b = a * sind(B) / sind(A);

        var offset = ((settings.itemDiameter) / 2) + (settings.itemPadding || 0) ; // 1; //
        var onBaseCircleLegLength = ((settings.minCenterDiameter / 2) + settings.centerPadding) + offset + 10;

        var offBase = false;

        if (b > onBaseCircleLegLength) {
            offBase = true;
        }

        b = settings.noOverLap && itemCnt > 1 ? Math.max(b, onBaseCircleLegLength) : onBaseCircleLegLength;

        var radianDegree = eaf.util.degToRad(degreeOfSeparation);
        //log('b=' + b);
        //log('settings.center.x=' + settings.center.x);
        //log('settings.center.y=' + settings.center.y);

        var degreeOffset = settings.startingDegree;
        if (settings.startSatellitesOnEdge) {
            degreeOffset += ((offBase ? degreeOfSeparation : degreeOfSeparationBasedOnSatellite) / 2);
        }

        var i = ((Math.PI * degreeOffset) / 180) + (radianDegree * (itemIndex + (settings.shiftItemsBy || 0)));// + (eaf.util.degToRad(degreeOfSeparationBasedOnSatellite) / 2); //(radianDegree) * (itemIndex);
        var x = (Math.cos(i) * b) + (settings.center.x - offset);
        var y = (Math.sin(i) * b) + (settings.center.y - offset);

        return { 'x': Math.round(x), 'y': Math.round(y), ringRadius: b };
    }
                    
    /* if we ever want to size satellite by how many need to fit tight around the base circle:

    x: function calcCircles(n) {
        circles.splice(0); // clear out old circles
        var angle = Math.PI / n;
        var s = Math.sin(angle);
        var r = baseRadius * s / (1 - s);
        console.log(angle);
        console.log(s);
        console.log(r);
        console.log(startAngle);
        console.log(startAngle / (Math.PI * 2));
        for (var i = 0; i < n; ++i) {
            var phi = ((Math.PI * startAngle) / 180) + (angle * i * 2);
            var cx = 150 + (baseRadius + r) * Math.cos(phi);
            var cy = 150 + (baseRadius + r) * Math.sin(phi);
            circles.push(new Circle(cx, cy, r));
        }
    },
    */
    //settings must have: collection (array), itemDiameter (number), minCenterDiameter (number), center (json with x, y numbers)
    //optional: itemPadding (number), evenDistribution (boolean), centerPadding (boolean), noOverLap (boolean)
                    
                ,
    /* if we ever want to size satellite by how many need to fit tight around the base circle:

    x: function calcCircles(n) {
        circles.splice(0); // clear out old circles
        var angle = Math.PI / n;
        var s = Math.sin(angle);
        var r = baseRadius * s / (1 - s);
        console.log(angle);
        console.log(s);
        console.log(r);
        console.log(startAngle);
        console.log(startAngle / (Math.PI * 2));
        for (var i = 0; i < n; ++i) {
            var phi = ((Math.PI * startAngle) / 180) + (angle * i * 2);
            var cx = 150 + (baseRadius + r) * Math.cos(phi);
            var cy = 150 + (baseRadius + r) * Math.sin(phi);
            circles.push(new Circle(cx, cy, r));
        }
    },
    */
                

    //settings must have: collection (array), itemDiameter (number), minCenterDiameter (number), center (json with x, y numbers)
    //optional: itemPadding (number), evenDistribution (boolean), centerPadding (boolean), noOverLap (boolean)
    getAllPositions: function (settings) {
        var point;
        var points = [];
        var collection = settings.collection;

        for (var i = 0; i < collection.length; i++) {

            settings.item = collection[i]

            points.push(littleUmbrella.circleverse.ui.shapes.satellite.getPosition(settings));
        }
        return points;
    }
};

$.fn.isBound = function ($obj, func) {

    if ($obj.data('events')) {
        jQuery.each($obj.data('events'), function (i, event) {

            jQuery.each(event, function (i, handler) {

                if (handler.handler == func) return true;
            });
        });
    }
    return false;
}

$.fn.hasEventBinding = function ($obj, eventName) {

    if ($obj.data('events')) {
        jQuery.each($obj.data('events'), function (i, event) {

            jQuery.each(event, function (i, handler) {

                if (handler.type == eventName) return true;

            });
        });
    }

    return false;
}

function getQueryString() {
    var result = {}, queryString = location.search.substring(1),
              re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
}

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


/**
* jQuery.support.cssProperty
* To verify that a CSS property is supported (or any of its browser-specific implementations)
*
* @param string p - css property name
* [@param] bool rp - optional, if set to true, the css property name will be returned, instead of a boolean support indicator
*
* @Author: Axel Jack Fuchs (Cologne, Germany)
* @Date: 08-29-2010 18:43
*
* Example: $.support.cssProperty('boxShadow');
* Returns: true
*
* Example: $.support.cssProperty('boxShadow', true);
* Returns: 'MozBoxShadow' (On Firefox4 beta4)
* Returns: 'WebkitBoxShadow' (On Safari 5)
*/
$.support.cssProperty = (function () {
    function cssProperty(p, rp) {
        var b = document.body || document.documentElement,
    s = b.style;

        // No css support detected
        if (typeof s == 'undefined') { return false; }

        // Tests for standard prop
        if (typeof s[p] == 'string') { return rp ? p : true; }

        // Tests for vendor specific prop
        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms', 'Icab'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }
        }
    }

    return cssProperty;
})();


ko.bindingHandlers['eventJq'] =
{
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof jQuery == "undefined") {
            throw new Error("jQuery undefined, should use normal 'event' binding");
        }


        var $obj = $(element)//, vmData = $obj.data('__jqViewModel')
            , closureVm = viewModel;

        //if (!vmData) {

            //$obj.data('__jqViewModel', { vm: viewModel });

            var eventsToHandle = valueAccessor() || {}, eventNameOutsideClosure;

            for (eventNameOutsideClosure in eventsToHandle) {

                if (eventNameOutsideClosure == 'vm') {
                    closureVm = eventsToHandle[eventNameOutsideClosure];
                    continue;
                }
                    

                (function () {
                    var eventName = eventNameOutsideClosure;


                    if (typeof (eventName) == "string") {
                        var eventobj = eventsToHandle[eventName];
                        $obj.bind(eventName, ko.unwrap(closureVm)[eventobj.data](), function (e) {

                            //try {
                            var handlerReturnValue = ko.unwrap(closureVm)[eventName].apply(ko.unwrap(closureVm), arguments);
                            //}
                            //finally {
                            if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.                                
                                if (e.preventDefault) {
                                    e.preventDefault();
                                }
                            }
                            //}

                            var allBindings = allBindingsAccessor();
                            var bubble = allBindings[eventName + 'Bubble'] !== false;
                            if (!bubble) {
                                e.cancelBubble = true;
                                if (e.stopPropagation)
                                    e.stopPropagation();
                            }

                            return handlerReturnValue;
                        });
                    }
                })();

            }

        //    return;
        //}


        //if (vmData.vm != viewModel)
        //    vmData.vm = viewModel;
    }
}

//ko.bindingHandlers['eventJq'] =
//{
//    'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        
        //if (typeof jQuery == "undefined") {
        //    throw new Error("jQuery undefined, should use normal 'event' binding");
        //}



        //var $obj = $(element);
        //var vmData = $obj.data('eventJqViewModel'), eventData = $obj.data('events');

        //if (!vmData)
        //    vmData = $obj.data('eventJqViewModel', {vm:null});
        
        //if (vmData.vm == viewModel) return;

        //var eventsToHandle = valueAccessor() || {};
        //for (var eventNameOutsideClosure in eventsToHandle) {
        //    if (eventData) {
        //        jQuery.each(eventData, function (i, e) {

        //            jQuery.each(e, function (i, handler) {

        //                if (handler.type == eventNameOutsideClosure)
        //                    $obj.unbind(eventNameOutsideClosure);
                            
        //            });
        //        });
        //    }

        //    (function () {
        //        var eventName = eventNameOutsideClosure; // Separate variable to be captured by event handler closure   

        //        if (typeof (eventName) == "string") {
        //            var eventobj = valueAccessor()[eventName];
        //            $(element).bind(eventName, eventobj.data.apply(ko.unwrap(viewModel), arguments), function (e) {
        //                var handlerReturnValue;
        //                var handlerFunction = eventobj.func;
        //                if (!handlerFunction)
        //                    return;
        //                var allBindings = allBindingsAccessor();
        //                //try {
        //                handlerReturnValue = handlerFunction.apply(ko.unwrap(viewModel), arguments);
        //                //}
        //                //finally {
        //                if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.                                
        //                    if (e.preventDefault) {
        //                        e.preventDefault();
        //                    }

        //                    //if (e.stopPropagation)
        //                    //    e.stopPropagation();
        //                    //else
        //                    //    e.returnValue = false;
        //                }
        //                //}
        //                var bubble = allBindings[eventName + 'Bubble'] !== false;
        //                if (!bubble) {
        //                    e.cancelBubble = true;
        //                    if (e.stopPropagation)
        //                        e.stopPropagation();
        //                }

        //                return handlerReturnValue;
        //            });
        //        }

        //    })();

        //}

        //vmData.vm = viewModel;

//    } //parseJson
//};


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
        var value = ko.unwrap(valueAccessor());
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

            if (item.ctx && ko.unwrap(item.ctx)) {
                // Only bind the new model to child elements, not the current
                // element, so that other binding handlers on the current
                // element continue to work.
                var children = $element.children();
                for (i = 0; i < children.length; i++) {
                    ko.applyBindings(item, children[i]);
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
        var propertyName = ko.unwrap(valueAccessor());
        var value = ko.unwrap(viewModel[propertyName]);
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
            options = ko.unwrap(allBindingAccessors().pagedArrayOptions);
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
        var value = ko.unwrap(valueAccessor());

        //if the value has a templateId specified, then use it's html...
        if (value.templateId) {
            var templateHtml = $("#" + value.templateId).html();
            config.template = templateHtml;
            value = value.data;
        }

        element.html(''); //clear out the element html so we can replace it with the template list.
        if (value) {
            value = ko.unwrap(value);
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
    model = ko.unwrap(array);
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
        pagedArrayViewModel.itemsPerPage(ko.unwrap(defaultOptions.itemsPerPage));
    };

    if (defaultOptions.startPage) {
        pagedArrayViewModel.actualPage(ko.unwrap(defaultOptions.startPage));
    };

    if (defaultOptions.nearbyPageRange) {
        pagedArrayViewModel.nearbyPageRange(ko.unwrap(defaultOptions.nearbyPageRange));
    }

    pagedArrayViewModel.pageCount = ko.dependentObservable(function () {
        var length = ko.unwrap(array).length;
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
        var length = ko.unwrap(array).length;

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

    ko.bindingHandlers['util'] = ko.bindingHandlers['util'] || {};

    ko.bindingHandlers['util'].truncate = function (text, length, ellipses, fromStart) {

        if (text == null) return text;

        if (null == text)
            throw new Error("must provide a text property");

        if (null == length)
            throw new Error("must provide a length property");

        text = text.toString();

        if (text.length <= length) return text;

        ellipses = ellipses || "...";

        if (fromStart)            
            return ellipses + text.substring(text.length - length, text.length);

        return text.substring(0, length) + ellipses;
    }

    var truncatedTextOrValue = function (value, element, binding) {

        if (value && value.length > 0) {
            var text = ko.utils.unwrapObservable(value.text),
                length = ko.utils.unwrapObservable(value.length),
                fromStart = ko.utils.unwrapObservable(value.fromStart),
                ellipses = ko.utils.unwrapObservable(value.ellipses);

            if (fromStart == null) fromStart = false;

            var truncated = ko.bindingHandlers['util'].truncate(text, length, ellipses, fromStart);

            ko.bindingHandlers[binding].update(element, function () { return truncated });
        }
    }

    ko.bindingHandlers['util'].coalesce = function (arr) {
        var values = ko.utils.unwrapObservable(arr), winner;

        if (values) {
            //if not array, error
            if (!$.isArray(values))
                throw new Error(values.toString() + ' is not an array');

            var len = values.length;

            for (var i = 0; i < len; i++) {
                winner = ko.utils.unwrapObservable(values[i]);
                if (winner)
                    break;
            }
        }

        return winner;
    }

    var coalesceTextOrValue = function (value, element, binding) {

            

        ko.bindingHandlers[binding].update(element, function () { return ko.bindingHandlers['util'].coalesce(value) });
            
        
    }


    ko.bindingHandlers['coalesceText'] = {

        'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            truncatedTextOrValue(value, element, 'text');

        }
    };

    ko.bindingHandlers['coalesceValue'] = {

        'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            truncatedTextOrValue(value, element, 'value');

        }
    };

    ko.bindingHandlers['truncatedText'] = {

        'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            
            truncatedTextOrValue(value, element, 'text');

        }
    };

    ko.bindingHandlers['truncatedValue'] = {

        'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            truncatedTextOrValue(value, element, 'value');

        }
    };


ko.bindingHandlers['unparent'] = {
    init: function (element, valueAccessor, allBindingAccessors) {

        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            document.body.appendChild(element);
            //$(element).hide('slow');
        }
    }
        , 'update': function (element, valueAccessor) {
            //var value = ko.unwrap(valueAccessor());
            //var $element = $(element);
            //if (value === true) {
            document.body.appendChild(element);
            //}
        }
};


(function () {
    var zIndex = 2000;

    ko.bindingHandlers['onTop'] = {
        init: function (element, valueAccessor, allBindingAccessors) {

            var value = ko.unwrap(valueAccessor());
            if (value === true) {
                var $element = $(element);
                //$('body').append(element);
                $element.css('z-index', zIndex++);
                //$(element).hide('slow');
            }
        }
        , 'update': function (element, valueAccessor) {
            //get the value just to create a dependency
            var value = ko.unwrap(valueAccessor());
            var $element = $(element);
            var z = 0;
            
            if (isNumber(value)){
                z = value;
            }
            else{
                z = ++zIndex;
            }
            //if (value === true) {
            //$('body').append(element);
            $element.css('z-index', z );
        }
    };

    //possible use (from http://stackoverflow.com/questions/6628622/make-element-on-top-of-everything):
    //function topMost(htmlElement) {
    //    var elements = document.getElementsByTagName("*");
    //    var highest_index = 0;

    //    for (var i = 0; i < elements.length - 1; i++) {
    //        if (parseInt(elements[i].style.zIndex) > highest_index) {
    //            highest_index = parseInt(elements[i].style.zIndex);
    //        }
    //    }

    //    htmlElement.style.zIndex = highest_index + 1;
    //}

})();

ko.bindingHandlers.textWithPlaceholder = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        ko.bindingHandlers.text.update(element, function () {
            return value || '---';
        });
    }
};


ko.bindingHandlers['fadeDelete'] = {
    init: function (element, valueAccessor, allBindingAccessors) {

        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            var $element = $(element);
            $element.finish(true, true);
            $element.fadeOut('slow');
            //$(element).hide('slow');
        }
    }
    , 'update': function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            var $element = $(element);
            $element.finish(true, true);
            $element.fadeOut('slow', function () {
                $element.remove();
                //element.parentNode.removeChild(element);
            });
        }
    }
};

//http://siderite.blogspot.com/2009/07/jquery-firexof-error-could-not-convert.html
/** Binding to make content appear with 'fade' effect */
ko.bindingHandlers['fadeIn'] = {
    init: function (element, valueAccessor, allBindingAccessors) {

        var $element = $(element);
        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            $element.finish(true, true);
            $element.fadeIn('slow');
            //alert('in');
            //$(element).hide('slow');
        }
    }
    , 'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.unwrap(valueAccessor());
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
        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            $element.finish(true, true);
            $element.fadeOut('slow');
            //$(element).hide('slow');
        }
    }
    ,
    'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            $element.finish(true, true);
            $element.fadeOut('slow');
            //$(element).hide('slow');
        }
    }
};

ko.bindingHandlers['fadeToggle'] = {
    'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.unwrap(valueAccessor());
        if (value === true) {
            $element.finish(true, true);
            $element.fadeOut('fast');
            //$(element).hide('slow');
        }
        else if (value === false) {
            $element.finish(true, true);
            $element.fadeIn('fast');
            //$(element).hide('slow');
        }
    }
    //'update': function (element, valueAccessor) {
    //    var value = ko.unwrap(valueAccessor());
    //    if (value === true) {            
    //        TweenLite.to(element, 1, { autoAlpha: 0, onComplete: function () { $(element).hide(); } });
    //    }
    //    else if (value === false) {
    //        TweenLite.to(element, 1, { autoAlpha: 1, onComplete: function () { $(element).show(); } });
    //    }
    //}
};

ko.bindingHandlers['center'] = {
    //    init: function (element, valueAccessor, allBindingAccessors) {

    //        var $element = $(element);
    //        var value = ko.unwrap(valueAccessor()); 
    //        if (value != null)
    //            $element.slideToggle();
    //    }
    //    ,
    'update': function (element, valueAccessor) {
        var $element = $(element), value = ko.unwrap(valueAccessor()), width = $element.width(), height = $element.height();
        var css = {
            'margin-left': '-' + Math.round(width / 2) + 'px',
            'margin-top': '-' + Math.round(height / 2) + 'px'//,
            //'width': width + 'px',
            //'height': height + 'px'
        };
        //if (value) {
        //    css.width = width + 'px';
        //    css.height = height + 'px';
        //}

        $element.css(css);
    }
};

ko.bindingHandlers['toggleSlide'] = {
    //    init: function (element, valueAccessor, allBindingAccessors) {

    //        var $element = $(element);
    //        var value = ko.unwrap(valueAccessor()); 
    //        if (value != null)
    //            $element.slideToggle();
    //    }
    //    ,
    'update': function (element, valueAccessor) {
        var $element = $(element);
        var value = ko.unwrap(valueAccessor());
        if (value != null)
            $element.slideToggle();
    }
};

ko.bindingHandlers['grayScale'] = {
    'update': function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (value === true)
            grayscale(element);
    }
};

ko.bindingHandlers['jqCss'] = {
    'update': function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        $(element).css(value);
    }
};

ko.bindingHandlers['format'] = {
    'update': function (element, valueAccessor) {

        var value = ko.unwrap(valueAccessor());
        if ('undefined' == typeof value.value)
            return value;

        return ko.bindingHandlers['format']['format'](element, ko.unwrap(value.value), value.format, value.settings);
    },
    format: function (element, value, format, settings) {
        var handler, formattedValue = value;
        var $element = $(element);

        if ($element.is('input, select, textarea')) {
            handler = ko.bindingHandlers['value'];
        }
        else {
            handler = ko.bindingHandlers['text'];
        }

        switch (format.substring(0, 1)) {
            case 'c':

                formattedValue = $.fn.asCurrency(value);
                break;
            default:
                if ('date' == typeof value)
                    formattedValue = $.datepicker.formatDate(format, value);
                else
                    formattedValue = $.datepicker.formatDate(format, new Date(value));
                break;
        }

        return handler.update(element, function () { return formattedValue; });

    }
};

//consider alternative: http://jsfiddle.net/eZRQb/
ko.bindingHandlers.className = {
    init: function (element, valueAccessor) {
        ko.bindingHandlers.className.setClassName(element, valueAccessor);
    },
    update: function (element, valueAccessor) {
        ko.bindingHandlers.className.setClassName(element, valueAccessor);
    },
    setClassName: function (element, valueAccessor) {
        var className = ko.unwrap(valueAccessor());
        var wrap = $(element);
        wrap.removeClass();
        wrap.addClass(className);
    }
};

//http://stackoverflow.com/questions/9097243/knockoutjs-attr-binding-and-ie7s
//ko.bindingHandlers.customCss = {
//    init: function (element, valueAccessor, allBindingsAccessor) {
//        var css = ko.unwrap(valueAccessor());
//        $(element).addClass(css);
//    },
//    update: function (element, valueAccessor, allBindingsAccessor) {
//        var css = ko.unwrap(valueAccessor());
//        $(element).addClass(css);
//    }
//};






function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

ko.bindingHandlers['pos'] = {
    //    'init': function (element, valueAccessor, allBindingAccessors) {
    //        var $element = $(element);
    //        value = ko.unwrap(valueAccessor());
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
        var value = ko.unwrap(valueAccessor());
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
        return;
        var value = ko.unwrap(valueAccessor());
        //alert(value);

        if ('undefined' != typeof value.selector)
            value = $(value.selector);

        $(element).qtip(
            {
                content: {
                    text: value //'me' 
                    //attr: 'tip' // Use the ALT attribute of the area map for the content
                }
                ,

                style: {
                    classes: 'ui-tooltip-dark ui-tooltip-shadow'
                }
                //                ,

                //                show: {
                //                    effect: function () {
                //                        var $this = $(this);
                //                        $this.show('fast', function () { $this.animate({ opacity: 0 }, 3000); });
                //                    } //effect: function () { $(this).show('explode', { pieces: 1 }, 200).hide('explode', null, 3500); } //.animate({ opacity: 0 }, 800); }
                //                }

                //                ,
                //                hide: {
                //                    effect: function () {
                //                        $(this).stop(true).hide();
                //                    }
                //                }
            });


    }
};


ko.bindingHandlers['fadeInFrom'] = {
    'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $element = $(element);
        var value = ko.unwrap(valueAccessor()), realValue = typeof value.value == 'undefined' ? true : ko.unwrap(value.value), initiator = value.initiator, dialogVm = value.dialogVm;

        var $from = $element;

        if (realValue === true) {
            //, transformOrigin: "50% 50% -80"
            var defaults = { clone: true, coords: 'top', cssClass: '', duration: .85, css: { scale: 1 }, ease: /*SteppedEase.config(10)SlowMo.ease*/Linear.easeNone };

            var opts = $.extend(true, defaults, value);
            var fromType = typeof value.from;

            switch (fromType) {
                case 'function':
                    $from = value.from();
                    break;
                case 'undefined':
                    //do nothing, using element as from
                    break;
                default:
                    $from = $(value.from);
                    break;
            }
            var
                startTop = $from.offset().top,
                startLeft = $from.offset().left,
                _top = dialogVm.position().top,
                _left = dialogVm.position().left
                // _top = dest.offset().top,
                // _left = dest.offset().left
            ;

            // if (opts.coords == 'middle') {
            //     _top += (dest.height() || 0) / 2;
            //     _left += (dest.width() || 0) / 2;
            // }

            $elementOrClone = $element;
            // if (opts.clone === true) {
            //     $elementOrClone = $from.clone();
            // }

            var midx = Math.ceil(startLeft + ((_left - startLeft) * .7));
            var midy = Math.ceil(startTop + (Math.abs(_top - startTop) * .5));
            var beziers = BezierPlugin.bezierThrough([{ left: startLeft, top: startTop }, { left: midx, top: midy }, { left: _left, top: _top }]);

            //do a special extend.  desire is to have a more intuitive name for consumers (animationCss), since css is
            //confusing
            defaults.css = $.extend(defaults.css, value.animationCss);

            //var animationOpts = $.extend(defaults, value.animationOpts);

            animationOpts = $.extend(true, defaults, {
                css: {
                    bezier: {
                        type: "thru",
                        values:
                [
                    //{ x: 100, y: 250 }, { x: 150, y: 100 }, { x: 300, y: 500 }, { x: 500, y: 400 }
                    //{ x: startLeft /* + options.radius */, y: startTop /* + options.radius */ },
                    { left: midx /* + options.radius */, top: midy /* + options.radius */ },
                    //{ x: Math.ceil(_left) /* + options.radius */, y: Math.ceil(_top) /* + options.radius */ },
                    { left: Math.ceil(_left) /* + options.radius */, top: Math.ceil(_top) /* + options.radius */ }
                ], autoRotate: false//["x", "y", "rotation", 45, false]
                    }
                    //, scale: opts.scale//, rotation: opts.rotation
                }, onComplete: function () { $elementOrClone.remove(); (value.callback || function () { })(); }
            });

            //TweenLite.set($elementOrClone, {scale: .1});


            //var coords = element.getBoundingClientRect();
            //startTop = coords.bottom - coords.height;
            //startLeft = coords.left;

            // shrink$element
            $elementOrClone.appendTo(document.body);
            $elementOrClone
                .css({
                    "position": "absolute",
                    "top": startTop,
                    "left": startLeft,
                    "width": 'auto',
                    "height": 'auto',
                    zIndex: 9000,
                    scale: .1
                });

            if (opts.cssClass != '') {
                $elementOrClone.addClass(opts.cssClass);
            }
            //$elementOrClone.animate({
            //    fontSize: '1px',
            //    top: _top,
            //    left: _left
            //}
            //    , opts.duration, 'swing', function () {
            //        // done

            //        $elementOrClone.fadeOut('fast', value.callback || function () { });
            //    });
            //-webkit-transform: matrix(1, 0, 0, 1, 731, 90)
            var tl = new TweenLite.to($elementOrClone, opts.duration, animationOpts);
        }
    }
}

ko.bindingHandlers['fadeTo'] = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $element = $(element);

        $element.click(function () {
            var value = ko.utils.unwrapObservable(valueAccessor()), realValue = typeof value.value == 'undefined' ? true : value.value;


            if (realValue === true) {
                var $from = $element;
                var $elementOrClone = $element;

                var dest = null;
                var type = typeof value.to;

                switch (type) { 
                    case 'function':
                        dest = value.to();
                        break;
                    default:
                        dest = $(value.to);
                        break;
                }

                var fromType = typeof value.from;

                switch (fromType) {
                    case 'function':
                        $from = value.from();
                        break;
                    case 'undefined':
                        //do nothing, using element as from
                        break;
                    default:
                        $from = $(value.from);
                        break;
                }


                //, transformOrigin: "50% 50% -80"
                var defaults = { clone: true, coords: 'top', cssClass: '', duration: .85, css: { scale: .3 }, ease: /*SteppedEase.config(10)SlowMo.ease*/Linear.easeNone };

                var opts = $.extend(true, defaults, value);

                var
                    startTop = $from.offset().top,
                    startLeft = $from.offset().left,
                    _top = dest.offset().top,
                    _left = dest.offset().left
                ;

                if (opts.coords == 'middle') {
                    _top += (dest.height() || 0) / 2;
                    _left += (dest.width() || 0) / 2;
                }

                if (opts.clone === true) {
                    $elementOrClone = $from.clone();
                }

                var midx = Math.ceil(startLeft + ((_left - startLeft) * .7));
                var midy = Math.ceil(startTop + (Math.abs(_top - startTop) * .5));
                var beziers = BezierPlugin.bezierThrough([{ left: startLeft, top: startTop }, { left: midx, top: midy }, { left: _left, top: _top }]);

                //do a special extend.  desire is to have a more intuitive name for consumers (animationCss), since css is
                //confusing
                defaults.css = $.extend(defaults.css, value.animationCss);

                //var animationOpts = $.extend(defaults, value.animationOpts);

                animationOpts = $.extend(true, defaults, {
                    css: {
                        bezier: {
                            type: "thru",
                            values:
                    [
                        //{ x: 100, y: 250 }, { x: 150, y: 100 }, { x: 300, y: 500 }, { x: 500, y: 400 }
                        //{ x: startLeft /* + options.radius */, y: startTop /* + options.radius */ },
                        { left: midx /* + options.radius */, top: midy /* + options.radius */ },
                        //{ x: Math.ceil(_left) /* + options.radius */, y: Math.ceil(_top) /* + options.radius */ },
                        { left: Math.ceil(_left) /* + options.radius */, top: Math.ceil(_top) /* + options.radius */ }
                    ], autoRotate: false//["x", "y", "rotation", 45, false]
                        }
                        //, scale: opts.scale//, rotation: opts.rotation
                    }, onComplete: function () { $elementOrClone.remove(); (value.callback || function () { })(); }
                });




                //var coords = element.getBoundingClientRect();
                //startTop = coords.bottom - coords.height;
                //startLeft = coords.left;

                $elementOrClone.finish(true, true);
                // shrink$element
                $elementOrClone.appendTo(document.body);
                $elementOrClone
                    .css({
                        "position": "absolute",
                        "top": startTop,
                        "left": startLeft,
                        "width": 'auto',
                        "height": 'auto',
                        zIndex: 9000
                    });

                if (opts.cssClass != '') {
                    $elementOrClone.addClass(opts.cssClass);
                }
                //$elementOrClone.animate({
                //    fontSize: '1px',
                //    top: _top,
                //    left: _left
                //}
                //    , opts.duration, 'swing', function () {
                //        // done

                //        $elementOrClone.fadeOut('fast', value.callback || function () { });
                //    });
                //-webkit-transform: matrix(1, 0, 0, 1, 731, 90)
                var tl = new TweenLite.to($elementOrClone, opts.duration, animationOpts);
                //<old>
                //var tl = new TweenLite.to($elementOrClone, opts.duration, { top: _top, left: _left, scale: opts.scale, transformOrigin: opts.transformOrigin, ease: opts.ease, onComplete: function () { $elementOrClone.remove(); (value.callback || function () { })(); } });
                //</old>


                //tl.to($elementOrClone, 0.4, { rotationY: "-470deg", top: _top, left: _left, scale: 0, transformOrigin: "50% 50% -80", ease: Back.easeOut }, 0.13);
                //tl.play();
            }
            else {
                (value.callback || function () { })();
            }
        });

    }
};

ko.bindingHandlers['transitionTextTo'] = {
    'update': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $element = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor()),
            text = ko.utils.unwrapObservable(value.text),
            realValue = typeof value.value == 'undefined' ? true : ko.utils.unwrapObservable(value.value);


        if (text) {
            var $from = $element, dest = $element;

            var type = typeof ko.utils.unwrapObservable(value.to);
            switch (type) {
                case 'function':
                    dest = value.to();
                    break;
                case 'undefined':
                    //do nothing, using element as to
                    break;
                default:
                    dest = $(value.to);
                    break;
            }

            var fromType = typeof ko.utils.unwrapObservable(value.from);
            switch (fromType) {
                case 'function':
                    $from = ko.utils.unwrapObservable(value.from());
                    break;
                case 'undefined':
                    //do nothing, using element as from
                    break;
                default:
                    $from = ko.utils.unwrapObservable($(value.from));
                    break;
            }

            var defaults = { clone: true, coords: 'middle', duration: .5, transformOrigin: "50% 50% -80", scale: .3, ease: /*SteppedEase.config(10)*/SlowMo.ease, cssClass: 'txt' };

            var opts = $.extend(defaults, value);

            var
                startTop = $from.offset().top,
                startLeft = $from.offset().left,
                _top = dest.offset().top,
                _left = dest.offset().left
            ;


            var textArr = splitText(text, dest, opts.cssClass);

            var rough = new RoughEase({ strength: 5, points: 50, template: Back.easeOut, taper: "none", randomize: true });

            tl = new TimelineLite({ onComplete: (ko.utils.unwrapObservable(value.callback) || function () { })(), repeat: 0, repeatDelay: 1 });

            //t2.staggerFrom(txt, 0.8, {rotationY:"-470deg", top:startTop, left: startLeft, transformOrigin: "50% 50% -80", alpha:0, ease:Back.easeOutIn}, 0.13, "textEffect");
            tl.staggerFrom(textArr, 0.6, { rotationY: "-470deg", top: startTop, left: startLeft, rotation: 90, transformOrigin: "50% 50% -80", alpha: 0, ease: Elastic.easeIn.config(6.5, 4) }, 0.27, "textEffect");
            //TweenLite.from(txt, 0.8, {rotationY:"-470deg", top:startTop, left: startLeft, rotation:90, transformOrigin: "50% 50% -80", alpha:0, ease:Back.easeOut}, 0.13, "textEffect");
            tl.staggerTo(textArr, 0.5, { rotationY: "360deg", transformOrigin: "50% 50% 10" }, 0.03);
            flash({ element: document.getElementById('confirmationCodeNote'), timeline: tl });
        }
        //else {
        //    (value.callback || function () { })();
        //}

    }
};

ko.bindingHandlers['scale'] = {
    'update': function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
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
    //init: function (elem, valueAccessor) {
    //    return { controlsDescendantBindings: true };
    //},
    'update': function (element, valueAccessor) {
        //return; //block seems to have a memory leak???

        var value = ko.utils.unwrapObservable(valueAccessor());
        //alert(value);
        var $this = $(element), options;
        //$this.stop(true, true);

        if ('undefined' != typeof value.options) {
            options = value.options;
            value = value.busy;
        }

        if ('undefined' != typeof value.busy) {
            value = value.busy;
        }

        //        else {
        //            options = { message: 'Please wait...' };
        //        }
        $.blockUI.defaults.css = $.extend($.blockUI.defaults.css, { border: 'none', backgroundColor: 'transparent' });
        //circlular $.extend($.blockUI.defaults.overlayCSS, { 'box-shadow': 'rgba(0, 0, 0, 0.8) 0px 0px 0px 2px' }); //{ opacity: 0.8, background: 'white' };
        $.blockUI.defaults.overlayCSS = { opacity: 0.5, background: 'white' };
            
        //todo: copy all scale, border-radius and rotation settings
        var transformMimicryOps = {
            message: " "
            , overlayCSS: {
                //Four values: first value applies to top-left, second value applies to top-right, third value applies to bottom-right, and fourth value applies to bottom-left corner
                'border-radius': $this.css("borderTopLeftRadius") + ' ' + $this.css("borderTopRighttRadius") + ' ' + $this.css("borderBottomRightRadius") + ' ' + $this.css("borderBottomLeftRadius")
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



ko.bindingHandlers['what'] = {
    //init: function (elem, valueAccessor) {
    //    return { controlsDescendantBindings: true };
    //},
    'update': function (element, valueAccessor) {
        //return; //block seems to have a memory leak???

        var value = ko.utils.unwrapObservable(valueAccessor());
        //alert(value);
        var $this = $(element);
        
        $this.empty();


        if (value){
            if (value.klass){
                var $newdiv = $( "<div>class: " + value.klass + "</div>" )
                $this.append($newdiv);                
            }
            
            for (n in value){
                
                var $newdiv = $( "<div>" + n + ' ' + ko.unwrap(value[n]) + "</div>" )
                $this.append($newdiv);
            }
        }

    }
};

//thanks:http://freshbrewedcode.com/joshbush/2011/12/27/knockout-js-observable-extensions/
//(function(){
//    var format = function(value) {
//        if (value == null) value = 0;// return value;
//        if (isNaN(value)) value = 0;//return 'Invalid';
//        toks = value.toFixed(2).replace('-', '').split('.');
//        var display = '$' + $.map(toks[0].split('').reverse(), function(elm, i) {
//            return [(i % 3 === 0 && i > 0 ? ',' : ''), elm];
//        }).reverse().join('') + '.' + toks[1];

//        return value < 0 ? '(' + display + ')' : display;
//    };

//ko.subscribable.fn.money = function() {
//    var target = this;
//    
//    var writeTarget = function(value) {
//        var stripped=value.toString()
//            .replace(/[^0-9.(-]/g, '')
//            .replace('(','-');
//        
//        target(parseFloat(stripped));
//    };
//    
//    var result = ko.computed({
//        read: function() {
//            return target();
//        },
//        write: writeTarget
//    });

//    result.formatted = ko.computed({
//        read: function() {
//            return format(target());
//        },
//        write: writeTarget
//    });

//    return result;
//};
//})();

//Wire it up
//$(function() {
//    var viewModel = {
//        Cash: ko.observable(-1234.56).money(),
//        Check: ko.observable(2000).money(),
//        showJSON: function() {
//            alert(ko.toJSON(viewModel));
//        }
//    };

//    viewModel.Total = ko.computed(function() {
//        return this.Cash() + this.Check();
//    }, viewModel).money();
//    ko.applyBindings(viewModel);
//});​
//<!DOCTYPE html>
//<html>
//    <head>
//    </head>
//    <body class='ui-widget'>
//        <header class='ui-widget-header'>
//            <h1>Give me all of your money</h1>
//        </header>
//        <div class='ui-widget-content'>
//            <p>
//                <label>How much in Cash?</label><input data-bind="value:Cash.formatted,css:{negative:Cash()<0}" />
//            </p>
//            <p>
//                <label>How much in Checks?</label><input data-bind="value:Check.formatted,css:{negative:Check()<0}" />
//            </p>    
//            <p>
//                <label>Total:</label><span data-bind="text:Total.formatted,css:{negative:Total()<0}" />
//            </p>   
//            <p>
//                <button data-bind="click:showJSON">Show View Model JSON</button></p>
//        </div>
//    </body>
//</html>​

(function () {
    var format = function (value) {
        //if (value == null) value = 0; // return value;
        //if (isNaN(value)) value = 0; //return 'Invalid';
        if (!isNumber(value)) value = 0;

        toks = value.toFixed(2).replace('-', '').split('.');
        var display = '$' + $.map(toks[0].split('').reverse(), function (elm, i) {
            return [(i % 3 === 0 && i > 0 ? ',' : ''), elm];
        }).reverse().join('') + '.' + toks[1];

        return value < 0 ? '(' + display + ')' : display;
    };

    ko.extenders.money = function (target) {
        //var target = this;

        var writeTarget = function (value) {
            if (!value) { target(value); return; }
            var stripped = value.toString()
            .replace(/[^0-9.(-]/g, '')
            .replace('(', '-');

            target(parseFloat(stripped));
        };

        var resOpts = {
            read: target
        };

        var resFormattedOpts = {
            read: function () {
                return format(target());
            }
        };


        if (ko.isWriteableObservable(target)) {
            resOpts.write = resFormattedOpts.write = writeTarget;
        }

        var result = ko.computed(resOpts);

        result.formatted = ko.computed(resFormattedOpts);


        return result;
    };
})();

//ko.extenders.required = function (target, overrideMessage) {
//    //add some sub-observables to our observable
//    target.hasError = ko.observable();
//    target.validationMessage = ko.observable();

//    //define a function to do validation
//    function validate(newValue) {
//        var invalid = isEmpty(newValue);
//        if (!invalid) invalid = isBlank(newValue);
//        if (!invalid) invalid = isHtmlEmpty(newValue);
//        target.hasError(invalid ? true: false);
//        target.validationMessage(invalid ? overrideMessage || "This field is required" : "");
//    }

//    function isBlank(str) {
//        return (!str || !str.match(/\S/));
//    }

//    function isEmpty(str) {
//        return (!str || 0 === str.length);
//    }

//    function isHtmlEmpty(str) {
//        if (!str.match(/^\s*?\</)) return false;
//        var s = $(str).text();
//        return (isEmpty(s) || isEmpty(s));
//    }

//    //initial validation
//    validate(target());

//    //validate whenever the value changes
//    target.subscribe(validate);

//    //return the original observable
//    return target;
//};


ko.validation.rules['htmlNotEmpty'] = {
    validator: function (val, otherVal) {

        function isBlank(str) {
            return (!str || !str.match(/\S/));
        }

        function isEmpty(str) {
            return (!str || 0 === str.length);
        }

        function isHtmlEmpty(str) {
            if (!str.match(/^\s*?\</)) return false;
            var s = $(str).text();
            return (isEmpty(s) || isEmpty(s));
        }

        var invalid = isEmpty(val);
        if (!invalid) invalid = isBlank(val);
        if (!invalid) invalid = isHtmlEmpty(val);

        return !invalid;
    },
    message: 'Invalid.  Please enter a value'
};

ko.extenders.info = function (target, content) {
    //add some sub-observables to our observable
    target.info = ko.observable(content);

    //return the original observable
    return target;
};


//ko.extenders.numeric = function(target, precision) {
//    //create a writeable computed observable to intercept writes to our observable
//    var result = ko.computed({
//        read: target,  //always return the original observables value
//        write: function(newValue) {
//            var current = target(),
//                roundingMultiplier = Math.pow(10, precision),
//                newValueAsNum = isNaN(newValue) ? 0 : parseFloat(newValue),
//                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
// 
//            //only write if it changed
//            if (valueToWrite !== current) {
//                target(valueToWrite);
//            } else {
//                //if the rounded value is the same, but a different value was written, force a notification for the current field
//                if (newValue != current) {
//                    target.notifySubscribers(valueToWrite);
//                }
//            }
//        }
//    });
// 
//    //initialize with current value to make sure it is rounded appropriately
//    result(target());
// 
//    //return the new computed observable
//    return result;
//};
// 
//function AppViewModel(one, two) {
//    this.myNumberOne = ko.observable(one).extend({ numeric: 0 });
//    this.myNumberTwo = ko.observable(two).extend({ numeric: 2 });
//}

/*
KnocjoutJS TinyMCE Binding
	
Copyright 2011 .DeV!L
*/

//ko.bindingHandlers.tinymce = {
//    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
//        return;
//        var editor = $(element).tinymce();
//        var options = allBindingsAccessor().tinymceOptions || {};
//        var va = valueAccessor();
//        var mce_config = {
//            theme: "advanced",
//            // Theme options
//            theme_advanced_buttons1: "save,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontselect,fontsizeselect",
//            theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,cleanup,code,|,forecolor,backcolor",
//            theme_advanced_buttons3: "",
//            theme_advanced_toolbar_location: "top",
//            theme_advanced_toolbar_align: "left",
//            theme_advanced_statusbar_location: "bottom",
//            theme_advanced_resizing: true,
//            setup: function (ed) {
//                ed.addButton('save', {
//                    title: 'save.desc',
//                    onclick: function () {
//                        if (!ed.isDirty()) {
//                            // return false;
//                        }
//                        var html = ed.getContent({ format: 'raw' });
//                        if (ko.isWriteableObservable(va)) {
//                            va(html);
//                        }
//                        ed.isNotDirty = true;
//                    }
//                });
//            }
//        };

//        mce_config = $.extend(mce_config, options);

//        if (editor) {
//            editor.remove();
//            editor = null;
//        };

//        setTimeout(function () {
//            $(element).tinymce(mce_config);
//        }, 0);
//    },

//    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
//        var value = ko.unwrap(valueAccessor());
//        $(element).html(value);
//    }
//}

//ko.bindingHandlers.tinymce = {
//    init: function (element, valueAccessor, allBindingsAccessor, context) {
//        var options = allBindingsAccessor().tinymceOptions || {};
//        var modelValue = valueAccessor();

//        //handle edits made in the editor
//        options.setup = function (ed) {
//            ed.onChange.add(function (ed, l) {
//                if (ko.isWriteableObservable(modelValue)) {
//                    modelValue(l.content);
//                }
//            });
//        };

//        //handle destroying an editor (based on what jQuery plugin does)
//        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//            $(element).parent().find("span.mceEditor,div.mceEditor").each(function (i, node) {
//                var ed = tinyMCE.get(node.id.replace(/_parent$/, ""));
//                if (ed) {
//                    ed.remove();
//                }
//            });
//        });

//        //$(element).tinymce(options);
//        setTimeout(function () {
//            //$(element).tinymce(options); 
//            options.mode = 'exact';
//            options.elements = element.id;
//            tinyMCE.init(options);
//                }, 0);
////        options.mode = 'exact';
////        options.elements = element.id;
////        tinyMCE.init(options);

//    },
//    update: function (element, valueAccessor, allBindingsAccessor, context) {
//        //handle programmatic updates to the observable
//        var value = ko.unwrap(valueAccessor());
////        $(element).parent().find("span.mceEditor,div.mceEditor").each(function (i, node) {
////            var ed = tinyMCE.get(node.id.replace(/_parent$/, ""));
////            if (ed) {
////                ed.setContent(value);
////            }
////        });

//        //$(element).html(value);
//        //$(element).text(value);
//        $(element).val(value);
//    }
//};

ko.bindingHandlers.tinymce = {
    init: function (element, valueAccessor, allBindingsAccessor, context) {
        //alert('hi dudes');
        var options = allBindingsAccessor().tinymceOptions || {};
        var modelValue = valueAccessor();
        var value = ko.unwrap(valueAccessor());
        var el = $(element);

        var mce_config = {
            theme: "advanced",
            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,|,forecolor,backcolor,|,bullist,numlist,link,unlink,formatselect,pasteword",
            theme_advanced_buttons2: "", //"cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,cleanup,code,|,forecolor,backcolor",
            theme_advanced_buttons3: "",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: true

        };

        options = $.extend(mce_config, options);

        options.setup = function (ed) {

            ed.onChange.add(function (editor, l) { //handle edits made in the editor. Updates after an undo point is reached.
                if (ko.isWriteableObservable(modelValue)) {
                    modelValue(l.content);
                }
            });

            ed.onInit.add(function (ed, evt) { // Make sure observable is updated when leaving editor.
                var dom = ed.dom;
                var doc = ed.getDoc();
                tinymce.dom.Event.add(doc, 'blur', function (e) {
                    if (ko.isWriteableObservable(modelValue)) {
                        modelValue(ed.getContent({ format: 'raw' }));
                    }
                });
            });

        };

        options.script_url = 'http://tvmobdev04:8020/3rdParty/js/tinymce/tiny_mce.js';


        //handle destroying an editor (based on what jQuery plugin does)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).parent().find("span.mceEditor,div.mceEditor").each(function (i, node) {
                var ed = tinyMCE.get(node.id.replace(/_parent$/, ""));
                if (ed) {
                    //ed.remove();
                }
            });
        });

        //$(element).tinymce(options);
        setTimeout(function () {
            $(element).tinymce(options);
            //alert(el.prop('id'));
        }, 0);
        el.val(value);
    },
    update: function (element, valueAccessor, allBindingsAccessor, context) {
        var el = $(element);
        var value = ko.unwrap(valueAccessor());
        var id = el.prop('id');

        //handle programmatic updates to the observable
        // also makes sure it doesn't update it if it's the same.
        // otherwise, it will reload the instance, causing the cursor to jump.
        if (id !== undefined && id !== '' && typeof tinyMCE != 'undefined') {
            var editor = tinyMCE.get(id);
            if (editor) {
                var content = editor.getContent({ format: 'raw' });
                if (content !== value) {
                    el.val(value);
                }
            }
        }
    }
};




ko.bindingHandlers.cleditor = {
    init: function (element, valueAccessor, allBindingsAccessor, context) {
        //alert('hi dudes');
        var options = allBindingsAccessor().cleditorOptions || {};
        var modelValue = valueAccessor();
        var value = ko.unwrap(valueAccessor());
        var el = $(element);

        //        //no editor
        //        el.val(value);
        //        return;


        var mce_config = { width: 370,
            height: 200, controls:     // controls to add to the toolbar
            "bold italic underline | font size " +
            "style | color highlight removeformat | bullets numbering | " +
            "link unlink | pastetext"
            , docCSSFile: "http://tvmobdev04:8005/css/main.css"
            , bodyStyle: "font-family:sans-serif, Arial, Helvetica, lucinda console; font-size:10pt; letter-spacing: 0.1em; line-height: 1.333em;"
        };



        options = $.extend(mce_config, options);

        //        options.setup = function (ed) {

        //            ed.onChange.add(function (editor, l) { //handle edits made in the editor. Updates after an undo point is reached.
        //                if (ko.isWriteableObservable(modelValue)) {
        //                    modelValue(l.content);
        //                }
        //            });

        //            ed.onInit.add(function (ed, evt) { // Make sure observable is updated when leaving editor.
        //                var dom = ed.dom;
        //                var doc = ed.getDoc();
        //                tinymce.dom.Event.add(doc, 'blur', function (e) {
        //                    if (ko.isWriteableObservable(modelValue)) {
        //                        modelValue(ed.getContent({ format: 'raw' }));
        //                    }
        //                });
        //            });

        //        };


        //handle destroying an editor (based on what jQuery plugin does)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (window.cleditors !== undefined) {
                var editor;
                for (var i = 0; i < window.cleditors.length; i++) {
                    editor = window.cleditors[i];
                    if (editor.$textarea[0] === element) {
                        //todo: dispose of editor
                    }
                }
            }
        });

        window.cleditors = window.cleditors || [];

        //$(element).tinymce(options);
        setTimeout(function () {
            var editor = $(element).cleditor(options)[0];
            ko.bindingHandlers.cleditor.__fixTab(editor);
            window.cleditors.push(editor);

            editor.updateTextArea(function (html) {
                modelValue(html);
            });

            //disable
            if (options.enabled)
                editor.disabled = ko.unwrap(options.enabled);

            //infoize
            if (options.info) {
                var qOptions = {
                    position: {
                        my: 'left center',
                        at: 'right top'
                    },
                    show: {
                        //solo: true, // ...and hide all other tooltips...
                        ready: true
                    },
                    //                            adjust: {
                    //					            screen: 'flip'
                    //				            },
                    //hide: false,
                    //                                hide: {
                    //                                    event: 'mouseleave'
                    //                                },
                    content: ko.unwrap(options.info),
                    style: 'ui-tooltip-dark ui-tooltip-rounded'
                };

                qOptions = $.extend(qOptions, options.infoOptions || {});

                editor.$frame.mouseenter(editor.$area[0], function (e) {
                    $(this).qtip(qOptions);
                });
            }
            //alert(el.prop('id'));
        }, 0);
        el.val(value);
    },
    update: function (element, valueAccessor, allBindingsAccessor, context) {
        var el = $(element);
        var value = ko.unwrap(valueAccessor());
        //var id = el.prop('id');

        //        //no editor
        //        if (el.val() != value) {
        //            el.val(value);
        //        }
        //        return;

        var options = allBindingsAccessor().cleditorOptions || {};


        //handle programmatic updates to the observable
        // also makes sure it doesn't update it if it's the same.
        // otherwise, it will reload the instance, causing the cursor to jump.
        if (window.cleditors !== undefined) {
            var editor;
            for (var i = 0; i < window.cleditors.length; i++) {
                editor = window.cleditors[i];



                if (editor.$area[0] === element) {
                    //disable
                    if ('undefined' != typeof options.enabled) {
                        var enabled = ko.unwrap(options.enabled);
                        editor.disabled = !enabled;

                        //                        if (enabled) {
                        //                            editor.$frame.css('display', 'block');
                        //                            editor.$area.hide();
                        //                        }
                        //                        else {
                        //                            editor.$frame.css('display', 'none');
                        //                            editor.$area.show();
                        //                        }
                    }

                    if (el.val() != value) {
                        el.val(value);
                        editor.updateFrame();
                    }
                }
            }
        }
    }
};

ko.bindingHandlers.cleditor.__fixTab = function (editor) {
    var self = this;

    var iframe = editor.$frame;

    iframe.contents().keydown(iframe[0], function (e) {
        number = 9; //any number really :)

        //alert(e.which);
        if (e.which == number) {
            //do something...
            //$(iframe).blur();
            //$(iframe).focus();
            //var next = $(iframe).next().next('iframe :input');

            //$(mainEditor.$frame[0].contentWindow).blur();

            var $next = ko.bindingHandlers.cleditor.__getNextFocusable($(e.data));

            if ($next) {
                $next.focus();
            }
            //$(iframe).emulateTab();
            //$(e.data).emulateTab();
            //alert('Done...');
            //                            if ('undefined' !== typeof (e.stopPropagation))
            //                                e.stopPropagation();
            //                            if ('undefined' !== typeof (e.preventDefault))
            //                                e.preventDefault();
            //                            if ('undefined' !== typeof (e.stopImmediatePropagation))
            //                                e.stopImmediatePropagation();
            //if ($next)
            return false;
        }

    });
}

ko.bindingHandlers.cleditor.__getNextFocusable = function ($start) {
    //var $start = $(start);
    var focusable = ":input, a[href], iframe";

    var $nexts = $start.nextAll().find(focusable).not(":disabled")
						.not(":hidden")
						.not("a[href]:empty"); //.not(function () { return ($(this).has('.grandChild').length > 0); });

    if ($nexts.length > 0) {
        var el = $nexts[0];
        return (el.contentWindow) ? el.contentWindow : el;
    }
    else {
        var parent = $start.parent();
        if (parent.length > 0) {
            return this.__getNextFocusable(parent);
        }
    }
}



ko.bindingHandlers.grow = {
        //init: function (element, valueAccessor, allBindingAccessors) {
        //    var $element = $(element),
        //        value = ko.unwrap(valueAccessor()),
        //        satellite = ko.unwrap(value.satellite),
        //        visibilityPropName = ko.unwrap(value.visibilityPropName) || 'hideChildren';

        //    if (satellite[visibilityPropName]()) {
        //        $element.hide();
        //    }
        //}
        //,
        'update': function (element, valueAccessor, allBindingAccessors) {
            var value = ko.unwrap(valueAccessor()),
                $element = $(element),
                toOrFrom = 'undefined' == typeof ko.unwrap(value.toOrFrom) ? 'to': ko.unwrap(value.toOrFrom),
                vm = ko.unwrap(value.vm),                
                animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .4 : ko.unwrap(value.animationLength),
                //offset = 'undefined' == typeof ko.unwrap(value.offset) ? true: ko.unwrap(value.offset),
                //left = ko.unwrap(value.left),
                //top = ko.unwrap(value.top),
                disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled),
                animationSettings = ko.unwrap(value.animationSettings)
                // width = ko.unwrap(value.width),
                // height = ko.unwrap(value.height),
                // borderRadius = 'undefined' == typeof ko.unwrap(value.borderRadius) ? 20: ko.unwrap(value.borderRadius),
                // callback = ('undefined' == typeof value.callback)? function () { }: value.callback,
                // animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .3 : ko.unwrap(value.animationLength),
                //opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                //delay = ko.unwrap(value.delay)
                ;

            if (!animationSettings) return;

            if ('undefined' == typeof animationSettings.borderRadius) animationSettings.borderRadius = 20;
            if ('undefined' == typeof animationSettings.onComplete) animationSettings.onComplete = function () { };
            if ('undefined' == typeof animationSettings.animationLength) animationSettings.animationLength = .3 ;

            //don't do anything on initial bind
            if (ko.computedContext.isInitial() || disabled) {
                return;
            }

            var settings = {};

            for(n in animationSettings){
                if (animationSettings.hasOwnProperty(n))
                    settings[n] = animationSettings[n];
            }

            // if (offset){
            //     var existingTop = parseInt($element.css('top'));
            //     var existingLeft = parseInt($element.css('left'));

            //     top += existingTop;
            //     left += existingLeft;
            // }                

                
            TweenLite[toOrFrom](element, animationLength, settings);
        }
    };
                                