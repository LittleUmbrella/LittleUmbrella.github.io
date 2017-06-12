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
                        //    satellite[visibilityPropName](true);


                        //    //tl.set($element, { top: endPos.y, left: endPos.x });
                        //    //$element.hide();
                        TweenLite.set($element, { opacity: 1, top: endPos.y, left: endPos.x });

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
