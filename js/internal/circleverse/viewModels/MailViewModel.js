eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.MailViewModel = (function () {

    var initSize = 110;

    return new JS.Class('circleverse.viewModel.MailViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule,
            //becu_org.ui.viewModel.labelModule,
            circleverse.viewModel.SpecialContentViewViewModel
        ],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 180;

            var calcTop = 0;
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = ((($(window).width() / 3) - (this.dimensions().width / 3))) * .6;
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            
            //properties

            var self = this;
            //left: scale() * 300, top:,

            self.size = ko.observable(initSize);
            this.callSuper(object, parent, globalSettings);
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.autoPopSingleChild(false);

            //self.settings = $.extend(self.settings || {}, { dropFilter: '.filterable' }, opts);

            
            //self.label("Mail");
            
            var subscription = null;
            // globalSettings.eventAggregator.subscribe('circleverse.spotlightContext', function(eventName, args){
            //     self.showMe(args.canEdit());
            //     if (subscription) subscription.dispose();

            //     subscription = args.canClose.subscribe(function(){
            //         self.showMe(args.canEdit());
            //     });
            // });

            self.mainCss('mail see-through');
            self.connectionWidthStaticAdjustment(-10);

            self.icon.secondary = {name: ko.pureComputed(function(){
                    if (self.model().isA(becu_org.domain.model.AccountObservable)){
                        //todo: real impl
                        var acctNumber = parseFloat(self.rawModel().accountNumber);

                        if ((acctNumber % 6) == 0)
                            return 'icon-car icon-size-1x';
                        else if ((acctNumber % 5) == 0)
                            return 'icon-anchor icon-size-1x';
                        else if ((acctNumber % 4) == 0)
                            return 'icon-pig icon-size-1x';
                        else if ((acctNumber % 3) == 0)
                            return 'icon-home icon-size-1x';
                        else 
                            return 'icon-pig icon-size-1x';
                        
                    }   
                    else if (self.model().isA(becu_org.domain.model.PersonObservable)){
                        return 'icon-user icon-size-1x';
                    }    
                }),
                type: {name: ko.pureComputed(function(){
                            if (self.model().isA(becu_org.domain.model.AccountObservable)){
                                //todo: real impl
                                
                                    return 'icon-calendar2 icon-size-1x';
                                
                            }   
                            else if (self.model().isA(becu_org.domain.model.PersonObservable)){
                                return 'icon-primitive-dot icon-size-1x';
                            }    
                        })
                    }
            };
            
            self.full = ko.pureComputed(function(){
                if (self.model().isA(becu_org.domain.model.AccountObservable)){
                        
                    return self.model().accountNumber();
                    
                }   
                else if (self.model().isA(becu_org.domain.model.PersonObservable)){
                    return self.model().fullName();
                }   
            });

            
            
            this.icon.name('icon-mail icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }
        ,

        breakLink: function(link){
            var self = this;
            var links = self.childViewModels();
            if (links)  {  
                var linksLen = links.length;

                for (var i = 0; i < linksLen; i++) {
                    var tmpLink = links[i];
                    if (tmpLink == link){
                        self.childViewModels.remove(link);
                        i--;
                    }  
                }
            }
        },

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;
            self.callSuper();

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.garbageViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                
                prom.then(function(){
                    self.childViewModels.removeAll();
                });
            }
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;
            self.callSuper();

            //this.model().callSpec().add(dragModel);
            if (dragVm.isA(circleverse.viewModel.garbageViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                
                prom.then(function(){
                    self.childViewModels.removeAll();
                });

            }
        }
            ,

        onresize: function (e, data) {
            this.callSuper();


            var coords = this.__getCoords();
            this.location({ left: coords.left, top: coords.top });
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            //log('garbage position: ' + this.position().top);
        }


    });
})();
