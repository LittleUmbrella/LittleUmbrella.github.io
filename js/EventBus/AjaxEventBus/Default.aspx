<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="AjaxEventBus._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>JavaScript Event Bus Sample</title>
    <style type="text/css">
        body
        {
            font-family: Calibri;
            font-size: medium;
        }
        
        #publisher
        {
            position: absolute;
            top: 5px;
            left: 15px;
            width: 439px;
            height: 24px;
            border: solid 2px black;
            background-color: Yellow;
            padding: 8px;
        }
        
        #listenerone
        {
            position: absolute;
            top: 50px;
            left: 15px;
            width: 204px;
            height: 50px;
            border: solid 2px black;
            background-color: Blue;
            padding: 8px;
            color: White;
        }
        
        #listenertwo
        {
            position: absolute;
            top: 50px;
            left: 250px;
            width: 204px;
            height: 50px;
            border: solid 2px black;
            background-color: Green;
            padding: 8px;
            color: White;
        }
    </style>
    <script src="http://ajax.microsoft.com/ajax/beta/0911/Start.debug.js" type="text/javascript"></script>
    <script src="Scripts/ScriptManifest.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        var dependencies = [
            Sys.scripts.Core,
            Sys.scripts.jQuery,
            Sys.scripts.EventBus,
            Sys.scripts.Payload
        ];

        Sys.require(dependencies, function() {

            /*
            In this sample, all these scripts are in the same file.
            This is a bad example as we could just use data binding
            to get a similar effect, but with quite tight coupling.
                
            However, in a real system, the point of this spike is that 
            they could be in different files, controls, or whatever! All 
            they need to do to ensure they can hook into the page's behaviour
            is to declare a dependency on Sys.scripts.EventBus, and 
            subscribe to or publish events.
                              
            Really simple in reality, but I think it works well.
            */

            // get a reference to the page's event bus instance
            var bus = Sample.EventBus.get_Instance();

            // when the text changes, publish a 'Update' event
            $('#PublishedText').change(function() {
                var arg = $(this).val();
                bus.publish(Sample.Payload.Events.Update, new Sample.Payload(arg));
            });

            // when the button is clicked, publish a 'Click' event
            $('#PublishedButton').click(function() {
                var arg = $('#PublishedText').val();
                bus.publish(Sample.Payload.Events.Click, new Sample.Payload(arg));
            });

            // when the change event is fired, update the first listener
            bus.subscribe(Sample.Payload.Events.Update, function(arg) {
                $('#listenerone').html(String.format('Value:<br />{0}<br />Updated {1}', arg.data, new Date()));
            });

            // when the click event is fired, update the second listener
            bus.subscribe(Sample.Payload.Events.Click, function(arg) {
                $('#listenertwo').html(String.format('Value:<br />{0}<br />Updated {1}', arg.data, new Date()));
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="publisher">
        Enter some text here: <input type="text" id="PublishedText" /> <input type="button" id="PublishedButton" value="Publish" />    
    </div>
    <div id="listenerone">
    
    </div>
    <div id="listenertwo">
    
    </div>
    </form>
</body>
</html>
