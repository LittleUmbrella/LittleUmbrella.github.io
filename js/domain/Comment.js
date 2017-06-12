JS.require('JS.Class', function () {
	eaf.util.namespace('becu_org.domain');
	becu_org.domain.comment = (function () {
		return new JS.Class({
			initialize:  function(){
				//properties
				this.commentor = ko.observable();
				this.createDate = ko.observable();
				this.text = ko.observable();
				this.id = ko.observable();

			}
		});
	})();
});
