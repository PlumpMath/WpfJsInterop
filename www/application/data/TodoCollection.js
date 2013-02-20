define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Backbone = require("backbone"),
		TodoModel = require("./TodoModel"),
		TodoCollection;

	TodoCollection = Backbone.Collection.extend({
		model: TodoModel,

		completed: function () {
			var result = [];

			var c = this.where({"Completed": true});
			_.each(c, function (m) {
				result.push(m.id);
			});

			return result;
		},

		selected: function () {
			var result = [];

			var c = this.where({"Selected": true});
			_.each(c, function (m) {
				result.push(m.id);
			});

			return result;
		}
	});

	return new TodoCollection();
});