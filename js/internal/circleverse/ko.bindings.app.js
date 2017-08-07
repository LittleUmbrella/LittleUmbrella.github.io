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
        },
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
                return;
            }

            //do work?
            var popped = satellite.showMe();//$element.css('display') != 'none';
            if (popped == popOut)
                return;

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
            }
            else {
                tl.zIndex = 0;
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



    var zIndex = 2000;

    //overwriting the global handler
    ko.bindingHandlers['onTop'] = {
        'update': function (element, valueAccessor, all, viewModel) {
            //get the value just to create a dependency
            var value = ko.unwrap(valueAccessor());
            var $element = $(element);
            //if (value === true) {
            //$('body').append(element);
            $element.css('z-index', zIndex++);

            if (viewModel && viewModel.klass)
                ko.bindingHandlers.eventAggregator.publish('onTop.' + viewModel.klass.displayName, viewModel);
            //}
        }
    };




})(ko)
