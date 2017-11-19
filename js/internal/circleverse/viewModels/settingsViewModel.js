eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.settingsViewModel = (function () {



    var initSize = 60;

 return new JS.Class(circleverse.viewModel.ResizeableBase, {
     include: [circleverse.viewModel.ToolViewModel,
            becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule,
            becu_org.ui.viewModel.labelModule],


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
         
         self.dimensions({ height: self.scale() * initSize, width: self.scale() * initSize });

         self.__mapping = {
             'include': ["value"]
         };

         var coords = self.__getCoords();
         self.location({ left: coords.left, top: coords.top });

         
         self.label("Settings");

         var defaultSettings = {};

         defaultSettings['theme'] = { displayTitle: 'Theme', value: ko.observable('light'), options: self.__getThemes() };
         defaultSettings['help'] = { displayTitle: 'Auto Help', value: ko.observable(true), options: self.__getBoolean(), subSettings: {
             'app': { displayTitle: 'Site intro', value: ko.observable(true), options: self.__getBoolean() },
             'CustomerAddressesViewModel': { displayTitle: 'Address intro', value: ko.observable(true), options: self.__getBoolean() }
         }};
         //defaultSettings['tindr'] = { displayTitle: 'Swipe Open/Close', value: ko.observable(true), options: self.__getBoolean() };
         //defaultSettings['autoPin'] = { displayTitle: 'Auto-pin', value: ko.observable(false), options: self.__getBoolean() };
         //defaultSettings['shadeChildren'] = { displayTitle: 'Nested circles have shadows', value: ko.observable(false), options: self.__getBoolean() };
         //defaultSettings['navigationEffect'] = { displayTitle: 'Navigation effect', value: ko.observable(false), options: self.__getBoolean() };

         var cache;
         cache = self.model().get('bankPreferences');

         var oldStyleCacheAdapter = {adapt:function(cache){
            var cachedSettings = {}, mappedItem, key;
            if (cache)
                ko.utils.arrayForEach(cache, function (item) {
                    mappedItem = ko.mapping.fromJS(item, self.__mapping);
                    key = mappedItem.key;
                    delete mappedItem.key;
                    cachedSettings[key] = mappedItem;
            });

            return cachedSettings;
        }}

         self.mainCss('settings');

         if (self.isCacheOldStyle(cache)){
             cache = oldStyleCacheAdapter.adapt(cache);
         }
         else{
             //doesn't work cache = ko.mapping.fromJS(cache, self.__mapping) ;
             cache = self.mapToObservable(cache, self.__mapping) ;
         }

         self.appSettings = $.extend(true, {}, defaultSettings, cache || {})


         //self.appSettingsBindable


            self.monitorAndBroadcastSettingsChanges(self.appSettings);

            self.setTheme(self.appSettings['theme'].value());

            
            self.icon.name('icon-gear icon-size-2x');
            self.icon.color('#999999');
            self.borderColor('#999999');


            
        }
            ,
        mergeSettings: function (settings) {
            var self = this;


        }
            ,
        monitorAndBroadcastSettingsChanges: function (settingsGroup) {
            var self = this;

            for (n in settingsGroup) {
                var setting = settingsGroup[n];

                if ('undefined' != typeof setting.value) {
                    setting.value.subscribe(function (val) {
                        if (this == 'theme')
                            self.setTheme(val);
                        else
                            self.globalSettings.eventAggregator.publish('circleverse.setting.changed', { setting: this, value: val, allSettings: self.appSettings });

                    }, n);
                }

                if (setting.subSettings){
                    self.monitorAndBroadcastSettingsChanges(setting.subSettings);
                }
            }
        }
        ,
        mapToObservable: function (cacheGroup) {
            var self = this, retVal = {};

            for (var n in cacheGroup) {
                var setting = cacheGroup[n];

                
                if (n == 'value') {
                    retVal[n] = ko.observable(setting);  
                }
                // else if (n == 'subSettings'){
                //     retVal.subSettings = self.mapToObservable(setting.subSettings);
                // }
                else{
                    if(Object.prototype.toString.call( setting ) === '[object Array]' ) {
                        retVal[n] = setting;
                    }
                    else if (setting !== null && typeof setting === 'object'){
                        retVal[n] = self.mapToObservable(setting);
                    }
                    else{
                        retVal[n] = setting;
                    }
                }
            }

            return retVal;
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
        isCacheOldStyle: function(cache){
            if (!cache) return false;

            if (cache[0] && 'undefined' != typeof cache[0].key) return true;

            return false;
        }
            ,

        droppedOn: function (dragModel) {
        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = false;
            return settings;
        },

        getSetting: function (settingPath) {
            var self = this;

            var paths = settingPath.split('.'),
                setting,  
                i,
                len,
                settings = self.appSettings;
            if (paths.length == 0) throw Error("could not find path: " + settingPath);
            

            setting = settings;
            for (i = 0, len = paths.length; i < len; i++) {
                if ('undefined' == typeof setting.subSettings){
                    setting = ko.unwrap(setting[paths[i]]);
                }
                else{
                    setting = ko.unwrap(setting.subSettings[paths[i]]);                    
                }
            }

            return setting;
        }
        ,

        setSetting: function (settingPath, value) {
            var self = this;

            var paths = settingPath.split('.'),
                setting,  
                i,
                len,
                settings = self.appSettings;
            if (paths.length == 0) throw Error("could not find path: " + settingPath);
            

            setting = settings;
            for (i = 0, len = paths.length; i < len; i++) {
                if ('undefined' == typeof setting.subSettings){
                    setting = ko.unwrap(setting[paths[i]]);
                }
                else{
                    setting = ko.unwrap(setting.subSettings[paths[i]]);                    
                }
            }

            if (ko.isObservable(setting.value)){
                setting.value(value);
            }
            else{
                setting.value = value;
            }
            
            self.saveSettings();
        }
        ,

        saveSettings: function () {
            var self = this;

            //model is the store.  todo: change model
            var unmapped = ko.mapping.toJS(self.appSettings);
            self.model().set('bankPreferences', unmapped);
        }
        ,

        close: function () {
            var self = this;

            self.saveSettings();
            this.showForm(false);
        }
        ,

        othersDragEnded: function (dragModel, dragViewModel, args, prom) {
        }
        ,

        dropInit: function (dragModel, dragViewModel, args, prom) {
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