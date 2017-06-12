JS.require('JS.Class', function () {
    eaf.util.namespace('becu_org.sharePoint');
    becu_org.sharePoint.UserGroupService = ('becu_org.sharePoint.UserGroupService', function () {
        return new JS.Class({
            initialize: function () {
                var self = this;
                //properties

            }
            ,

            getEmployees: function (group) {
                var emp, emps = [];
                switch (group) {
                    case "pmm":
                        emp = new becu_org.domain.model.Employee();
                        
                        
                        profinfo.firstName('Tom');
                        profinfo.lastName('Berquist');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        profinfo.firstName('Stephen');
                        profinfo.lastName('Black');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        profinfo.firstName('Amelia');
                        profinfo.lastName('Dozier');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        profinfo.firstName('Liz');
                        profinfo.lastName('Fetcho');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Angela');
                        emp.lastName('Grabner');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Todd');
                        emp.lastName('Pietzsch');
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Judy');
                        emp.lastName('Skott');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Ashley');
                        emp.lastName('Rossman');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Toby');
                        emp.lastName('Travis');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Jody');
                        emp.lastName('Ulrich');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Debbie');
                        emp.lastName('Wege');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Gena');
                        emp.lastName('Wessman');
                        
                        

                        emps.push(emp);




                        break;
                    case "designer":
                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Colette');
                        emp.lastName('Babel');
                        
                        

                        emps.push(emp);


                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Ross');
                        emp.lastName('Swartwout');
                        
                        

                        emps.push(emp);
                        break;
                    case "copy":
                        emp = new becu_org.domain.model.Employee();
                        
                        
                        emp.firstName('Michaelene');
                        emp.lastName('Fowler');
                        
                        

                        emps.push(emp);
                        break;
                    default:

                }
                return emps;
            }
        });
    })();
});