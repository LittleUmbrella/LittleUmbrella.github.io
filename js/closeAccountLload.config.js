JS.Packages(function () {
    var PATH_PREFIX_INTERNAL = 'http://tvmobdev04:8005/';

    with (this) {

        file('http://code.jquery.com/jquery-1.5.2.min.js')
                                .provides('jQuery');


        file('js/external/jquery-ui.js')
                                .provides('jQuery.ui')
                                .requires('jQuery');

        file('/js/external/jquery/tmpl.js')
                    .provides('jQuery.tmpl')
                    .requires('jQuery');

        //file('https://github.com/downloads/SteveSanderson/knockout/knockout-2.0.0.debug.js')
        file('/js/external/ko.js')
                            .provides('ko')
                            .requires('jQuery');

        file('/js/external/ko/namespaces.js')
                            .setup(function () { window.ko.namespaces = {}; })
                            .provides('ko.namespaces')
                            .requires('ko');

        file('/js/external/ko/knockout.validation.min.js')
        //.setup(function () { window.ko.namespaces = {}; })
                            .provides('ko.validation')
                            .requires('ko');

        file('/js/internal/global.ko.validation.extension.js')
                    .provides('ko.validation.extension')
                    .requires('ko.validation')

        file('/js/external/JS/Class/JS.extend.js')
                    .setup(function () { window.JSextend = {}; })
                    .provides('JSextend')
                    .requires('JS.Module', 'JS.Class', 'JS.Interface', 'eaf.core', 'eaf.util');

        file('/js/external/jquery.qtip.min.js')
                    .provides('jQuery.fn.qtip')
                    .requires('jQuery')
                    .styling('/css/jquery.qtip.css');

        file('/js/internal/global.util.debug.js')
                    .provides('littleUmbrella.circleverse.ui.pointsAndPolygon')
                    .requires('jQuery', 'ko', 'ko.validation', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/Eaf/htmlGetter.js')
                    .provides('eaf.communications.htmlGetter', 'eaf.communications.jsonGetter')
                    .requires('jQuery', 'JS.Class', 'JS.Singleton', 'eaf.core', 'eaf.util');


        file('/js/internal/Eaf/core.js')
                    .provides('eaf.core', 'eaf.util')
                    .requires('jQuery', 'JS.Singleton');

        file('/js/external/curl/curl.js')
                    .provides('curl');


        file('/js/external/jquery.metadata.js')
                    .provides('jQuery.metadata')
                    .requires('jQuery');

        file('/js/external/jquery.event.wheel.js')
                    .provides('jQuery.event.special.wheel')
                    .requires('jQuery');

        file('/js/external/jquery.specialkeys.js')
                    .provides('jQuery.event.special.ctrlclick')
                    .requires('jQuery');


        file('/js/external/BlockUI.js?r=2')
                    .provides('jQuery.fn.block')
                    .requires('jQuery')
                    ;

        file('/js/external/jquery.available.min.js?r=2')
                    .provides('jQuery.fn.available')
                    .requires('jQuery')
                    ;


        file('/js/external/canvasloader.min.js?r=2')
                    .provides('CanvasLoader')
                    ;

        file('/js/internal/amplify.core.tf.js?r=2')
                        .provides('amplify')
                        .requires('jQuery', 'eaf.util')
                        ;


        file('/js/external/jquery.url.js?r=2')
                    .provides('jQuery.fn.url')
                        .requires('jQuery')
        ;


        file('js/external/koGrid.js')
            .setup(function () { window.koGrid = window.koGrid || {}; })
                                .provides('koGrid')
                                .requires('ko', 'jQuery')
                                .styling('/css/koGrid.css')
                                ;



        file('/js/internal/circleverse/viewModels/base.js')
                    .provides('circleverse.viewModel.Base')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util');


        file('js/internal/becu_org/domain/Account.js')
                    .provides('becu_org.domain.model.Account', 'becu_org.domain.model.AccountObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.AccountTransactionObservable'
                    , 'becu_org.domain.model.AlertScheduleBalance'
                    , 'becu_org.domain.model.PaymentSchedule'
                    , 'becu_org.domain.model.AccountRole'
                    , 'becu_org.domain.model.AccountRelationship'
                    , 'becu_org.domain.model.Product'
                    , 'becu_org.domain.model.Merchant', 'becu_org.domain.model.MerchantObservable'
                    , 'becu_org.domain.model.OutgoingPaymentSchedule', 'becu_org.domain.model.OutgoingPaymentScheduleObservable'
                    , 'becu_org.domain.model.IncomingPaymentSchedule', 'becu_org.domain.model.IncomingPaymentScheduleObservable'
                    , 'becu_org.domain.model.OutgoingPendingPayment', 'becu_org.domain.model.OutgoingPendingPaymentObservable'
                    , 'becu_org.domain.model.IncomingPendingPayment', 'becu_org.domain.model.IncomingPendingPaymentObservable'
                    );



        file('js/internal/becu_org/domain/PendingPayment.js')
                    .provides('becu_org.domain.model.PendingPayment', 'becu_org.domain.model.PendingPaymentObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/OutgoingPendingPayment.js')
                    .provides('becu_org.domain.model.OutgoingPendingPayment', 'becu_org.domain.model.OutgoingPendingPaymentObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PendingPayment', 'becu_org.domain.model.PendingPaymentObservable');

        file('js/internal/becu_org/domain/IncomingPendingPayment.js')
                    .provides('becu_org.domain.model.IncomingPendingPayment', 'becu_org.domain.model.IncomingPendingPaymentObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PendingPayment', 'becu_org.domain.model.PendingPaymentObservable');


        file('js/internal/becu_org/domain/PaymentSchedule.js')
                    .provides('becu_org.domain.model.PaymentSchedule', 'becu_org.domain.model.PaymentScheduleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'
                    );

        file('js/internal/becu_org/domain/OutgoingPaymentSchedule.js')
                    .provides('becu_org.domain.model.OutgoingPaymentSchedule', 'becu_org.domain.model.OutgoingPaymentScheduleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PaymentSchedule', 'becu_org.domain.model.PaymentScheduleObservable');

        file('js/internal/becu_org/domain/IncomingPaymentSchedule.js')
                    .provides('becu_org.domain.model.IncomingPaymentSchedule', 'becu_org.domain.model.IncomingPaymentScheduleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PaymentSchedule', 'becu_org.domain.model.PaymentScheduleObservable');


        file('js/internal/becu_org/domain/Merchant.js')
                    .provides('becu_org.domain.model.Merchant', 'becu_org.domain.model.MerchantObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/Product.js')
                    .provides('becu_org.domain.model.Product', 'becu_org.domain.model.ProductObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductId');

        file('js/internal/becu_org/domain/ProductId.js')
                    .provides('becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductIdObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/LoanProductId.js')
                    .provides('becu_org.domain.model.LoanProductId', 'becu_org.domain.model.LoanProductIdObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductIdObservable');

        file('js/internal/becu_org/domain/AccountTransaction.js')
                    .provides('becu_org.domain.model.AccountTransaction', 'becu_org.domain.model.AccountTransactionObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/AlertScheduleBalance.js')
                    .provides('becu_org.domain.model.AlertScheduleBalance', 'becu_org.domain.model.AlertScheduleBalanceObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/AccountRole.js')
                    .provides('becu_org.domain.model.AccountRole', 'becu_org.domain.model.AccountRoleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/AccountRelationship.js')
                    .provides('becu_org.domain.model.AccountRelationship', 'becu_org.domain.model.AccountRelationshipObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/customerInfo.js')
                    .provides('becu_org.domain.model.CustomerInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.AccountObservable');

        file('/js/internal/becu_org/domain/profileInfo.js')
                    .provides('becu_org.domain.model.ProfileInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ContactInfo');

        file('/js/internal/becu_org/domain/contactInfo.js')
                    .provides('becu_org.domain.model.ContactInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('/js/internal/becu_org/domain/Employee.js')
                    .provides('becu_org.domain.model.Employee')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.EmployeeInfo');

        file('/js/internal/becu_org/domain/employeeInfo.js')
                    .provides('becu_org.domain.model.EmployeeInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ProfileInfo');

        file('js/internal/becu_org/domain/Customer.js')
                    .provides('becu_org.domain.model.Customer', 'becu_org.domain.model.CustomerObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.AccountObservable', 'becu_org.domain.model.PersonObservable'

                    );


        file('js/internal/becu_org/domain/Person.js')
                    .provides('becu_org.domain.model.Person', 'becu_org.domain.model.PersonObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'

                    );

        file('js/internal/becu_org/domain/Base.js')
                    .provides('becu_org.domain.model.Base')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util');



        file('/js/internal/circleverse/viewModels/controls/AccordionViewModel.js')
                    .provides('circleverse.controls.viewModel.AccordionViewModel')
                    .requires('jQuery', 'eaf.util'
                    );



        file('/js/internal/circleverse/viewModels/action.js?r=0')
                        .provides('circleverse.viewModel.action')
                        .requires('JS.Class', 'eaf.util', 'ko')
                        ;

        file('/js/internal/circleverse/viewModels/icon.js?r=0')
                        .provides('circleverse.viewModel.icon')
                        .requires('JS.Class', 'eaf.util', 'ko')


        file('/js/internal/circleverse/viewModels/SidePanel.SummaryViewModel.js?r=4')
                        .provides('circleverse.viewModel.SidePanel.SummaryViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        , 'circleverse.viewModel.SidePanel.AccountViewModel'
                        , 'circleverse.viewModel.SidePanel.BasicInformationViewModel'
                        , 'circleverse.viewModel.SidePanel.TrackerViewModel'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/SidePanel.BasicInformationViewModel.js?r=4')
                        .provides('circleverse.viewModel.SidePanel.BasicInformationViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/SidePanel.AccountViewModel.js?r=4')
                        .provides('circleverse.viewModel.SidePanel.AccountViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/SidePanel.FormsViewModel.js?r=4')
                        .provides('circleverse.viewModel.SidePanel.FormsViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/SidePanel.HelpViewModel.js?r=4')
                        .provides('circleverse.viewModel.SidePanel.HelpViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/SidePanel.TrackerViewModel.js?r=4')
                        .provides('circleverse.viewModel.SidePanel.TrackerViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/controls/WizardViewModel.js?r=4')
                        .provides('circleverse.controls.viewModel.WizardViewModel', 'circleverse.controls.viewModel.WizardStepViewModel')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/CloseAccountApplication.js?r=20')
                        .provides('circleverse.viewModel.CloseAccountApplication')
                        .requires('JS.Class', 'eaf.util', 'circleverse.viewModel.CloseAccountViewModel'
                        , 'circleverse.controls.viewModel.AccordionViewModel'
                        , 'becu_org.UserSession'
                        )
                        ;

        file('/js/internal/UserSession.js')
                        .provides('becu_org.UserSession')
                        .requires('JS.Class', 'eaf.util', 'ko'
                        )
                        ;

        file('/js/internal/circleverse/viewModels/CloseAccountViewModel2.js')
                    .provides('circleverse.viewModel.CloseAccountViewModel'
                    , 'circleverse.viewModel.CloseAccountViewModel.Step.Basic'
                    , 'circleverse.viewModel.CloseAccountViewModel.Step.Recurring'
                    , 'circleverse.viewModel.CloseAccountViewModel.Step.Balance'
                    , 'circleverse.viewModel.CloseAccountViewModel.Step.Confirmation')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util', 'circleverse.viewModel.Base'

                    );

        file('/js/internal/CloseAccountRequestInterceptor.js')
                    .provides('becu_org.http.requestInterceptor.CloseAccount')
                    .requires('jQuery.fn.url', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'

                    );

    }
});