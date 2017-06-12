	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.CommentObservable = (function () {
		return new JS.Class('becu_org.domain.model.CommentObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.commentor = ko.observable();
				self.createDate = ko.observable();
				self.text = ko.observable();
				self.id = ko.observable();

			}
		});
	})();


	becu_org.domain.model.Comment = (function () {
		return new JS.Class('becu_org.domain.model.Comment', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.commentor;
				self.createDate;
				self.text;
				self.id;

			}
		});
	})();
