/*!
* @license PlusAsTab
* Copyright (c) 2011, 2012 The Swedish Post and Telecom Authority (PTS)
* Developed for PTS by Joel Purra <http://joelpurra.se/>
* Released under the BSD license.
*
* A jQuery plugin to use the numpad plus key as a tab key equivalent.
*/

/*jslint vars: true, white: true, browser: true*/
/*global jQuery*/

// Set up namespace, if needed
var JoelPurra = JoelPurra || {};

(function ($, namespace) {
    namespace.KeyAsTab = {};

    var eventNamespace = ".KeyAsTab";

    // Keys from
    // https://developer.mozilla.org/en/DOM/KeyboardEvent#Virtual_key_codes
    var KEY_NUM_PLUS = 107;
    var KEY_NUM_TAB = 9;

    // Add options defaults here
    var internalDefaults = {
        // TODO: allow multiple keys in an array options.keys
        key: KEY_NUM_TAB
    };

    var options = $.extend(true, {}, internalDefaults);

    var enableKeyAsTab = ".key-as-tab, [data-key-as-tab=true]";
    var disableKeyAsTab = ".disable-key-as-tab, [data-key-as-tab=false]";

    // Private functions
    {
        function performEmulatedTabbing(isTab, isReverse, $target) {

            isTab = (isTab === true);
            isReverse = (isReverse === true);

            if (isTab
				&& $target !== undefined
				&& $target.length !== 0) {

                $target.emulateTab(isReverse ? -1 : +1);

                return true;
            }

            return false;
        }

        function isEmulatedTabkey(event) {

            // Checked later for reverse tab
            //&& !event.shiftKey

            // TODO: allow multiple keys in an array options.keys
            if (!event.altKey
				&& !event.ctrlKey
				&& !event.metaKey
				&& event.which === options.key) {

                return true;
            }

            return false;
        }

        function checkEmulatedTabKeyDown(event) {

            if (!isEmulatedTabkey(event)) {

                return;
            }

            var $target = $(event.target);

            if ($target.is(disableKeyAsTab)
				|| $target.parents(disableKeyAsTab).length > 0
				|| (!$target.is(enableKeyAsTab)
					&& $target.parents(enableKeyAsTab).length === 0)) {

                return;
            }

            var wasDone = performEmulatedTabbing(true, event.shiftKey, $target);

            if (wasDone) {

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                return false;
            }

            return;
        }

        function initializeAtLoad() {

            $(document).on("keydown" + eventNamespace, checkEmulatedTabKeyDown);
        }
    }

    // Public functions
    {
        namespace.KeyAsTab.setOptions = function (userOptions) {

            // Merge the options onto the current options (usually the default values)
            $.extend(true, options, userOptions);
        };

        namespace.KeyAsTab.keyAsTab = function ($elements, enable) {

            enable = (enable === undefined ? true : enable === true);

            return $elements.each(function () {

                var $this = $(this);

                $this
					.not(disableKeyAsTab)
					.not(enableKeyAsTab)
					.attr("data-key-as-tab", enable ? "true" : "false");
            });
        };

        $.fn.extend({
            keyAsTab: function (enable) {

                return namespace.KeyAsTab.keyAsTab(this, enable);
            }
        });
    }

    // KeyAsTab initializes listeners when jQuery is ready
    $(initializeAtLoad);

} (jQuery, JoelPurra));