define(function (require) {
	"use strict";

	var BaseRouter = require("common/BaseRouter"),
		Controller = require("./TodoController"),
		Vent = require("system/Vent");

	return BaseRouter.extend({

		controller: null,

		initialize: function (options) {
			this.controller = new Controller(options);
		},

		appRoutes: {
			"todo(/index)": "index"
		}

	});
});