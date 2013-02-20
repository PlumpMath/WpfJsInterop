define(function (require) {
	"use strict";

	// Load up the System
	require("./system/System");

	var $ = require("jquery"),
		Backbone = require("backbone"),
		Marionette = require("marionette"),
		Vent = require("system/Vent"),
		AppConfig = require("AppConfig"),
		AppLayout = require("AppLayout"),
		Application;

	Application = new Marionette.Application();

	// Initialize Layout
	Application.addInitializer(function () {
		this.Layout = AppLayout;
	});

	// Initialize Modules & Load Default Router
	Application.on("initialize:after", function () {
		// Modules are responsible for their own routing
		// Backbone will process route definitions in LIFO order
		// So ensure that Default Router is loaded first
		new (require("./modules/DefaultRouter"))();

		// Add Modules
		Application.module("Chart", require("./modules/ChartModule"));
		Application.module("Todo", require("./modules/TodoModule"));
	});

	// Start Routing
	Application.on("start", function () {
		Backbone.history.start({pushState: AppConfig.pushState()});
		Vent.trigger("wpf:notify:ready");
	});


	// Start Application on Document Ready
	$(function () {
		"use strict";

		$(document.body).html(AppLayout.render().$el);

		Application.start();
	});
});