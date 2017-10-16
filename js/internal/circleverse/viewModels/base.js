
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.Base = (function () {



    return new JS.Class({

        initialize: function (object, parent, globalSettings, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var self = this, mapping = {};
            //properties

            if (opts && opts.mapping) {
                if (opts.mapping.beforeMapCallback) {
                    opts.mapping.beforeMapCallback(object);
                }
                mapping = opts.mapping.map || {};
            }

            self.__globalSettings = globalSettings;

            self.model = ko.observable(object);
            //self.model = ko.observable(ko.unwrap(ko.mapping.fromJS(object, mapping))); // = ko.observableArray([]);

            if (opts && opts.mapping) {
                if (opts.mapping.afterMapCallback) {
                    opts.mapping.afterMapCallback(object, self.model());
                }
            }

            self.rawModel = ko.observable(object); // = ko.observableArray([]);
            self.parent = parent;

            self.id = ko.observable(Math.floor(Math.random() * 10000));


            self.actionInfo = ko.observable('no action');
            self.deleteNow = ko.observable(false);


            self.isBusy = ko.observable(false);

            self.isReady = ko.observable(true);

            self.icon = {};
            self.icon.name = ko.observable('icon-group icon-size-3x');
            self.icon.color = ko.observable('#56aee0');
            self.borderColor = ko.observable('#56aee0');
            self.borderWidth = 2;

            self.onTop = ko.observable(true);
            //self.onTop.subscribe(function () {
            //    self.__globalSettings.eventAggregator.publish('onTop.' + self.klass.displayName, self);
            //});

            //bad idea; too many messages floating around
            //var onTopCircularStopper = null;

            //globalSettings.eventAggregator.subscribe('onTop', function (msg, val) {

            //    onTopCircularStopper = uuid.v4();
            //    if (null == onTopCircularStopper) {
            //        onTopCircularStopper = 1;
            //        if (self != val)
            //            if (self.__isAncestor(self, val))
            //                self.onTop.valueHasMutated();
            //    }
            //    else
            //        onTopCircularStopper = null;
            //});

            self.showMe = ko.observable(true);
            self.showMe.subscribe(function (val) {
                if (val) {
                    self.onTop(!self.onTop());
                }
            });
        }
        ,

        toggleVisibility: function () {
            var self = this;

            self.showMe(!self.showMe());
        }
        ,

        __tickleTop: function(){
            var self = this;

            self.onTop(!self.onTop());
        }
        ,

        __isAncestor: function (level, parent) {
            if (null == parent) return false;
            if (level == parent) return true;

            var self = this;
            if (level.parent)
                return self.__isAncestor(level.parent, parent);

            return false;
        }
        ,
    

        __getMappings: function(){
            return {};
        }
        ,

        dblclick: function () { }


        ,

        getSettings: function () {
            var settings = this.callSuper();
            //settings.drop = false;
            settings.not = '.map';
            return settings;
        }

    });
})();
