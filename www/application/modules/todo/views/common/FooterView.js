define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("hbs!../templates/FooterView");

	return Marionette.ItemView.extend({

		template: Template

	});
});