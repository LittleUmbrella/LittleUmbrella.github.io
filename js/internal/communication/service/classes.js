JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.communication.service');

    becu_org.communication.templateTrackingItem = new JS.Class({
        initialize: function (type, instance) {
            //properties
            this.type = type;
            this.instance = instance;

        }

    });
});