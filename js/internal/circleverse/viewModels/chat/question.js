eaf.util.namespace('circleverse.viewModel.chat');

circleverse.viewModel.chat.question = (function () {

    return new JS.Class("circleverse.viewModel.chat.question", circleverse.viewModel.chat.message, {
        //include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        initialize: function (text) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            this.callSuper(text);
            // // = ko.observableArray([]);

            this.self = this;
            var self = this;

            this.answer = ko.observable(null);
            this.shouldAnswerBeFormatted = ko.observable(false);

            this.answered = ko.computed(function () {
                if (null == this.answer())
                    return false;
                return true;

            } .bind(this));


            //this.textBasedResponse = ko.observable(false);
            //                            this.answerCallBack = null;

            //                            this.answer.subscribe(function (val) {
            //                                if (null != this.answerCallBack) {
            //                                    this.answerCallBack.call(this, val);
            //                                }
            //                            } .bind(this));
        }


    });
})();
