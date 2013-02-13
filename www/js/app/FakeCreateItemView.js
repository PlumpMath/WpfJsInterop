define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Marionette = require("marionette"),
		Template = require("text!./FakeCreateItemView.html");

	return Marionette.ItemView.extend({

		className: 'span3 sp',

		template: _.template(Template),

		events: {
			"click .btn-primary": "onButtonClick"
		},

		ui: {
			createTitle: "#createTitle"
		},

		onButtonClick: function(e) {
			if (e && e.preventDefault) { e.preventDefault(); }

			var val = this.ui.createTitle.val();
			if (!window.isNullOrEmpty(val)) {
				window.NotifyJs(JSON.stringify({
					"Type": "add",
					"Payload": JSON.stringify({
						"Title": val
					})
				}));
				this.ui.createTitle.val("");
			}
		}

	});
});