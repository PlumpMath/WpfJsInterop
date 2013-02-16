define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("text!./templates/IndexView.hbs");

	return Marionette.ItemView.extend({

		template: Template

	});
});