define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Backbone = require("backbone");

	return Backbone.Model.extend({

		defaults: {
			Id: 0,
			Completed: false,
			Title: "",
			Selected: false
		},


		initialize: function () {
			_.bindAll(this, "toggleCompleted", "toggleSelected");

			var val = ++window.TODO_COUNT;
			this.set("Id", val);
			this.id = val;
		},

		completed: function(val) {
			if (arguments.length === 1) {
				this.set("Completed", val === true);
			}
			return this.get("Completed");
		},

		title: function(val) {
			if (arguments.length === 1) {
				this.set("Title", val);
			}
			return this.get("Title");
		},

		selected: function(val) {
			if (arguments.length === 1) {
				this.set("Selected", val === true);
			}
			return this.get("Selected");
		},

		toggleCompleted: function() {
			return this.completed(!this.completed());
		},

		toggleSelected: function () {
			return this.selected(!this.selected());
		}

	});
});