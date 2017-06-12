
eaf.util.namespace('circleverse.domain');

//alert('hi');

circleverse.domain.MoneyTransferPersonStrategy = (function () {
    
    return new JS.Class('circleverse.domain.MoneyTransferPersonStrategy', {
        
        initialize: function (object, parent, globalSettings) {
            //this.callSuper();
            //properties

            var self = this.self = this;

            self.personViewModel = ko.observable();

        }

    });
})();