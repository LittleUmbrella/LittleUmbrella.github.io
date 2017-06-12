//JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.domain.marketing');
    becu_org.domain.marketing.CollateralPlan = (function () {
        return new JS.Class('becu_org.domain.marketing.CollateralPlan', becu_org.domain.model.Base, {
            initialize: function () {
                var self = this;
                //properties
                this.copyDate = ko.observable();
                this.designDate = ko.observable();
                this.finalDate = ko.observable();
                this.dropDate = ko.observable();
                this.postDate = ko.observable();
                this.pullDate = ko.observable();

                this.collateralRequest = ko.observable(new becu_org.domain.marketing.CollateralRequest());
            }
        });
    })();
//});