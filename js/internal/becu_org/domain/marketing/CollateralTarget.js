JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain.marketing');
    becu_org.domain.marketing.CollateralTarget = (function () {
        return new JS.Class('becu_org.domain.marketing.CollateralTarget', becu_org.domain.model.Base, {
            initialize: function () {
                var self = this;
                //properties
                this.name = ko.observable();

            }
            ,

            // Must return -1 if this object is 'less than' other,
            // +1 if it is 'greater than' other, or 0 if they are equal
            compareTo: function (other) {
                if (this.name() < other.name()) return -1;
                if (this.name() > other.name()) return 1;
                return 0;
            }
        });
    })();
});