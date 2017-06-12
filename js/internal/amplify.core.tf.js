/*!
* Amplify Core @VERSION
*
* Copyright 2011 appendTo LLC. (http://appendto.com/team)
* Dual licensed under the MIT or GPL licenses.
* http://appendto.com/open-source-licenses
*
* http://amplifyjs.com

modified to loop async, ala mroderick: https://github.com/mroderick/PubSubJS
*/
(function (global, undefined, asyncEach) {


    

    var slice = [].slice,
subscriptions = {};

    var amplify = global.amplify = {
        publish: function (topic) {
            var args,
topicSubscriptions,
subscription,
length,
i = 0,
ret,
async = true;
            var deferred;
            if (arguments.length > 2 && (typeof arguments[1]).toLowerCase() == 'boolean') {
                args = slice.call(arguments, 2);
                async = arguments[1];
            }
            else
                args = slice.call(arguments, 1);


            if (!subscriptions[topic]) {
                return true;
            }

            if ('undefined' != typeof when) {
                deferred = when.defer();
            }
            
            topicSubscriptions = subscriptions[topic].slice();
            if (async) {
                asyncEach(topicSubscriptions, function (item, resume) {
                    // handle item
                    var processor = function (retVal) {
                        //if retVal is a promise, wait to call resume
                        //if it's just a value, check if it's false, or call resume
                        if (retVal === false) {
                            deferred.resolve([]);
                            //not calling resume, is effectively 'break' for asyncEach loop 
                        }
                        else {
                            if ('undefined' != typeof when && when.isPromise(retVal)) {
                                retVal.then(function () {
                                    resume();
                                });
                            }
                            else
                                resume();
                        }
                    };
                    setTimeout(function () {
                        processor(item.callback.apply(item.context, args));
                    }, 0);

                }, function () {
                    if ('undefined' != typeof when) {
                        deferred.resolve([]);
                    }
                });
            }
            else
                for (length = topicSubscriptions.length; i < length; i++) {
                    subscription = topicSubscriptions[i];
                    ret = subscription.callback.apply(subscription.context, args);
                    if (ret === false) {
                        break;
                    }
                }
            return ('undefined' != typeof when) ?
            deferred.promise :
            deferred;
        },

        subscribe: function (topic, context, callback, priority) {
            if (arguments.length === 3 && typeof callback === "number") {
                priority = callback;
                callback = context;
                context = null;
            }
            if (arguments.length === 2) {
                callback = context;
                context = null;
            }
            priority = priority || 10;

            var topicIndex = 0,
topics = topic.split(/\s/),
topicLength = topics.length,
added;
            for (; topicIndex < topicLength; topicIndex++) {
                topic = topics[topicIndex];
                added = false;
                if (!subscriptions[topic]) {
                    subscriptions[topic] = [];
                }

                var i = subscriptions[topic].length - 1,
subscriptionInfo = {
    callback: callback,
    context: context,
    priority: priority
};

                for (; i >= 0; i--) {
                    if (subscriptions[topic][i].priority <= priority) {
                        subscriptions[topic].splice(i + 1, 0, subscriptionInfo);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    subscriptions[topic].unshift(subscriptionInfo);
                }
            }

            return callback;
        },

        unsubscribe: function (topic, callback) {
            if (!subscriptions[topic]) {
                return;
            }

            var length = subscriptions[topic].length,
i = 0;

            for (; i < length; i++) {
                if (subscriptions[topic][i].callback === callback) {
                    subscriptions[topic].splice(i, 1);
                    break;
                }
            }
        }
    };

} (this, undefined, eaf.util.asyncEach));