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
(function (global, undefined) {


    Array.prototype.asyncEach = function (iterator, finished) {
        var list = this,
      n = list.length,
      i = -1,
      calls = 0,
      looping = false;

        var iterate = function () {
            calls -= 1;
            i += 1;
            if (i === n)
                return finished.apply(list);
            iterator(list[i], resume);
        };

        var loop = function () {
            if (looping) return;
            looping = true;
            while (calls > 0) iterate();
            looping = false;
        };

        var resume = function () {
            calls += 1;
            if (typeof setTimeout === 'undefined') loop();
            else setTimeout(iterate, 0);
        };
        resume();
    };

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
                topicSubscriptions.asyncEach(function (item, resume) {
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

} (this));