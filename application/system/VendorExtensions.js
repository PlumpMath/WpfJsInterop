define(function (require) {
	"use strict";

	var Marionette = require("marionette");
	var Handlebars = require("handlebars");


	// Handlebars Template Caching support
	_.extend(Marionette.TemplateCache.prototype, {

		loadTemplate: function(templateData) {
			return templateData;
		},

		compileTemplate: function(rawTemplate) {
			return Handlebars.compile(rawTemplate);
		}

	});


});