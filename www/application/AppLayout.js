define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Marionette = require("marionette"),
		Vent = require("system/Vent"),
		AppConfig = require("AppConfig"),
		Template = require("hbs!./AppLayout.tpl"),
		AppLayout;

	AppLayout = Marionette.Layout.extend({

		id: "page-container",
		className: "row",

		template: Template,

		regions: {
			header: "#header",
			main: "#main",
			footer: "#footer"
		},

		events: {
			"click [data-route]": "onRouteLinkClicked"
		},

		onRouteLinkClicked: function (e) {
			if (AppConfig.pushState() === true) {
				var target = this.$(e.target),
					route = (target.data && target.data("route")) || "";
				if (target && !_.isNullOrEmpty(route)) {
					var parts = route.split("/"),
						name = _.first(parts);

					if (!_.isNullOrEmpty(name)) {
						if (e.preventDefault) { e.preventDefault(); }
						Vent.trigger("app:route:trigger", name, route);
					}
				}
			}
		}

	});


	return new AppLayout();
});