define(['underscore', 'backbone', 'marionette', 'text!./FakeStatusView.html'], function(_, Backbone, Marionette, Template) {

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