eaf.util.namespace('circleverse.viewModel');

circleverse.viewModel.table = (function () {
    //should only set once.  todo: consider alternatives (possibly a separate global objects)
    //var opts = {};

    return new JS.Class("circleverse.viewModel.table", //circleverse.viewModel.ResizeableBase, 
    {
        //include: [becu_org.ui.viewModel.baseModule, becu_org.ui.viewModel.draggableModule, becu_org.ui.viewModel.droppableModule, becu_org.ui.viewModel.circleModule],

        initialize: function (title, columns, data) {// (tracker, uri, templateUri, templateId, resultTemplateUri, callSpec, name, id, businessClass, opts) {
            //this.callSuper();
            //properties
            var self = this
            this.self = self;
            this.rows = ko.observableArray();

            this.title = title;

            this.selectedItem = ko.observable();

            this.dimensions = ko.observable({ width: 100, height: 100 });

            this.columns = ko.observableArray();

            this.allRowAggregate = ko.observable(0).extend({ money: null });
            this.allColumnAggregate = ko.observable(0).extend({ money: null });
            this.allAggregate = ko.computed(function () {
                return parseFloat(this.allColumnAggregate()) + parseFloat(this.allRowAggregate());
            } .bind(this)).extend({ money: null });


            for (var i = 0; i < columns.length; i++) {
                var safeName = columns[i].name.replace(/[^a-zA-Z0-9]+/g, '');
                var columnName = columns[i].name

                this.columns()[safeName] = {};
                if ('function' == typeof columns[i]) {

                }

                //i (each node of columns) is expected to be {name: 'colname', func: function(val){}} 
                switch (columns[i].type) {
                    case 'money':
                        this.columns()[safeName]['name'] = ko.observable(columnName);

                        this['colTotal' + safeName] = ko.observable(0).extend({ money: null });
                        break;
                    default:
                        this.columns()[safeName]['name'] = ko.observable(columnName);

                        this['colTotal' + safeName] = ko.observable(0);
                        break;
                }
                this.columns()[safeName]['func'] = columns[i].func;

                //                                this['rowTotal' + i] = new computed(function () {                                    
                //                                    for (var i = 0; i < this.rows().length; i++) {
                //                                        
                //                                    }
                //                                }); 

                this['colTotal' + safeName].subscribe(function (val) {
                    var colTotal = 0;
                    for (var colName in self.columns()) {
                        if (!self.columns().hasOwnProperty(colName))
                            continue;
                        colTotal += parseFloat(this['colTotal' + colName]());
                    }
                    this.allColumnAggregate(colTotal);

                } .bind(this));
            }


            for (var i = 0; i < data.length; i++) {
                this.addRow(data[i]);

            }

        }
                                ,

        __observeValue: function (val, colName) {
            var self = this;
            val.subscribe(function (newVal) {

                var row;
                var value;
                //for (var colName in self.columns()) {
                if (!this.columns().hasOwnProperty(colName))
                    return;
                var total = 0;

                for (var j = 0; j < this.rows().length; j++) {
                    row = this.rows()[j];
                    for (var k = 0; k < row['values']().length; k++) {
                        value = row['values']()[k];
                        if (value['name'] == colName) {
                            //call column aggregator function
                            total = this.columns()[colName]['func'](value, total);
                            break;
                        }
                    }
                }

                this['colTotal' + colName](total);

                //}
            } .bind(self));
        }
                        ,
        //data is expected to be {name: '<name>', data: {<colname>: <value>, <colname>: <value>...}, agg: function(val){}}
        addRow: function (row) {
            var newRow = {};
            newRow['values'] = ko.observableArray();

            var self = this;


            var rowHasData = false;

            var rowData;
            if (null == row || null == row.data) {
                for (var h in self.columns()) {
                    if (!self.columns().hasOwnProperty(h))
                        continue;
                    rowData = { name: self.columns()[h].name().replace(/[^a-zA-Z0-9]+/g, ''), value: ko.observable(0).extend({ money: null }) };
                    newRow['values'].push(rowData);
                    this.__observeValue(rowData.value, rowData.name);

                }
                newRow['hadInitialValue'] = ko.observable(false);
                row = { name: '', func: this.rows()[this.rows().length - 1]['func'] };

            }
            else {
                rowHasData = true;
                for (var i in row.data) {
                    if (!row.data.hasOwnProperty(i))
                        continue;
                    rowData = { name: i.replace(/[^a-zA-Z0-9]+/g, ''), value: ko.observable().extend({ money: null }) };
                    newRow['values'].push(rowData);

                    this.__observeValue(rowData.value, rowData.name);

                }
                newRow['hadInitialValue'] = ko.observable(true);
            }
            newRow['name'] = ko.observable(row['name']);
            newRow['func'] = row['func'];

            newRow['agg'] = ko.computed(function () {
                //var total;
                //for (var j in this) {
                //var x = this;
                return newRow['func'](this);
                //}
            } .bind(newRow)).extend({ money: null });

            newRow['agg'].subscribe(function (newVal) {
                var rowTotal = 0;
                var r;
                for (var l = 0; l < this.rows().length; l++) {
                    r = this.rows()[l];
                    rowTotal += parseFloat(r['func'](r));
                }
                this.allRowAggregate(rowTotal);
            } .bind(this));

            this.rows.push(newRow);

            //important to defer adding data till after the new row is
            //all config'd and pushed into array, otherwise values won't
            //be counted
            if (rowHasData)
                for (var k = 0; k < newRow['values']().length; k++) {
                    value = newRow['values']()[k];
                    //get value from passed row 
                    value.value(row.data[value['name']]);
                }
        }
                        ,
        sumRow: function () {
            var total;
            for (var j = 0; j < this.values().length; j++) {
                total += this.values()[j].value();
            }
            return total;
        }
                                ,

        setSelectedItemTo: function (item) {
            this.selectedItem(item);
        }

    });
})();
