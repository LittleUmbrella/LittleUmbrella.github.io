eaf.util.namespace('circleverse.viewModel.chat');

circleverse.viewModel.chat.message = (function () {

    return new JS.Class("circleverse.viewModel.chat.message", circleverse.viewModel.ResizeableBase, {
        //include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

        //text could actually by a message object
        initialize: function (text, sender, responseTypeExpected) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            // // = ko.observableArray([]);

            this.self = this;
            var self = this;

            if ('string' == (typeof text).toLowerCase() || text == null) {

                this.id = uuid.v4();
                this.sender = ko.observable(sender || '');
                this.text = ko.observable(text || '');
                this.responseTypeExpected = responseTypeExpected;
                this.sent = ko.observable(false);

                this.idOfControlToDisplay = ko.observable();
                this.displayInside = ko.observable(false);
                this.idOfOutsideControlToDisplayIn = ko.observable();
            }
            else if (text.isA(circleverse.viewModel.chat.message)) {
                this.id = text.id;
                this.sender = text.sender;
                this.text = text.text;
                this.responseTypeExpected = text.responseTypeExpected;
                this.sent = text.sent;

                this.idOfControlToDisplay = text.idOfControlToDisplay;
                this.displayInside = text.displayInside;
                this.idOfOutsideControlToDisplayIn = text.idOfOutsideControlToDisplayIn;
            }
            else {
                this.id = uuid.v4();
                this.sender = ko.observable(sender || '');
                this.text = ko.observable(text || '');
                this.responseTypeExpected = responseTypeExpected;
                this.sent = ko.observable(false);

                this.idOfControlToDisplay = ko.observable();
                this.displayInside = ko.observable(false);
                this.idOfOutsideControlToDisplayIn = ko.observable();
                throw new Error("text in unexpected format " + text.toString());
            }

        }

    });
})();
