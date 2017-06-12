(function ($) {

    var methods = {
        init: function (options) {
            //alert('works');


            // build main options before element iteration
            var opts = $.extend({}, $.fn.infinitews.defaults, options);
            return this.each(function () {

                var $this = $(this),
                //data = $this.data('infinitews'),
                 infinitews = $('<div />', {
                     text: $this.attr('title')
                 });

                //todo: determine best place for this line  if the metadata plug-in is installed, use it to build the options   
                var o = $.metadata ? $.extend({}, opts, $this.metadata()) : opts;


                $this.append('<a href="#" id="toDrag"  style="position: absolute;" draggable="true">This is a draggable item</a>');
                //$this.append('<div id="toDrag" style="position: absolute;" draggable="true">This is a draggable item</div>');
                //event handling 
                //$(window).bind('resize.infinitews', methods.reposition);



                // If the plugin hasn't been initialized yet
                //            if ( ! data ) {
                //         
                //                /*
                //                    Do more setup stuff here
                //                */

                //                $(this).data('infinitews', {
                //                    target : $this,
                //                    infinitews : infinitews
                //                });

                //            }
            });

            $.fn.infinitews.defaults = {
                from: '#016bbd'
            };
        },
        destroy: function () {


            return this.each(function () {

                var $this = $(this),
                data = $this.data('infinitews');

                // Namespacing FTW
                $(window).unbind('.infinitews');
                data.tooltip.remove();
                $this.removeData('infinitews');

                //event handling cleanup
                //$(window).unbind('.infinitews');


            })

        } //,
        //     reposition : function( ) { // ... },
        //     show : function( ) { // ... },
        //     hide : function( ) { // ... },
        //     update : function( content ) { // ...}

    };



    $.fn.infinitews = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.infinitews');
        }

    };
})(jQuery);
