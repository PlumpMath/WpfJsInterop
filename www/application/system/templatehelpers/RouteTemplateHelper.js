define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Handlebars = require("handlebars"),
		AppConfig = require("system/AppConfig");

	Handlebars.registerHelper("route", function(url, options) {
		options.hash["data-route"] = url;
		var attrs = _.map(_.keys(options.hash), function (key) {
			var val = options.hash[key];
			return key + '="' + val + '"';
		}).join(" ");

		if (AppConfig.pushState() !== true) {
			url = "#" + url;
		}

		return '<a href="' + url + '" ' + attrs + '>' + options.fn() + '</a>';
	});
});