eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.SearchMembersResultsViewModel = (function () {

    var initSize = 94;

    return new JS.Class('circleverse.viewModel.SearchMembersResultsViewModel', circleverse.viewModel.ResizeableBase, {
        include: [
            becu_org.ui.viewModel.baseModule, 
            circleverse.viewModel.satellite, 
            circleverse.viewModel.centerCircle, 
            becu_org.ui.viewModel.draggableModule, 
            becu_org.ui.viewModel.droppableModule, 
            becu_org.ui.viewModel.circleModule,
            circleverse.viewModel.SpecialViewViewModel
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
                startingDegree: 230,
                evenDistribution: false
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



            var searchLocation = self.location(),
                width = 300,
                height = 300,
                top = searchLocation.top - ((height)/2),
                left = searchLocation.left - ((width)/2);

            self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, top: top, left: left, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

            
            self.parent.childViewModels.subscribe(function(changes){
                if (changes[0].status == "added" && changes[0].item == self){
                    searchLocation = self.location(),
                        width = 300,
                        height = 300,
                        top = searchLocation.top - ((height)/2),
                        left = searchLocation.left - ((width)/2);

                    self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, top: top, left: left, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
                    self.searchDimensionSettingsRegular = {width: self.dimensions().width, top: searchLocation.top, left: searchLocation.left, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};

                }
            });

            // self.searchDimensionSettingsBig = {width: width + self.dimensions().width, height: height + self.dimensions().height, borderRadius: 20, onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};
            // self.searchDimensionSettingsRegular = {width: self.dimensions().width, height: self.dimensions().height, borderRadius: '50%', onComplete: eaf.core.createDelegate(self, self.toggleFormAnimationEnded), ease: Elastic.easeIn.config(4.5, 3)};


            self.mainFormOpen = false;
             

            self.canOpen(true);
            self.canCreate(false);
            self.canEdit(false);
            self.canDelete(false);
            self.canSearch(false);
            self.canRefresh(false);
            self.canSave(false);
            self.canClose(true);
            self.canHelp(false); 

            
            self.searchResults = ko.observableArray();
            
            this.icon.name('icon-search icon-size-3x');
            this.icon.color('#999999');
            this.borderColor('#999999');
            //log('garbage position: ' + this.position().top);
        }
        ,

        showResults: function(results){
            var self = this;

            self.searchResults(results);
        }
        ,

        showMainForm: function(){
            var self = this;

            var deferred = jQuery.Deferred();
            
            self.searchDimensionSettingsBig.onComplete = function(){
                self.toggleFormAnimationEnded();
                deferred.resolve();
            };
            self.animationSettings(self.searchDimensionSettingsBig);
            //self.size(self.searchDimensionSettingsBig.width);
            
            self.globalSettings.eventAggregator.publish('stage.activeThings.add', self);
            
            self.canOpen(false);
            self.canClose(true);
            self.mainFormOpen = true ;

            return deferred;
        }
        ,

        hideMainForm: function(){
            var self = this;
            
            var deferred = jQuery.Deferred();

            self.contentTemplate('emptyContentTemplate');
                self.searchDimensionSettingsRegular.onComplete = function(){
                    self.toggleFormAnimationEnded();
                    deferred.resolve();
                };
                self.animationSettings(self.searchDimensionSettingsRegular);
                //self.size(self.searchDimensionSettingsRegular.width);

            self.canOpen(true);
            self.canClose(false);
            self.mainFormOpen = false ;

            return deferred;
        }
        ,

        

        toggleMainForm: function(){
            var self = this;
            
            var deferred;
            if (self.mainFormOpen){
                deferred = self.hideMainForm();
            }
            else{
                deferred = self.showMainForm();
            }


            return deferred;
        }
        ,

        toggleFormAnimationEnded: function(){
            var self = this;

            if (self.mainFormOpen){
                self.contentTemplate('findMemebersTemplate');
                self.dimensions({width: self.searchDimensionSettingsBig.width, height: self.searchDimensionSettingsBig.height});
                self.location({top: self.searchDimensionSettingsBig.top, left: self.searchDimensionSettingsBig.left});
                //self.size(self.searchDimensionSettingsBig.width);
                //self.location(self.getCalculatedLocation());
                
            }
            else{
                self.contentTemplate('standardContentTemplate');
                self.dimensions({width: self.searchDimensionSettingsRegular.width, height: self.searchDimensionSettingsRegular.height});
                //self.location({top: self.searchDimensionSettingsRegular.top, left: self.searchDimensionSettingsRegular.left});
                self.size(self.searchDimensionSettingsRegular.width);
                self.__overridden = false;
                self.location(self.getCalculatedLocation());

            }
        }
        ,

        findIndividuals: function(){
            var self = this;

            
        }
        ,

        // onresize: function (e, data) {
        //     this.callSuper();


        //     var coords = this.__getCoords();
        //     this.location({ left: coords.left, top: coords.top });
        //     this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

        //     //log('garbage position: ' + this.position().top);
        // }
        // ,

        dropped: function (dropModel, dropViewModel, args, prom) {
            var self = this;

            if (dropViewModel.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    self.closeMainForm();
                });
            }
            else if (dropViewModel.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    self.openMainForm();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel) || dragVm.isA(circleverse.viewModel.SaveViewModel)) {
                prom.then(function(){
                    self.findIndividuals();
                });
            }
            if (self.callSuper) self.callSuper();
        }
            ,
        droppedOn: function (dragModel, dragVm, args, prom) {
            var self = this;

            
            if (dragVm.isA(circleverse.viewModel.CloseViewModel)) {
                prom.then(function(){
                    self.closeMainForm();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.OpenViewModel)){
                prom.then(function(){
                    self.openMainForm();
                });
            }
            else if (dragVm.isA(circleverse.viewModel.SaveViewModel) || dragVm.isA(circleverse.viewModel.SaveViewModel)) {
                prom.then(function(){
                    self.findIndividuals();
                });


            }
            if (self.callSuper) self.callSuper();
        }


    });
})();
