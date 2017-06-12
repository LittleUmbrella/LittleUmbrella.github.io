eaf.util.namespace('becu_org.domain');
    becu_org.domain.Base = (function () {
        return new JS.Class({
            initialize: function () {
                //properties
                this.missingFields = ko.observableArray(); //[];//
                //this.undefinedIsFalse = true;

                this._requirement;
            }
            ,

            isValid: function () {

                if (this.getMissingFields().length == 0)
                    return true;
                return false;
            }
            ,


            setRequirement: function (requirement) {
                if (requirement == undefined || JS.Interface.implements(requirement, becu_org.ui.IRequirement)) {
                    this._requirement = requirement;
                }
            }
            ,

            _inMissingFields: function (field) {
                for (var idx = 0; idx < this.missingFields().length; idx++) {
                    if (this.missingFields()[idx].field == field)
                        return idx;
                }

                return -1;
            }
            ,

            _allUnmet: function (model) {
                //for (var i = 0; i < this.missingFields.length; i++) {
                //array holding field names 
                //if empty, assumption is that all fields are required
                //unless in this.nonRequiredFields
                //this.requiredFields = ko.observableArray();
                var requiredFields = this.requiredFields; //();
                var nonRequiredFields = this.nonRequiredFields; //();

                if (requiredFields && requiredFields.length > 0) {

                    var requiredField;
                    var found = false;
                    var n;
                    for (var idx = 0; idx < requiredFields.length; idx++) {
                        requiredField = (requiredFields[idx]);
                        if (this._inMissingFields(requiredField) == -1) {
                            this.missingFields.push({ field: requiredField, description: '' });
                        }
                    }
                }
                //array holding field names 
                //if empty, assumption is that all fields are required
                //unless in this.nonRequiredFields
                //this.requiredFields = ko.observableArray();
                if (nonRequiredFields && nonRequiredFields.length > 0) {
                    //var nonRequiredField;
                    var found = false;
                    var nonField;
                    for (nonField in model) {

                        for (var nonIdx = 0; nonIdx < nonRequiredFields.length; nonIdx++) {
                            found = false;
                            nonRequiredField = nonRequiredFields[nonIdx];
                            //props can be functions, so don't rule them out
                            //if field is non-required, then break
                            if (nonField == nonRequiredField) {

                                found = true;
                                break;
                            }
                        }

                        //if field not found in the non-required fields collection, and the field does not hold a value, then error condition
                        if (!found) {
                            if (this._inMissingFields(nonField) == -1) {
                                this.missingFields.push({ field: nonField, description: '' });
                            }
                        }
                    }
                }

                //this.missingFields
                //}
            }
            ,

            //            isSatisfied: function () {
            //                if (this.getMissingFields(this).length == 0)
            //                    return true;
            //                return false;
            //            }
            //            ,

            getMissingFields: function () {
                var model = this;
                //                if (model == undefined)
                //                    if (this.undefinedIsFalse) {
                //                        this._allUnmet(model);
                //                        return this.missingFields();
                //                    }
                //                    //return false;
                //                    else
                //                        return this.missingFields();

                if (!(model.isA(this._requirement.type))) {
                    this._allUnmet(model);
                    return this.missingFields();
                }
                //return false;
                //if (this.requirement) {
                //var missing = [];

                var requiredFields = this._requirement.requiredFields; //();
                var nonRequiredFields = this._requirement.nonRequiredFields; //();

                var missingIdx;
                if (requiredFields && requiredFields.length > 0) {
                    var requiredField;
                    var found = false;
                    var n;
                    for (var idx = 0; idx < requiredFields.length; idx++) {
                        found = false;
                        //array holding field names 
                        //if empty, assumption is that all fields are required
                        //unless in this.nonRequiredFields
                        //this.requiredFields = ko.observableArray();
                        requiredField = requiredFields[idx];
                        for (n in model) {
                            //props can be functions, so don't rule them out
                            if (n == requiredField && (ko.utils.unwrapObservable(model[n]) != undefined)) {
                                found = true;
                                break;
                            }
                        }

                        if (!found) {

                            //return false;
                            if (this._inMissingFields(requiredField) == -1) {
                                this.missingFields.push({ field: requiredField, description: '' });
                            }
                        }
                        else {
                            missingIdx = this._inMissingFields(requiredField);
                            if (missingIdx != -1)
                                this.missingFields.splice(missingIdx, 1);
                        }
                    }
                }


                //array holding field names 
                //if empty, assumption is that all fields are required
                //unless in this.nonRequiredFields
                //this.requiredFields = ko.observableArray();
                if (nonRequiredFields && nonRequiredFields.length > 0) {
                    var nonRequiredField;
                    var found = false;
                    var nonField;
                    for (nonField in model) {

                        for (var nonIdx = 0; nonIdx < nonRequiredFields.length; nonIdx++) {
                            found = false;
                            nonRequiredField = nonRequiredFields[nonIdx];
                            //props can be functions, so don't rule them out
                            //if field is non-required, then break
                            if (nonField == nonRequiredField) {

                                found = true;
                                break;
                            }

                        }

                        //if field not found in the non-required fields collection, and the field does not hold a value, then error condition
                        if (!found && (ko.utils.unwrapObservable(model[nonfield]) == undefined)) {
                            //return false;
                            if (this._inMissingFields(nonField) == -1) {
                                this.missingFields.push({ field: nonField, description: '' });
                            }
                        }
                        else {
                            missingIdx = this._inMissingFields(nonField);
                            if (missingIdx != -1)
                                this.missingFields.splice(missingIdx, 1);
                        }
                    }
                }

                //array holding field names 
                //if empty, assumption is that all fields are non-required
                //unless in this.requiredFields
                //this.nonRequiredFields = ko.observableArray();

                //}

                return this.missingFields();


            }
        });
    })();
