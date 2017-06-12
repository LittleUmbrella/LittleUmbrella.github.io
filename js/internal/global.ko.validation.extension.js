JS.require('ko.validation', function () {
    ko.validation.extension = function () { };

    ko.validation.rules['conditional'] = {
        validator: function (inputValue, validationValue) {

            typeof o === 'function' ? o() : o;

            if (validationValue) {
                if (utils.isArray(validationValue)) {
                    var validationItem, retVal = true;
                    for (var i = 0; i < validationValue.length; i++) {
                        validationItem = validationValue[i];
                        if (ko.unwrap(validationItem.field) == validationItem.value) {
                            retVal = ko.validation.rules[nativeValidator].validator(inputValue, true);
                        }

                        if (retVal === false)
                            return retVal;
                    }

                } else if (utils.isObject(val)) {
                    objValues = utils.values(validationValue);
                }

                return retVal;
            }
        }
    };

    ko.validation.registerExtenders();
});