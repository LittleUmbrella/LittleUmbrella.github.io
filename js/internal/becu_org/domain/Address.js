	eaf.util.namespace('becu_org.domain.model');
	becu_org.domain.model.AddressObservable = (function () {
		return new JS.Class('becu_org.domain.model.AddressObservable', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.line1 = ko.observable();
				self.line2 = ko.observable();
				self.line3 = ko.observable();
				self.lines = ko.observable();
				self.postalCode = ko.observable();
				self.city = ko.observable();
				self.state = ko.observable();
				self.country = ko.observable();

				self.full = ko.pureComputed(function(){
					return self.line1() + "\n "
						+ (eaf.util.isNullOrWhitespace(self.line2())? "": self.line2() + "\n ")
						+ (eaf.util.isNullOrWhitespace(self.line3())? "": self.line3() + "\n ")
						+ self.city() + ', ' + self.state()  + ' ' + self.postalCode()
				});
			}
		});
	})();


	becu_org.domain.model.Address = (function () {
		return new JS.Class('becu_org.domain.model.Address', becu_org.domain.model.Base, {
			initialize:  function(){
var self = this; self.callSuper();
				//properties
				self.line1;
				self.line2;
				self.line3;
				self.lines;
				self.postalCode;
				self.city;
				self.state;
				self.country;

			}
		});
	})();
