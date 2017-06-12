
eaf.util.namespace('littleUmbrella.Circleverse.Service');

littleUmbrella.Circleverse.Service.CustomerService = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance
    var methodsCnt = 3;
    var serviceCnt = 3;

    return new JS.Class('CustomerService', becu_org.domain.service, {

        initialize: function () {
            this.callSuper();

            this.name = "CustomerService";
            this.id = "CustomerService";
            this.activatorId = this.id + 'activator';

            var serviceCnt = 2;
            var callSpec;
            var func = function () {
                var callSpec = new becu_org.communication.callSpec();
                var callSpecDetail = new becu_org.communication.callSpecRequirementDetail();
                 
                callSpecDetail.type = becu_org.domain.customer;
                callSpecDetail.requiredFields.push('id');
                callSpecDetail.viewModel = littleUmbrella.circleverse.viewModel.CustomerViewModel;
                callSpecDetail.requirementMetIconUrl = '/media/img/femaleTinytrue.png';
                callSpecDetail.requirementUnmetIconUrl = '/media/img/femaleTinyfalse.png';
                callSpec.need.push(callSpecDetail);

                callSpecDetail = new becu_org.communication.callSpecRequirementDetail();

                callSpecDetail.type = becu_org.domain.account;
                callSpecDetail.requiredFields.push('id');
                callSpecDetail.viewModel = littleUmbrella.circleverse.viewModel.CustomerViewModel;
                callSpecDetail.requirementMetIconUrl = '/media/img/bluefishtrue.png';
                callSpecDetail.requirementUnmetIconUrl = '/media/img/bluefishfalse.png';
                callSpec.need.push(callSpecDetail);



                //                    callSpec.need.push(becu_org.domain.accountInfo);
                //                    callSpec.need.push(becu_org.domain.card);
                //                    callSpec.need.push(becu_org.domain.atm);

                this.callSpec(callSpec);
            };

            var method;
            for (var z = 0; z < serviceCnt; z++) {
                method = new becu_org.domain.serviceMethod();
                method.name = this.name + "test service method" + z;
                method.id = this.id + "serviceMethod" + z;
                //method.viewModel = littleUmbrella.circleverse.viewModel.CustomerViewModel;

                //JS.require('becu_org.domain.customer', eaf.core.createDelegate(method, func));
                func.apply(method);

                //method.callSpec = callSpec;
                method.parent = this;

                this.serviceMethods.push(method);

            }
        }
    }
    );
}
)();