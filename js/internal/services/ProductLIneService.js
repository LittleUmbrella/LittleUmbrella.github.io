JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.service');
    becu_org.service.ProductLineService = (function () {
        return new JS.Class(becu_org.domain.model.Base, {
            initialize: function () {
                var self = this;
                //properties

            }
            ,

            getProductLines: function () {
                var pl, pls = [];


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Branding');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Community Affairs');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Deposits');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Foundation');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Internal');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Investments');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Loans');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Membership');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Retail');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Sponsorships');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Trust');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Trade Show/Events');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Virtual Banking');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Youth/Student');

                pls.push(pl);


                pl = new becu_org.domain.model.ProductLine();
                pl.name('Other');

                pls.push(pl);

                return pls;
            }

        });
    })();
});


