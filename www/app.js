requirejs.config({
	context: "WpfJsInterop",
	baseUrl: "application",

	deps: ["main"],

	paths: {
		"backbone": "../vendor/backbone",
		"backbone.babysitter": "../vendor/backbone.babysitter",
		"backbone.wreqr": "../vendor/backbone.wreqr",
		"css": "../vendor/require-css",
		"d3": "../vendor/d3",
		"handlebars": "../vendor/handlebars",
		"jquery": "../vendor/jquery",
		"marionette": "../vendor/marionette",
		"text": "../vendor/require-text",

		// Underscore
		"underscore": "../vendor/underscore"
	},

	shim: {
		"handlebars": {
			exports: "Handlebars"
		},
		"d3": {
			exports: "d3"
		},

		// Underscore
		"underscore": {
			init: function () {
				_.mixin({
					isNullOrEmpty: function(val) {
						return _.isUndefined(val) || _.isNull(val) || _.isEmpty(val);
					}
				});
				return _;
			}
		}
	}
});

//requirejs(["main"]);