define(function (require) {
	"use strict";

	var Backbone = require("backbone"),
		Model = require("app/models/TodoModel");

	var TodoCollection = Backbone.Collection.extend({
		model: Model
	});

	return new TodoCollection();
});