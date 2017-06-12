JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain.marketing');
    becu_org.domain.marketing.CollateralRequest = (function () {
        return new JS.Class(becu_org.domain.model.Base, {
            initialize: function () {
                var self = this;
                //properties

                this.size = ko.observable();
                this.horizontal = ko.observable();
                this.vertical = ko.observable(); 
                this.quantity = ko.observable();
                this.publication = ko.observable();
                this.destination = ko.observable();
                this.bw = ko.observable();
                this.color2 = ko.observable();
                this.color4 = ko.observable();
            }
        });
    })();
});