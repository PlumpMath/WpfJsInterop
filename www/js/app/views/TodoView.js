define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Marionette = require("marionette"),
		Template = require("text!./TodoView.html");


	return Marionette.ItemView.extend({

		template: _.template(Template)

	});
});