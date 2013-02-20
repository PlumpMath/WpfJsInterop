define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("hbs!../templates/HeaderView");

	return Marionette.ItemView.extend({

		className: "header",

		template: Template

	});
});