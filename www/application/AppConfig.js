define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Backbone = require("backbone"),
		AppConfig = require("configuration");

	// Turn the Hash into a Backbone Model
	return new ((function(obj) {

		var defs = _.clone(obj);

		obj = Backbone.Model.extend({
			defaults: defs
		});

		_.each(_.keys(defs), function (prop) {
			obj.prototype[prop] = function(val) {
				if (arguments.length >= 1) {
					this.set(prop, arguments[0]);
					return this;
				}
				return this.get(prop);
			};
		});

		return obj;
	})(AppConfig))();
});