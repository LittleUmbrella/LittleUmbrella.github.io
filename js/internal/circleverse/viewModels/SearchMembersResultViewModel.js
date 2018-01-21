eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SearchMembersResultViewModel = (function () {

    var initSize = 150;

    return new JS.Class('circleverse.viewModel.SearchMembersResultViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule, 
            becu_org.ui.viewModel.circleModule,
            becu_org.ui.viewModel.labelModule,
            circleverse.viewModel.SpecialContentViewViewModel
            ],


        __getCoords: function () {
            var minTop = 0;
            var minLeft = 20;

            var calcTop = 0;// (this.dimensions().height);
            var top = (calcTop < minTop) ? minTop : calcTop;

            var calcLeft = 0; //(this.dimensions().width));
            var left = (calcLeft < minLeft) ? minLeft : calcLeft;

            //            log('garbage left: ' + left);
            //            log('garbage top: ' + top);
            return { left: left, top: top };
        }
             ,

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this;
            //this.location = ko.observable();

            var settings = {
                itemDiameter: initSize + 5,
                startSatellitesOnEdge: false,
                startingDegree: 230//,
                //evenDistribution: true
            };
            
            self.callSuper(object, parent, globalSettings, settings);

            
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


            self.settings = $.extend(self.settings || {}, { dropFilter: '.searchable' }, opts);

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });
            //properties
             // = ko.observableArray([]);

            self.size = ko.observable(initSize);
            //this.location = ko.observable();
            //left: scale() * 300, top:,

            
            //this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            self.animationSettings = ko.observable({width: self.parent.dimensions().width, height: self.parent.dimensions().height, callback: self.toggleFormAnimationEnded});

            //var coords = this.__getCoords();
            //this.location({ left: coords.left, top: coords.top });

            self.memberIcon = ko.observable('icon-search icon-size-3x');


            // self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            // self.searchDimensionSettingsRegular = {width: self.dimensions().width, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

            self.label('result');


            self.mainFormOpen = false;
            
            self.canDelete(false);
            self.canSearch(false);
            self.canEdit(false);
            self.canCreate(false);    

            self.__loaded = false;
            
            this.icon.name('icon-search icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }
        ,


        load: function(){

            var self = this;

            self.isBusy(true);

            
            var prom = jQuery.Deferred();
            if (self.__loaded){
                prom.resolve();
            }
            else{
                prom = self.globalSettings.repository.getIndividual(self.model());
                prom.then(function(result){
                    self.isBusy(false);
                    self.childViewModels.push(new littleUmbrella.circleverse.viewModel.CustomerViewModel(result, self, self.globalSettings));
            
                    self.__loaded = true;
                    self.showChildVieModels();
                });
            }
            return prom;
        }
        ,
        
        toggleChildrenVisibility: function () {
            var self = this;
            var selfCallSuper = self.callSuper;
            
            if (self.childrenVisible()){
                return selfCallSuper();
            }
            else{                
                if (self.childViewModels().length == 0){
                    return self.load();
                }
                else{                    
                    return selfCallSuper();
                }              
            }

        }
        ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            var selfCallSuper = self.callSuper;

            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)) {
                prom.then(function(){
                    if (self.childViewModels().length == 0){
                        self.load();
                    }
                    else{
                        
                        if (selfCallSuper) selfCallSuper();
                    }
                });
            }
            else {
                if (selfCallSuper) selfCallSuper();
            }
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            var selfCallSuper = self.callSuper;
            //this.model().callSpec().add(dragModel);
            if (dragVm.isA(circleverse.viewModel.OpenViewModel)) {
                // var methodVm = this.model().services[0].methods()[0];
                // var need = methodVm.model().callSpec().need()[0]
                // //$parent.getObjects.call($parent, e, model)
                // methodVm.getObjects.call(methodVm, null, need);
                

                prom.then(function(){
                    
                    if (self.childViewModels().length == 0){
                        self.load();
                    }
                    else{
                        
                        if (selfCallSuper) selfCallSuper();
                    }
                });
            }
            else {
                if (selfCallSuper) selfCallSuper();
            }
        }


    });
})();
