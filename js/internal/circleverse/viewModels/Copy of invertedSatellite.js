
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.invertedSatellite = (function () {



    return new JS.Class({

        initialize: function (object, satelliteDiameter, collectionCallback) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            this.callSuper();
            //properties
            this.model(object); // = ko.observableArray([]);

            var offset = collectionCallback().length == 1 ? satelliteDiameter / 2 : 0;

            this.location = ko.dependentObservable(function () {
                // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.

                var methodsArr = collectionCallback(); //this.model().parent.serviceMethods();
                var diameter = satelliteDiameter; // this.methodDiameter;

                var pp = littleUmbrella.circleverse.ui.pointsAndPolygon(methodsArr, diameter);


                var center = pp.polygon.center();
                var radius = pp.polygon.radius(diameter, diameter);

                //alert('x: ' + center.x + ' y: ' + center.y);
                //alert('radius: ' + radius );


                var index = $.inArray(this.model(), this.model().parent.serviceMethods());
                var obj = pp.points[index];


                //parent responds after, so we need future parent size 
                //not that.parent.size();
                var parentWidth = radius * 2;
                var parentHeight = parentWidth;

                var addX = Math.abs(center.x - (parentWidth / 2));
                var addY = Math.abs(center.y - (parentHeight / 2));


                var left = 0;
                var top = 0;

                if (undefined != obj) {

                    left = (obj.x || 0) + addX + offset; // +(2*mX);
                    top = (obj.y || 0) + addY + offset; // +(2*mY );
                }

                //                    log('left: ' + left + ' top: ' + top + ' id: ' + that.model.id + ' parent size: ' + parentHeight);
                //log('parent method cnt: ' + this.model().parent.serviceMethods().length);
                //                    log('');

                //var loc = { left: left, top: top, width: diameter, height: diameter };

                //inside of parent
                var loc = { left: left - diameter / 2, top: top - diameter / 2, width: diameter, height: diameter };
                return loc;
            } .bind(this));

        }


    });
})();


