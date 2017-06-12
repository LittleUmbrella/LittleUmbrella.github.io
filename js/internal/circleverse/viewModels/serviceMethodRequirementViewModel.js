eaf.util.namespace('circleverse.viewModel');

    //alert('hi');

circleverse.viewModel.serviceMethodRequirement = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class(circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],

        initialize: function (object, parent, globalSettings) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            this.callSuper(object);
            var that = this;
            //properties
            this.parent = parent;
            this.methodDiameter = 70;



            this.isRequirementMet = ko.dependentObservable(function () {
                var have;
                for (var i = 0; i < parent.model().callSpec().have().length; i++) {
                    have = parent.model().callSpec().have()[i];
                    if (JS.Interface.implements(have, becu_org.ui.IValidateable)) {
                        if (have.isValid() && have.isA(object.type)) {
                            return true;
                        }
                    }
                    else
                        throw new Error("object " + have.toString() + " does not implement IValidateable");



                    //                        if (have.isA(object.type))
                    //                        {
                    //                            return true;
                    //                        }
                }
                //                    if ($.inArray(object, ) > -1)
                //                        return true;

                return false;
            });

            

            this.icon.url = ko.dependentObservable(function () {
                //if (that.isRequirementMet())
                return 'url("' + object.requirementMetIconUrl + '")';
                //                    if ($.inArray(object, ) > -1)
                //                        return true;

                //return 'url("' + object.requirementUnmetIconUrl + '")';
            });

            this.icon.opacity = ko.dependentObservable(function () {
                //if (this.isRequirementMet()) {
                    return 1;
                //}

                return .2;
            } .bind(this));


            //have no idea why this is necessary, but it seems to be
            //var methodsArr = that.model.parent.serviceMethods();

            //                this.location = ko.dependentObservable(function () {
            //                    // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
            //                    var methodsArr = that.model.parent.serviceMethods();
            //                    var diameter = that.methodDiameter;

            //                    var pp = littleUmbrella.circleverse.ui.pointsAndPolygon(methodsArr, diameter);


            //                    var center = pp.polygon.center();
            //                    var radius = pp.polygon.radius(diameter, diameter);

            //                    //alert('x: ' + center.x + ' y: ' + center.y);
            //                    //alert('radius: ' + radius );


            //                    var index = $.inArray(that.model(), that.model.parent.serviceMethods());
            //                    var obj = pp.points[index];


            //                    //parent responds after, so we need future parent size 
            //                    //not that.parent.size();
            //                    var parentWidth = radius * 2;
            //                    var parentHeight = parentWidth;

            //                    var addX = Math.abs(center.x - (parentWidth / 2));
            //                    var addY = Math.abs(center.y - (parentHeight / 2));


            //                    var left = obj.x + addX; // +(2*mX);
            //                    var top = obj.y + addY; // +(2*mY );


            //                    //                    log('left: ' + left + ' top: ' + top + ' id: ' + that.model.id + ' parent size: ' + parentHeight);

            //                    //                    log('');

            //                    //var loc = { left: left, top: top, width: diameter, height: diameter };

            //                    var loc = { left: left - diameter / 2, top: top - diameter / 2, width: diameter, height: diameter };
            //                    return loc;
            //                });

            //this.location({ left: 0, top: 0, width: 50, height: 50 });

        }

            ,
        applyBindings: function (namespace, node) {
            var ns = namespace || 'serviceMethodRequirement';
            if (node)
                ko.applyBindings(this, node);
            //        var arr = []; //[0,1,2,3,4,5,6,7,8,9];

            //        var num = 3;

            //        for (var z = 0; z < num; z++) {
            //            arr.push(z);
            //        }





        }
            ,

        droppedOn: function (dragModel) {
            this.model().callSpec.add(dragModel);
        }

    });
})();
