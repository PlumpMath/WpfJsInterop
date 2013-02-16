define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("text!./templates/ListView.hbs");

	return Marionette.ItemView.extend({

		tagName: "ul",
		className: "todo-list",

		template: Template

	});
});