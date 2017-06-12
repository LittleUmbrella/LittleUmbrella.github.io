eaf.util.namespace('circleverse.viewModel');

//alert('hi');

circleverse.viewModel.CenterSun = new JS.Class(circleverse.viewModel.ResizeableBase, {
    include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],


    initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
        this.callSuper();
        //properties
        this.model(object); // = ko.observableArray([]);

        this.that = this;
        this.location = ko.observable();
        //left: scale() * 300, top:,

        this.location({ left: 0, top: 0 });
        this.dimensions = ko.observable();
        this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



        var coords = this.__getCoords();
        this.location({ left: coords.left, top: coords.top });
        this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


        //log('garbage position: ' + this.position().top);
    }
});

circleverse.viewModel.CenterSun = new JS.Class(circleverse.viewModel.ResizeableBase, {
    include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule, circleverse.viewModel.noActionModule],

        
    initialize: function (object) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
        this.callSuper();
        //properties
        this.model(object); // = ko.observableArray([]);

        this.that = this;
        this.location = ko.observable();
        //left: scale() * 300, top:,

        this.location({ left: 0, top: 0 });
        this.dimensions = ko.observable();
        this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });



        var coords = this.__getCoords();
        this.location({ left: coords.left, top: coords.top });
        this.dimensions({ height: this.scale() * initSize, width: this.scale() * initSize });


        //log('garbage position: ' + this.position().top);
    }
});

