
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.AllMembersViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.viewModel.AllMembersViewModel', circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.satellite, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            var self = this;
            var initSize = 60;
 self.size = ko.observable(initSize);
            //properties
            self.eventAggregator = globalSettings.eventAggregator;

            this.callSuper();



            self.foundItems = ko.observableArray();

            globalSettings.eventAggregator.subscribe('customer.login.attempt', function (topic, data) {
                self.getCustomer(data);
            });


            this.dimensions = ko.observable();
            this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

            this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

            this.icon.url = ko.observable('url("/media/img/male-female48x48.png")');
            this.icon.name('icon-group icon-size-2x');


        }

            ,
        dblclick: function (data, e) {
            //show help




        },

        getSettings: function () {
            var settings = this.callSuper();
            settings.drop = '.account, .trash, .settings, .help, .search';
            return settings;
        }
        //            ,


        //        close: function () {
        //            //if (dragViewModel.isA(circleverse.viewModel.accountViewModel)) {
        //            //refactor to ask service/domain to close
        //            //this.from.amount();
        //            this.closeAccountVm.hideCloseForm(true);
        //            //}
        //        }
            ,

        droppedOn: function (dragModel, dragViewModel) {
        }
            ,

        findCustomers: function () {
        }
        ,

        getCustomer: function (getArgs) {
            if (!getArgs) throw new Error('getArgs cannot be null');
            if (!getArgs.userName) throw new Error('getArgs.userName cannot be null');
            if (!getArgs.password) throw new Error('getArgs.password cannot be null');

            var self = this;
            var cust = new becu_org.domain.model.Customer(), a, c, info, tran, r, role, aalert, s, t, prod, limit = 8;
            // c = cust;




            cust.firstName = "Wink";
            cust.lastName = "Martindale";
            cust.addressLine1 = '1600 Pennsylvania Ave NW';
            cust.city = 'Washington';
            cust.state = 'DC';
            cust.zip ='20006';
            cust.country = 'USA';
            cust.homePhone = "5555555555";
            cust.mobilePhone = "5555555555";
            cust.officePhone = "5555555555";
            cust.emailAddress = "winkmartindale@tictac.dough"
            cust.icon = "/media/img/member4.png";

            for (var i = 0, pIdx = 0; i < limit; i++, pIdx++) {
                a = new becu_org.domain.model.Account();

                a.accountNumber = '012345678' + i;

                a.balance = 4000 * (i + 1);

                prod = new becu_org.domain.model.Product();

                prod.id = new becu_org.domain.model.ProductId();
                prod.id.primaryProductCode = 'Checking';
                prod.id.secondaryProductCode = 'Advantage';

                a.product = prod;

                for (var j = 0; j < 2; j++, pIdx++) {
                    p = new becu_org.domain.model.Customer();



                    p.firstName = "Ms. Member";
                    p.lastName = "#" + i + j;
                    p.addressLine1 = '1600';
                    p.city = 'Washington';
                    p.state = 'DC';
                    p.zip ='20006';
                    p.country = 'USA';
                    p.icon = "/media/imgseq/" + (pIdx + 1) + ".jpg";

                    cust.contacts.push(p);

                    if (i < 2) {
                        role = new becu_org.domain.model.AccountRole();
                        role.accountRoleDescription = 'signer';
                        r = new becu_org.domain.model.AccountRelationship(role, cust);
                        a.relationships.push(r);
                    }
                    //else{
                    if (j > 0) {
                        //                                    role = new becu_org.domain.model.AccountRole = 'signer';
                        //                                    r = new becu_org.domain.model.AccountRelationship(role, cust);
                        //                                    a.relationships.push(r);
                        role = new becu_org.domain.model.AccountRole();
                        role.accountRoleDescription = 'signer';
                    }
                    else {
                        role = new becu_org.domain.model.AccountRole();
                        role.accountRoleDescription = 'joint';
                    }
                    r = new becu_org.domain.model.AccountRelationship(role, c);
                    //}
                    a.relationships.push(r);

                    aalert = new becu_org.domain.model.AlertScheduleBalance();
                    a.alerts.push(aalert);

                    s = new becu_org.domain.model.PaymentSchedule();
                    a.paymentSchedules.push(s);


                }

                cust.accounts.push(a);

            }

            self.eventAggregator.publish('customer.found', cust);
        }
        ,

        dropped: function (dropModel, dropViewModel, args) {
            //this.model().callSpec().add(dragModel);
            if (dropViewModel.isA(circleverse.viewModel.SearchViewModel)) {
                var methodVm = this.model().services[0].methods()[0];
                var need = methodVm.model().callSpec().need()[0]
                //$parent.getObjects.call($parent, e, model)
                methodVm.getObjects.call(methodVm, null, need);


            }
        }

    });
})();
