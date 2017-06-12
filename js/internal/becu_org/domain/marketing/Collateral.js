JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain.marketing');
    becu_org.domain.marketing.Collateral = (function () {
        return new JS.Class(becu_org.domain.model.Base, {
            initialize: function () {
                var self = this;
                //properties
                this.size = ko.observable();
                this.rotationDegree = ko.observable(0);
            }
        });
    })();
});