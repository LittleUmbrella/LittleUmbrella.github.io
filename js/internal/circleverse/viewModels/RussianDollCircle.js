
    eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

    circleverse.viewModel.RussianDollCircle = (function () {

        //russion doll isn't the right name.
        //the structure is more like a solar system with the sun
        //and the orbits of its orbiting planets
        //except that each orbit is packed with planets
        //each class represents one ring of this multi-ringed
        //we start with the center
        return new JS.Class("circleverse.viewModel.RussianDollCircle", circleverse.viewModel.ResizeableBase, {
            include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],
            __getCoords: function () {
                var minTop = 0;
                var minLeft = 10;

                var calcTop = 20;
                var top = '25%'; // (calcTop < minTop) ? minTop : calcTop;

                var calcLeft = 10;
                var left = '25%'; //(calcLeft < minLeft) ? minLeft : calcLeft;

                //            log('garbage left: ' + left);
                //            log('garbage top: ' + top);
                return { left: left, top: top };
            }
            ,

            onresize: function (e, data) {
                this.callSuper();


                var coords = this.__getCoords();
                this.location({ left: coords.left, top: coords.top });
                this.dimensions({ height: this.scale() * 75, width: this.scale() * 75 });
                //log('customer position: ' + this.position().left);
            }
            ,

            initialize: function (object, parent, globalSettings, initSize) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

                var self = this;
                //properties            


                this.eventAggregator = globalSettings.eventAggregator;
                this.hasToggleChildrenVisible = true;
                //this.requirement = requirement;
                //this.showMainForm = ko.observable(false);
                this.initDisplay = 'none';

                initSize = initSize || 120;
                this.__size = initSize;

                this.childViewModels = ko.observableArray([]);

                this.childViewModel = ko.observable();

                this.initLocation = ko.observable();
                this.initLocation({ left: 0, top: 0 });

                this.ringIndex = 1;
                this.nextIndexStart = 1;

                //get radius + 1 border
                var baseRadius = initSize + (8 / 2);
                this.outerCnt = 0;
                var cumulativeRadius, nextIndexStart = 1;
                //starts with one
                if (parent) {
                    cumulativeRadius = baseRadius + (baseRadius * 2 * (this.ringIndex));
                    nextIndexStart = parent.nextIndexStart;
                    this.__size = cumulativeRadius;
                    this.ringIndex = parent.ringIndex + 1;
                }
                else {
                    cumulativeRadius = baseRadius;
                }
                this.outerCnt = Math.floor(littleUmbrella.circleverse.ui.shapes.satellite.howManyOuter(cumulativeRadius, baseRadius));

                this.nextIndexStart = nextIndexStart + this.outerCnt;

                this.methodDiameter = cumulativeRadius;

                this.callSuper();

                for (var i = nextIndexStart - 1, j = 0; i < object().length && j < this.outerCnt; i++, j++) {
                    this.childViewModels.push(new circleverse.viewModel.BusinessCenterViewModel(object()[i], this, globalSettings));

                }

                if (i < object().length)
                    this.childViewModel(new circleverse.viewModel.RussianDollCircle(object, this, globalSettings, baseRadius));


                //this.position = initialPosition || { top: 0, left: 0 };
                this.size(this.__size);

                var vm;

                this.dimensions = ko.observable();
                this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });

//                this.location = ko.computed(function () {
//                    //hide for now var loc = self.callSuper();

//                    return { left: '45', top: '45' };
//                });

                var coords = this.__getCoords();
                //this.location({ left: coords.left, top: coords.top });
                this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });
                //log('scale: ' + this.scale());



                
                this.icon.location = { center: true, offset: { y: -35} }; //ko.observable(false);//

                this.icon.url = ko.observable('');

                this.isBusy = ko.observable(false);
                //            this.isValid = function () {
                //                return this.model().isValid();
                //            };

                //            this.icon.opacity = ko.dependentObservable(function () {


                //                if (this.isValid()) {
                //                    return 1;
                //                }

                //                return .2;
                //            } .bind(this));

                //            this.errors = ko.dependentObservable(
                //                        function () {
                //                            
                //                        });

                //            this.isValid = //ko.dependentObservable(
                //            function () {
                //                if (this.requirement) {
                //                    var requiredFields = this.requirement.requiredFields();
                //                    var nonRequiredFields = this.requirement.nonRequiredFields();
                //                    if (requiredFields && requiredFields.length > 0) {
                //                        var requiredField;
                //                        var found = false;
                //                        var n;
                //                        for (var idx = 0; idx < requiredFields.length; idx++) {
                //                            found = false;
                //                            //array holding field names 
                //                            //if empty, assumption is that all fields are required
                //                            //unless in this.nonRequiredFields
                //                            //this.requiredFields = ko.observableArray();
                //                            requiredField = requiredFields[idx];
                //                            for (n in this.model()) {
                //                                //props can be functions, so don't rule them out
                //                                if (n == requiredField && (ko.unwrap(this.model[n]) != undefined)) {
                //                                    found = true;
                //                                    break;
                //                                }
                //                            }

                //                            if (!found)
                //                                return false;
                //                        }
                //                    }


                //                    //array holding field names 
                //                    //if empty, assumption is that all fields are required
                //                    //unless in this.nonRequiredFields
                //                    //this.requiredFields = ko.observableArray();
                //                    if (nonRequiredFields && nonRequiredFields.length > 0) {
                //                        var nonRequiredField;
                //                        var found = false;
                //                        var nonField;
                //                        for (nonField in this.model()) {

                //                            for (var nonIdx = 0; nonIdx < nonRequiredFields.length; nonIdx++) {
                //                                found = false;
                //                                nonRequiredField = nonRequiredFields[nonIdx];
                //                                //props can be functions, so don't rule them out
                //                                if (nonField == nonRequiredField) {

                //                                    found = true;
                //                                    break;
                //                                }

                //                            }

                //                            //if field not found in the non-required fields collection, and the field does not hold a value, then error condition
                //                            if (!found && (ko.unwrap(this.model[nonfield]) == undefined))
                //                                return false;
                //                        }
                //                    }
                //                    //array holding field names 
                //                    //if empty, assumption is that all fields are non-required
                //                    //unless in this.requiredFields
                //                    //this.nonRequiredFields = ko.observableArray();

                //                }

                //                return true;
                //            }
                //            //)
                //            ;

                //this.size = function (val) { if (val) { } else return 100; }; // ko.observable();
                //this.size = ko.observable();

            }


        });
    })();

