define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Marionette = require("marionette"),
		Backbone = require("backbone"),
		Vent = require("system/Vent"),
		slice = Array.prototype.slice;

	var _callTriggerMethod = function(context, triggerName, args) {
		args.unshift(triggerName);
		Marionette.triggerMethod.apply(context, args);
		args.shift();
	};

	var _createDelegateMethod = function (route, methodName, method) {
		return function () {
			var args = slice.call(arguments, 1);
			args.unshift(route);

			_callTriggerMethod(this, "before:action", args);
			_callTriggerMethod(this, "before:action:" + methodName, args);

			method.apply(this, arguments);

			_callTriggerMethod(this, "after:action:" + methodName, args);
			_callTriggerMethod(this, "after:action", args);
		}
	};

	return Marionette.AppRouter.extend({

		constructor: function () {
			var args = slice.apply(arguments);
			_callTriggerMethod(this, "before:initialize", args);

			Marionette.AppRouter.prototype.constructor.apply(this, args);

			_callTriggerMethod(this, "after:initialize", args);
		},

		processAppRoutes: function(controller, appRoutes) {
			var routesLength, i;
			var routes = [];
			var router = this;

			for (route in appRoutes) {
				if (appRoutes.hasOwnProperty(route)) {
					routes.unshift([route, appRoutes[route]]);
				}
			}

			routesLength = routes.length;
			for (i = 0; i < routesLength; i++) {
				var route = routes[i][0];
				var methodName = routes[i][1];
				var method = controller[methodName];

				if (!method) {
					var msg = "Method '" + methodName + "' was not found on the controller";
					var err = new Error(msg);
					err.name = "NoMethodError";
					throw err;
				}

				method = _.bind(_createDelegateMethod(route, methodName, method), controller);

				router.route(route, methodName, method);
			}
		},

		handleAppRouteEvents: function() {
			this.listenTo(Vent, "app:route:trigger", this.appRouteTrigger, this);
			this.listenTo(Vent, "app:route:load", this.appRouteLoad, this);
		},

		appRouteTrigger: function(name, route) {
			this.navigateToRoute.call(this, route);
		},

		appRouteLoad: function(name, route) {
			this.loadRouteUrl.call(this, route);
		},

		navigateToRoute: function(route) {
			Backbone.history.navigate(route, {trigger: true});
		},

		loadRouteUrl: function(route) {
			Backbone.history.loadUrl(route);
		}

	});
});