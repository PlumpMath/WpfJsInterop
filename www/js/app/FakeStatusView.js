define(function(require) {

	var _ = require("underscore"),
		Backbone = require("backbone"),
		Marionette = require("marionette"),
		Template = require("text!./FakeStatusView.html");

	return Marionette.ItemView.extend({

		className: 'span3 sp',

		template: _.template(Template),

		events: {
			"click .btn-primary": "onButtonClick"
		},

		ui: {
			inputTotal: "#statusTotal",
			inputSelected: "#statusSelected",
			inputCompleted: "#statusCompleted"
		},


		onButtonClick: function (e) {
			if (e && e.preventDefault) { e.preventDefault(); }
		},

		onRender: function () {
			_.each(this.ui, function (el, key) {
				if (key.indexOf("input") > -1) {
					el.val(0);
				}
			});
		}

	});

});