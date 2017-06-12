
JS.require('JS.Class', function () {

    eaf.util.namespace('becu_org.service');
    becu_org.service.AccountService = (function () {
        return new JS.Class('becu_org.service.AccountService', {
            initialize: function () {
                var self = this;
                //properties

            }
            ,
            canCloseAccount: function (accountNumber, closeReason) {
                var reasonCodes = [];
                reasonCodes["100"] = { name: 'Pending Debit Card Transactions', description: 'You cannot close {0}.  There are pending debit card transactions.' };
                reasonCodes["200"] = { name: 'Funding Loan', description: 'You cannot close {0}.  There are pending debit card transactions.' };
                reasonCodes["101"] = { name: 'Not Authorized', description: 'You cannot close {0}.  There are pending debit card transactions.' };
                //reasonCodes["100"] = { name: 'Pending Debit Card Transactions', description: 'You cannot close {0}.  There are pending debit card transactions.' };


                switch (accountNumber) {
                    case '0123456789':
                        return { can: true };
                        break;
                    default: return { can: false, reasons:
                            [{ reasonCode: '1234', reasonDetail: null, resolutionCode: '4223'}]
                    };
                        break;
                }
            }
            ,

            getAccount: function (accountNumber) {
                var i, a, c, info, tran, r, role, aalert, s, t, prod;


                switch (accountNumber) {
                    case '0123456789':
                        i = 1;

                        a = new becu_org.domain.model.AccountObservable();
                        //
                        a.accountNumber(accountNumber);

                        a.balance(4000 * (i + 1));

                        for (var j = 0; j < 3; j++) {
                            c = new becu_org.domain.model.CustomerObservable();






                            if (j > 1) {
                                c.firstName("Chuck");
                                c.lastName('Woolery');
                                c.addressLine1('1600 Pennsylvania Avenue NW');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                                r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                                a.relationships.push(r);
                                break;
                            }
                            else if (j > 0) {
                                c.firstName("Mary");
                                c.lastName('Martindale');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                //                                    role = new becu_org.domain.model.AccountRoleObservable('signer');
                                //                                    r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                //                                    a.relationships.push(r);
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                            }
                            else {
                                c.firstName("Wink");
                                c.lastName('Martindale');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Primary');
                            }
                            r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                            //}
                            a.relationships.push(r);

                        }



                        prod = new becu_org.domain.model.ProductObservable();

                        prod.id(new becu_org.domain.model.ProductIdObservable());
                        prod.id().primaryProductCode('Checking');
                        prod.id().secondaryProductCode('Advantage');

                        a.product(prod);
                        break;
                    case '0123456788':
                        i = 3;
                        a = new becu_org.domain.model.AccountObservable();

                        a.accountNumber(accountNumber);

                        a.balance(3000 * (i + 1));

                        for (var j = 0; j < 3; j++) {
                            c = new becu_org.domain.model.CustomerObservable();





                            if (j > 1) {
                                c.firstName("Chuck (Carlos)");
                                c.lastName('Noris');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                                r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                                a.relationships.push(r);
                                break;
                            }
                            else if (j > 0) {
                                c.firstName("Boris");
                                c.lastName('Noris');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                //                                    role = new becu_org.domain.model.AccountRoleObservable('signer');
                                //                                    r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                //                                    a.relationships.push(r);
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                            }
                            else {
                                c.firstName("Dorris");
                                c.lastName('Noris');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Primary');
                            }
                            r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                            //}
                            a.relationships.push(r);

                        }

                        prod = new becu_org.domain.model.ProductObservable();

                        prod.id(new becu_org.domain.model.ProductIdObservable());
                        prod.id().primaryProductCode('Checking');
                        prod.id().secondaryProductCode('Advantage');

                        a.product(prod);
                        break;
                    case '0123456787':
                        i = 5;
                        a = new becu_org.domain.model.AccountObservable();

                        a.accountNumber(accountNumber);

                        a.balance(3000 * (i + 1));

                        for (var j = 0; j < 3; j++) {
                            c = new becu_org.domain.model.CustomerObservable();





                            if (j > 1) {
                                c.firstName("Alf");
                                c.lastName('');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                                r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                a.relationships.push(r);
                                break;
                            }
                            else if (j > 0) {
                                c.firstName("Martin the");
                                c.lastName('Martian');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                //                                    role = new becu_org.domain.model.AccountRoleObservable('signer');
                                //                                    r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                //                                    a.relationships.push(r);
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                            }
                            else {
                                c.firstName("Flying Spaghetti");
                                c.lastName('Monster');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Primary');
                            }
                            r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                            //}
                            a.relationships.push(r);

                        }

                        prod = new becu_org.domain.model.ProductObservable();

                        prod.id(new becu_org.domain.model.ProductIdObservable());
                        prod.id().primaryProductCode('Checking');
                        prod.id().secondaryProductCode('Advantage');


                        a.product(prod);
                        break;
                    case '0123456786':
                        i = 1;

                        a = new becu_org.domain.model.AccountObservable();

                        a.accountNumber(accountNumber);

                        a.balance(3000 * (i + 1));

                        for (var j = 0; j < 0; j++) {
                            c = new becu_org.domain.model.CustomerObservable();





                            if (j == 2) {
                                c.firstName("Amanda B.");
                                c.lastName('Reckonedwith');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                                r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                a.relationships.push(r);
                                break;
                            }
                            //else{
                            if (j == 1) {
                                c.firstName("Mary");
                                c.lastName('Reckonedwith');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                //                                    role = new becu_org.domain.model.AccountRoleObservable('signer');
                                //                                    r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                //                                    a.relationships.push(r);
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                            }
                            else {
                                c.firstName("Dale");
                                c.lastName('Reckonedwith');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Primary');
                            }
                            r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                            //}
                            a.relationships.push(r);

                        }

                        prod = new becu_org.domain.model.ProductObservable();

                        prod.id(new becu_org.domain.model.ProductIdObservable());
                        prod.id().primaryProductCode('Checking');
                        prod.id().secondaryProductCode('Advantage');


                        a.product(prod);
                        break;
                    default:

                        i = 1;

                        a = new becu_org.domain.model.AccountObservable();

                        a.accountNumber('0123456789');

                        a.balance(4000 * (i + 1));

                        for (var j = 0; j < 3; j++) {
                            c = new becu_org.domain.model.CustomerObservable();






                            if (j > 1) {
                                c.firstName("Dale");
                                c.lastName('Martindale');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                                r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                                a.relationships.push(r);
                                break;
                            }
                            else if (j > 0) {
                                c.firstName("Mary");
                                c.lastName('Martindale');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                //                                    role = new becu_org.domain.model.AccountRoleObservable('signer');
                                //                                    r = new becu_org.domain.model.AccountRelationshipObservable(role, cust);
                                //                                    a.relationships.push(r);
                                role = new becu_org.domain.model.AccountRoleObservable('Secondary');
                            }
                            else {
                                c.firstName("Wink");
                                c.lastName('Martindale');
                                c.addressLine1('1600');
                                c.city('Washington');
                                c.state('DC');
                                c.zip('20006');
                                c.country('USA');
                                role = new becu_org.domain.model.AccountRoleObservable('Primary');
                            }
                            r = new becu_org.domain.model.AccountRelationshipObservable(role, c);
                            //}
                            a.relationships.push(r);

                        }



                        prod = new becu_org.domain.model.ProductObservable();

                        prod.id(new becu_org.domain.model.ProductIdObservable());
                        prod.id().primaryProductCode('Checking');
                        prod.id().secondaryProductCode('Advantage');

                        a.product(prod);


                        break;
                }

                //pending/recurring
                var pending, recurring, pendingAccount, recurringAccount, merchant;
                for (var k = 0; k < 5; k++) {
                    merchant = new becu_org.domain.model.MerchantObservable();
                    pendingAccount = new becu_org.domain.model.AccountObservable();
                    if (k % 2 == 0) {
                        pending = new becu_org.domain.model.OutgoingPendingPaymentObservable();
                        recurring = new becu_org.domain.model.IncomingPaymentScheduleObservable();
                    }
                    else {
                        pending = new becu_org.domain.model.IncomingPendingPaymentObservable();
                        recurring = new becu_org.domain.model.OutgoingPaymentScheduleObservable();
                    }


                    pendingAccount.accountNumber('111122223' + k);
                    pending.account(pendingAccount);
                    merchant.name("freddy's");
                    pending.merchant(merchant);
                    pending.amount(40.5);
                    pending.transactionDate(new Date());


                    pendingAccount.accountNumber('111122223' + k);
                    recurring.account(pendingAccount);
                    merchant.name("freddy's");
                    recurring.merchant(merchant);
                    recurring.amount(40.5);
                    recurring.nextScheduledTransferDate(new Date());


                    a.paymentSchedules.push(recurring);
                    a.pendingPayments.push(pending);
                }

                return a;
            }
            ,

            getReplacementAccountsSelectionList: function (accountNumber) {
                var id = parseFloat(accountNumber);
                var arr = [], i, a, c, info, tran, r, role, aalert, s, t, prod;

                //                for (var j = 0; j < j < 8; j++) {

                //                }
                if ((id % 3) == 0) {

                }
                else if ((id % 2) == 0) {

                    a = new becu_org.domain.model.AccountObservable();

                    a.accountNumber('0123456777');

                    a.balance(4000 * (1 + 1));
                    a.displayName("vacation bucket");

                    prod = new becu_org.domain.model.ProductObservable();

                    prod.id(new becu_org.domain.model.ProductIdObservable());
                    prod.id().primaryProductCode('Checking');
                    prod.id().secondaryProductCode('Advantage');

                    a.product(prod);

                    a.canBeUsedToReplace = false;
                    a.cannotBeUsedToReplaceReasons = ['not same major project code'];

                    arr.push(a);

                    a = new becu_org.domain.model.AccountObservable();

                    a.accountNumber('0123456776');

                    a.balance(2000 * (1 + 1));
                    a.displayName("supercalifragilisticexpialidocious");

                    prod = new becu_org.domain.model.ProductObservable();

                    prod.id(new becu_org.domain.model.ProductIdObservable());
                    prod.id().primaryProductCode('Checking');
                    prod.id().secondaryProductCode('Advantage');

                    a.product(prod);


                    a.canBeUsedToReplace = true;
                    a.cannotBeUsedToReplaceReasons = [];

                    arr.push(a);
                }
                else {

                    a = new becu_org.domain.model.AccountObservable();

                    a.accountNumber('0123456777');

                    a.balance(5000 * (1 + 1));

                    prod = new becu_org.domain.model.ProductObservable();
                    prod.id(new becu_org.domain.model.ProductIdObservable());
                    prod.id().primaryProductCode('Checking');
                    prod.id().secondaryProductCode('Advantage');

                    a.product(prod);

                    a.canBeUsedToReplace = false;
                    a.cannotBeUsedToReplaceReasons = ['not same major project code', 'not same roles on account'];

                    arr.push(a);
                }

                return arr;
            }




        });
    })();
});
