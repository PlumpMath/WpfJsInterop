define(function (require) {
	"use strict";

	var BaseItemView = require("./ItemView"),
		Template = require("text!./templates/InputView.hbs");

	return BaseItemView.extend({

		className: "input-view",

		template: Template

	});
});