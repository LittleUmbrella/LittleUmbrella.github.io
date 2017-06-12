(function ($) {
    $.fn.filterNode = function (name) {
        return this.filter(function () {
            return this.nodeName === name;
        });
    };
})(jQuery);