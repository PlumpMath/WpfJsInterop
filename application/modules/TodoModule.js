define(function (require) {
	"use strict";

	var Router = require("./todo/TodoRouter");

	return function (Module, Application, Marionette, $, _) {

		Module.addInitializer(function () {
			this.Router = new Router({
				Layout: Application.Layout
			});
		});
	};
});