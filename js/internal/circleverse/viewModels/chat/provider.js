eaf.util.namespace('circleverse.viewModel.chat');

circleverse.viewModel.chat.provider = (function () {

    return new JS.Class("circleverse.viewModel.chat.provider", circleverse.viewModel.ResizeableBase, {
        //include: [becu_org.ui.viewModel.baseModule, circleverse.viewModel.centerCircle, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],


        initialize: function (responseCallback) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties
            // // = ko.observableArray([]);

            this.self = this;
            var self = this;

            //can hold messages and questions
            this.messages = ko.observableArray([]);
            this.responseCallback = responseCallback;
            this.allQuestionsAnswered = ko.observable(false);

            //basically implementing yield for the getNextMessage
            //this.index = -1;
        }
                                ,

        addMessage: function (message) {
            //                            for (var i = 0; i < this.questions().length; i++) {
            //                                if (text == this.questions()[i].text)
            //                                    return;
            //                            }

            //var question = new circleverse.viewModel.question(text);
            this.messages.push(message);
        }
                                ,

        getNextMessage: function () {
            //                            this.index++;

            //                            while (this.index < this.messages().length) {
            //                                if (!this.messages()[this.index].isA(circleverse.viewModel.chat.question)) {
            //                                    return { context: this.messages()[this.index], message: this.messages()[this.index], response: null };
            //                                }
            //                                else if (!this.messages()[this.index].answered()) {
            //                                    return { context: this.messages()[this.index], message: this.messages()[this.index], response: this.response };

            //                                }
            //                                this.index++;
            //                            }
            for (var i = 0; i < this.messages().length; i++) {
                if (!this.messages()[i].isA(circleverse.viewModel.chat.question)) {
                    if (!this.messages()[i].sent()) {
                        return { context: this.messages()[i], message: this.messages()[i], response: null };
                    }
                }
                else {
                    if (!this.messages()[i].answered()) {
                        return { context: this.messages()[i], message: this.messages()[i], response: this.response };
                    }
                    else if (!this.messages()[i].sent()) {
                        return { context: this.messages()[i], message: this.messages()[i], response: this.response };
                    }
                }
            }
        }
                                ,

        response: function (ctx, message) {
            var answer = new circleverse.viewModel.chat.answer(message);
            ctx.answer(answer);

            if (this.responseCallback)
                this.responseCallback();
            //question.answered(true);

            //answer.question().answered(false);
            //this.currentQuestion(answer.question());

            //todo: decide if this.index == this.messages().length is good enough.  should be
            for (var i = 0; i < this.messages().length; i++) {
                if (this.messages()[i].isA(circleverse.viewModel.chat.question) && !this.messages()[i].answered()) {
                    //this.currentQuestion(this.questions()[i]);
                    return;
                }
            }

            this.allQuestionsAnswered(true);
        }
    });
})();
