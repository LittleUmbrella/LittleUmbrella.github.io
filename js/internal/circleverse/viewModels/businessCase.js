eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.businessCase = (function () {



    return new JS.Class("circleverse.viewModel.businessCase", //circleverse.viewModel.ResizeableBase, 
                                {
                                //include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

                                initialize: function (eventAggregator) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                                    //properties
                                    var self = this;
                                    this.self = this;

                                    this.state = ko.observable();
                                    var reqText = 'Invalid, please enter a value';
                                    var lenText = 'Invalid, please enter text less than 230 characters';

                                    this.eventAggregator = eventAggregator;

                                    this.projectName = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' }).extend({ maxLength: { message: lenText, params: 230} });
                                    this.emtSponsor = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' }).extend({ maxLength: { message: lenText, params: 230} });
                                    this.vpOwner = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' }).extend({ maxLength: { message: lenText, params: 230} });
                                    this.projectType = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.teamMembers = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.projectDescription = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.expectedOutcome = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Describe the expected outcomes of this project, including how many members / employees the project will impact' });
                                    this.strategicAlignment = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'How does the project align with BECU’s Strategic Guidance, Priorities and Objectives (3 year strategic objectives: Op Exp / Avg Assets, NPS, Number of Engaged Members, Members / Population)?' });


                                    this.businessNeed = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Give an explanation of the business need / issue / problem that the requested project will address. Include information regarding member / employee importance' });
                                    this.risksIssues = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Describe basic business and technical risks / issues of executing and/or not executing the project. Include overall uncertainty risk, organizational readiness risk, change management risk' });
                                    this.processesAndRoles = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Describe how the proposed project will modify or affect organizational processes, tools, hardware, and/or software.  Explain any new roles which would be created or how existing roles may change as a result of the project' });
                                    this.practicesEnding = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Identify processes, products, systems that we will stop doing / offering / using as a result of implementing this project' });
                                    this.scheduleAndResources = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'What is the expected time frame to complete the project, what resources will be required' });
                                    this.assumptionsConstraintsDependencies = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Identify key assumptions, known constraints and dependencies' });
                                    this.successMeasures = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Describe the measures that will be used to measure the performance of this project' });

                                    this.commentsfinancials = ko.observable().extend({ info: '' });

                                    this.roi = ko.observable().extend({ info: 'What is the ROI?  If you don\'t know, you can either contact Treasury for assistance, or simply put "don\'t know," etc.' }).extend({ maxLength: { message: lenText, params: 230} });
                                    this.npv = ko.observable().extend({ info: 'What is the NPV?  if you don\'t know, you can either contact Treasury for assistance, or simply put "don\'t know," etc.' }).extend({ maxLength: { message: lenText, params: 230} });
                                    this.breakEven = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' }).extend({ maxLength: { message: lenText, params: 230} });

                                    this.treasuryReviewed = ko.observable().extend({ info: '' });
                                    this.fteChange = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.fteChangeType = ko.observable().extend({ info: '' });
                                    this.fteChangeCount = ko.observable().extend({ info: '' });
                                    this.fteChangeCountInAnnualPlan = ko.observable().extend({ info: '' });
                                    this.projectCosts = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.revenue = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.savings = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.operatingExpenses = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });

                                    this.planImpactInAnnualPlan = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.expenseToAverageAssets = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.npsRelational = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.engagedMembersExpectedEffect = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.membershipToPopulationExpectedEffect = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.qualitativeBenefits = ko.observable().extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Explain any qualitative benefits (culture, CU philosophy, partnerships, community, etc.) of the project' });
                                    this.alternativesConsidered = ko.observable();//.extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: 'Provide a brief summary of considered alternatives—one of which should be the status quo, or doing nothing.  The reasons for not selecting the alternatives should also be included' });
                                    //this.projectType = ko.observable(); 

                                    this.canSave = ko.observable(false);
//                                     ko.computed(function () {
//                                        return self.alternativesConsidered() != null;
//                                        //                                        var prop;
//                                        //                                        for (var i in this) {
//                                        //                                            prop = this[i];
//                                        //                                            //if i is a property, this[i] is a value and can be undefined
//                                        //                                            if ('undefined' != typeof prop && 'undefined' != typeof prop.isValid && !prop.isValid()) {
//                                        //                                                return false;
//                                        //                                            }
//                                        //                                        }
//                                        //                                        return true;

//                                    });

                                    this.alternativesConsidered.subscribe(function (val) {
                                        this.canSave(true);
                                    }, this);

                                    this.displayStyle = ko.computed(function () {
                                        return (this.state() == 'form' ? 'block' : 'none');
                                    } .bind(this));

                                    this.columns =
                        [
                        { name: 'Upfront Costs', type: 'money', func: function (col, total) { return total += parseFloat(col.value()); } }
                        ,
                        { name: 'Year 1', type: 'money', func: function (col, total) { return total += parseFloat(col.value()); } }
                        ,
                        { name: 'Year 2', type: 'money', func: function (col, total) { return total += parseFloat(col.value()); } }
                        ,
                        { name: 'Year 3', type: 'money', func: function (col, total) { return total += parseFloat(col.value()); } }
                        ,
                        { name: 'Year 4', type: 'money', func: function (col, total) { return total += parseFloat(col.value()); } }
                        ,
                        { name: 'Year 5', type: 'money', func: function (col, total) { return total += parseFloat(col.value()); } }
                        ];

                                    this.operatingExpensesTable = ko.observableArray();
                                    this.capitalTable = ko.observableArray();
                                    this.benefitTable = ko.observableArray();


                                    this.netTotal = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].allColumnAggregate();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].allColumnAggregate();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].allColumnAggregate();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });

                                    this.upfrontCostsTotal = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].colTotalUpfrontCosts();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].colTotalUpfrontCosts();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].colTotalUpfrontCosts();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });

                                    this.year1Total = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].colTotalYear1();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].colTotalYear1();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].colTotalYear1();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });

                                    this.year2Total = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].colTotalYear2();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].colTotalYear2();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].colTotalYear2();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });

                                    this.year3Total = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].colTotalYear3();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].colTotalYear3();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].colTotalYear3();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });

                                    this.year4Total = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].colTotalYear4();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].colTotalYear4();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].colTotalYear4();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });

                                    this.year5Total = ko.computed(function () {
                                        var benTotal = this.benefitTable().length == 0 ? 0 : this.benefitTable()[0].colTotalYear5();
                                        var capitalTotal = this.capitalTable().length == 0 ? 0 : this.capitalTable()[0].colTotalYear5();
                                        var opTotal = this.operatingExpensesTable().length == 0 ? 0 : this.operatingExpensesTable()[0].colTotalYear5();

                                        return (benTotal - capitalTotal) - opTotal;
                                    } .bind(this)).extend({ money: null });




                                    this.isBusy = ko.observable(false);
                                }
                                ,

                                init: function () {
                                    this.operatingExpensesTable([this.buildOperatingExpensesTable()]);
                                    this.capitalTable([this.buildCapitalTable()]);
                                    this.benefitTable([this.buildBenefitTable()]);

                                }
                                ,

                                save: function () {
                                    this.eventAggregator.publish('saveMe', this);
                                }
                                ,

                                saveDraft: function () {
                                    this.eventAggregator.publish('saveAsDraft', this);
                                }
                                ,

                                buildBenefitTable: function () {
                                    var data =
                    [
                    { name: 'Revenue', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                        var total = 0;
                        for (var j = 0; j < this.values().length; j++) {
                            total += parseFloat(this.values()[j].value());
                        }
                        return total;
                    }
                    }
                        ,
                        { name: 'Cost Savings', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                    ];
                                    return new circleverse.viewModel.table('Benefit', this.columns, data);
                                }
                                ,

                                buildCapitalTable: function () {
                                    var data =
                    [
                    { name: 'Capital', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                        var total = 0;
                        for (var j = 0; j < this.values().length; j++) {
                            total += parseFloat(this.values()[j].value());
                        }
                        return total;
                    }
                    }
                    ];
                                    return new circleverse.viewModel.table('Capital', this.columns, data);
                                }
                                ,

                                buildOperatingExpensesTable: function () {
                                    var data =
                    [
                    { name: 'Compensation', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                        var total = 0;
                        for (var j = 0; j < this.values().length; j++) {
                            total += parseFloat(this.values()[j].value());
                        }
                        return total;
                    }
                    }
                        ,
                        { name: 'Occupancy / Equip Exp', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                        ,
                        { name: 'Product Costs Servicing', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                        ,
                        { name: 'Marketing', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                        ,
                        { name: 'Professional Services', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                        ,
                        { name: 'Other Operating', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                        ,
                        { name: 'G & A', data: { 'Upfront Costs': 0, 'Year 1': 0, 'Year 2': 0, 'Year 3': 0, 'Year 4': 0, 'Year 5': 0 }, func: function () {
                            var total = 0;
                            for (var j = 0; j < this.values().length; j++) {
                                total += parseFloat(this.values()[j].value());
                            }
                            return total;
                        }
                        }
                    ];
                                    return new circleverse.viewModel.table('Operating Expenses', this.columns, data);
                                }
                                //,

                                //                                    save: function () {
                                //                                        var model = ko.toJS(this);
                                //                                        dojox.json.ref.toJson(model);
                                //                                    }
                            });
})();
