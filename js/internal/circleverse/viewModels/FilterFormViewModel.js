eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.FilterFormViewModel = (function () {

    var initSize = 94;

    return new JS.Class('circleverse.viewModel.FilterFormViewModel', circleverse.viewModel.ResizeableBase, {
     include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],


     __getCoords: function () {
         var minTop = 0;
         var minLeft = 100;

         var calcTop = 0;
         var top = (calcTop < minTop) ? minTop : calcTop;

         var calcLeft = ((($(window).width() / 3) - (this.dimensions().width / 3))) * .7;
         var left = (calcLeft < minLeft) ? minLeft : calcLeft;

         //            log('garbage left: ' + left);
         //            log('garbage top: ' + top);
         return { left: left, top: top };
     }
             ,

     initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
         this.callSuper(object, parent, globalSettings);
         //properties

         var self = this;
         this.location = ko.observable();
         //left: scale() * 300, top:,

         self.size = ko.observable(initSize);
         
         this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


         self.settings = $.extend(self.settings || {}, { dropFilter: false }, opts);

         var coords = this.__getCoords();
         this.location({ left: coords.left, top: coords.top });

         self.filterable = null;

         self.basicFilter = ko.observable().extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 350 } });
         self.basicFilter.subscribe(function (val) {
             self.filter();
         });
         self.filterableProps = [];
         
         self.showMe(false);

         self.__globalSettings.eventAggregator.subscribe('circleverse.viewModel.FilterFormViewModel.filterRequest', function (msg, vm) {
             self.setFilterable(vm);
             self.showMe(true);
         });


         self.__globalSettings.eventAggregator.subscribe('onTop.' + circleverse.viewModel.accountViewModel.displayName, function (msg, val) {
             if (self.showMe())
                self.onTop((self.onTop() || 0) + 1);
         });

         self.__globalSettings.eventAggregator.subscribe('onTop.' + circleverse.viewModel.SatelliteNavigatorViewModel.displayName, function (msg, val) {
             if (self.showMe())
                 if (val && val.parent && val.parent.isA(circleverse.viewModel.CustomerAccountsViewModel))
                    self.onTop((self.onTop() || 0) + 1);
         });

         self.filterableIcon = ko.observable();
         self.filterableIcon2 = ko.observable();
         self.filterableIcon3 = ko.observable();
         self.filterableIconFiltered = ko.observable();
         self.filterIcon = ko.observable("icon-filter2 icon-size-2x");
            
         this.icon.name('icon-filter2 icon-size-3x');
         this.icon.color('#999999');
         this.borderColor('#999999');
         //log('garbage position: ' + this.position().top);
     }
            ,

     onresize: function (e, data) {
         this.callSuper();


         var coords = this.__getCoords();
         this.location({ left: coords.left, top: coords.top });
         this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

         //log('garbage position: ' + this.position().top);
     }
            ,
     droppedOn: function (dragModel, dragVm) {
         var self = this;

         self.setFilterable(dragVm);
         self.toggleFormVisibility();
     }
            ,
     dropped: function (dropModel, dropViewModel) {
         var self = this;

         self.setFilterable(dropViewModel);
         self.toggleFormVisibility();
     }
        ,
     toggleFormVisibility: function () {
         var self = this, state = self.showMe();

         if (state) {
             self.filterable = null;
             self.basicFilter('');
         }

         self.showMe(!state);
     }
        ,

     setFilterable: function (filterable) {
         var self = this;
         var actualFilterable = null;

         //todo: consider asking the vm that comes in to provide
         if (filterable.filter) {
             actualFilterable = filterable;
         }
         else if (filterable.parent) {
             if (filterable.parent.filter) {
                 actualFilterable = filterable.parent;
             }
             else {
                 throw new Error('filterable.parent does not contain a method named filter');
             }
         }          
         else {
             throw new Error('filterable does not contain a method named filter');
         }

         self.filterable = actualFilterable;
         var shortName = '', filterableIcon = '', filterableIcon2 = '', filterableIcon3 = '';

         var getShortName = function (n) {
             return n.substring(0, n.lastIndexOf(" ")) + " icon-size-2x";
         }

         if (actualFilterable.childViewModels) {
             //samples
             var childViewModelsArr = actualFilterable.childViewModels(),
                        childViewModelsIdx = 0,
                        childViewModelsItem,
                        childViewModelsLength = childViewModelsArr.length;

             if (0 == childViewModelsLength) {                 
                 filterableIcon = actualFilterable.icon.name();
                 shortName = getShortName(filterableIcon);

                 self.filterableIcon(shortName);
                 self.filterableIcon2(shortName);
                 self.filterableIcon3(shortName);
                 self.filterableIconFiltered(shortName);
             }
             else if (1 == childViewModelsLength) {
                 filterableIcon = ko.unwrap(childViewModelsArr[0]).icon.name();
                 shortName = getShortName(filterableIcon);

                 self.filterableIcon(shortName);
                 self.filterableIcon2(shortName);
                 self.filterableIcon3(shortName);
                 self.filterableIconFiltered(shortName);
             }
             else if (2 == childViewModelsLength) {
                 filterableIcon = ko.unwrap(childViewModelsArr[0]).icon.name();
                 filterableIcon2 = ko.unwrap(childViewModelsArr[1]).icon.name();

                 shortName = getShortName(filterableIcon);
                 self.filterableIcon(shortName);
                 self.filterableIcon3(shortName);

                 shortName = getShortName(filterableIcon2);
                 self.filterableIcon2(shortName);
                 self.filterableIconFiltered(shortName);
             }
             else if (3 == childViewModelsLength) {
                 filterableIcon = ko.unwrap(childViewModelsArr[0]).icon.name();
                 filterableIcon2 = ko.unwrap(childViewModelsArr[1]).icon.name();
                 filterableIcon3 = ko.unwrap(childViewModelsArr[2]).icon.name();

                 shortName = getShortName(filterableIcon);
                 self.filterableIcon(shortName);
                 self.filterableIconFiltered(shortName);

                 shortName = getShortName(filterableIcon2);
                 self.filterableIcon2(shortName);

                 shortName = getShortName(filterableIcon3);
                 self.filterableIcon3(shortName);
             }
             else if (4 <= childViewModelsLength) {
                 filterableIcon = ko.unwrap(childViewModelsArr[0]).icon.name();
                 filterableIcon2 = ko.unwrap(childViewModelsArr[1]).icon.name();
                 filterableIcon3 = ko.unwrap(childViewModelsArr[2]).icon.name();
                 var filterableIconFiltered = ko.unwrap(childViewModelsArr[3]).icon.name();

                 shortName = getShortName(filterableIcon);
                 self.filterableIcon(shortName);
                 self.filterableIconFiltered(shortName);

                 shortName = getShortName(filterableIcon2);
                 self.filterableIcon2(shortName);

                 shortName = getShortName(filterableIcon3);
                 self.filterableIcon3(shortName);

                 shortName = getShortName(filterableIconFiltered);
                 self.filterableIconFiltered(shortName);
             }
         }
         else {             
             filterableIcon = actualFilterable.icon.name();
             shortName = getShortName(filterableIcon);

             self.filterableIcon(shortName);
             self.filterableIcon2(shortName);
             self.filterableIcon3(shortName);
             self.filterableIconFiltered(shortName);
         }
     }
        ,

     getSettings: function () {

         var self = this, settings = self.callSuper();
         settings.drop = self.settings.dropFilter;
         return settings;
     }
        ,
     filter: function () {
        var self = this;

        if (self.filterable)
            self.filterable.filter(self.basicFilter());
    }

        
    });
})();
