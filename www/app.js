requirejs.config({
	baseUrl: "application",

	deps: ["main"],
//	waitSeconds: 0,

	paths: {
		"backbone": "../vendor/backbone",
		"backbone.babysitter": "../vendor/backbone.babysitter",
		"backbone.wreqr": "../vendor/backbone.wreqr",
		"configuration": "../configuration",
		"css": "../vendor/require-css",
		"d3": "../vendor/d3",
		"handlebars": "../vendor/handlebars",
		"hbs": "../vendor/hbs",
		"jquery": "../vendor/jquery",
		"marionette": "../vendor/marionette",
		"text": "../vendor/require-text",

		// Underscore
		"underscore": "../vendor/underscore"
	},

	pragmasOnSave: {
		excludeHbs: true
	},
	uglify2: {
		output: { beautify: false },
		mangle: true
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
	},

	hbs: {
		disableI18n: true,
		helperDirectory: "system/templatehelpers/"
	}
});

//requirejs(["main"]);