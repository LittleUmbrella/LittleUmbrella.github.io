eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.FilterViewModel = (function () {

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


         self.settings = $.extend(self.settings || {}, { dropFilter: '.filterable' }, opts);

         var coords = this.__getCoords();
         this.location({ left: coords.left, top: coords.top });

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

         self.__globalSettings.eventAggregator.publish('circleverse.viewModel.FilterFormViewModel.filterRequest', dragVm);
     }
            ,
     dropped: function (dropModel, dropViewModel) {
         var self = this;

         self.__globalSettings.eventAggregator.publish('circleverse.viewModel.FilterFormViewModel.filterRequest', dropViewModel);
     }
        
        ,

     getSettings: function () {

         var self = this, settings = self.callSuper();
         settings.drop = self.settings.dropFilter;
         return settings;
     }

        
    });
})();
