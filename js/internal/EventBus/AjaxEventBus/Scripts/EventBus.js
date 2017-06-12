/*
    1. Defines the EventBus class
    2. Registers it as a component
    3. Creates an instance of it
*/

(function(window) {

    Type.registerNamespace('Sample')

    Sample.EventBus = function() {
        Sample.EventBus.initializeBase(this);
    }

    Sample.EventBus.prototype = {
        subscribe: function subscribe(eventType, callback) {
            this.get_events().addHandler(eventType, callback);
        },
        publish: function publish(eventType, arg) {
            var handler = this.get_events().getHandler(eventType);
            if (handler)
                handler(arg);
        }
    }

    Sample.EventBus.registerClass('Sample.EventBus', Sys.Component);
    
    Sample.EventBus.get_Instance = function get_Instance() {
        return Sys.Application.findComponent('SampleEventBus');
    }

    Sample.EventBus.registerEventType = function registerEventType(target, eventType) {
        if (!target.Events)
            target['Events'] = {};
        target.Events[eventType] = eventType;
    }

    Sys.Component.create(Sample.EventBus, { id: 'SampleEventBus' });

})(window);
