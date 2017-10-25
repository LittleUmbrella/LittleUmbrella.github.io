(function (ko) {
    ko.bindingHandlers['intro'] = {
        init: function (element, valueAccessor, allBindingAccessors, viewModel) {

            var value = ko.unwrap(valueAccessor());
            //if (value === true) {
            var $element = $(element),
                eventAggregator = ko.unwrap(value.eventAggregator),
                delay = ko.unwrap(value.delay),
                borderWidth = ko.unwrap(value.borderWidth) || 2,
                top = ko.unwrap(value.top) || 500,
                left = ko.unwrap(value.left) || 2,
                height = ko.unwrap(value.height) || $element.height(),
                width = ko.unwrap(value.width) || $element.width(),
                animationLength = ko.unwrap(value.animationLength),
                scale = ko.unwrap(value.scale) || .2,
                vm = viewModel;

            //could use promise
            var priorLength = vm.popAnimationLength, ready = [];
            vm.popAnimationLength = 0;
            vm.popDuration = 0;

            var popHandler = function (topic, poppedVm) {
                if (poppedVm.isA(littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel)) {
                    poppedVm.popAnimationLength = priorLength;
                    poppedVm.popDuration = null;

                    poppedVm.becuViewModel.popAnimationLength = 0;
                    poppedVm.becuViewModel.popDuration = 0;
                    poppedVm.becuViewModel.pop();
                }
                else if (poppedVm.isA(littleUmbrella.circleverse.viewModel.AllPersonsViewModel)) {
                    poppedVm.popAnimationLength = priorLength;
                    poppedVm.popDuration = null;
                    ready.push(null);
                }
                else if (poppedVm.isA(littleUmbrella.circleverse.viewModel.BecuViewModel)) {
                    poppedVm.popAnimationLength = priorLength;
                    poppedVm.popDuration = null;
                    ready.push(null);
                }
                else if (poppedVm.isA(circleverse.viewModel.earthViewModel)) {
                    poppedVm.allPersonsViewModel.popAnimationLength = 0;
                    poppedVm.allPersonsViewModel.popDuration = 0;

                    poppedVm.allOrganizationsViewModel.popAnimationLength = 0;
                    poppedVm.allOrganizationsViewModel.popDuration = 0;

                    poppedVm.allPersonsViewModel.pop();
                    poppedVm.allOrganizationsViewModel.pop();
                }

                if (ready.length == 2) {
                    eventAggregator.publish('littleUmbrella.circleverse.viewModel.BecuViewModel.Expanded', poppedVm);
                    eventAggregator.unsubscribe(popHandler);
                    ready.push(null);
                }
            };

            eventAggregator.subscribe('circleverse.viewModel.satellite.popped.out', popHandler);




            littleUmbrella.circleverse.ui.Animation.popInOut({
                element: element,
                startingPos: { x: left, y: top },
                delay: delay||0,
                length: animationLength,
                ease: Elastic.easeOut.config(8.5, 5),
                onComplete: function () { 
                    popHandler('circleverse.viewModel.satellite.popped.out', vm); if (typeof vm.location == 'function') vm.location(vm.endLocation); 
                },
                popOut: false,

                additionalAnimationValues: { opacity: 1, scaleX: scale, scaleY: scale }
            });


        }
    };



    ko.bindingHandlers.pulse = {
        update: function (element, valueAccessor, allBindingAccessors, viewModel) {
            var value = ko.unwrap(valueAccessor()),
                defaults = { pulseColor: 'rgba(86, 174, 224,0.3)' },
                opts = defaults,
                pulse = false
            ;

            if (value.pulseColor){
                opts = $.extend(defaults, value);
                pulse = value.pulse;
            }
            else
                pulse = value;

            if (pulse){
                TweenMax.fromTo(element, 0.3, {
                    boxShadow: "0px 0px 0px 0px " + opts.pulseColor
                }, {
                    boxShadow: "0px 0px 15px 12px " + opts.pulseColor,
                    repeat: 1,
                    yoyo: true,
                    ease: Linear.easeNone
                });
            }


        }
    }


    ko.bindingHandlers.blah = {
        init: function (element, valueAccessor, allBindingAccessors, viewModel) {
            JS.Console.puts(viewModel + ' ' + ko.unwrap(valueAccessor()));
        }
    }

    ko.bindingHandlers.circleText = {
        init: function (element, valueAccessor, allBindingAccessors, viewModel) {
            var svg = document.createElement("svg");

            ko.virtualElements.prepend(element, nodeToPrepend)
        }
        ,
        update: function (element, valueAccessor, allBindingAccessors, viewModel) {
            JS.Console.puts(viewModel + ' ' + ko.unwrap(valueAccessor()));
        }
    }

    ko.virtualElements.allowedBindings.randomOrder = true;


    ko.bindingHandlers.circleDeclutter = {
        'update': function (element, valueAccessor, allBindingAccessors) {

            var value = ko.unwrap(valueAccessor()),
                $element = $(element),
                    base = ko.unwrap(value.base),
                    satellite = ko.unwrap(value.satellite),
                    $element = $(element),
                    childPropName = value.childPropName || 'childViewModels',
                    popOut = 'undefined' == typeof ko.unwrap(satellite.popToggle) ? ('undefined' == typeof ko.unwrap(value.popToggle)? true: ko.unwrap(value.popToggle)): ko.unwrap(satellite.popToggle),
                    index = ko.unwrap(value.index) || 0,
                    callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
                    animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .7 : ko.unwrap(value.animationLength),
                    opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                    delay = ko.unwrap(value.delay),
                    relativeToBase = 'undefined' == typeof ko.unwrap(value.relativeToBase) ? true : ko.unwrap(value.relativeToBase),
                    disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled);

            //don't do anything on initial bind
            if (ko.computedContext.isInitial() || disabled) {
                return;
            }
        }
    };

    ko.bindingHandlers.circleConnection = {
        'update': function (element, valueAccessor, allBindingAccessors) {

            var value = ko.unwrap(valueAccessor()),
                widthAdjust = ko.unwrap(value.widthAdjust),
                $element = $(element),
                childCircle = value.vm,
                parentDircle = childCircle.parent;
                    // base = ko.unwrap(value.base),
                    // satellite = ko.unwrap(value.satellite),
                    // $element = $(element),
                    // childPropName = value.childPropName || 'childViewModels',
                    // popOut = 'undefined' == typeof ko.unwrap(satellite.popToggle) ? ('undefined' == typeof ko.unwrap(value.popToggle)? true: ko.unwrap(value.popToggle)): ko.unwrap(satellite.popToggle),
                    // index = ko.unwrap(value.index) || 0,
                    // callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
                    // animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .7 : ko.unwrap(value.animationLength),
                    // opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                    // delay = ko.unwrap(value.delay),
                    // relativeToBase = 'undefined' == typeof ko.unwrap(value.relativeToBase) ? true : ko.unwrap(value.relativeToBase),
                    // disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled);

                    
            var childDims = childCircle.dimensions(), childLoc = childCircle.location(), parentDims = parentDircle.dimensions(), parentLoc = parentDircle.location();  
            var childCircleCenter = {top: childLoc.top + (childDims.height/2), left: childLoc.left + (childDims.width/2)}
            var parentCircleCenter = {top: 0+ (parentDims.height/2), left: 0+ (parentDims.width/2)}

            //don't do anything on initial bind
            if (ko.computedContext.isInitial()) {
                return;
            }

            //var rotation = getRotationInDegrees({top: childLoc.top, left: childLoc.left}, {top: 0, left: 0});
            var rotation = getRotationInDegrees(parentCircleCenter, childCircleCenter);

            //hypotenuse with child top and left as the two sides
            var width = Math.hypot(childCircleCenter.left - parentCircleCenter.left, childCircleCenter.top - parentCircleCenter.top);

//}
        //angle-angle-side
        //a-A-B
            
            // var b = parentDims.height;
            // var A = rotation;
            // /*
            // the three angles of any triangle add up to 180.  We know one angle (degreeOfSeparation)
            // and we know the other two are equivalent to each other, so...
            // */
            // var B = 90;

            // var C = (180 -B) -A;
            
            // var a = (b * sind(A)) / sind(C);

            // var c = (b * sind(C)) / sind(B);

            //http://www.mathportal.org/calculators/plane-geometry-calculators/right-triangle-calculator.php

            var a = sind(rotation) * (parentDims.height/2);
            var c = cosd(rotation) * (parentDims.height/2);

            element.style.top = (a + (parentDims.height/2)) + 'px';
            element.style.left = (c + (parentDims.width/2))  + 'px';

            if (childCircle.showMe()){
                element.style.transform = 'rotateZ('+ rotation +'deg) rotateX(180deg)';
                element.style.width = (width-(parentDims.width/2) + widthAdjust) + 'px'; //minus radius to ensure line ends at the edge of the connected circle (-(childDims.width/2)) to stop at edge of child
            }
            else{
                
                element.style.width = '0';
            }
        }
    };

    ko.bindingHandlers.addressConnection = {
    //     init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    //         var value = ko.unwrap(valueAccessor()),
    //             $element = $(element),
    //             childCircle,  
    //             parentDircle = ko.unwrap(value);
    //                 // base = ko.unwrap(value.base),
    //                 // satellite = ko.unwrap(value.satellite),
    //                 // $element = $(element),
    //                 // childPropName = value.childPropName || 'childViewModels',
    //                 // popOut = 'undefined' == typeof ko.unwrap(satellite.popToggle) ? ('undefined' == typeof ko.unwrap(value.popToggle)? true: ko.unwrap(value.popToggle)): ko.unwrap(satellite.popToggle),
    //                 // index = ko.unwrap(value.index) || 0,
    //                 // callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
    //                 // animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .7 : ko.unwrap(value.animationLength),
    //                 // opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
    //                 // delay = ko.unwrap(value.delay),
    //                 // relativeToBase = 'undefined' == typeof ko.unwrap(value.relativeToBase) ? true : ko.unwrap(value.relativeToBase),
    //                 // disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled);


    //         var parentDims = parentDircle.dimensions(), parentLoc = parentDircle.location();

    //         if (parentDircle.showMe()){
    //             var mapEls = $element.parent().siblings('.map');

    //             if (mapEls.length == 0) 
    //                 mapEls = $element.parents('.map');

    //             if (mapEls.length == 0) throw Error("map '.map' element not found in ancestor tree or siblings");

    //             var mapEl = mapEls[0];

    //             var map = mapEl.__becu_map__;

                
    //             var latLng = new L.latLng(ko.unwrap(value.model().latitude), ko.unwrap(value.model().longitude));
    //             //var point = map.project(latLng).divideBy(256).floor();
    //             var point = map.latLngToContainerPoint(latLng);


                        
    //             var childDims = {width: 0, height: 0}, childLoc = {top: point.y - parentDircle.top, left: point.x - parentDircle.left};  
    //             var childCircleCenter = {top: point.y - parentLoc.top, left: point.x - parentLoc.left};
    //             var parentCircleCenter = {top: 0+ (parentDims.height/2), left: 0+ (parentDims.width/2)};

    //             //don't do anything on initial bind
    //             // if (ko.computedContext.isInitial()) {
    //             //     return;
    //             // }





    //             //var rotation = getRotationInDegrees({top: childLoc.top, left: childLoc.left}, {top: 0, left: 0});
    //             var rotation = getRotationInDegrees(parentCircleCenter, childCircleCenter);

    //             //hypotenuse with child top and left as the two sides
    //             var width = Math.hypot(childCircleCenter.left - parentCircleCenter.left, childCircleCenter.top - parentCircleCenter.top);

    // //}
    //         //angle-angle-side
    //         //a-A-B
                
    //             // var b = parentDims.height;
    //             // var A = rotation;
    //             // /*
    //             // the three angles of any triangle add up to 180.  We know one angle (degreeOfSeparation)
    //             // and we know the other two are equivalent to each other, so...
    //             // */
    //             // var B = 90;

    //             // var C = (180 -B) -A;
                
    //             // var a = (b * sind(A)) / sind(C);

    //             // var c = (b * sind(C)) / sind(B);

    //             //http://www.mathportal.org/calculators/plane-geometry-calculators/right-triangle-calculator.php

    //             var a = sind(rotation) * (parentDims.height/2);
    //             var c = cosd(rotation) * (parentDims.height/2);

    //             element.style.top = (a + (parentDims.height/2)) + 'px';
    //             element.style.left = (c + (parentDims.width/2))  + 'px';

    //             element.style.transform = 'rotateZ('+ rotation +'deg)';
    //             element.style.width = (width-(parentDims.width/2)) + 'px'; //minus radius to ensure line ends at the edge of the connected circle

    //             var reposition = function(){
    //                 var latLng = new L.latLng(ko.unwrap(value.model().latitude), ko.unwrap(value.model().longitude));
    //                 //var point = map.project(latLng).divideBy(256).floor();
    //                 var point = map.latLngToContainerPoint(latLng);
                    
    //                 var origin = map.getPixelOrigin();

    //                 var offsetX = value.dimensions().width / 2, offsetY = value.dimensions().width + (3 * map.getZoom()); 
    //                 // console.log("origin: " + origin.x + ", y:" + origin.y );
    //                 // console.log("project: " + map.project(latLng).x + ", y:" + map.project(latLng).y );
    //                 // console.log("latLngToLayerPoint: " + map.latLngToLayerPoint(latLng).x + ", y:" + map.latLngToLayerPoint(latLng).y );
    //                 // console.log("latLngToContainerPoint: " + map.latLngToContainerPoint(latLng).x + ", y:" + map.latLngToContainerPoint(latLng).y );
    //                 //console.log("containerPoint: " + map.project(latLng).x + ", y:" + map.project(latLng).y );
                    
    //                 value.location({left: point.x - offsetX, top: point.y - offsetY});
    //             }            

    //             reposition();

    //             map.on('resize move zoom', function(){
    //                 reposition();
    //             });
    //         }
    //         else{
                
    //             element.style.width = '0';
    //         }

            
    //     },
        'update': function (element, valueAccessor, allBindingAccessors) {

//in this case, the line is the child and the circle is the reference point (parent)
            var value = ko.unwrap(valueAccessor()),
                $element = $(element),
                childCircle,  
                parentDircle = ko.unwrap(value);
                    // base = ko.unwrap(value.base),
                    // satellite = ko.unwrap(value.satellite),
                    // $element = $(element),
                    // childPropName = value.childPropName || 'childViewModels',
                    // popOut = 'undefined' == typeof ko.unwrap(satellite.popToggle) ? ('undefined' == typeof ko.unwrap(value.popToggle)? true: ko.unwrap(value.popToggle)): ko.unwrap(satellite.popToggle),
                    // index = ko.unwrap(value.index) || 0,
                    // callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
                    // animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .7 : ko.unwrap(value.animationLength),
                    // opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                    // delay = ko.unwrap(value.delay),
                    // relativeToBase = 'undefined' == typeof ko.unwrap(value.relativeToBase) ? true : ko.unwrap(value.relativeToBase),
                    // disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled);


            var parentDims = parentDircle.dimensions(), parentLoc = parentDircle.location();

            if (parentDircle.showMe()){
                var mapEls = $element.parent().siblings('.map');

                if (mapEls.length == 0) 
                    mapEls = $element.parents('.map');

                if (mapEls.length == 0) throw Error("map '.map' element not found in ancestor tree or siblings");

                var mapEl = mapEls[0];

                var map = mapEl.__becu_map__;

                
                var latLng = new L.latLng(ko.unwrap(value.model().latitude), ko.unwrap(value.model().longitude));
                //var point = map.project(latLng).divideBy(256).floor();
                var point = map.latLngToContainerPoint(latLng);


                        
                var childDims = {width: 0, height: 0}, childLoc = {top: point.y - parentDircle.top, left: point.x - parentDircle.left};  
                var childCircleCenter = {top: point.y - parentLoc.top, left: point.x - parentLoc.left};
                var parentCircleCenter = {top: 0+ (parentDims.height/2), left: 0+ (parentDims.width/2)};

                //don't do anything on initial bind
                // if (ko.computedContext.isInitial()) {
                //     return;
                // }





                //var rotation = getRotationInDegrees({top: childLoc.top, left: childLoc.left}, {top: 0, left: 0});
                var rotation = getRotationInDegrees(parentCircleCenter, childCircleCenter);

                //hypotenuse with child top and left as the two sides
                var width = Math.hypot(childCircleCenter.left - parentCircleCenter.left, childCircleCenter.top - parentCircleCenter.top);

    //}
            //angle-angle-side
            //a-A-B
                
                // var b = parentDims.height;
                // var A = rotation;
                // /*
                // the three angles of any triangle add up to 180.  We know one angle (degreeOfSeparation)
                // and we know the other two are equivalent to each other, so...
                // */
                // var B = 90;

                // var C = (180 -B) -A;
                
                // var a = (b * sind(A)) / sind(C);

                // var c = (b * sind(C)) / sind(B);

                //http://www.mathportal.org/calculators/plane-geometry-calculators/right-triangle-calculator.php

                var a = sind(rotation) * (parentDims.height/2);
                var c = cosd(rotation) * (parentDims.height/2);

                element.style.top = (a + (parentDims.height/2)) + 'px';
                element.style.left = (c + (parentDims.width/2))  + 'px';

                element.style.transform = 'rotateZ('+ rotation +'deg)';
                element.style.width = (width-(parentDims.width/2)) + 'px'; //minus radius to ensure line ends at the edge of the connected circle
            }
            else{
                
                element.style.width = '0';
            }
        }
    };

    function sind(x) {
        return Math.sin(x * Math.PI / 180);
    }

    function cosd(x) {
        return Math.cos(x * Math.PI / 180);
    }

    var getRotationInDegrees = function(p1,p2){
        // // Get rotation in degrees
        // p1 = p1.left;
        // p2 = p2.left;
        // var rotation = Math.atan(p1/p2) * 180 / Math.PI;

        // // Adjust for 2nd & 3rd quadrants, i.e. diff y is -ve.
        // if (p2 < 0) {
        //     rotation += 180;

        // // Adjust for 4th quadrant
        // // i.e. diff x is -ve, diff y is +ve
        // } else if (p1 < 0) {
        //     rotation += 360;
        // }
        
        // return rotation;
        return Math.atan2(p2.top-p1.top,p2.left-p1.left)/Math.PI*180;
    }

    Math.hypot = Math.hypot || function (x, y) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=896264#c28
        var max = 0;
        var s = 0;
        for (var i = 0; i < arguments.length; i += 1) {
            var arg = Math.abs(Number(arguments[i]));
            if (arg > max) {
            s *= (max / arg) * (max / arg);
            max = arg;
            }
            s += arg === 0 && max === 0 ? 0 : (arg / max) * (arg / max);
        }
        return max === 1 / 0 ? 1 / 0 : max * Math.sqrt(s);
    };

    var hidePop = false;

    ko.bindingHandlers.animatedMove = {
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
                satellite = ko.unwrap(value.satellite),
                index = ko.unwrap(value.index) || 0,
                callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
                animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .3 : ko.unwrap(value.animationLength),
                opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                delay = ko.unwrap(value.delay),
                toOrFrom = 'undefined' == typeof ko.unwrap(value.toOrFrom) ? 'to': ko.unwrap(value.toOrFrom),
                offset = 'undefined' == typeof ko.unwrap(value.offset) ? true: ko.unwrap(value.offset),
                left = ko.unwrap(value.left),
                top = ko.unwrap(value.top),
                disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled)
                ;

            //don't do anything on initial bind
            if (ko.computedContext.isInitial() || disabled) {
                return;
            }

            if (offset){
                var existingTop = parseInt($element.css('top'));
                var existingLeft = parseInt($element.css('left'));

                top += existingTop;
                left += existingLeft;
            }                

                
            TweenLite[toOrFrom](element, animationLength, { top: top, left: left, onComplete: callback });
        }
    };

    ko.bindingHandlers.dropAvailable = {
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
                data = ko.unwrap(value.data),
                css = ko.unwrap(value.css);

            if (data){
                $element.addClass(css);
            }
            else{
                $element.removeClass(css);
            }
        }
    };

    ko.bindingHandlers.limeLight = {
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
                base = ko.unwrap(value.base),
                satellite = ko.unwrap(value.satellite),
                $element = $(element),
                childPropName = value.childPropName || 'childViewModels',
                limeLight = 'undefined' == typeof ko.unwrap(satellite.limeLight) ? ('undefined' == typeof ko.unwrap(value.limeLight)? true: ko.unwrap(value.limeLight)): ko.unwrap(satellite.limeLight),
                index = ko.unwrap(value.index) || 0,
                callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
                animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .7 : ko.unwrap(value.animationLength),
                opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                delay = ko.unwrap(value.delay),
                relativeToBase = 'undefined' == typeof ko.unwrap(value.relativeToBase) ? true : ko.unwrap(value.relativeToBase),
                disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled);

            //don't do anything on initial bind
            if (ko.computedContext.isInitial() || disabled) {
                return;
            }

            var parent = $element.parent();
                
            if (parent && parent.is('.circle')){

            
                var existingTop = parseInt($element.css('top'));
                var existingLeft = parseInt($element.css('left'));

                //apply to root to shift all
                ko.bindingHandlers.util.addClass(parent[0], 'faded');
                var tmpParent = parent.parent();
                //ko.bindingHandlers.util.addClass(tmpParent[0], 'faded');
                //var parentVm = satellite.parent;
                //parentVm.mainCss((parentVm.mainCss() ||'') + ' faded');
                while (true){
                    if (tmpParent.is('.circle')){
                                                
                        ko.bindingHandlers.util.addClass(tmpParent[0], 'faded');
                        //parentVm.mainCss((parentVm.mainCss() ||'') + ' faded');
                        parent = tmpParent;
                    }
                    else{
                        break;
                    }
                    tmpParent = tmpParent.parent();
                }
            
                
                var existingParentLeft = parseInt(parent.css('left'));
                var existingParentTop = parseInt(parent.css('top'));


                if (limeLight){
                    ko.bindingHandlers.util.removeClass(element, 'faded');
                    var children = ko.unwrap(satellite.childViewModels), popped = satellite.popped;
                    var fullAdjustLeft = -existingLeft,//existingLeft + satellite.getCalculatedLocation().left + 2,
                        fullAdjustTop = -existingTop;//existingTop + satellite.getCalculatedLocation().top + 2;
                        //see if any child popped
                        // var i = 0, child = children[i], incrementalLeft = 0, incrementalTop = 0;

                        // while (child && children && i < children.length){
                            
                        //     i++;

                        //     if (child.popped){                                
                        //         //satellite.mainCss((satellite.mainCss() ||'') + ' faded');
                        //         //child.mainCss('');
                        //         incrementalLeft = child.getCalculatedLocation().left;
                        //         incrementalTop = child.getCalculatedLocation().top;
                        //         fullAdjustLeft -= incrementalLeft;
                        //         fullAdjustTop -= incrementalTop;
                        //         children = ko.unwrap(child.childViewModels);
                        //         i = 0; //reset for new set of childres
                        //     }
                        //     child = children[i];
                            
                        //     if (child && child.popped){                                
                        //         ko.bindingHandlers.util.addClass(element, 'faded');
                        //     }
                        // }
                        
                        // //remove last open child
                        // fullAdjustLeft += incrementalLeft;
                        // fullAdjustTop += incrementalTop;

                    TweenLite.to(parent, .3, { top: existingParentTop + fullAdjustTop, left: existingParentLeft + fullAdjustLeft });
                    // parent.css('left', existingParentLeft + (-1 * (existingLeft)));
                    // parent.css('top', existingParentTop + (-1 * (existingTop)));
                    
                }                
                else{
                    ko.bindingHandlers.util.removeClass(element, 'faded');
                    //if a middle parent was clicked, we have to shift up all its childres
                    var children = ko.unwrap(satellite.childViewModels), popped = satellite.popped;
                    
                    if (! popped || ! children){
                        
                        //parent.mainCss('');
                        TweenLite.to(parent, .3, { top: existingParentTop + ((existingTop)), left: existingParentLeft + ((existingLeft)) });
                        // parent.css('left', existingParentLeft + ((existingLeft)));
                        // parent.css('top', existingParentTop + ((existingTop)));
                    }
                    else{
                        var fullAdjustLeft =existingLeft,//existingLeft + satellite.getCalculatedLocation().left + 2,
                        fullAdjustTop = existingTop;//existingTop + satellite.getCalculatedLocation().top + 2;
                        //see if any child popped
                        // var i = 0, child = children[i], incrementalLeft = 0, incrementalTop = 0;

                        // while (child && children && i < children.length){
                            
                        //     i++;

                        //     if (child.popped){
                        //         //child.mainCss('');
                        //         incrementalLeft = child.getCalculatedLocation().left;
                        //         incrementalTop = child.getCalculatedLocation().top;
                        //         fullAdjustLeft += incrementalLeft;
                        //         fullAdjustTop += incrementalTop;
                        //         children = ko.unwrap(child.childViewModels);
                        //         i = 0; //reset for new set of childres
                        //     }
                        //     child = children[i];
                        // }
                        
                        // //remove last open child
                        // fullAdjustLeft -= incrementalLeft;
                        // fullAdjustTop -= incrementalTop;
                         


                        TweenLite.to(parent, .3, { top: existingParentTop + fullAdjustTop, left: existingParentLeft + fullAdjustLeft });
                        // parent.css('left', existingParentLeft + fullAdjustLeft);
                        // parent.css('top', existingParentTop + fullAdjustTop);
                    }
                }

            }

            
        }
    }

    ko.bindingHandlers.util = ko.bindingHandlers.util || {};
    ko.bindingHandlers.util.addClass= function(el, css){
        var tem, C= el.className.split(/\s+/), A=[];    
        while(C.length){
            tem= C.shift();
            if(tem && tem!= css) A[A.length]= tem;
        }
        A[A.length]= css;
        return el.className= A.join(' ');   
    }
    ko.bindingHandlers.util.removeClass= function(el, css){
        var C= el.className;    
        
        if (C && C.indexOf(css) > -1)
            C = C.replace(css, '');
        return el.className= C;   
    }

    ko.bindingHandlers.satellitePopInOut = {
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
                base = ko.unwrap(value.base),
                satellite = ko.unwrap(value.satellite),
                $element = $(element),
                childPropName = value.childPropName || 'childViewModels',
                popOut = 'undefined' == typeof ko.unwrap(satellite.popToggle) ? ('undefined' == typeof ko.unwrap(value.popToggle)? true: ko.unwrap(value.popToggle)): ko.unwrap(satellite.popToggle),
                index = ko.unwrap(value.index) || 0,
                callback = (satellite.popAnimationEnded? satellite.popAnimationEnded: value.callback || function () { }),
                animationLength = 'undefined' == typeof ko.unwrap(value.animationLength) ? .7 : ko.unwrap(value.animationLength),
                opacity = 0, //'undefined' == typeof ko.unwrap(value.opacity) ? 0 : ko.unwrap(value.opacity),
                delay = ko.unwrap(value.delay),
                relativeToBase = 'undefined' == typeof ko.unwrap(value.relativeToBase) ? true : ko.unwrap(value.relativeToBase),
                disabled = 'undefined' == typeof ko.unwrap(value.disabled) ? false : ko.unwrap(value.disabled);

            //don't do anything on initial bind
            if (ko.computedContext.isInitial() || disabled) {       
                //fix later callback.call(satellite);
                return;
            }

            //do work?
            var popped = satellite.showMe();//$element.css('display') != 'none';
            if (popped == popOut){                
                //fix later callback.call(satellite);
                return;
            }

            //if (disabled) return;


            //, styleBinding = allBindingAccessors.get('style')
            var startingPos = { x: 0, y: 0 }, left = parseFloat($element.css('left')), top = parseFloat($element.css('top')),
                width = parseFloat($element.css('width')), height = parseFloat($element.css('height'));

            if ('string' == typeof base) {
                var $base = $(base);
                if (relativeToBase) {
                    startingPos.x = $base.width() / 2 - width / 2;

                    startingPos.y = $base.height() / 2 - height / 2;
                }
                else {
                    startingPos.x = $base.offset().left + $base.width() / 2 - width / 2;

                    startingPos.y = $base.offset().top + $base.height() / 2 - height / 2;

                }
            }
            else {

                startingPos.x = base.dimensions().width / 2 - width / 2;

                startingPos.y = base.dimensions().height / 2 - height / 2;
            }

            var endPos = { x: left, y: top }, pos = endPos;

            if (popOut) {
                pos = startingPos;
            }

            var tl = {
                top: startingPos.y, left: startingPos.x, opacity: opacity, ease: Elastic.easeOut.config(8.5, 5), onComplete: function () {

                    //else {
                    //    satellite[visibilityPropName](false);
                    //}

                    callback.call(satellite);
                    
                    
                    if (!popOut) {

                            TweenLite.set($element, { opacity: 1, top: endPos.y, left: endPos.x });
                    }





                    if (hidePop){
                        if (!popOut) {
                            //    satellite[visibilityPropName](true);


                            //    //tl.set($element, { top: endPos.y, left: endPos.x });
                            //    //$element.hide();
                    //show parent and center it (pushing child out of center)

                            var parent = $element.parent();
                            if (parent){

                                var grandParent = parent.parent();
                                if (grandParent && grandParent.is('.circle')){
                                    
                                    var existingGrandParentLeft = parseInt(grandParent.css('left'));
                                    var existingParentLeft = parseInt(parent.css('left'));
                                    var existingGrandParentTop = parseInt(grandParent.css('top'));
                                    var existingParentTop = parseInt(parent.css('top'));
                                    var parentSize = parent[0].getBoundingClientRect().width;
                                    var grandParentSize = grandParent[0].getBoundingClientRect().width;
                                    var recenterLeft = (grandParentSize/2) - (parentSize/2) ;

                                    if (existingGrandParentLeft <= 0){//already shifted by another satellite popping
                                        //we are either positioning from window (0, 0) or from a great-grandparent off screen
                                        var greatParent = grandParent.parent();


                                        if (greatParent && greatParent.is('.circle')){
                                            grandParent.css('left', (existingParentLeft) - recenterLeft);
                                            var pos = satellite.parent.getCalculatedLocation();
                                            

                                            
                                            // parent.css('left', pos.left + 'px');
                                            // parent.css('top', pos.top + 'px');
                                            
                                            
                                            var declutterGrandParentConfig = {top: (existingParentTop) - recenterLeft, ease: Power4.easeOut};                                        
                                            TweenLite.to(grandParent, animationLength, declutterGrandParentConfig);
                                            
                                            var declutterParentConfig = {top: pos.top, left: pos.left, ease: Power4.easeOut};                                        
                                            TweenLite.to(parent, animationLength, declutterParentConfig);

                                            //grandParent.css('top', (existingParentTop) - recenterLeft);                                        
                                        }
                                        else{
                                            // var declutterGrandParentConfig = {left: (existingParentLeft - grandParentSize) - recenterLeft, ease: Power4.easeOut};                                        
                                            // TweenLite.to(grandParent, .3, declutterGrandParentConfig);

                                            grandParent.css('left', (existingParentLeft - grandParentSize) - recenterLeft);
                                            var pos = satellite.parent.getCalculatedLocation();
                                            
                                            var declutterParentConfig = {top: pos.top, ease: Power4.easeOut};                                        
                                            TweenMax.fromTo(parent, animationLength, {top: pos.top + recenterLeft, ease: Power4.easeOut}, declutterParentConfig);

                                            TweenMax.fromTo(grandParent, animationLength, {top: existingGrandParentTop + recenterLeft, ease: Power4.easeOut}, {top: existingGrandParentTop, ease: Power4.easeOut});



                                            parent.css('left', pos.left + 'px');
                                            
                                            // // grandParent.css('top', (existingParentTop - grandParentSize) - recenterLeft);
                                            // // //var pos = satellite.parent.getCalculatedLocation();
                                            
                                            // parent.css('top', pos.top + 'px');
                                        }
                                    }
                                }
                            }

                            //satellite.parent.showMe(true);
                        }
                        else{
                            //satellite.parent.showMe(false);
                    //hide parent and center child (new parent)
                            var parent = $element.parent();
                            if (parent){

                                var grandParent = parent.parent();
                                if (grandParent && grandParent.is('.circle')){
                                    
                                    var globalW = $(window).width(), parentW = parent.width();
                                    var existingGrandParentLeft = parseInt(grandParent.css('left'));
                                    var existingParentLeft = parseInt(parent.css('left'));
                                    var existingGrandParentTop = parseInt(grandParent.css('top'));
                                    var existingParentTop = parseInt(parent.css('top'));
                                    var greatParent = grandParent.parent();

                                    
                                    var grandParentSize = grandParent[0].getBoundingClientRect().width;//.width(); //satellite.parent.parent.size();
                                    

                                    // if (existingGrandParentLeft > 0)
                                    //     grandParent.css('left', (existingGrandParentLeft - 9999) + 'px');
                                    // //parent.css('left', (existingGrandParentLeft + (((globalW/2) - (parentW/2)) )) + 'px');
                                    // if (existingParentLeft < 0){
                                    //     parent.css('left', (9999) + 'px');
                                    // }
                                    // else{
                                    //     parent.css('left', (existingGrandParentLeft) + 'px');

                                    // }
                                    var declutterGrandParentConfig, declutterParentConfig;
                                    if (greatParent && greatParent.is('.circle')){
                                        grandParent.css('left', '0px');    
                                        // //grandParent.css('left', (0 - grandParent.width()) + 'px');
                                        
                                        // declutterGrandParentConfig = {left: -1, ease: Power4.easeOut};                                        
                                        // TweenLite.to(grandParent, .3, declutterGrandParentConfig);
                                        
                                        
                                    }
                                    else{
                                        //we are at the root   
                                        // declutterGrandParentConfig = {left: (0 - grandParentSize), ease: Power4.easeOut};                                        
                                        // TweenLite.to(grandParent, .3, declutterGrandParentConfig);
                                                                        
                                        grandParent.css('left', (0 - grandParentSize) + 'px');
                                    }

                                    if (existingGrandParentLeft > 0){
                                        var parentSize = parent[0].getBoundingClientRect().width;//.width();
                                        var recenterLeft = ((grandParentSize/2) - (parentSize/2));


                                        if (greatParent && greatParent.is('.circle')){
                                            declutterParentConfig = {top: recenterLeft, ease: Power4.easeOut};                                        
                                            TweenLite.to(parent, animationLength, declutterParentConfig);
                                            parent.css('left', ((existingGrandParentLeft) + recenterLeft ) + 'px');
                                            // parent.css('top', (recenterLeft ) + 'px');
                                        }
                                        else{
                                            declutterParentConfig = {top: recenterLeft, ease: Power4.easeOut};                                        
                                            TweenLite.to(parent, animationLength, declutterParentConfig);
                                            
                                            parent.css('left', ((existingGrandParentLeft) + grandParentSize + recenterLeft ) + 'px');
                                            // parent.css('top', (recenterLeft ) + 'px');

                                        }
                                    }
                                    // if (existingGrandParentLeft < 0){//off screen
                                    //     //just move parent off screen with g
                                    //     parent.css('left', '0px');
                                    // }
                                    // else{
                                    //     parent.css('left', (existingGrandParentLeft) + 'px');
                                    // }
                                }
                            }
                            //$element.parent().prop({visibility: 'hidden'});
                        }
                    }
                    //TweenLite.set($element, { opacity: 1 });
                },
                delay: Math.abs((null != delay ? delay : (.1 * (base[childPropName] ? $.inArray(value.satellite, ko.unwrap(base[childPropName])) : 0))) || 0)
                //delay: index * .1 || 0
            };




            if (popOut) {
                //$element.show();
                //element.style.display = "block";
                ////debug
                //var $centerDiv = $("<div></div>");
                //$centerDiv.css({ left: startingPos.x, top: startingPos.y, width: 4 + 'px', height: 4 + 'px', 'background-color': '#000', position: 'absolute' });
                //$element.parent().append($centerDiv);
                TweenLite.from(element, animationLength, tl);


                
                var $lineEl = $element.nextAll(".line");
                if ($lineEl.length > 0){
                    var lineEl = $lineEl[0];
                    
                    var 
                        childCircle = satellite,
                        parentDircle = childCircle.parent;

                    // var childDims = childCircle.dimensions(), childLoc = childCircle.location(), parentDims = parentDircle.dimensions();//, parentLoc = parentDircle.location();  
                    // var childCircleCenter = {top: childLoc.top + (childDims.height/2), left: childLoc.left + (childDims.width/2)}
                    
                    var childDims = childCircle.dimensions(), childLoc = {left: endPos.x, top: endPos.y}, parentDims = parentDircle.dimensions();//, parentLoc = parentDircle.location();  
                    var childCircleCenter = {top: childLoc.top + (childDims.height/2), left: childLoc.left + (childDims.width/2)}
                    var parentCircleCenter = {top: 0+ (parentDims.height/2), left: 0+ (parentDims.width/2)}

                    //var rotation = getRotationInDegrees({top: childLoc.top, left: childLoc.left}, {top: 0, left: 0});
                    var rotation = getRotationInDegrees(parentCircleCenter, childCircleCenter);

                    //hypotenuse with child top and left as the two sides
                    var width = Math.hypot(childCircleCenter.left - parentCircleCenter.left, childCircleCenter.top - parentCircleCenter.top);

                    //http://www.mathportal.org/calculators/plane-geometry-calculators/right-triangle-calculator.php

                    var a = sind(rotation) * (parentDims.height/2);
                    var c = cosd(rotation) * (parentDims.height/2);

                    //TweenLite.set(lineEl, {rotateZ: rotation});
                    lineEl.style.transform = 'rotateZ('+ rotation +'deg)';
                    TweenLite.killTweensOf(lineEl);
                    var lineTl = {};
                    //lineTl.rotationZ = rotation;
                    lineTl.left = (c + (parentDims.width/2));
                    lineTl.top = (a + (parentDims.height/2));
                    lineTl.width = (width-(parentDims.width/2));
                    lineTl.ease = tl.ease;

                    TweenLite.to(lineEl, .2, lineTl);
                    
                    
                    
                }




            }
            else {
                tl.zIndex = 0;

                
                var $lineEl = $element.nextAll(".line");
                if ($lineEl.length > 0){
                    var lineEl = $lineEl[0];
                    
                    TweenLite.killTweensOf(lineEl);
                    var lineTl = {width: 0, ease: tl.ease};
                    TweenLite.to(lineEl, .2, lineTl);
                }
                TweenLite.to(element, animationLength, tl);
            }

        }
        //, 'update': function (element, valueAccessor) {
        //    //var value = ko.unwrap(valueAccessor());
        //    //var $element = $(element);
        //    //if (value === true) {
        //    document.body.appendChild(element);
        //    //}
        //}
    };



    ko.bindingHandlers['drag'] =
    {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.bindingHandlers['eventJq']['init'](element, function () {
                return {
                    vm: valueAccessor(),
                    //dragxselect: { data: 'getSettings' },
                    dragxinit: { data: 'getSettings' },
                    dragxstart: { data: 'getSettings' },
                    dragx: { data: 'getSettings' },
                    dragxend: { data: 'getSettings' }
                }

            }, allBindingsAccessor, viewModel);

            //if (viewModel.onTop) {
            //    //viewModel.onTop.subscribe(function (val) {
            //    ko.bindingHandlers['onTop'].update(element, function () { return viewModel.onTop(); }, allBindingsAccessor, viewModel);
            //    //});
            //}
        }
    }


    ko.bindingHandlers['drop'] =
    {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.bindingHandlers['eventJq']['init'](element, function () {
                return {
                    vm: valueAccessor(),
                    dropxinit: { data: 'getSettings' },
                    dropxstart: { data: 'getSettings' },
                    dropxover: { data: 'getSettings' },
                    dropxout: { data: 'getSettings' },
                    dropx: { data: 'getSettings' },
                    //dropxselect: { data: 'getSettings' },
                    dropxend: { data: 'getSettings' }
                }

            }, allBindingsAccessor, viewModel);

            //if (viewModel.onTop) {
            //    //viewModel.onTop.subscribe(function (val) {
            //    ko.bindingHandlers['onTop'].update(element, function () { return viewModel.onTop(); }, allBindingsAccessor, viewModel);
            //    //});
            //}
        }
    }

    ko.bindingHandlers['dragdrop'] =
    {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            ko.bindingHandlers['eventJq']['init'](element, function () {
                return {vm: valueAccessor(),
                    //dragxselect: { data: 'getSettings' },
                    dragxinit: { data: 'getSettings' },
                    dragxstart: { data: 'getSettings' },
                    dragx: { data: 'getSettings' },
                    dragxend: { data: 'getSettings' },
                    dropxinit: { data: 'getSettings' },
                    dropxstart: { data: 'getSettings' },
                    dropxover: { data: 'getSettings' },
                    dropxout: { data: 'getSettings' },
                    dropx: { data: 'getSettings' },
                    //dropxselect: { data: 'getSettings' },
                    dropxend: { data: 'getSettings' }
                }

            }, allBindingsAccessor, viewModel);

            //if (viewModel.onTop) {
            //    //viewModel.onTop.subscribe(function (val) {
            //    ko.bindingHandlers['onTop'].update(element, function () { return viewModel.onTop(); }, allBindingsAccessor, viewModel);
            //    //});
            //}
        }
    }

    ko.bindingHandlers['supressDrapPropagation'] =
    {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            $(element).on("mousedown touchdown click", function(e){
                e.stopPropagation();
                if (e.originalEvent){
                    e.originalEvent.stopPropagation();
                    if (L) L.DomEvent.stopPropagation(e.originalEvent);
                }
            });

            if (L) L.DomEvent.disableClickPropagation(element);
        }
    }



    var zIndex = 2000;

    //overwriting the global handler
    ko.bindingHandlers['onTop'] = {
        'update': function (element, valueAccessor, all, viewModel) {
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

            if (viewModel && viewModel.klass)
                ko.bindingHandlers.eventAggregator.publish('onTop.' + viewModel.klass.displayName, viewModel);
            //}
        }
    };


    ko.bindingHandlers.mailAnimation = {
        
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor()), location, dimensions = value.dimensions();
;
            
            setTimeout(function(){
                var $element = $(element);

                var docEls, doc, contentClones = [], elClone, content, docHider, docDear, dear = "Dear ", textHeight =20;

                docEls = $element.siblings('.animated-mail');
                var bcolor = $element.parent().css('background-color');
                var color = $element.parent().css('color');
                //if (docEls.length == 0) {
                    doc = $('<div style="position:absolute; opacity: 0"></div>');
                    docHider = $('<div style="position:absolute;top:35%;left:10%;width:80%;height:55%;background:linear-gradient(to bottom, transparent, ' + bcolor + ', ' + bcolor + ', ' + bcolor + ', ' + bcolor + ', ' + bcolor + ', ' + bcolor + ');opacity: 1"></div>');
                    doc.append('<i class="icon-file-text-o icon-size-5x"></i>');
                    doc.append(docHider);
                    docDear = $('<div style="position:absolute; white-space: nowrap;top:5px; left: 5px; width: 20px; height: 2px;border-bottom:1px solid '+color+'; background-color:'+bcolor+'; opacity: 0;"></div>');
                    doc.append(docDear);
                    $element.parent().prepend(doc);

                var offsetTop = 20; //value.dimensions().height;
                // }
                // else{
                //     doc = docEls[0];
                // }

                //for static   
                // location = value.location();
                // doc.css({left: location.left + ((value.dimensions().width/2) - (doc.width()/2)), top:location.top - (offsetTop + 10)});

                //TweenLite.set(docDear, {top: -25, height: textHeight});

                content = $element.find('span');
                var contentPos = content.position();
                var contentText = content.text(), split = contentText.split(" ");

                for (var i = 0; i < split.length; i++){
                    contentClones.push($('<div style="position:absolute;">'+split[i]+'</div>'));
                    $element.parent().prepend(contentClones[i]);

                    
                    //for static                    
                    //contentClones[i].css({position: 'absolute', top:location.top-(offsetTop+5) , left: contentPos.left + location.left + 5});
                    //contentClones[i].css({position: 'absolute', top:location.top-(offsetTop+5) -25, left: location.left + ((value.dimensions().width/2) - (doc.width()/2)) + docDear.width() });

                }

                //TweenMax.to(docHider, 1, {height:0, top:'90%', repeat:-1});

                elClone = $element.clone();
                
                $element.parent().prepend(elClone);


var writeIntro = [];
for (var j=0; j < dear.length; j++){
    var dearTween = new TweenMax.to(docDear, .2, {onComplete: function(idx){ 
        docDear.text(dear.substring(0, idx)); 
    }, onCompleteParams: [j]});
    writeIntro.push(dearTween);
}

                    //var tween = new TimelineMax({paused:true, repeat:0, repeatDelay:0.5}); //



//tween.play();

//TweenLite.

                
                var createAndStart = function (){
                    location = value.location();

                    var parentLocation = value.parent.location(), parentDims = value.parent.dimensions(), parentCenter = {x: (parentDims.width/2), y: (parentDims.height/2)};
                    
                    docHider.css({height:'55%', top:'35%', scale:1});
                    docDear.css({top:5, left: 5, scale:1, width: 20, height: 2}); 
                    
                    elClone.css({left: location.left, top: location.top, scale:1});
                    
                    doc.css({left: location.left + ((value.dimensions().width/2) - (doc.width()/2)), top: location.top});                    



                    var docWrites = [];
                    
                    var docWriteDowns = [];

                    for (var i = 0; i < split.length; i++){
                        contentClones[i].css({position: 'absolute', top: contentPos.top + location.top, left: contentPos.left + location.left, scale:1});
                        //docWrites.push(new TweenMax.to(contentClones[i], .7, {top:location.top - (offsetTop + contentPos.top + doc.height() - (5)), scale: 1, opacity: 1}));

                        docWrites.push(new TweenMax.to(contentClones[i], .7, {top:location.top-(offsetTop+5) -30 , left: location.left + ((value.dimensions().width/2) - (doc.width()/2)) + docDear.width() + docDear.width(), scale: 1, opacity: 1, onComplete: function(){
                            docDear.text(docDear.text() + ' ' + this.text()); this.css({opacity: 0});
                        }, onCompleteScope: contentClones[i]}));

                        //.push();

                        docWriteDowns.push(new TweenMax.to(contentClones[i], .3, {top:location.top, scale: .3, delay:.4}));
                    }

                    var docWritesShrink = new TweenMax.to(docDear, .3, {top:5, left: -15, scale: .2}, 'shrink');


                    var tween = new TimelineMax({paused:true, repeat:-1, repeatDelay:0.5}); //
                    
                    var docUp = new TweenMax.to(doc, .3, {top:location.top - (offsetTop + 10), opacity: 1});
                    
                    //doc, .1, {className: 'icon-file-text-o icon-size-5x'}, "write");
                    
                    var docWritStuff = new TweenMax.to(docHider, 1, {height:0, top:'90%', delay:.3}, 'write stuff');

                    var docdown = new TweenMax.to(doc, .3, {top:location.top, scale: .3, delay:.4}, "docdown");


                    var sendMail = new TweenMax.to(elClone, .3, {top:parentCenter.y - (dimensions.height/2), left:parentCenter.x - (dimensions.width/2), scale: .8, opacity: 1, delay: .4});

                    var hideMail = new TweenMax.to(elClone, .3, {opacity:0});

                    
                    var hideDoc = new TweenMax.to(doc, .1, {opacity:0, onComplete: function(){
                        docDear.text('');}
                    });

                    var cursorBox = new TweenMax.to(docDear, .3, {top: -25, height: 'initial', width: 'initial', opacity: 1});

                    tween
                        .add(docUp)
                        .add(cursorBox);

                    for (var j=0; j < dear.length; j++){    
                        tween.add(writeIntro[j]);
                    }

                    for (var i = 0; i < split.length; i++){
                        tween.add(docWrites[i]);
                        
                    }
                    tween   
                        .add(docWritesShrink)
                        .add(docWritStuff)

                    for (var i = 0; i < split.length; i++){
                        
                        tween.add(docWriteDowns[i], "write stuff");
                        tween.add(new TweenMax.to(contentClones[i], .1, {opacity:0}), "write stuff");
                    }

                    tween   
                        .add(docdown, "write stuff")
                        .add(hideDoc)
                        //.add(hideWrite)
                        .add(sendMail)
                        .add(hideMail)
                        ;

                    tween.play();
                }

                
                $element.on('mousedown', function(){
                    TweenLite.killTweensOf(doc);
                    
                    for (var i = 0; i < contentClones.length; i++){
                        TweenLite.killTweensOf(contentClones[i]);
                        TweenLite.set(contentClones[i], {display: 'none'});
                    }


                    docDear.text('');
                    TweenLite.killTweensOf(docDear);
                    TweenLite.killTweensOf(docHider);
                    // TweenLite.killTweensOf(docDear);
                    // TweenLite.killTweensOf(docDear);
                    TweenLite.killTweensOf(elClone);

                    TweenLite.set(doc, {display: 'none'});
                    TweenLite.set(elClone, {display: 'none'});
                }).on('mouseup', function(){
                    
                    TweenLite.set(docDear, {display: 'block', opacity: 0, scale:1});
                    TweenLite.set(docHider, {display: 'block', opacity: 1, scale:1});
                    TweenLite.set(doc, {display: 'block', opacity: 0, scale:1/*, className:"icon-file-empty icon-size-5x"*/});
                    for (var i = 0; i < contentClones.length; i++){
                        TweenLite.set(contentClones[i], {display: 'block', opacity: 0, scale:1});
                    }
                    TweenLite.set(elClone, {display: 'block', opacity: 1, scale:1});
                    createAndStart();
                });

                createAndStart();
            }, 1);
        }
    }

})(ko);



//credit to https://github.com/giabos/ko-leaflet
//modified by: Toby Farris
/* global ko, L, console */

(function (ko, L) {
    //"use strict";

    /**
    *       cfr https://github.com/pointhi/leaflet-color-markers
    *   Possible colors: blue, red, green, orange, yellow, violet, grey, black
    */
    function coloredMarkerIcon(color) {
        return new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color + '.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }



    var each = ko.utils.arrayForEach;

    // 'm' contains following observables: center (array containing [lat, lng]), draggable, title, text, opened (popup), color (see above)
    var Marker = function (m, map, mapEl, bindingContext, markerTemplate) {
        var self = this;

        self.eventHandlers = []; // array of objects: target, eventName, handler

        self.centerM = ko.computed({
            read: function () {
                return [ko.unwrap(m.center[0]), ko.unwrap(m.center[1])];
            },
            write: function (center) {
                m.center[0](center.lat);
                m.center[1](center.lng);
            }
        });

        var title = ko.isObservable(m.title) ? m.title : ko.observable(m.title);
        var text = ko.isObservable(m.text) ? m.text : ko.observable(m.text);
        var color = ko.isObservable(m.color) ? m.color  : ko.observable(m.color);

        //just use the first one
        //TODO: make sure this gets cleaned up properly
        if (markerTemplate) {
            markerTemplate = markerTemplate[0].cloneNode(true);
            markerTemplate.style.display = "block";
        }

        var markerOptions = {
            title: ko.unwrap(title || '----'),
            draggable: ko.unwrap(m.draggable || false),
            opacity: ko.unwrap(m.opacity || 1.0)
        };

        if (ko.unwrap(color)) {
            markerOptions.setIcon(coloredMarkerIcon(ko.unwrap(color)));
        }

        // Create marker in leaflet.
        self.marker = L.marker(ko.unwrap(self.centerM), markerOptions);
        self.marker.addTo(map);
        if (markerTemplate) {
            self.marker.bindPopup(markerTemplate);
            ko.applyBindings(bindingContext.extend(m), markerTemplate);
        }
        else {
            self.marker.bindPopup(ko.unwrap(text));
        }
        var popup = self.marker.getPopup()

        if (ko.unwrap(m.draggable || false)) {
            self.marker.on('dragend', function (evt) {
                self.eventHandlers.push({ target: evt.target, eventName: evt.type, handler: arguments.callee });
                self.centerM(self.marker.getLatLng());
            });
        }

        self.subscriptions = [
            self.centerM.subscribe(function () {
                self.marker.setLatLng(ko.unwrap(self.centerM));
            }),
            title.subscribe(function () {
                self.marker.title = ko.unwrap(title);
            }),
            text.subscribe(function () {
                popup.setContent(ko.unwrap(text));
            }),
            color.subscribe(function () {
                self.marker.icon = coloredMarkerIcon(ko.unwrap(m.color));
            })
        ];


        self.subscriptions.push(self.centerM);

        if (m.opened && ko.isObservable(m.opened)) {
            self.subscriptions.push(m.opened.subscribe(function (o) {
                if (o) {
                    self.marker.openPopup();
                } else {
                    self.marker.closePopup();
                }
            }));
            self.marker.on('popupopen', function (evt) { m.opened(true); });
            self.marker.on('popupclose', function (evt) { m.opened(false); });
        }

        if (m.opacity && ko.isObservable(m.opacity)) {
            self.subscriptions.push(m.opacity.subscribe(function (o) {
                self.marker.setOpacity(o);
            }));
        }

        //marker.setIcon(L.divIcon({className: 'icon'}));


        this.map = map;
    };

    Marker.prototype.dispose = function () {
        // remove all events & subscriptions.
        each(this.eventHandlers, function (eh) { eh.target.removeEventListener(eh.eventName, eh.handler); });
        each(this.subscriptions, function (subscription) { subscription.dispose(); });
        this.map.removeLayer(this.marker);
    };

    ko.bindingHandlers.leafletMap = {
        
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor(),
            center = allBindings.get('center') || [39.8333333, -98.585522],
            zoom = allBindings.get('zoom') || 10
;

            var map, showMeSub, childrenSub;
            
            var createMap = function(){
                map = L.map(element);
                
                //add map to dom element for reference elsewhere
                element.__becu_map__ = map;

                if (center){
                    map.setView(ko.unwrap(center), ko.unwrap(zoom));
                }

                if ('undefined' != typeof mapboxAccessToken){
                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
                        id: 'mapbox.dark',
                        attribution: 'osm.org'
                    }).addTo(map);
                }
                else{                    
                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: 'osm.org'
                    }).addTo(map);
                }

                
            }

            if (value.showMe){
                showMeSub = value.showMe.subscribe(function(val){
                    if (val){
                        $(element).show();
                        if (map){
                        }
                        else{
                            createMap();
                        }
                    }
                    else{                        
                        $(element).hide();
                    }
                });
                if (value.showMe()){
                    createMap();
                }
            }
            else{
                createMap();
            }

            var shiftMap = function(){
                setTimeout(function(){
                    if (map){
                        var len = value.childViewModels().length, latlng = [];
                        if (len > 0){
                            for (var i = 0; i < len; i++) {                        
                                var item = value.childViewModels()[i];

                                latlng.push([ko.unwrap(item.model().latitude), ko.unwrap(item.model().longitude)]);
                            }
                            
                            map.fitBounds(latlng, {paddingTopLeft: [item.dimensions().height, item.dimensions().width]});
                        }
                    }
                }, 1);
            }
            if (value.childViewModels){
                showMeSub = value.childViewModels.subscribe(function(val){
                    shiftMap();
                });
                shiftMap();
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                //kill subscriptions
                if (showMeSub) showMeSub.dispose();
                if (childrenSub) childrenSub.dispose();
                if (element.__becu_map__) element.__becu_map__.remove();
            });
        }
    };


    ko.bindingHandlers.leafletPosition = {
        
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor()
;

            var $element = $(element);

            var mapEls = $element.siblings('.map');

            if (mapEls.length == 0) 
                mapEls = $element.parents('.map');

            if (mapEls.length == 0) throw Error("map '.map' element not found in ancestor tree or siblings");

            var mapEl = mapEls[0];

            var map = mapEl.__becu_map__;

            var reposition = function(){
                var latLng = new L.latLng(ko.unwrap(value.model().latitude), ko.unwrap(value.model().longitude));
                //var point = map.project(latLng).divideBy(256).floor();
                var point = map.latLngToContainerPoint(latLng);
                
                var origin = map.getPixelOrigin();

                var offsetX = value.dimensions().width / 2, offsetY = value.dimensions().width + (3 * map.getZoom()); 
                // console.log("origin: " + origin.x + ", y:" + origin.y );
                // console.log("project: " + map.project(latLng).x + ", y:" + map.project(latLng).y );
                // console.log("latLngToLayerPoint: " + map.latLngToLayerPoint(latLng).x + ", y:" + map.latLngToLayerPoint(latLng).y );
                // console.log("latLngToContainerPoint: " + map.latLngToContainerPoint(latLng).x + ", y:" + map.latLngToContainerPoint(latLng).y );
                //console.log("containerPoint: " + map.project(latLng).x + ", y:" + map.project(latLng).y );
                
                value.location({left: point.x - offsetX, top: point.y - offsetY});

                var radius = value.dimensions().width/2;

                //collision detection and adjustment
                for (var i =0; i < 15; i++){
                    var V = SAT.Vector;
                    var C = SAT.Circle;

                    var parent = value.parent;
                    if (parent){
                        var siblings = parent.childViewModels()
                        if (siblings){
                            var siblingsLen = siblings.length, collidedAny = false;
                    
                            for (var j =0; j < siblingsLen; j++){

                                
                                var location = value.location();

                                var sibling = siblings[j]
                                if (sibling == value) continue;
                                
                                var siblingLocation = sibling.location(), siblingRadius = sibling.dimensions().width/2;

                                

                                var circle1 = new C(new V(location.left, location.top), radius);

                                var circle2 = new C(new V(siblingLocation.left, siblingLocation.top), siblingRadius);
                                
                                var response = new SAT.Response();
                                collided = SAT.testCircleCircle(circle1, circle2, response);

                                // collided => true
                                // response.overlap => 10
                                // response.overlapV => (10, 0)

                                //move up, down, left, right
                                var moveX = ((location.left < siblingLocation.left)? -1: ((location.left == siblingLocation.left)? 0 - (j%2): 1)), moveY = ((location.top < siblingLocation.top)? -1: ((location.top == siblingLocation.top)? 0 - (j%2): 1));

                                if (collided){
                                    collidedAny = true;
                                    //var vDiff = response.overlapV.sub(new V(location.left, location.top));
                                    value.location({top: location.top + (moveY * (response.overlap/2)), left: location.left + (moveX * (response.overlap/2))});
                                    //sibling.location({top: siblingLocation.top + (moveY * (response.overlap/2)), left: location.left + (moveX * (response.overlap/2))});
                                }
                            }

                            if (!collidedAny) break;
                        }
                    }
                }
            }            

            reposition();

            map.on('resize move zoom', function(){
                reposition();
            });
        }
    };

    ko.bindingHandlers.leafletMapOld = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var center = valueAccessor(),
                zoom = allBindings.get('zoom') || 10,
                markers = allBindings.get('markers'),
                invalidateSize = allBindings.get('invalidateSize'),
                eventHandlers = []; // array of objects: target, eventName, handler

                

            var mapCenter = ko.computed({
                read: function () {
                    return [ko.unwrap(center[0]), ko.unwrap(center[1])];
                },
                write: function (newCenter) {                    
                    center[0](newCenter.lat);
                    center[1](newCenter.lng);
                    map.invalidateSize();
                }
            }, null, { disposeWhenNodeIsRemoved: element });


            var markerTemplate = element.getElementsByTagName("markerTemplate");
            


            var map = L.map(element).setView(ko.unwrap(mapCenter), ko.unwrap(zoom));
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'osm.org'
            }).addTo(map);

            var subscriptions = [
                mapCenter.subscribe(function () {
                    map.setView(ko.unwrap(mapCenter));
                })
            ];
            map.on('dragend', function (evt) {
                eventHandlers.push({ target: evt.target, eventName: evt.type, handler: arguments.callee });
                mapCenter(map.getCenter());
            });

            // triggers an 'invalidateSize' when detecting a change in an observable (cfr http://stackoverflow.com/questions/20400713/leaflet-map-not-showing-properly-in-bootstrap-3-0-modal)
            if (invalidateSize && ko.isObservable(invalidateSize)) {
                subscriptions.push(invalidateSize.subscribe(function () {
                    map.invalidateSize();
                }));
            }

            if (ko.isObservable(zoom)) {
                var subsc = zoom.subscribe(function () {
                    map.setZoom(ko.unwrap(zoom));
                });
                subscriptions.push(subsc);
                map.on('zoomend', function (evt) {
                    eventHandlers.push({ target: evt.target, eventName: evt.type, handler: arguments.callee });
                    zoom(map.getZoom());
                });
            }

            var markersList = [];
            each(ko.unwrap(markers), function (m, idx) { markersList.push(new Marker(m, map)); });

            // http://stackoverflow.com/questions/14149551/subscribe-to-observable-array-for-new-or-removed-entry-only
            var subscr = markers.subscribe(function (changes) {
                each(changes, function (c) {
                    if (c.status === "added") {
                        markersList[c.index] = new Marker(c.value, map, element, bindingContext, markerTemplate);
                    }
                    if (c.status === "deleted") {
                        // sometimes we receive a delete status although the markersList is empty.
                        if (c.index < markersList.length) {
                            markersList[c.index].dispose();
                        }
                    }
                });
                // delete after that all have been disposed otherwise cannot be accessed anymore via 'index'.
                each(changes.reverse(), function (c) {
                    if (c.status === "deleted") {
                        markersList.splice(c.index, 1);
                    }
                });

            }, this, "arrayChange");
            subscriptions.push(subscr);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                // dispose all subscriptions & events.
                each(eventHandlers, function (eh) { eh.target.removeEventListener(eh.eventName, eh.handler); });
                each(markersList, function (m) { m.dispose(); });
                each(subscriptions, function (subscription) { subscription.dispose(); });
            });

            return { controlsDescendantBindings: true };
        }
    };

})(ko, L);