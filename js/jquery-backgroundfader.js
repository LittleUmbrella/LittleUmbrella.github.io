// Background Image Fader Script by James Brocklehurst 2010
// Licensed under the MIT License:
// http://www.opensource.org/licenses/mit-license.php

// For full instructions visit http://www.mightymeta.co.uk/blog/

// Version 0.0.2

//Configuration:

//var selector = "#nav li a"; // CSS Selector/s for element/s you want to apply fade effect to.
//var hoverOverSpeed = "500"; // Hover over fade speed (in milliseconds)
//var hoverOutSpeed = "300"; // Hover out fade speed (in milliseconds)

// Start JQuery

$(document).ready(function () {

    // Background Opacity Plugin by Nick Obrien (http://www.nickobrien.nl)

    (function ($) {
        jQuery.fn.backOpacity = function (settings) {
            // Default and argument settings
            settings = jQuery.extend({ background: '#000000', opacity: 0.5 }, settings);

            // Loop through each element given and add an opacity element
            jQuery(this).each(function (intIndex) {
                // For fixing background element's positions/sizes these variables are needed
                var $this = $(this);
                var pt = parseInt($this.css('paddingTop'));
                var pb = parseInt($this.css('paddingBottom'));
                var pl = parseInt($this.css('paddingLeft'));
                var pr = parseInt($this.css('paddingRight'));
                var fixedleft = parseInt($this.css('marginLeft'));
                var fixedright = parseInt($this.css('marginRight'));

                // Element offset width
                var parentow = $this.width();

                // Fixed variables
                var fixedwidth, fixedheight, fixedleft, fixedright = 0;

                // Calculate fixing positions/sizes
                fixedwidth = parentow + pl + pr;
                fixedheight = $this.height() + pt + pb;

                // Add background element
                $(document.createElement('div')).width(fixedwidth).height(fixedheight).css({ backgroundColor: settings.background, opacity: settings.opacity, position: 'relative', marginLeft: fixedleft + 'px', marginRight: fixedright + 'px', left: 0, top: 0, bottom: 0, zIndex: ((10) + intIndex * 10) }).insertAfter($this);

                // Set positions for the content element
                $this.css({ width: parentow, position: 'absolute', zIndex: ((20) + intIndex * 20) });
            });

            // Return
            return jQuery;
        };
    })(jQuery);


//    // Animate Fade Effects 

//    $(selector).css({ background: 'none' }); //removes default CSS :hover effect

//    $(selector).backOpacity({ background: '#ccc', opacity: '1' }); // Initiate default background opacity

//    $(selector).hover(

//		function () {
//		    $(this).siblings('div').stop().animate({ 'opacity': 0 }, hoverOverSpeed); //fade out on hover
//		},

//		function () {
//		    $(this).siblings('div').stop().animate({ 'opacity': 1 }, hoverOutSpeed); //fade in on mouseout

//		});

//}); //end