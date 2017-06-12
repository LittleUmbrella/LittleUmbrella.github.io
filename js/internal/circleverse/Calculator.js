/*
thanks: http://www.anaesthetist.com/mnm/javascript/calc.htm#all
*/
    eaf.util.namespace('circleverse.tools');
    circleverse.tools.Calculator = (function () {
        var MAXLENGTH = 30;     // maximum number of digits before decimal!
        return new JS.Class({
            initialize: function (onChange) {
                //properties

                this.memory = "0";      // initialise memory variable
                this.current = "0";      //   and value of Display ("current" value)
                this.operation = 0;      // Records code for eg * / etc.
                this.onChange = onChange || function () { };
            }
            ,

            addDigit: function (dig)          //ADD A DIGIT TO DISPLAY (keep as 'current')
            {
                if (this.current.indexOf("!") == -1)  //if not already an error
                {
                    if ((eval(this.current) == 0)
              && (this.current.indexOf(".") == -1)
         ) {
                        this.current = dig;
                    } else {
                        this.current = this.current + dig;
                    };
                    this.current = this.current.toLowerCase(); //FORCE LOWER CASE
                } else {
                    this.current = "Hint! Press 'CLEAR'";  //Help out, if error present.
                };
                if (this.current.indexOf("e0") != -1) {
                    var epos = this.current.indexOf("e");
                    this.current = this.current.substring(0, epos + 1) + this.current.substring(epos + 2);
                };
                if (this.current.length > MAXLENGTH) {
                    this.current = "Aargh! Too long"; //don't allow over MAXLENGTH digits before "." ???
                };
                this.onChange(this.current);
            }
,

            dot: function ()                  //PUT IN "." if appropriate.
            {
                if (this.current.length == 0)     //no leading ".", use "0."
                {
                    this.current = "0.";
                } else {
                    if ((this.current.indexOf(".") == -1)
            && (this.current.indexOf("e") == -1)
          ) {
                        this.current = this.current + ".";
                    };
                };
                this.onChange(this.current);
            }
,

            doExponent: function () {
                if (this.current.indexOf("e") == -1) {
                    this.current = this.current + "e0";
                    this.onChange(this.current);
                };
            }
,

            plusMinus: function () {
                if (this.current.indexOf("e") != -1) {
                    var epos = this.current.indexOf("e-");
                    if (epos != -1) {
                        this.current = this.current.substring(0, 1 + epos) + this.current.substring(2 + epos); //clip out -ve exponent 
                    } else {
                        epos = this.current.indexOf("e");
                        this.current = this.current.substring(0, 1 + epos) + "-" + this.current.substring(1 + epos); //insert -ve exponent
                    };
                } else {
                    if (this.current.indexOf("-") == 0) {
                        this.current = this.current.substring(1);
                    } else {
                        this.current = "-" + this.current;
                    };
                    if ((eval(this.current) == 0)
            && (this.current.indexOf(".") == -1)
          ) { this.current = "0"; };
                };
                this.onChange(this.current);
            }
,

            clear: function ()                //CLEAR ENTRY
            {
                this.current = "0";
                this.onChange(this.current);
            }
,

            allClear: function ()             //Clear ALL entries!
            {
                this.current = "0";
                this.operation = 0;                //clear operation
                this.memory = "0";                  //clear memory
                this.onChange(this.current);
            }
,

            operate: function (op)            //STORE OPERATION e.g. + * / etc.
            {
                if (this.operation != 0) { this.calculate(); }; //'Press "=" if pending operation!
                // note that design is not good for showing *intermediate* results.

                if (op.indexOf("*") > -1) { this.operation = 1; };       //codes for *
                if (op.indexOf("/") > -1) { this.operation = 2; };       // slash (divide)
                if (op.indexOf("+") > -1) { this.operation = 3; };       // sum
                if (op.indexOf("-") > -1) { this.operation = 4; };       // difference

                this.memory = this.current;                 //store value
                // note how e.g. this.current.value gives neither error nor value! ***
                this.current = "";
                this.onChange(this.current);
            }
,

            calculate: function ()            //PERFORM CALCULATION (= button)
            {
                if (this.operation == 1) { this.current = eval(this.memory) * eval(this.current); };
                if (this.operation == 2) {
                    if (eval(this.current) != 0) {
                        this.current = eval(this.memory) / eval(this.current)
                    } else {
                        this.current = "Aargh! Divide by zero"; //don't allow over MAXLENGTH digits before "." ???
                    }
                };
                if (this.operation == 3) { this.current = eval(this.memory) + eval(this.current); };
                if (this.operation == 4) { this.current = eval(this.memory) - eval(this.current); };
                this.operation = 0;                //clear operation
                this.memory = "0";                  //clear memory
                this.current = this.current + "";       //FORCE A STRING!
                if (this.current.indexOf("Infinity") != -1)        //eg "1e320" * 1
                {
                    this.current = "Aargh! Value too big";
                };
                if (this.current.indexOf("NaN") != -1)        //eg "1e320" / "1e320"
                {
                    this.current = "Aargh! I don't understand";
                };
                this.onChange(this.current);
                // NOTE: if no operation, nothing changes, this.current is left the same!
            }
,

            fixCurrent: function (value) {
                this.current = value;
                this.current = "" + parseFloat(this.current);
                if (this.current.indexOf("NaN") != -1) {
                    this.current = "Aargh! I don't understand";
                };
                this.onChange(this.current);
            }
        });
    })();

