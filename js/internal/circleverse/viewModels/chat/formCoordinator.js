eaf.util.namespace('circleverse.viewModel.chat');

circleverse.viewModel.chat.formCoordinator = (function () {

    return new JS.Class("circleverse.viewModel.formChatCoordinator", {


        initialize: function (eventAggregator, chatClient, chatProvider, sender, cheekyTimeout) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties

            this.self = this;
            var self = this;

            this.sender = sender || { name: 'system' };
            this.cheekyTimeout = cheekyTimeout || 6000;

            this.chatClient = chatClient;
            this.eventAggregator = eventAggregator;
            this.queries = ko.observableArray([]);
            this.listening = false;
            this.chatProvider = chatProvider;
            this.cheekySleeper = null;
            this.query = null;
            this.state = ko.observable();
            //the editor auto-heights the textarea based on its height
            //which includes the toolbar and editor, so we need to add toolbar height back
            this.__isHeightCorrected = false;

            this.currentQuestion = ko.observable();
            this.cheeky = false; //ko.observable(true);
            //todo:make configurable
            this.listOfCheekySeries = [
                                    ['What are you, writing a book?', 'Don\'t get me wrong; that\'s a good thing <zzzz>']
                                    ,
                                    ["Don't mind me; I'm just defragging my hard drive while I wait for a response"]
                                    ,
                                    ["Don't ask me how, but I'm pretty sure Butch is going to love this idea", "...not sure about Tom"]
                                    ];



            this.eventAggregator.subscribe("messageSent", function (args) {
                //log("got message");
                if (this.listening && this.query.message.sender() != args.sender()) {
                    if (this.query && this.query.response) {
                        this.query.response.call(this.chatProvider, this.query.context, args);
                        this.cheekySleeper = null;

                        if ('retraction' == self.state()) {
                            self.chatClient.sendMessage(new circleverse.viewModel.chat.message('And now let me ask the last question again...', self.sender));
                            self.state(null);
                        }
                        self.__getAndSendNextMessage.call(self, 1000);
                    }

                    this.listening = false;
                }
            } .bind(this));

            this.eventAggregator.subscribe("messageRetracted", function (args) {
                log("got retracted");
                var currentQuery = this.query;
                for (var i = 0; i < this.queries().length; i++) {
                    if (this.queries()[i].message.answered() && this.queries()[i].message.answer().id == args.id) {
                        if (currentQuery) {
                            this.state('retraction');

                        }

                        //clear answer 
                        self.queries()[i].message.answer(null);
                        //this.query = self.queries()[i];

                        //if (this.query != currentQuery) {
                        //                                        for (var h = 0; h < this.queries().length; h++) {
                        //                                            if (this.query == this.queries()[h])
                        //                                                this.queries().splice(h, 1);
                        //                                        }
                        //}
                        this.listening = true;
                        this.chatClient.sendMessage(new circleverse.viewModel.chat.message('Okay, let me ask again...', this.sender));

                        this.__getAndSendNextMessage(1000);
                        //this.chatClient.sendMessage(self.query.message);

                    }
                }
            } .bind(this));


        }
                                ,

        startMessaging: function () {
            this.__getAndSendNextMessage(1000);
        }

                                ,

        //necessary because editors will do funny stuff and show themselves
        __supressEditor: function () {
            this.chatClient.editor.$frame.hide();
        }
        ,

        __resetShow: function () {
            var self = this;
            var _oldShow = $.fn.show;

            $.fn.show = function (speed, oldCallback) {
                if (!$.fn.hasEventBinding(self.chatClient.editor.$frame, 'afterShow'))
                    self.chatClient.editor.$frame.bind('afterShow', eaf.core.createDelegate(self, self.__supressEditor));

                return $(this).each(function () {
                    var 
                        obj = $(this),
                        newCallback = function () {
                            if ($.isFunction(oldCallback)) {
                                oldCallback.apply(obj);
                            }

                        };

                    // you can trigger a before show if you want
                    obj.trigger('beforeShow');

                    // now use the old function to show the element passing the new callback
                    _oldShow.apply(obj, [speed, newCallback]);
                    obj.trigger('afterShow');
                });

            }

        }
                                ,

        __getAndSendNextMessage: function (timeout) {
            var self = this;

            if (this.subscription) this.subscription.dispose();

            this.query = this.chatProvider.getNextMessage();

            //all about auto advancing the chat, regardless of source of answer
            //since chat can "steal" controls, best to suppress for now
            //                            if (this.query.message.isA(circleverse.viewModel.chat.question)) {
            //                                this.subscription = this.query.message.answer.subscribe(function (val) {
            //                                    self.subscription.dispose();
            //                                    if (this.message.answer() != null && !this.message.answer().sent()) {
            //                                        self.chatClient.sendMessage(new circleverse.viewModel.chat.message(val, self.chatClient.localSender));
            //                                    }
            //                                } .bind(this.query));
            //                            }


            if (this.query) {
                self.chatClient.sendStatus('system is typing a message...');
                setTimeout(function () {



                    self.chatClient.sendMessage(self.query.message);
                    self.chatClient.sendStatus('');

                    if ('undefined' != typeof self.query.message.idOfControlToDisplay()) {
                        //if (self.query.message.displayInside()) {
                        self.chatClient.provideNode(self.query.message);
                        //                                        }
                        //                                        else {
                        //                                            var node = $("#" + nodeId);
                        //                                            node.appendTo();
                        //                                        }
                    }



                    //add or remove romatting controls
                    if (self.query.message.isA(circleverse.viewModel.chat.question)) {
                        if (self.query.message.shouldAnswerBeFormatted()) {
                            self.chatClient.switchToRichEntry();
                        }
                        else {
                            self.chatClient.switchToPlainEntry();
                        }

                        //                        if (self.query.message.shouldAnswerBeFormatted()) {
                        //                            //                            self.chatClient.editor.$frame.css('visibility', 'visible');
                        //                            //                            self.chatClient.editor.$area.css('visibility', 'hidden');

                        //                            self.chatClient.editor.$frame.unbind('afterShow');

                        //                            if (self.chatClient.editor.updateFrame && self.chatClient.editor.$frame.css("display") == 'none') {

                        //                                self.chatClient.editor.$toolbar.css('visibility', 'visible');
                        //                                //self.chatClient.editor.$toolbar.show();
                        //                                self.chatClient.editor.$frame.css('display', 'block');
                        //                                self.chatClient.editor.$area.css('display', 'none'); ;
                        //                            }

                        //                            try {
                        //                                self.chatClient.editor.focus();
                        //                            }
                        //                            catch (e) { }
                        //                        }
                        //                        else {
                        //                            if (self.chatClient.editor.updateFrame) {
                        //                                var toolbarHeight = self.chatClient.editor.$toolbar.height();
                        //                                //                            self.chatClient.editor.$frame.css('visibility', 'hidden');
                        //                                //                            self.chatClient.editor.$area.css('visibility', 'visible');
                        //                                if (self.chatClient.editor.$area.css("display") == 'none') {
                        //                                    self.__resetShow();
                        //                                    //doesn't work.  cleditor re-creates iframe on refresh
                        //                                    //self.chatClient.editor.$frame.bind('afterShow', eaf.core.createDelegate(self, self.__supressEditor));
                        //                                    self.chatClient.editor.$toolbar.css('visibility', 'hidden');
                        //                                    self.chatClient.editor.$frame.css('display', 'none');
                        //                                    self.chatClient.editor.$area.css('display', 'block');
                        //                                    //the editor auto-heights the textarea based on its height
                        //                                    //which includes the toolbar and editor, so we need to add toolbar height back
                        //                                    //                                if (!self.__isHeightCorrected) {
                        //                                    //                                    self.__isHeightCorrected = true;
                        //                                    //                                    self.chatClient.editor.$area.height(self.chatClient.editor.$area.height() + toolbarHeight);
                        //                                    //                                }

                        //                                    try {
                        //                                        self.chatClient.editor.$area.focus();
                        //                                    }
                        //                                    catch (e) { }
                        //                                }
                        //                            }
                        //                        }


                    }

                    if (self.query.response) {
                        self.queries.push(self.query);

                        self.listening = true;
                        self.setCheekySleeper();

                        if (self.query.message.answered()) {
                            self.chatClient.sendMessage(self.query.message.answer());
                        }
                    }
                    else
                    //no response required, get next message
                        self.__getAndSendNextMessage(2000);
                }, timeout);
            }

        }
                                ,
        setCheekySleeper: function () {
            var self = this;
            if (this.cheeky) {

                this.cheekySleeper = setTimeout(function () {
                    var rand = 0;
                    self.sendCheekyLoop(self.listOfCheekySeries[rand]);

                }, this.cheekyTimeout);
            }
        }
                                ,

        sendCheekyLoop: function (arr, index) {
            var self = this;
            index = index || 0;

            if (index < arr.length) {
                self.chatClient.sendStatus('system is typing a message');

                setTimeout(function () {


                    self.chatClient.sendMessage(new circleverse.viewModel.chat.message(arr[index], self.sender));
                    self.chatClient.sendStatus('');

                    self.sendCheekyLoop(arr, ++index)


                }, 2000);
            }
        }


    });
})();