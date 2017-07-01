eaf.util.namespace('becu_org');
becu_org.app = (function () {
    return new JS.Class('becu_org.app', {
        initialize: function (opts) {
            var self = this;

            self.opts = opts;
            self.settings = { 'showInstructions': false };
            self.eventAggregator = PubSub;
            ko.bindingHandlers.eventAggregator = PubSub;
            //origPublish = PubSub.publish;
            //PubSub.publish = function (msg, data) {
            //    origPublish.call(PubSub, msg, data, uuid.v4());
            //}

            self.scale = ko.observable(1);
            self.size = ko.observable();
            

            var initSize = 550;
 self.size = ko.observable(initSize);
            self.__size = 550;

            //this.position = initialPosition || { top: 0, left: 0 };
            self.size(self.__size);

            var vm;
            self.borderWidth = 6;

            self.location = ko.computed(function () {
                //hide for now var loc = self.callSuper();

                return { left: '35%', top: '25%' };
            });
            
            self.dimensions = ko.observable();
            //this.location({ left: coords.left, top: coords.top });
            self.dimensions({ height: this.scale() * initSize, width: self.scale() * initSize });
            //log('scale: ' + this.scale());




            self.icon = {};
            self.icon.location = { center: true, offset: { y: -35 } }; //ko.observable(false);//

            self.icon.url = ko.observable('url("/media/img/logo_red_transparent.png")');

        }
        ,

        preSetup: function () {

            var self = this, deferred = when.defer();

            //            var servicesTitle = $('#servicesTitle');
            //            var instructions = $(".instruction[id!='servicesTitle']");
            var instructions = $(".instruction").not('.sequence');

            var sequences = $(".instruction.sequence.container");

            if (this.settings.showInstructions) {
                var fadeInTime = 1100;
                var fadeOutTime = 1200;




                eaf.util.asyncEach(instructions, function (item, resume, index) {
                    // handle item
                    var instructionPromise = self.showInstruction($(item), fadeInTime - (index || 1 * 200), fadeOutTime - (index || 1 * 200));
                    instructionPromise.then(function () { resume(); });

                }, function () {
                    eaf.util.asyncEach(sequences, function (item, resume, index) {
                        // handle item
                        var sequence = $(item);
                        var sequenceItems = sequence.find(".instruction.sequence");
                        eaf.util.asyncEach(sequenceItems, function (item, resume, index) {
                            // handle item
                            var instructionPromise = self.showInstructionSequence($(item), fadeInTime - (index || 1 * 200), fadeOutTime - (index || 1 * 200));

                            instructionPromise.then(function () { resume(); });
                        }, function () {
                            sequence.fadeOut(fadeOutTime, function () { resume(); });
                        });



                    }, function () {
                        deferred.resolve([]);
                    });
                });







                //                servicesTitle.fadeIn(fadeInTime, function () {
                //                    servicesTitle.fadeOut(fadeOutTime, function () {
                //                        instructions.each(function (index) {
                //                            var $this = $(this);
                //                            $this.fadeIn(fadeInTime - (index * 200), function () {
                //                                $this.fadeOut(fadeOutTime - (index * 200), function () {
                //                                    if (index == (instructions.length - 1)) {
                //                                        deferred.resolve([])
                //                                    }
                //                                });
                //                            });
                //                        });
                //                    });
                //                });


            }
            else {
                setTimeout(function () { deferred.resolve([]); }, 1);
            }

            return deferred;
        }

        ,
        showInstruction: function ($this, fadeInTime, fadeOutTime) {
            var deferred = when.defer();

            $this.fadeIn(fadeInTime, function () {
                $this.fadeOut(fadeOutTime, function () {
                    deferred.resolve([]);
                });
            });

            return deferred;
        }

        ,
        showInstructionSequence: function ($this, fadeInTime, fadeOutTime) {
            var deferred = when.defer();

            $this.fadeIn(fadeInTime, function () {
                deferred.resolve([]);
            });

            return deferred;
        }

                ,

        start: function () {
            var self = this;

            var cv = $('#circleverse');
            var garbage = $('#garbage');
            var settings = $('#settings');
            var help = $('#help');
            var login = $('#login');
            var favorite = $('#favorite');
            var search = $('#search');



            syncDivToDoc(cv);



            //servicesTitle.css('display', 'block');




            //            var $hovers = $('.handle');

            //            //$hovers.css({ opacity: .5 });
            //            //return;
            //            $hovers.css({ opacity: 0 }).hover(function () {
            //                $(this).stop().animate({ opacity: .85 }, 200);
            //            }, function () {
            //                $(this).stop().animate({ opacity: 0 }, 800);
            //            }
            //                );
            //jQuery.event.special.drag.callback.prototype.drags = new Array();
            // useful stuff
            //$(dd.drag).data('dragdata').dragging
            //$(dd.drag).data('dragdata').drop = false;
            //$(this).appendTo(this.parentNode);

            //return;

            JS.require('jQuery.event.special.drag', function () {

                var lassoSettings = { distance: 3 };
                //$(document)
                //                    cv
                //                .click(function () {
                //                    $('.selected').each(function () {
                //                        //compile set for multi drag
                //                        $(this).removeClass("selected");
                //                    });
                //                }, lassoSettings)
                //                .drag("start", function (ev, dd) {
                //                    return $('<div id="draggableselector" class="draggableSelector" />')
                //                    .css('opacity', .1)
                //                    .appendTo(document.body);
                //                }, lassoSettings)
                //                .drag(function (ev, dd) {
                //                    $(dd.proxy).css({
                //                        top: Math.min(ev.pageY, dd.startY),
                //                        left: Math.min(ev.pageX, dd.startX),
                //                        height: Math.abs(ev.pageY - dd.startY),
                //                        width: Math.abs(ev.pageX - dd.startX)
                //                    });
                //                }, lassoSettings)
                //                .drag("end", function (ev, dd) {
                //                    $(dd.proxy).remove();

                //                }, lassoSettings)
                //                .drop("dropstartx", function (ev, dd) {
                //                    //$(dd.proxy).remove();

                //                });

            });
            //return;

            JS.require('jQuery.event.special.drop', function () {

                $.drop({ mode: "overlap", multi: true, tolerance:
                        function (event, proxy, target) {
                            return isOverlapping(proxy, target)
                        }
                    //            function (event, proxy, target) {
                    //                var r = target.width / 2, x = target.left + r, y = target.top + r,
                    //         h = Math.min(Math.abs(x - proxy.left), Math.abs(x - proxy.right)),
                    //         v = Math.min(Math.abs(y - proxy.top), Math.abs(y - proxy.bottom));
                    //                if (proxy.top < y && proxy.bottom > y)
                    //                    return h <= r ? 1 : 0;
                    //                else if (proxy.left < x && proxy.right > x)
                    //                    return v <= r ? 1 : 0;
                    //                else
                    //                    return Math.sqrt(h * h + v * v) <= r ? 1 : 0;
                    //            }
                });
            });
            // $.drop({ mode: "overlap", multi: true,
            // tolerance: function (event, proxy, target) {
            // read or calculate the node depth...
            // target.depth = $.data(target.elem, "nodedepth") || $.data(target.elem, "nodedepth", $(target.elem).parents().length);
            // calculate the area of overlap...
            // target.overlap = Math.max(0, Math.min(target.B, proxy.B)
            // - Math.max(target.T, proxy.T))
            // * Math.max(0, Math.min(target.R, proxy.R)
            // - Math.max(target.L, proxy.L));
            // default best match
            // var best = this.best || { depth: 0, overlap: 0 };
            // determine winner... compare depth and overlap
            // if (target.depth > best.depth && target.overlap ||
            // target.overlap > best.overlap)
            // this.best = target; // set the best match so far
            // return null;
            // }
            // }).removeData("nodedepth"); // cleanup



            //thanks: http://stackoverflow.com/questions/2355208/how-can-i-stop-elements-overlapping-using-javascript-and-the-raphael-javascript-l
            function isOverlapping(circleLocation1, circleLocation2) {
                //            var attrs = ["cx", "cy", "r"];
                //            var c1 = circ1.attr(attrs);
                //            var c2 = circ2.attr(attrs);
                //            var dist = Math.sqrt(Math.pow(c1.cx - c2.cx, 2) + Math.pow(c1.cy - c2.cy, 2));
                //            return (dist < (c1.r + c2.r));
                //var circ1 = $.data(circle1, 'circle'), circ2 = $.data(circle2, 'circle');
                var $circle1 = circleLocation1;
                var $circle2 = circleLocation2;

                var circ1 = {
                    x: $circle1.left + ($circle1.width / 2),
                    y: $circle1.top + ($circle1.height / 2),
                    r: $circle1.width / 2
                };

                var circ2 = {
                    x: $circle2.left + ($circle2.width / 2),
                    y: $circle2.top + ($circle2.height / 2),
                    r: $circle2.width / 2
                };

                //if ('undefined' !== typeof (circ1) && 'undefined' !== typeof (circ2)) {
                var dist = Math.sqrt(Math.pow(circ1.x - circ2.x, 2) + Math.pow(circ1.y - circ2.y, 2));
                return (dist < (circ1.r + circ2.r));
                //}

            }

            //var realKoMappingFromJs = ko.fromJS;

            //ko.mapping.fromJS = function (jsObject, inputOptions, target) {
            //    if (jsObject == null) return jsObject;

            //    if (typeof jsObject != 'array')
            //        return realKoMappingFromJs.apply(ko.mapping, arguments);

            //    var n, map = {};
            //    for (n in jsObject) {
            //        map[n] =
            //        {
            //            create: function (options) {
            //                return ko.observable(ko.mapping.fromJS(options.data));
            //            }
            //        };


            //    }

            //    return realKoMappingFromJs.call(ko.mapping, jsObject, map, target);
            //}

            //todo: handle store not enabled

            var globalSettings = { eventAggregator: self.eventAggregator };
            globalSettings.mappings = {};

            globalSettings.mappings['becu_org_domain_model_Customer'] = {
                'firstName': {
                    create: function (options) {
                        options.parent.fullName = ko.computed(function () {
                            options.parent.firstName() + ' ' + options.parent.lastName();
                        });
                        return ko.mapping.fromJS(options.data);
                    }
                },

                'customer.firstName': {
                    create: function (options) {
                        options.parent.fullName = ko.computed(function () {
                            options.parent.firstName() + ' ' + options.parent.lastName();
                        });
                        return ko.mapping.fromJS(options.data);
                    }
                }
            };

            globalSettings.repository = new littleUmbrella.circleverse.Repository('blah', globalSettings);

            globalSettings.mappings['becu_org_domain_model_Account'] = {
                'transactions': {
                    create: function (options) {

                        return ko.mapping.fromJS(options.data);
                    }
                },

                'relationships': {
                    create: function (options) {
                        return ko.mapping.fromJS(options.data);
                    }
                },

                'paymentSchedules': {
                    create: function (options) {
                        return ko.mapping.fromJS(options.data);
                    }
                },

                'alerts': {
                    create: function (options) {
                        return ko.mapping.fromJS(options.data);
                    }
                }
            };

            globalSettings.globalDimensions = self.opts;

            var filterViewModel = new circleverse.viewModel.FilterViewModel(null, self, globalSettings);
            var settingsViewModel = new circleverse.viewModel.settingsViewModel(store, self, globalSettings);
           
                //new circleverse.viewModel.FilterFormViewModel(null, self, globalSettings), 
                //new circleverse.viewModel.MoneyTransferViewModel(null, self, globalSettings),
            self.tools = [
                // new circleverse.viewModel.ExitViewModel(null, self, globalSettings),
                // new circleverse.viewModel.loginViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.helpViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.favoriteViewModel(null, self, globalSettings),                
                settingsViewModel,                
                // new circleverse.viewModel.loginViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.garbageViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.RefreshViewModel(null, self, globalSettings),                
                // filterViewModel,                    
                // new circleverse.viewModel.NewViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.EditViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.SaveViewModel(null, self, globalSettings),                
                // new circleverse.viewModel.SearchViewModel(null, self, globalSettings)
                
            ];

            self.moneyTransferViewModel = ko.observable(new circleverse.viewModel.MoneyTransferViewModel(null, self, globalSettings));
            // self.exitViewModel = ko.observable(new circleverse.viewModel.ExitViewModel(null, self, globalSettings));
            // self.loginViewModel = ko.observable(new circleverse.viewModel.loginViewModel(null, self, globalSettings));
            // self.helpViewModel = ko.observable(new circleverse.viewModel.helpViewModel(null, self, globalSettings));
            // self.favoriteViewModel = ko.observable(new circleverse.viewModel.favoriteViewModel(null, self, globalSettings));
            self.settingsViewModel = ko.observable(settingsViewModel);
            // self.garbageViewModel = ko.observable(new circleverse.viewModel.garbageViewModel(null, self, globalSettings));
            // self.refreshViewModel = ko.observable(new circleverse.viewModel.RefreshViewModel(null, self, globalSettings));
            self.filterViewModel = ko.observable(filterViewModel);
            self.filterFormViewModel = ko.observable(new circleverse.viewModel.FilterFormViewModel(null, self, globalSettings));
            // self.newViewModel = ko.observable(new circleverse.viewModel.NewViewModel(null, self, globalSettings));
            // self.editViewModel = ko.observable(new circleverse.viewModel.EditViewModel(null, self, globalSettings));
            // self.saveViewModel = ko.observable(new circleverse.viewModel.SaveViewModel(null, self, globalSettings));
            // self.searchViewModel = ko.observable(new circleverse.viewModel.SearchViewModel(null, self, globalSettings));

            //ko.applyBindings(, document.getElementById('exit'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('login'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('help'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('favorite'));
            //ko.applyBindings(, document.getElementById('settings'));
            //ko.applyBindings(settingsViewModel, document.getElementById('settingsForm'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('garbage'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('refresh'));
            //ko.applyBindings(, document.getElementById('filter'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('filterForm'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('new'));
            //ko.applyBindings(new circleverse.viewModel.(null, self, globalSettings), document.getElementById('search'));

            JS.require('littleUmbrella.circleverse.viewModel.BecuViewModel'
            , function () {

                //var $drop = $.event.special.drop, origLocate = $drop.locate;

                //$drop.locate = function (elem, index) {
                //    var data = $.data(elem, $drop.datakey),
		        //        $elem = $(elem);
                //    if (!$elem.is(':visible')) {
                //        var
                //            location = {
                //                elem: elem,
                //                width: 0,
                //                height: 0,
                //                top: -5000,
                //                left: -5000,
                //                right: -5000,
                //                bottom: -5000
                //            };
                //        // drag elements might not have dropdata
                //        if (data) {
                //            data.location = location;
                //            data.index = index;
                //            data.elem = elem;
                //        }
                //        return location;
                //    }
                //    else {
                //        return origLocate.call($drop, elem, index);
                //    }
                //}

                TweenPlugin.activate([CSSPlugin, BezierPlugin]);
                //var services = new becu_org.communication.services();
                //services.getServices();

                //                $('#services').available(function () {
                //                    ko.applyBindings(services, $('#services')[0]);
                //                });

                var allAccountTransactionsViewModel = new littleUmbrella.circleverse.viewModel.AllAccountTransactionsViewModel(globalSettings),
                    allMemberCards  = new littleUmbrella.circleverse.viewModel.AllMemberCards(globalSettings),
                    allMemberInfoFormsViewModel = new littleUmbrella.circleverse.viewModel.AllMemberInfoFormsViewModel(globalSettings),
                    getCustomerViewModel = new littleUmbrella.circleverse.viewModel.GetCustomerViewModel(globalSettings),//becu = new littleUmbrella.circleverse.viewModel.BecuViewModel(services)
                    earth = new circleverse.viewModel.earthViewModel(null, self, globalSettings);

                self.earth = ko.observable(earth);
                self.getCustomerViewModel = ko.observable(getCustomerViewModel);
                self.allAccountTransactionsViewModel = ko.observable(allAccountTransactionsViewModel);
                self.allMemberInfoFormsViewModel = ko.observable(allMemberInfoFormsViewModel);
                self.allMemberCards = ko.observable(allMemberCards);

self.childViewModels = ko.observableArray();
                
                self.childViewModels.push(earth);

                //ko.applyBindings(earth, document.getElementById('earth'));
                //ko.applyBindings(getCustomerViewModel, document.getElementById('foundCustomers'));
                //ko.applyBindings(allAccountTransactionsViewModel, document.getElementById('accountTransactions'));
                //ko.applyBindings(self, document.getElementById('intro'));
                //$('#becu').available(function () {
                    //ko.applyBindings(becu, document.getElementById('becu'));
                //});


                // self.eventAggregator.subscribe('littleUmbrella.circleverse.viewModel.BecuViewModel.Expanded', function () {
                //     //setTimeout(function () {
                //         self.eventAggregator.publish('customer.login.attempt', { userName: 'blah', password: 'blah' });
                //     //}, 1);
                // });

                ko.applyBindings(self);

                var loaded = false;
                self.eventAggregator.subscribe('littleUmbrella.circleverse.viewModel.BecuViewModel.Expanded', function (topic, args) {
                    if (!loaded) {
                        loaded = true;
                            //$('.exit').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.garbageViewModel(), 'garbage', this);
                            //    ko.applyBindings(new circleverse.viewModel.ExitViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    //$(this).fadeIn(2000, 'linear');
                            //});


                        setTimeout(function () {
                            //JS.require('littleUmbrella.circleverse', function () {
                            //$('.search').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.garbageViewModel(), 'garbage', this);
                            //    ko.applyBindings(new circleverse.viewModel.SearchViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});

                            //$('.new').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.garbageViewModel(), 'garbage', this);
                            //    ko.applyBindings(new circleverse.viewModel.NewViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});

                            //$('.refresh').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.garbageViewModel(), 'garbage', this);
                            //    ko.applyBindings(new circleverse.viewModel.RefreshViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});


                            //$('.trash').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.garbageViewModel(), 'garbage', this);
                            //    ko.applyBindings(new circleverse.viewModel.garbageViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});

                            //$('.settings').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.settingsViewModel(), 'settings', this);
                            //    ko.applyBindings(new circleverse.viewModel.settingsViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});

                            //$('.favorite').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.favoriteViewModel(), 'favorite', this);
                            //    ko.applyBindings(new circleverse.viewModel.favoriteViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});

                            //$('.help').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.helpViewModel(), 'help', this);
                            //    ko.applyBindings(new circleverse.viewModel.helpViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});

                            //$('#login').each(function () {
                            //    //namespaces deprecated
                            //    //ko.applyBindings(new circleverse.viewModel.loginViewModel(), 'login', this);
                            //    ko.applyBindings(new circleverse.viewModel.loginViewModel(), this);
                            //    //littleUmbrella.circleverse.dragify(this);
                            //    //littleUmbrella.circleverse.dropify(this);
                            //    $(this).fadeIn(2000, 'linear');
                            //});
                        }, 1);
                        //});
                    }
                });
                //                $('#blockButton').click(function () {
                //                    $('div.test').block({ message: null });
                //                });

                //                $('#blockButton2').click(function () {
                //                    $('div.test').block({
                //                        message: '<h1>Processing</h1>',
                //                        css: { border: '3px solid #a00' }
                //                    });
                //                });

                //                $('#unblockButton').click(function () {
                //                    $('div.test').unblock();
                //                });

                //                                $('#' + services.services[0].id).block({
                //                                    message: $('#canvasloader-container'),
                //                                    css: { border: 'none', 'z-index': 3000, color: 'white', backgroundColor: 'transparent'
                //                                    },
                //                                    overlayCSS: {
                //                                        '-webkit-border-radius': '50%',
                //                                        '-moz-border-radius': '50%',
                //                                        'border-radius': '50%'
                //                                    }
                ////                                    ,
                ////                                    timeout: 3000
                //                                });
                //                                                $('body').block({
                //                                                    message: $('#canvasloader-container'),
                //                                                    css: { border: 'none', 'z-index': 3000, color: 'white', backgroundColor: 'transparent'
                //                                                    }
                //                //                                    ,
                //                //                                    overlayCSS: {
                //                //                                        '-webkit-border-radius': '50%',
                //                //                                        '-moz-border-radius': '50%',
                //                //                                        'border-radius': '50%'
                //                //                                    }
                ////                                                                                        ,
                ////                                                                                        timeout: 3000
                //                                                });
                //                                                $('body').block({
                //                                                    message: $('#canvasloader-container'),
                //                                                    css: { border: 'none', 'z-index': 3000, color: 'white', backgroundColor: 'transparent'
                //                                                    }
                //                                                    //                                    ,
                //                                                    //                                    overlayCSS: {
                //                                                    //                                        '-webkit-border-radius': '50%',
                //                                                    //                                        '-moz-border-radius': '50%',
                //                                                    //                                        'border-radius': '50%'
                //                                                    //                                    }
                //                                                    //                                                                                        ,
                //                                                    //                                                                                        timeout: 3000
                //                                                });
                //                $('.serviceIcon').each(function () {
                //                    //ko.applyBindings(new circleverse.viewModel.garbageViewModel(), 'garbage', this);
                //                    //littleUmbrella.circleverse.dragify(this);
                //                    //littleUmbrella.circleverse.dropify(this);
                //                    $(this).css({ 'opacity': .2 });
                //                });
            });
        }

    });
})();
