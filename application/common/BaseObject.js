define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Backbone = require("backbone"),
		_ = require("underscore");

	var _configure = function(options) {
		if (this.options) options = _.extend({}, _.result(this, "options"), options);
		this.options = options;
	};

	var BaseObject = function () {
		var options = arguments.length > 0 ? Array.slice.call(arguments, 0) : {};
		_configure.call(this, options);

		this.onBeforeInitialize.apply(this, arguments);
		this.onInitialize.apply(this, arguments);
		this.onAfterInitialize.apply(this, arguments);
	};

	_.extend(BaseObject.prototype, Backbone.Events, {

		getOption: function(name, defaultVal) {
			var val = Marionette.getOption(this, name);
			if (_.isNullOrEmpty(val) && arguments.length >= 2) {
				val = defaultVal;
			}
			return val;
		},

		onBeforeInitialize: function () {},
		onInitialize: function () {},
		onAfterInitialize: function () {},

		triggerMethod: function () {
			return Marionette.triggerMethod.call(this, arguments);
		}

	});

	BaseObject.extend = Marionette.extend;



	return BaseObject;
});