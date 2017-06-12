//JS.Interface.test = function (object, returnName) {
//            var n = methods.length;
//            while (n--) {
//                if (!eaf.util.isDefined(object, n))
//                    return returnName ? methods[n] : false;
//            }
//            return true;
//        };



//define('JSextend', ['js!JS.Class!order'], function () {
    //works just like JS.Interface.ensure except that it returns bool instead of undefined/Error 
    //Unfortunately, if JS.Interface.ensure ever changes, this should too.   
    JS.Interface.extend({ implements: function () {
        var args = JS.array(arguments), object = args.shift(), face, result;
        while (face = args.shift()) {
            result = face.test(object, true);
            if (result !== true) return false;
        }

        return true;
    }
});
    
//});