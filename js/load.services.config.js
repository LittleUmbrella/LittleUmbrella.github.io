JS.Packages(function () {
    var PATH_PREFIX_INTERNAL = 'http://tvmobdev04:8005/';

    with (this) {
        file('/js/internal/services/CustomerService.js')
                    .provides('becu_org.service.CustomerService')
                    .requires('eaf.util', 'becu_org.domain.model.Customer'
                    ,'eaf.communications.jsonGetter'
                    );
        file('test/js/services/AccountService.js')
                    .provides('becu_org.service.AccountService')
                    .requires('eaf.util', 'becu_org.domain.model.Account'
                    , 'becu_org.domain.model.Customer'
                    );

        file('test/js/services/LookupService.js')
                    .provides('becu_org.service.LookupService')
                    .requires('eaf.util'
                    )
                    ;

    }
});