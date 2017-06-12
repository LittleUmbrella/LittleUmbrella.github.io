
eaf.util.namespace('circleverse.domain');

//alert('hi');

circleverse.domain.MoneyTransferAccountStrategy = (function () {
    
    return new JS.Class('circleverse.domain.MoneyTransferAccountStrategy', {
        
        initialize: function (object, parent, globalSettings) {
            //this.callSuper();
            //properties

            var self = this.self = this;

            self.accountViewModel = ko.observable();

        }

    });
})();