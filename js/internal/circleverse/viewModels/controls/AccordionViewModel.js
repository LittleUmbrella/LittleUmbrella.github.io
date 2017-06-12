
eaf.util.namespace('circleverse.controls.viewModel');

//alert('hi');

circleverse.controls.viewModel.AccordionViewModel = (function () {

    //any global variables here will be in scope for ALL instances
    //of the JS Class, not just one instance

    //var that;
    return new JS.Class('circleverse.controls.viewModel.AccordionViewModel', {

        initialize: function (items, opts) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            var defaults = { allowMultipleItemExpansion: true };

            opts = $.extend(defaults, opts || {});

            this.items = items;
            this.__itemStates = [];

            var item;
            if (items)
                for (var i = 0; i < this.items.length; i++) {
                    item = this.items[i];
                    this['is' + item.key + 'Expanded'] = ko.observable();
                    if (item.expanded)
                        this['is' + item.key + 'Expanded'](true);
                    if (item.vm)
                        this[item.key + 'Vm'] = ko.observable(item.vm);
                }

        }
            ,

        toggle: function (itemKey) {
            var state = this['is' + itemKey + 'Expanded'];

            if (state != null) {
                state(!state());
            }
            else {
                throw new Error(itemKey + ' not found');
            }
        }
        //        ,

        //        isExpanded: function (itemKey) {
        //            var state = this.__itemStates[itemKey];

        //            if (state != null) {
        //                return state;
        //            }

        //            return false;
        //        }

    });
})();

