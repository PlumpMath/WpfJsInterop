define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("text!./templates/ItemView.hbs");

	return Marionette.ItemView.extend({

		template: Template

	});
});