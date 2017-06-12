eaf.util.namespace('becu_org');
becu_org.UserSession = (function () {
    return new JS.Class('becu_org.UserSession', {
        initialize: function (authenticationService) {
            var self = this;
            //properties
            self.authenticationService = authenticationService;
            self.userName = ko.observable();
            self.password = ko.observable();

            self.isAuthenticated = ko.observable(false);
        }
        ,

        authenticate: function () {
            var self = this;

            self.authenticationService.authenticate(self.userName(), self.password());


        }
    });
})();