
eaf.util.namespace('becu_org.service');

becu_org.service.LookupService = (function () {

    var template;

    return new JS.Class({
        initialize: function () {
            //properties
            
        },

        getCloseAccountReasonCodes: function () {
            return [
            { reasonCodeId: 1, reasonCodeDisplayText: 'Fraud', reasonCodeDescription: 'fraud desc', needsExplanation: false }
            ,
            { reasonCodeId: 2, reasonCodeDisplayText: 'Inconvenient', reasonCodeDescription: 'Inconvenient desc', needsExplanation: true}]
        }

    });

})();