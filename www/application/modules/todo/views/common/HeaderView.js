define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("text!../templates/HeaderView.hbs");

	return Marionette.ItemView.extend({

		className: "header",

		template: Template

	});
});