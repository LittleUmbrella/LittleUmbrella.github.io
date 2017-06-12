eaf.util.namespace('circleverse.viewModel.chat');

circleverse.viewModel.chat.client = (function () {

    return new JS.Class("circleverse.viewModel.chat.client", circleverse.viewModel.ResizeableBase, {
        include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule],


        initialize: function (eventAggregator, localSender, editor) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //properties

            this.callSuper();

            this.self = this;
            var self = this;

            this.state = ko.observable();

            this.canSave = ko.observable(true);

            this.localSender = localSender;
            this.editor = editor;
            this.eventAggregator = eventAggregator;
            this.messages = ko.observableArray([]);
            this.hasfocus = ko.observable(false);

            this.mode = ko.observable('rich');


            this.colorIndex = 0;
            //this.senders = [localSender];
            this.colors = ['#000000', '#816b5b', '#0A151F', '#222233', '#1D1D27', '#0B0C21', '#1C302B', '#192421', '#091F1A', '#30220E'];

            //this.colors = ['#FFFFBB', '#FfcffF', '#BBFFFF', '#A49680', '#41472A', '#996B93', '#788897'];

            this.colorMap = [{ sender: localSender, color: this.getNextColor()}];


            this.__shouldHasfocus = ko.observable(false);
            this.plainEntryHasfocus = ko.computed(function () {
                if (this.__shouldHasfocus() && this.mode() == 'plain' && 'interactive' == this.state())
                    return true;
                return false;
            } .bind(this));

            this.richEntryHasfocus = ko.computed(function () {
                if (this.__shouldHasfocus() && this.mode() == 'rich' && 'interactive' == this.state())
                    return true;
                return false;
            } .bind(this));

            //                            this.messageColor = ko.computed(function(){
            //                                return 'yellow';
            //                                });

            this.displayStyle = ko.computed(function () {
                return (this.state() == 'interactive' ? 'block' : 'none');
            } .bind(this));

            this.status = ko.observable();


            //used to clear the message field, and to retract answers
            this.currentMessage = ko.observable();



            var chatHistories = $(".history");

            function scrollsync() {
                chatHistories.each(function () {
                    this.scrollTop = this.scrollHeight;
                });
            }

            this.eventAggregator.subscribe("stateChange", function (topic, args) {
                self.mode(args);
                //clear the message editor tip
//                var tip = this.mainEditorQTip.qtip('api');
//                tip.hide();
//                this.mainEditorQTip = null;
            });


            this.eventAggregator.subscribe("messageSent", scrollsync);

            this.eventAggregator.subscribe('saveMe', function (topic, args) {
                if (args == 'interactive')
                    scrollsync();
            });

        }
                                ,
        switchToRichEntry: function () {
            this.mode('rich');
        }
                                ,
        switchToPlainEntry: function () {
            this.mode('plain');
        }
                                ,

        save: function () {
        }
                                ,

        saveDraft: function () {
        }
                                ,

        messageColor: function (message) {
            for (var i = 0; i < this.colorMap.length; i++) {
                if (this.colorMap[i].sender == message.sender())
                    return this.colorMap[i].color;
            }

            return this.colors[0];
        }
                                ,

        getNextColor: function () {
            if (this.colorIndex >= this.colors.length)
                this.colorIndex = 0;

            return this.colors[this.colorIndex++];
        }
                                ,

        sendMessage: function (msg) {
            //var msg = new circleverse.viewModel.chat.message(message, sender);

            var found = false;
            for (var i = 0; i < this.colorMap.length; i++) {
                if (this.colorMap[i].sender == msg.sender()) {
                    found = true;
                    break;
                }


            }

            if (!found)
                this.colorMap.push({ sender: msg.sender(), color: this.getNextColor() });

            //because we have an editor, it's really the editor we have to show
            $("#message").parent().show();

            if ('undefined' != typeof this.nodeShowing) {
                this.parentNode.replaceWith(this.nodeShowing);
                this.nodeShowing = null;
                this.mode('rich');
            }

            this.messages.push(msg);
            msg.sent(true);
            this.eventAggregator.publish("messageSent", msg);

            if (msg.sender() == this.localSender) {
                this.currentMessage(msg.text());

                this.currentMessage('');
                //                if (this.editor.updateFrame) {
                //                    this.editor.clear();
                //                }
                //                try {
                //                    this.editor.focus();
                //                }
                //                catch (e) { }

                this.__shouldHasfocus(true);
            }
            //this.__shouldHasfocus(false);
            //

        }
                                ,

        provideNode: function (config) {
            var node = $("#" + config.idOfControlToDisplay());

            //create placeholder for copying back the node
            this.parentNode = $('<div id="' + config.idOfControlToDisplay() + 'PlaceHolder"/>');
            node.after(this.parentNode);

            this.nodeShowing = node;
            //this.parentNode = node.parent();
            if (config.displayInside()) {
                node.appendTo("#messageContainer");
                //because we have an editor, it's really the editor we have to hide
                $("#message").parent().hide();
                this.mode('control');
            }
            else {
                node.appendTo("#" + config.idOfOutsideControlToDisplayIn());

                //this.mode('plain');
            }
        }
                                ,

        sendStatus: function (status) {
            this.status(status);
        }
                                ,

        retractMessage: function (msg) {
            for (var i = 0; i < this.messages().length; i++) {
                if (this.messages()[i] == msg) {
                    //this.messages.splice(i, 1);

                    this.eventAggregator.publish("messageRetracted", msg);

                    this.currentMessage(msg.text());
                    //this.editor.$area.val(msg.text());

                    //todo: refactor out of message client
                    //                    if (this.editor.updateFrame) {
                    //                        this.editor.updateFrame();
                    //                        this.editor.select();
                    //                    }

                    //                    try {
                    //                        this.editor.focus();
                    //                    }
                    //                    catch (e) { }
                    //this.currentMessage(msg.text());
                    this.__shouldHasfocus(true);
                }
            }
        }
                                ,

        //        clearCurrentMessage: function () {
        //            this.currentMessage('');
        //        }
        //        ,

        droppedOn: function (dragModel, dragViewModel) {
            this.currentMessage(dragViewModel.getValue());
            //            if (this.editor.updateFrame) {
            //                this.editor.updateFrame();
            //            }

            //            try {
            //                this.editor.focus();
            //            }
            //            catch (e) { }
            this.__shouldHasfocus(true);
        }
    });
})();
