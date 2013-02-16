define(function (require) {
	"use strict";

	var BaseRouter = require("common/BaseRouter"),
		Backbone = require("backbone");

	return BaseRouter.extend({

		initialize: function() {
			this.handleAppRouteEvents();
		},

		routes: {
			"*other": "defaultRoute"
		},

		defaultRoute: function () {
			this.loadRouteUrl("todo/index");
		}

	});
});