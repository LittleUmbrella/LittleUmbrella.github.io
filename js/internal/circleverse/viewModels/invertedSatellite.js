
eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.InvertedSatellite = (function () {



    return new JS.Class({

        initialize: function (object, parentDiameter, parentInnerDiameter, satelliteDiameter, collectionCallback, itemCallback) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {

            this.callSuper();
            //properties
             // = ko.observableArray([]);
            //log(parentDiameter);
            var offset = collectionCallback().length == 1 ? parentInnerDiameter : 0;

            this.location = ko.dependentObservable(function () {
                // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
                var collection = collectionCallback();
                var diameter = ko.unwrap(satelliteDiameter); // this.methodDiameter;
                var parentDiam = ko.unwrap(parentInnerDiameter);

                //log('parentDiameter=' + parentDiameter);


                var item = this.model();
                if (itemCallback) {
                    item = itemCallback();
                }

                var settings = {
                    collection: collection
                    , item: item
                    , itemDiameter: diameter
                    , minCenterDiameter: parentDiam
                    , itemSeparation: 0
                    , itemPadding: 1
                    , center: { x: (parentDiameter / 2), y: (parentDiameter/2) }
                };


                var pos = littleUmbrella.circleverse.ui.shapes.satellite.getPosition(settings);

                var loc = { left: pos.x, top: pos.y, width: diameter, height: diameter };

                //inside of parent
                //var loc = { left: left - diameter / 2, top: top - diameter / 2, width: diameter, height: diameter };
                return loc;


            } .bind(this));

        }


    });
})();


