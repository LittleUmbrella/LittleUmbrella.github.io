eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.settingsViewModel = (function () {


    var initSize = 94;

 return new JS.Class(circleverse.viewModel.ResizeableBase, {
     include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],


     __getCoords: function () {
         var minTop = 100;
         var minLeft = 20;

         var calcTop = (($(window).height()) - this.dimensions().height) - 25;
         var top = (calcTop < minTop) ? minTop : calcTop;

         var calcLeft = 10;
         var left = (calcLeft < minLeft) ? minLeft : calcLeft;

         //            log('garbage left: ' + left);
         //            log('garbage top: ' + top);
         return { left: left, top: top };
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

     initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
         this.callSuper();
         //properties
         
         var self = this;
         self.size = ko.observable(initSize);
         self.showForm = ko.observable(false);
         self.location = ko.observable();
         //left: scale() * 300, top:,
         self.dimensions = ko.observable();
         self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

         self.__mapping = {
             'observe': ["value"]
         };

         var coords = self.__getCoords();
         self.location({ left: coords.left, top: coords.top });

         var defaultSettings = {};

         defaultSettings['theme'] = { displayTitle: 'Theme', value: ko.observable('light'), options: self.__getThemes() };
         defaultSettings['autoPin'] = { displayTitle: 'Auto-pin', value: ko.observable(false), options: self.__getBoolean() };
         defaultSettings['shadeChildren'] = { displayTitle: 'Nested circles have shadows', value: ko.observable(false), options: self.__getBoolean() };
         defaultSettings['navigationEffect'] = { displayTitle: 'Navigation effect', value: ko.observable(false), options: self.__getBoolean() };

         var cache, cachedSettings = {}, mappedItem, key;
         cache = self.model().get('bankPreferences');

         if (cache)
             ko.utils.arrayForEach(cache, function (item) {
                 mappedItem = ko.mapping.fromJS(item, self.__mapping);
                 key = mappedItem.key;
                 delete mappedItem.key;
                 cachedSettings[key] = mappedItem;
         });


         globalSettings = $.extend(true, globalSettings || {}, defaultSettings, cachedSettings || {})

            self.appSettings = globalSettings;


            self.appSettingsArray = ko.observableArray();

            for (n in self.appSettings) {
                var setting = self.appSettings[n];

                if (setting.value) {
                    setting.value.subscribe(function (val) {
                        if (this == 'theme')
                            self.setTheme(val);
                        else
                            globalSettings.eventAggregator.publish('circleverse.setting.changed', { setting: this, value: val, allSettings: self.appSettings });

                    }, n);
                    setting.key = n;

                    self.appSettingsArray().push(setting);
                }
            }

            self.setTheme(self.appSettings['theme'].value());

            
            self.icon.name('icon-gear icon-size-3x');
            self.icon.color('#999999');
            self.borderColor('#999999');
        }
            ,
        toggleMainForm: function () {
            this.showForm(!this.showForm());
        }
            ,

        __getThemes: function () {
            return [{ name: 'light', value: 'light', url: '/css/circleverse_light.css' }
                , { name: 'dark', value: 'dark', url: '/css/circleverse.css' }];
        }
            ,

        __getBoolean: function () {
            return [{ name: 'True', value: true }
                , { name: 'False', value: false }];
        }
            ,

        setTheme: function (val) {
            var self = this, themeSetting = self.appSettings['theme'], option;

            for (var i = 0; i < themeSetting.options.length; i++) {
                option = themeSetting.options[i];
                if (option.name == val)
                    eaf.html.ui.theme(option.url);
            }

            

        }
            ,

        droppedOn: function (dragModel) {
        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            return settings;
        }
        ,

        close: function () {
            var self = this;

            //model is the store.  todo: change model
            var unmapped = ko.mapping.toJS(self.appSettingsArray());
            self.model().set('bankPreferences', unmapped);
            this.showForm(false);
        }

    });
})();





//circleverse.viewModel.GlobalSettings = (function () {



//    return new JS.Class({

//        initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
//            //properties
//            ; // = ko.observableArray([]);

//            var self = this;

//            this.id = ko.observable(Math.floor(Math.random() * 10000));

//            this.actionInfo = ko.observable('no action');
//            this.deleteNow = ko.observable(false);


//            this.isBusy = ko.observable(false);
//        }


//    });
//})();