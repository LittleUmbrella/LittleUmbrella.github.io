JS.Packages(function () {
    var PATH_PREFIX_INTERNAL = 'http://tvmobdev04:8005/';
    

    with (this) {
        file('/js/external/ko/knockout.validation.min.js?v=' + CUSTOM_VERSION)
        //.setup(function () { window.ko.namespaces = {}; })
                            .provides('ko.validation')
                            .requires('ko');

        file('/js/internal/global.ko.validation.extension.js?v=' + CUSTOM_VERSION)
                    .provides('ko.validation.extension')
                    .requires('ko.validation')

        file('/js/external/JS/Class/JS.extend.js?v=' + CUSTOM_VERSION)
                    .setup(function () { window.JSextend = {}; })
                    .provides('JSextend')
                    .requires('JS.Module', 'JS.Class', 'JS.Interface', 'eaf.core', 'eaf.util');

        file('/js/external/jquery.qtip.min.js')
                    .provides('jQuery.fn.qtip')
                    .requires('jQuery')
                    .styling('/css/jquery.qtip.css');

        file('/js/external/jquery/formatCurrency.js')
                    .provides('jQuery.fn.formatCurrency')
                    .requires('jQuery');


        file('/js/external/hammer.min.js')
                    .setup(function () { window.hammer = {}; })
                    .provides('hammer')
        ;

        
        file('/js/external/SAT.min.js')
                    .provides('SAT')
        ;

        file('/js/external/knockouch.min.js')
                    .setup(function () { window.knockouch = {}; })
                    .provides('knockouch')
                    .requires('ko', 'hammer');
        ;

        file('/js/external/TweenMax.min.js')
                    .provides('TweenMax')
        ;

        file('/js/external/CSSPlugin.min.js')
                    .provides('CSSPlugin')

        file('/js/external/jquery-ui/jquery.ui.datepicker.min.js')
                    .provides('jQuery.datepicker')
                    .requires('jQuery');


        file('/js/internal/global.util.debug.js?ver=' + CUSTOM_VERSION)
                    .provides('littleUmbrella.circleverse.ui.pointsAndPolygon')
                    .requires('jQuery', 'ko', 'ko.validation', 'jQuery.fn.formatCurrency', 'jQuery.datepicker', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/Eaf/htmlGetter.js?v=' + CUSTOM_VERSION)
                    .provides('eaf.communications.htmlGetter', 'eaf.communications.jsonGetter')
                    .requires('jQuery', 'JS.Class', 'JS.Singleton', 'eaf.core', 'eaf.util');


        file('/js/internal/Eaf/core.js?v=' + CUSTOM_VERSION)
                    .provides('eaf.core', 'eaf.util')
                    .requires('jQuery', 'JS.Singleton');

        file('/js/external/curl/curl.js?v=' + CUSTOM_VERSION)
                    .provides('curl');


        file('/js/external/jquery.metadata.js?v=' + CUSTOM_VERSION)
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


        file('/js/external/parse-address.min.js?r=2')
                    .provides('parseAddress')
                    ;

        file('/js/external/canvasloader.min.js?r=2')
                    .provides('CanvasLoader')
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



        file('/js/internal/circleverse/viewModels/base.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.Base')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util');


        file('/js/internal/services/RepositoryStub.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.ob.services.Repository')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util');




        file('js/internal/becu_org/domain/Account.js?v=' + CUSTOM_VERSION)
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



        file('js/internal/becu_org/domain/PendingPayment.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.PendingPayment', 'becu_org.domain.model.PendingPaymentObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/OutgoingPendingPayment.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.OutgoingPendingPayment', 'becu_org.domain.model.OutgoingPendingPaymentObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PendingPayment', 'becu_org.domain.model.PendingPaymentObservable');

        file('js/internal/becu_org/domain/IncomingPendingPayment.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.IncomingPendingPayment', 'becu_org.domain.model.IncomingPendingPaymentObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PendingPayment', 'becu_org.domain.model.PendingPaymentObservable');


        file('js/internal/becu_org/domain/PaymentSchedule.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.PaymentSchedule', 'becu_org.domain.model.PaymentScheduleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'
                    );

        file('js/internal/becu_org/domain/OutgoingPaymentSchedule.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.OutgoingPaymentSchedule', 'becu_org.domain.model.OutgoingPaymentScheduleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PaymentSchedule', 'becu_org.domain.model.PaymentScheduleObservable');

        file('js/internal/becu_org/domain/IncomingPaymentSchedule.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.IncomingPaymentSchedule', 'becu_org.domain.model.IncomingPaymentScheduleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.PaymentSchedule', 'becu_org.domain.model.PaymentScheduleObservable');


        file('js/internal/becu_org/domain/Merchant.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Merchant', 'becu_org.domain.model.MerchantObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/Product.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Product', 'becu_org.domain.model.ProductObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductId');

        file('js/internal/becu_org/domain/ProductId.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductIdObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/LoanProductId.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.LoanProductId', 'becu_org.domain.model.LoanProductIdObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ProductId', 'becu_org.domain.model.ProductIdObservable');

        file('js/internal/becu_org/domain/AccountTransaction.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.AccountTransaction', 'becu_org.domain.model.AccountTransactionObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/AlertScheduleBalance.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.AlertScheduleBalance', 'becu_org.domain.model.AlertScheduleBalanceObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/AccountRole.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.AccountRole', 'becu_org.domain.model.AccountRoleObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/AccountRelationship.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.AccountRelationship', 'becu_org.domain.model.AccountRelationshipObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('js/internal/becu_org/domain/customerInfo.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.CustomerInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.AccountObservable');

        file('/js/internal/becu_org/domain/profileInfo.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.ProfileInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ContactInfo');

        file('/js/internal/becu_org/domain/contactInfo.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.ContactInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base');

        file('/js/internal/becu_org/domain/Employee.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Employee')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.EmployeeInfo');

        file('/js/internal/becu_org/domain/employeeInfo.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.EmployeeInfo')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.ProfileInfo');

        file('js/internal/becu_org/domain/Customer.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Customer', 'becu_org.domain.model.CustomerObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.AccountObservable', 'becu_org.domain.model.PersonObservable'

                    );

        
        file('js/internal/becu_org/domain/Address.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.AddressObservable', 'becu_org.domain.model.AddressObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'

                    );


        file('/js/internal/becu_org/domain/Person.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Person', 'becu_org.domain.model.PersonObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'

                    );

        file('/js/internal/becu_org/domain/Organization.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Organization', 'becu_org.domain.model.OrganizationObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base'

                    );

        file('/js/internal/becu_org/domain/Becu.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Becu', 'becu_org.domain.model.BecuObservable')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util', 'becu_org.domain.model.Base', 'becu_org.domain.model.Organization'

                    );

        file('/js/internal/becu_org/domain/Base.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.model.Base')
                    .requires('JS.Module',
                    'JS.Class', 'JSextend', 'ko', 'eaf.core', 'eaf.util');



        file('/js/internal/circleverse/viewModels/controls/AccordionViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.controls.viewModel.AccordionViewModel')
                    .requires('jQuery', 'eaf.util'
                    );

        file('/js/internal/Animations.js?v=' + CUSTOM_VERSION)
                    .provides('littleUmbrella.circleverse.ui.Animation')
                    .requires('jQuery', 'eaf.util'
                    );




        file('/js/external/jquery.js?v=' + CUSTOM_VERSION)
        //file('http://code.jquery.com/jquery-1.5.2.min.js')
                                .provides('jQuery');


        file('/js/external/jquery.migrate.js')
        //file('http://code.jquery.com/jquery-1.5.2.min.js')
                                .provides('jQuery.migrateWarnings')
                                .requires('jQuery');

        file('/js/external/jquery-ui.js')
                                .provides('jQuery.ui')
                                .requires('jQuery');

        //file('https://www.google.com/jsapi')
        //file('http://www.google.com/jsapi?key=' + escape('ABQIAAAARUOoY3fKP_ItxdNdyHQG2xSMS_He41xzFblsJHQ-a9anjpvdaBRVLPmiF2yCLYOZL7pDl6LbX0bCQg'))
        //file('http://www.google.com/jsapi?key=ABQIAAAARUOoY3fKP_ItxdNdyHQG2xSMS_He41xzFblsJHQ-a9anjpvdaBRVLPmiF2yCLYOZL7pDl6LbX0bCQg')

        //file('https://www.google.com/jsapi?key=ABQIAAAARUOoY3fKP_ItxdNdyHQG2xT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQhqUkI-DMlArBePgTN3IdQwbXA0A')




        /******FOR CONNECTED SCENARIOS e.g. production *****/

        //            file('https://www.google.com/jsapi?key=' + escape('ABQIAAAARUOoY3fKP_ItxdNdyHQG2xT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQhqUkI-DMlArBePgTN3IdQwbXA0A'))
        //                    .provides('google.load');


        //google.load('jquery', '1.5.2', { callback: cb });
        //            loader(function (cb) {
        //                google.load('jquery', "1.5.2");
        //                //google.load('jqueryui', "1");
        //                google.setOnLoadCallback(cb);
        //            })
        //        .provides('jQuery'
        //            //, 'jqueryui'
        //        )
        //        .requires('google.load');

        //            loader(function (cb) {
        //                google.load('jqueryui', "1.8.12");
        //                google.setOnLoadCallback(cb);
        //            })
        //        .provides('jQuery.ui')
        //        .requires('google.load');
        /******END CONNECTED SCENARIOS e.g. production *****/


        //        file('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js')
        //                    .provides('jqueryui')
        //                    .requires('jquery');

        file('/js/external/jquery/tmpl.js')
                    .provides('jQuery.tmpl')
                    .requires('jQuery');

        //file('https://github.com/downloads/SteveSanderson/knockout/knockout-2.0.0.debug.js')
        file('/js/external/ko.js')
                            .provides('ko')
                            ;

        file('/js/external/knockout.mapping-latest.debug.js')
                                        .provides('ko.mapping')
                                        .requires('ko');

        file('/js/external/ko/namespaces.js')
                            .setup(function () { window.ko.namespaces = {}; })
                            .provides('ko.namespaces')
                            .requires('ko');

        file('/js/external/ko/knockout.validation.min.js')
        //.setup(function () { window.ko.namespaces = {}; })
                            .provides('ko.validation')
                            .requires('ko');

        file('/js/external/JS/Class/JS.extend.js')
                    .setup(function () { window.JSextend = {}; })
                    .provides('JSextend')
                    .requires('JS.Module', 'JS.Class', 'JS.Interface', 'eaf.core', 'eaf.util');

        file('/js/external/store.min.js')
                    .setup(function () { window.littleUmbrella = window.littleUmbrella || {}; window.littleUmbrella.store = {}; })
                    .provides('window.littleUmbrella.store')
        ;

        file('/js/internal/Eaf/theme.js')
                    .provides('eaf.html.ui.theme')
                    .requires('eaf.core', 'eaf.util')
        //.styling('/css/jquery.qtip.css')
                    ;

        file('/js/external/jquery.qtip.min.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.fn.qtip')
                    .requires('jQuery')
                    .styling('/css/jquery.qtip.css');

        file('/js/internal/jquery.event.drag.mod.2.2.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.event.special.drag')
                    .requires('jQuery');

        file('/js/internal/jquery.event.drop.tf.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.event.special.drop')
                    .requires('jQuery');

        file('/js/internal/jquery.event.dragx.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.event.special.dragx')
                    .requires('jQuery', 'jQuery.event.special.drag', 'jQuery.event.special.ctrlclick');

        file('/js/internal/jquery.event.dropx.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.event.special.dropx')
                    .requires('jQuery', 'jQuery.event.special.drop', 'jQuery.event.special.ctrlclick');

        file('/js/external/jquery.metadata.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.metadata')
                    .requires('jQuery');

        file('/js/external/jquery.event.wheel.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.event.special.wheel')
                    .requires('jQuery');

        file('/js/external/jquery.specialkeys.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.event.special.ctrlclick')
                    .requires('jQuery');


        file('/js/external/jquery/corner.js?v=' + CUSTOM_VERSION)
                            .provides('jQuery.fn.corner')
                            .requires('jQuery');

        //            file('/js/jquery.circle.js?v=' + CUSTOM_VERSION)
        //                    .provides('jQuery.fn.jCircle')
        //                    .requires('jQuery', 'jQuery.metadata', 'JS.Singleton', 'eaf.core', 'eaf.util');

        //            file('https://gist.github.com/raw/556448/f6a39882a44c2cc755a8a6f36dadb7947c9f2f3e/jquery.support.cssproperty.js?v=' + CUSTOM_VERSION)
        //                    .provides('https://gist.github.com/raw/556448/f6a39882a44c2cc755a8a6f36dadb7947c9f2f3e/jquery.support.cssproperty.js?v=' + CUSTOM_VERSION)
        //                    .requires('jQuery');


        file('/js/internal/shapes.js?v=' + CUSTOM_VERSION)
                    .provides('Polygon')
                    ; //.requires('JS.Module', 'JS.Class');

        file('/js/internal/Eaf/core.js?v=' + CUSTOM_VERSION)
                    .provides('eaf.core', 'eaf.util')
                    .requires('jQuery', 'JS.Singleton');

        //                    file('js/circleverse.js?v=' + CUSTOM_VERSION)
        //                    .provides('js/circleverse.js?v=' + CUSTOM_VERSION)
        //                    .requires('JS.Module', 'JSextend', 'JS.Class');

        file('/js/external/curl/curl.js?v=' + CUSTOM_VERSION)
                    .provides('curl');

        file('/js/external/jquery-css-transform.js?v=' + CUSTOM_VERSION)
                    .setup(function () { window.jquerycsstransform = {}; })
                    .provides('jquerycsstransform')
                    .requires('jQuery');


        file('/js/external/jquery-animate-css-rotate-scale.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.fn.scale')
                    .requires('jQuery', 'jquerycsstransform');

        file('/js/external/jquery/jquery.mb.CSSAnimate.min.js?v=' + CUSTOM_VERSION)
                    .provides('jQuery.fn.CSSAnimate')
                    .requires('jQuery');

        file('/js/internal/Eaf/htmlGetter.js?v=' + CUSTOM_VERSION)
                    .provides('eaf.communications.htmlGetter')
                    .requires('jQuery', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/communication/service/interfaces.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.communication.service')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/communication/service/classes.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.communication.service')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/becu_org/domain/service.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.service')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util', 'becu_org.domain.serviceMethod');

        file('/js/internal/becu_org/domain/serviceMethod.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.domain.serviceMethod', 'becu_org.communication.callSpec', 'becu_org.communication.callSpecRequirementDetail')
                    .requires('JS.Module', 'JS.Class', 'JS.Observable', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/becu_org/domain/interfaces.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.ui.IDroppableViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util');

        file('/js/internal/circleverse/viewModels/modules.js?v=' + CUSTOM_VERSION)
                    .provides('becu_org.ui.viewModel.baseModule')//, 'becu_org.ui.viewModel.circleModule', 'becu_org.ui.viewModel.draggableModule', 'becu_org.ui.viewModel.droppableModule')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util', 'becu_org.ui.IDroppableViewModel'//, 'jQuery.fn.CSSAnimate', 'jQuery.fn.scale'
                    );

        file('/js/internal/circleverse/viewModels/base.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.Base')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util');

        file('/js/internal/circleverse/viewModels/centerCircle.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.centerCircle')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util', 'circleverse.viewModel.EmptyNavigableSatelliteViewModel');


        //file('/js/internal/circleverse/viewModels/PinViewModel.js?v=' + CUSTOM_VERSION)
        //            .provides('circleverse.viewModel.PinViewModel')
        //            .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util', 'becu_org.ui.viewModel.baseModule');


        file('/js/internal/circleverse/viewModels/satellite.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.satellite', 'circleverse.viewModel.PinViewModel')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util', 'becu_org.ui.viewModel.baseModule');

        file('/js/internal/circleverse/viewModels/invertedSatellite.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.InvertedSatellite')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'JS.Singleton', 'eaf.core', 'eaf.util');

        file('/js/internal/circleverse/viewModels/resizeableBase.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.ResizeableBase')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util', 'circleverse.viewModel.Base')
        //                    .scriptType('text/html')
        //                    .scriptId('circleverse_mvvm_vm_ResizeableBase')
                    ;


        //            loader(function (cb) {
        //                //JS.Package.DomLoader.loadHtml(
        //                cb();
        //            })
        //            .provides('littleUmbrella.circleverse.view.CustomerView.load')
        //            .requires('jQuery', 'eaf.core'
        //                    );

        file('/js/external/grayscale.js?v=' + CUSTOM_VERSION)
                    .provides('grayscale')
                    .requires('jQuery', 'JS.Singleton', 'eaf.core'
                    );


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

        file('/js/external/pubsub.1.4.2.js?r=2')
                        .provides('PubSub')
                        ;


        //            file('/js/internal/circleverse/viewModels/CustomerView.js?v=' + CUSTOM_VERSION)
        //                    .provides('littleUmbrella.circleverse.view.CustomerView')
        //                    .setup(function () { eaf.util.namespace('littleUmbrella.circleverse.view'); littleUmbrella.circleverse.view.CustomerView = {}; })
        //                    .requires('jQuery', 'JS.Singleton', 'eaf.core'
        //                    );

        file('/js/internal/circleverse/viewModels/AllBusinessCentersViewModel.js?r=1')
                    .provides('circleverse.viewModel.AllBusinessCentersViewModel')
                    .requires('circleverse.viewModel.RussianDollCircle'
                    ,
                    'circleverse.viewModel.BusinessCenterViewModel'
                    );

        file('/js/internal/circleverse/viewModels/BusinessCenterViewModel.js?r=1')
                    .provides('circleverse.viewModel.BusinessCenterViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    );

        file('/js/internal/circleverse/viewModels/RussianDollCircle.js?r=1')
                    .provides('circleverse.viewModel.RussianDollCircle')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    );

        file('/js/internal/circleverse/viewModels/SearchableViewModel.js?r=1')
                    .provides('circleverse.viewModel.SearchableViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util');


        file('/js/internal/circleverse/viewModels/CustomerViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.CustomerViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.accountViewModel'
                    ,
                    'circleverse.viewModel.CustomerPurseViewModel'
                    ,
                    'circleverse.viewModel.CustomerAccountsViewModel'
                    ,
                    'circleverse.viewModel.CustomerFilesViewModel'
                    ,
                    'circleverse.viewModel.CustomerFinanceManagementViewModel'
                    ,
                    'circleverse.viewModel.CustomerWorkflowViewModel'
                    ,
                    'circleverse.viewModel.CustomerCampaignsViewModel'
                    ,
                    'circleverse.viewModel.CustomerContactsViewModel'
                    ,
                    'circleverse.viewModel.CustomerInteractionsViewModel'
                    ,
                    'circleverse.viewModel.CustomerInfoViewModel'
                    );

        file('/js/internal/circleverse/viewModels/BecuViewModel.js?r=3')
                    .provides('littleUmbrella.circleverse.viewModel.BecuViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.accountViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.BecuPurseViewModel'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'circleverse.viewModel.AllLocationsViewModel'
                    ,
                    'circleverse.viewModel.AllEmployeesViewModel'
                    ,
                    'circleverse.viewModel.AllMembersViewModel'
                    ,
                    'circleverse.viewModel.BecuServicesViewModel'
                    ,
                    'littleUmbrella.circleverse.viewModel.BecuOrganizationsViewModel'
                    );

        file('/js/internal/circleverse/viewModels/GetCustomerViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.GetCustomerViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    );


        file('/js/internal/circleverse/viewModels/CustomerAccountTransactionsViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.CustomerAccountTransactionsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    );

        file('/js/internal/circleverse/viewModels/AllAccountTransactionsViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.AllAccountTransactionsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerAccountTransactionsViewModel'
                    ,
                    'koGrid'
                    );


        file('/js/internal/circleverse/viewModels/AllMemberCards.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.AllMemberCards')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,'littleUmbrella.circleverse.viewModel.MemberCardViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AllMemberInfoFormsViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.AllMemberInfoFormsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,'littleUmbrella.circleverse.viewModel.CustomerInfoFormViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerInfoFormViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.CustomerInfoFormViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    );

        file('/js/internal/circleverse/viewModels/MemberCardViewModel.js?r=1')
                    .provides('littleUmbrella.circleverse.viewModel.MemberCardViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    );

        file('/js/internal/circleverse/Repository.js?r=1')
                    .provides('littleUmbrella.circleverse.Repository')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );

        file('/js/internal/circleverse/viewModels/settingsViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.settingsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'eaf.html.ui.theme'
                    ,
                    'window.littleUmbrella.store'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CloseAccountViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.CloseAccountViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );

        file('/js/internal/circleverse/viewModels/garbageViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.garbageViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CloseViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.CloseViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/OpenViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.OpenViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/SpecialViewViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.SpecialViewViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );

        file('/js/internal/circleverse/viewModels/SpecialContentViewViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.SpecialContentViewViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );

        file('/js/internal/circleverse/viewModels/SearchViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.SearchViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.SpecialViewViewModel'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/NewViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.NewViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/EditViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.EditViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/SaveViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.SaveViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/RefreshViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.RefreshViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );

        file('/js/internal/circleverse/viewModels/FilterViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.FilterViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );

        file('/js/internal/circleverse/viewModels/FilterFormViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.FilterFormViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );


        file('/js/internal/circleverse/viewModels/ExitViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.ExitViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );

        file('/js/internal/circleverse/viewModels/loginViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.loginViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );

        file('/js/internal/circleverse/viewModels/helpViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.helpViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    );

        file('/js/internal/circleverse/viewModels/favoriteViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.favoriteViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    );

        file('/js/internal/circleverse/viewModels/CalculatorViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.CalculatorViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.ui.IDroppableViewModel'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.noActionModule'
                    ,
                    'circleverse.tools.Calculator'
                    );

        file('/js/internal/circleverse/Calculator.js?r=2')
                    .provides('circleverse.tools.Calculator')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'

                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    );

        file('/js/internal/becu_org/domain/Money.js?r=2')
                    .provides('becu_org.domain.Money')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'becu_org.domain.model.Base'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    );
        file('/js/internal/circleverse/viewModels/MoneyViewModel.js?r=2')
                    .provides('circleverse.viewModel.MoneyViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.domain.Money'


                    );


        file('/js/internal/circleverse/viewModels/SatelliteNavigatorViewModel.js?r=2')
                    .provides('circleverse.viewModel.SatelliteNavigatorViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.domain.Money'


                    );

        file('/js/internal/circleverse/viewModels/NavigableCircles.js?r=2')
                    .provides('circleverse.viewModel.NavigableCircles')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );

        file('/js/internal/circleverse/viewModels/EmptyNavigableSatelliteViewModel.js?r=2')
                    .provides('circleverse.viewModel.EmptyNavigableSatelliteViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'becu_org.ui.viewModel.baseModule',
                    'circleverse.viewModel.NavigableSatellite'
                    );
        file('/js/internal/circleverse/viewModels/NavigableSatellite.js?r=2')
                    .provides('circleverse.viewModel.NavigableSatellite')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );

        file('/js/internal/circleverse/viewModels/MoneyTransferViewModel.js?r=2')
                    .provides('circleverse.viewModel.MoneyTransferViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'becu_org.domain.Money'
                    ,
                    'circleverse.viewModel.MoneyViewModel'
                    ,
                    'circleverse.viewModel.CalculatorViewModel'
                    ,
                    'circleverse.domain.MoneyTransferPersonStrategy'
                    ,
                    'circleverse.domain.MoneyTransferAccountStrategy'
                    );

        file('/js/internal/becu_org/domain/MoneyTransferAccountStrategy.js?r=2')
                    .provides('circleverse.domain.MoneyTransferAccountStrategy')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'

                    );

        file('/js/internal/becu_org/domain/MoneyTransferPersonStrategy.js?r=2')
                    .provides('circleverse.domain.MoneyTransferPersonStrategy')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'

                    );

        file('/js/internal/circleverse/viewModels/PaymentScheduleViewModel.js?r=2')
                    .provides('circleverse.viewModel.PaymentScheduleViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.InvertedSatellite' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/AlertViewModel.js?r=2')
                    .provides('circleverse.viewModel.AlertViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.InvertedSatellite' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/AccountRoleViewModel.js?r=2')
                    .provides('circleverse.viewModel.AccountRoleViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.InvertedSatellite' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/PaymentSchedulesViewModel.js?r=2')
                    .provides('circleverse.viewModel.PaymentSchedulesViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.PaymentScheduleViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AlertsViewModel.js?r=2')
                    .provides('circleverse.viewModel.AlertsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.AlertViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AccountRolesViewModel.js?r=2')
                    .provides('circleverse.viewModel.AccountRolesViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.AccountRoleViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AccountTransactionViewModel.js?r=2')
                    .provides('circleverse.viewModel.AccountTransactionViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'circleverse.viewModel.satellite'

                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    );

        file('/js/internal/circleverse/viewModels/AccountTransactionsViewModel.js?r=2')
                    .provides('circleverse.viewModel.AccountTransactionsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'circleverse.viewModel.AccountTransactionViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AccountChildrenContainerViewModel.js?r=2')
                    .provides('circleverse.viewModel.AccountChildrenContainerViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    );

        file('/js/internal/circleverse/viewModels/CustomerPurseViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerPurseViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'circleverse.viewModel.CustomerDebitCardViewModel'
                    ,
                    'circleverse.viewModel.CustomerCashViewModel'
                    ,
                    'circleverse.viewModel.CustomerVisaViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerAccountsViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerAccountsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    ,
                    'circleverse.viewModel.NavigableCircles'
                    ,
                    'circleverse.viewModel.SatelliteNavigatorViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerWorkflowViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerWorkflowViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerFinanceManagementViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerFinanceManagementViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerFilesViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerFilesViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerVisaViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerVisaViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerDebitCardViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerDebitCardViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerCashViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerCashViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.NewAccountViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerCampaignsViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerCampaignsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/CustomerContactsViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerContactsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    ,
                    'circleverse.viewModel.CustomerContactViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerInteractionsViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerInteractionsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/CustomerInfoViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerInfoViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.CustomerAddressViewModel'
                    ,
                    'circleverse.viewModel.CustomerAddressesViewModel'
                    );

                
                file('/js/internal/circleverse/viewModels/ToolViewModel.js?r=2')
                    .provides('circleverse.viewModel.ToolViewModel')
                    .requires('JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    
                );
        
                    

        file('/js/internal/circleverse/viewModels/CustomerAddressesMapViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerAddressesMapViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                );

                
        file('/js/internal/circleverse/viewModels/CustomerAddressesViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerAddressesViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'parseAddress'
                    ,
                    'circleverse.viewModel.SpecialViewViewModel'
                    ,
                    'circleverse.viewModel.MailViewModel'
                    );

                
        file('/js/internal/circleverse/viewModels/MailViewModel.js?r=2')
                    .provides('circleverse.viewModel.MailViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'parseAddress'
                    ,
                    'circleverse.viewModel.SpecialViewViewModel'
                    
                    
                    );

        file('/js/internal/circleverse/viewModels/LinkViewModel.js?r=2')
                    .provides('circleverse.viewModel.LinkViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    );

        file('/js/internal/circleverse/viewModels/LinksViewModel.js?r=2')
                    .provides('circleverse.viewModel.LinksViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    );

        file('/js/internal/circleverse/viewModels/TravelViewModel.js?r=2')
                    .provides('circleverse.viewModel.TravelViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/MoveViewModel.js?r=2')
                    .provides('circleverse.viewModel.MoveViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.ToolViewModel'
                    );

        file('/js/internal/circleverse/viewModels/CustomerAddressViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerAddressViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.satellite' 
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' 
                    ,
                    'becu_org.domain.model.AddressObservable'
                    );



        file('/js/internal/circleverse/viewModels/BecuPurseViewModel.js?r=2')
                    .provides('circleverse.viewModel.BecuPurseViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.CustomerFilesViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AllEmployeesViewModel.js?r=2')
                    .provides('circleverse.viewModel.AllEmployeesViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    ,
                    'circleverse.viewModel.AllBusinessCentersViewModel'
                    ,
                    'becu_org.domain.model.Customer'
                    );

        file('/js/internal/circleverse/viewModels/SearchMembersViewModel.js?r=2')
                    .provides('circleverse.viewModel.SearchMembersViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel'
                    ,
                    'circleverse.viewModel.SearchMembersResultViewModel'

                    );

        file('/js/internal/circleverse/viewModels/SearchMembersResultViewModel.js?r=2')
                    .provides('circleverse.viewModel.SearchMembersResultViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/AllMembersViewModel.js?r=2')
                    .provides('circleverse.viewModel.AllMembersViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    ,
                    'circleverse.viewModel.SearchMembersViewModel'
                    );

        file('/js/internal/circleverse/viewModels/AllPersonsViewModel.js?r=2')
                    .provides('littleUmbrella.circleverse.viewModel.AllPersonsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    );

                    

        file('/js/internal/circleverse/viewModels/BecuOrganizationsViewModel.js?r=2')
                    .provides('littleUmbrella.circleverse.viewModel.BecuOrganizationsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/AllOrganizationsViewModel.js?r=2')
                    .provides('littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'littleUmbrella.circleverse.viewModel.CustomerViewModel'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/AllLocationsViewModel.js?r=2')
                    .provides('circleverse.viewModel.AllLocationsViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle' //remove after testing
                    );


        file('/js/internal/circleverse/viewModels/BecuServicesViewModel.js?r=2')
                    .provides('circleverse.viewModel.BecuServicesViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    );

        file('/js/internal/circleverse/viewModels/accountViewModel.js?r=2')
                    .provides('circleverse.viewModel.accountViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    ,
                    'circleverse.viewModel.MoneyTransferViewModel'
                    ,
                    'circleverse.viewModel.AccountRolesViewModel'
                    ,
                    'circleverse.viewModel.AccountTransactionsViewModel'
                    ,
                    'circleverse.viewModel.AlertsViewModel'
                    ,
                    'circleverse.viewModel.PaymentSchedulesViewModel'
                    ,
                    'circleverse.viewModel.AccountChildrenContainerViewModel'
                    ,
                    'circleverse.viewModel.CloseAccountViewModel'
                    ,
                    'circleverse.viewModel.NavigableSatellite'
                    );

        file('/js/internal/circleverse/viewModels/CustomerContactViewModel.js?r=2')
                    .provides('circleverse.viewModel.CustomerContactViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'circleverse.viewModel.satellite'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    ,
                    'circleverse.viewModel.NavigableSatellite'
                    );

        file('/js/internal/circleverse/viewModels/NewAccountViewModel.js?r=2')
                    .provides('circleverse.viewModel.NewAccountViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'Polygon'
                    ,
                    'eaf.core'
                    ,
                    'eaf.util'
                    ,
                    'littleUmbrella.circleverse.ui.pointsAndPolygon'
                    ,
                    'circleverse.viewModel.centerCircle', 'circleverse.viewModel.SpecialContentViewViewModel' //remove after testing
                    ,
                    'circleverse.viewModel.AccountRolesViewModel'
                    ,
                    'circleverse.viewModel.AlertsViewModel'
                    ,
                    'circleverse.viewModel.PaymentSchedulesViewModel'
                    );




        file('/js/internal/circleverse/viewModels/noActionModule.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.noActionModule')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );


        file('/js/internal/circleverse.js?v=' + CUSTOM_VERSION)
                    .provides('littleUmbrella.circleverse')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    );



        file('/js/external/koExternalTemplateEngine_all.js?v=' + CUSTOM_VERSION)
                    .provides('littleUmbrella.circleverse.ui.KoExternalTemplateEngine')
                    .setup(function () {
                        eaf.util.namespace('littleUmbrella.circleverse.ui.KoExternalTemplateEngine');
                    })

                    .requires('jQuery', 'ko', 'eaf.util'
                    );

        //file('/views/service.htm?r=13')
        //            .provides('littleUmbrella.circleverse.view.service')
        //            .setup(function () { eaf.util.namespace('littleUmbrella.circleverse.view.service'); })
        //            .requires('eaf.util')
        //            .type('html')
        //;


        file('/js/internal/circleverse/ko.bindings.app.js?r=2')
                    .provides('littleUmbrella.circleverse.ui.app.bindings')
                    .setup(function () { eaf.util.namespace('littleUmbrella.circleverse.ui.app.bindings'); })
                    .requires('eaf.util', 'littleUmbrella.circleverse.ui.Animation', 'SAT')
        ;

        
        file('/js/internal/circleverse/viewModels/AllDialogConfirmViewModels.js?r=2')
                    .provides('littleUmbrella.circleverse.viewModel.AllDialogConfirmViewModels')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util', 'circleverse.viewModel.DialogConfirmViewModel'
                    )
        ;

        



        file('/js/internal/circleverse/viewModels/DialogConfirmViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.DialogConfirmViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'littleUmbrella.circleverse.viewModel.AllPersonsViewModel'
                    ,
                    'littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.domain.model.BecuObservable'
                    );



        file('/js/internal/circleverse/viewModels/earthViewModel.js?v=' + CUSTOM_VERSION)
                    .provides('circleverse.viewModel.earthViewModel')
                    .requires('jQuery', 'JS.Module', 'JS.Class', 'JSextend', 'eaf.core', 'eaf.util'
                    ,
                    'circleverse.viewModel.Base'
                    ,
                    'circleverse.viewModel.ResizeableBase'
                    ,
                    'littleUmbrella.circleverse.viewModel.AllPersonsViewModel'
                    ,
                    'littleUmbrella.circleverse.viewModel.AllOrganizationsViewModel'
                    ,
                    'becu_org.ui.viewModel.baseModule'
                    ,
                    'becu_org.domain.model.BecuObservable'
                    );

        file('/js/internal/dndApp.js?r=2')
                    .provides('becu_org.app')
                    .requires('jQuery', 'littleUmbrella.when', 'circleverse.viewModel.earthViewModel', 'littleUmbrella.circleverse.viewModel.GetCustomerViewModel', 'littleUmbrella.circleverse.viewModel.AllAccountTransactionsViewModel', 'littleUmbrella.circleverse.viewModel.AllMemberInfoFormsViewModel', 
                    'littleUmbrella.circleverse.viewModel.AllMemberCards',
                    'littleUmbrella.circleverse.Repository',
                    'circleverse.viewModel.MoneyTransferViewModel', 
                    'circleverse.viewModel.NewViewModel', 
                    'circleverse.viewModel.EditViewModel', 
                    'circleverse.viewModel.SaveViewModel',
                    'circleverse.viewModel.TravelViewModel',
                    'circleverse.viewModel.MoveViewModel',
                    'circleverse.viewModel.LinkViewModel',
                    'circleverse.viewModel.LinksViewModel',
                    'circleverse.viewModel.CustomerAddressesMapViewModel',
                    'littleUmbrella.circleverse.viewModel.AllDialogConfirmViewModels')
                    ;

        file('/js/external/when.js?r=2')
                    .setup(function () { eaf.util.namespace('littleUmbrella.when'); })

                    .provides('littleUmbrella.when')
                    .requires('eaf.util')
                    ;


    }
});
