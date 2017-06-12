eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.MarketingProject = (function () {



    return new JS.Class("circleverse.viewModel.MarketingProject", //circleverse.viewModel.ResizeableBase, 
                                {
                                //include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

                                initialize: function (eventAggregator) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
                                    //properties
                                    // // = ko.observableArray([]);
                                    var self = this;
                                    this.self = this;

                                    this.state = ko.observable();
                                    var reqText = 'Invalid, please enter a value';
                                    var lenText = 'Invalid, please enter text less than 230 characters';

                                    this.eventAggregator = eventAggregator;

                                    this.pmm = ko.observable();//.extend({ required: { message: reqText, params: true }, info: '' });
                                    this.projectDescription = ko.observable();//.extend({ required: { message: reqText, params: true }, htmlNotEmpty: true, info: '' });
                                    this.projectName = ko.observable();//.extend({ required: { message: reqText, params: true }, info: '' });
                                    this.graphicDesigner = ko.observable();//.extend({ required: { message: reqText, params: true }, info: 'Describe the expected outcomes of this project, including how many members / employees the project will impact' });
                                    this.copyWriter = ko.observable();//.extend({ required: { message: reqText, params: true }, info: 'How does the project align with BECU’s Strategic Guidance, Priorities and Objectives (3 year strategic objectives: Op Exp / Avg Assets, NPS, Number of Engaged Members, Members / Population)?' });

                                    var objToday = new Date(),
                        weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                        dayOfWeek = weekday[objToday.getDay()],
                        domEnder = new Array('nth', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'),
                        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
                        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                        curMonth = months[objToday.getMonth()],
                        curYear = objToday.getFullYear(),
                        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
                        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
                        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
                        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
                                    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem; //+ " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

                                    this.requestDate = ko.observable(today); //.extend({ required: { message: reqText, params: true }, info: 'Give an explanation of the business need / issue / problem that the requested project will address. Include information regarding member / employee importance' });
                                    this.productLine = ko.observable();//.extend({ required: { message: reqText, params: true }, info: 'Describe basic business and technical risks / issues of executing and/or not executing the project. Include overall uncertainty risk, organizational readiness risk, change management risk' });
                                    this.collateralPlans = ko.observableArray(); 

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

                                    



                                    this.isBusy = ko.observable(false);
                                }
                                ,

                                init: function () {

                                }
                                ,

                                addPlan: function () {
                                    this.collateralPlans.push(new becu_org.domain.marketing.CollateralPlan());

                                }
                                ,

                                deletePlan: function (item) {
                                    this.collateralPlans.remove(item);

                                }
                                ,

                                save: function () {
                                    this.eventAggregator.publish('saveMe', this);
                                }
                                ,

                                saveDraft: function () {
                                    this.eventAggregator.publish('saveAsDraft', this);
                                }
                                
                                //,

                                //                                    save: function () {
                                //                                        var model = ko.toJS(this);
                                //                                        dojox.json.ref.toJson(model);
                                //                                    }
                            });
})();
