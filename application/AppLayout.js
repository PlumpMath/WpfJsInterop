define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Marionette = require("marionette"),
		Vent = require("system/Vent"),
		AppConfig = require("system/AppConfig"),
		Template = require("text!./AppLayout.hbs"),
		AppLayout;

	AppLayout = Marionette.Layout.extend({
		className: "page",

		template: Template,

		regions: {
			header: ".banner",
			nav: ".pagenav",
			main: ".main",
			footer: ".contentinfo"
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