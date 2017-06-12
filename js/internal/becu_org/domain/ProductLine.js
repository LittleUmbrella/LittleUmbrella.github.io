JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain');
    becu_org.domain.model.ProductLine = (function () {
        return new JS.Class(becu_org.domain.model.Base, {
            include: JS.Comparable,

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