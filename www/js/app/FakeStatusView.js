define(function(require) {

	var _ = require("underscore"),
		Marionette = require("marionette"),
		Template = require("text!./FakeStatusView.html"),
		AppVent = require("app/Vent");

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

			AppVent.trigger("notifywpf", "status", this._createModel());
		},

		onRender: function () {
			_.each(this.ui, function (el, key) {
				if (key.indexOf("input") > -1) {
					el.val(0);
				}
			});
		},

		_createModel: function () {
			return {
				"Total": this.ui.inputTotal.val() || 0,
				"Completed": this.ui.inputCompleted.val() || 0,
				"Selected": this._generateSelected()
			};
		},

		_generateSelected: function () {
			var vals = [];
			var initial = this._randomInt(1, 50);
			var quantity = this.ui.inputSelected.val() || 0;
			for (var i = 0; i < quantity; i++) {
				vals.push(initial++);
			}

			return vals;
		},

		_randomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

	});

});