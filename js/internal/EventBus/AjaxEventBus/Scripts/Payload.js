(function(window) {

    Sample.Payload = function(dataValue) {
        this.data = dataValue;
    }

    Sample.EventBus.registerEventType(Sample.Payload, 'Update');
    Sample.EventBus.registerEventType(Sample.Payload, 'Click');

})(window);