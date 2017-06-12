JS.Packages(function () {
    var PATH_PREFIX_INTERNAL = 'http://tvmobdev04:8005/';

    with (this) {
        file('test/js/services/CustomerService.js')
                    .provides('becu_org.service.CustomerService')
                    .requires('eaf.util', 'becu_org.domain.model.Customer', 'becu_org.domain.model.CustomerObservable'

                    );
        file('test/js/services/AccountService.js')
                    .provides('becu_org.service.AccountService')
                    .requires('eaf.util', 'becu_org.domain.model.Account'
                    , 'becu_org.domain.model.Customer', 'becu_org.domain.model.CustomerObservable'
                    );

        file('test/js/services/LookupService.js')
                    .provides('becu_org.service.LookupService')
                    .requires('eaf.util'
                    //, 'becu_org.domain.model.customer'
                    )
                    ;

    }
});