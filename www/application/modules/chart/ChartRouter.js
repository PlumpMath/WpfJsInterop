define(function (require) {
	"use strict";

	var BaseRouter = require("common/BaseRouter"),
		Controller = require("./ChartController");

	return BaseRouter.extend({

		controller: null,

		initialize: function (options) {
			this.controller = new Controller(options);
		},

		appRoutes: {
			"chart(/index)": "index"
		}

	});
});