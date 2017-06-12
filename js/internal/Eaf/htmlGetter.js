

    eaf.util.namespace('eaf.communications');

    eaf.communications.htmlGetter = new JS.Singleton({
        //see becu_org.communication.serviceConfig
        initialize: function () {
            //properties

        }
        ,

        get: function (uri, successCallback, errorCallback, timeout) {
            $.ajax({
                "url": uri,
                "async": true,
                "dataType": "html",
                "type": "GET",
                //"context": this,
                "timeout": timeout || 0,
                "success": successCallback
            ,
                "error": errorCallback
            });

        }

    });

    eaf.communications.jsonGetter = new JS.Singleton({
        //see becu_org.communication.serviceConfig
        initialize: function () {
            //properties

        }
        ,

        get: function (uri, successCallback, errorCallback, timeout) {
            $.ajax({
                "url": uri,
                "async": true,
                "dataType": "json",
                "type": "GET",
                //"context": this,
                "timeout": timeout || 0,
                "success": successCallback
            ,
                "error": errorCallback
            });

        }

    });