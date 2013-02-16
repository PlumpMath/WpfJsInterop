define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		// Footer
		FooterView = require("./views/common/FooterView"),
		// Views
		IndexView = require("./views/IndexView");

	return Marionette.Controller.extend({

		layout: null,

		initialize: function() {
			this.layout = Marionette.getOption(this, "Layout");
		},

		onBeforeAction: function() {
			this.layout.footer.show(new FooterView());
		},

		index: function() {
			this.layout.main.show(new IndexView());
		}

	});
});