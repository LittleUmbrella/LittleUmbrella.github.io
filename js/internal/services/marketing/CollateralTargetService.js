JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.marketing.service');
    becu_org.marketing.service.CollateralTargetService = (function () {
        return new JS.Class({
            initialize: function () {
                var self = this;
                //properties
            }
            ,

            getTargets: function () {
                var target, targets = [];


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('atm-wait screen');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('atm-receipts');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('atm-signage');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('atm-attract loop');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('direct mail-letter');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('direct mail-postcard');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('email');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('facebook');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('flyer');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('LCD');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('print ad');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('on hold message');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('signage');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('statement insert');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('visa onsert');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('visa stuffer');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-home page hero');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-article');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-BP ad');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-bio');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-OLB ad');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-OLB campaign banner');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-nav ad');

                targets.push(target);


                target = new becu_org.domain.marketing.CollateralTarget();
                target.name('web-product pg ad (copy only)');

                targets.push(target);





                return targets;
            }
        });
    })();
});
