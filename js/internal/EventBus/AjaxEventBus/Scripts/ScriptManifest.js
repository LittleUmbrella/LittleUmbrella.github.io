/*
    This script purely defines the custom scripts in this project that the script loader should know about.
    The result is that we can load them using "Sys.scripts.EventBus" etc.
*/

Sys.loader.defineScripts(null,
   [{
       releaseUrl: 'Scripts/EventBus.js',
       name: 'EventBus',
       dependencies: [Sys.scripts.Core, Sys.scripts.ComponentModel]
   },
   {
       releaseUrl: 'Scripts/Payload.js',
       name: 'Payload',
       dependencies: ['EventBus']
   }]);
