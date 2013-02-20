define(function (require) {
	"use strict";

	var _ = require("underscore"),
		BaseObject = require("common/BaseObject"),
		Vent = require("system/Vent");

	var _shimWindowExternal = function () {
		_.extend(window.external, {
			Ready: function() {
				console.log("Shim.Ready: %o", JSON.stringify({
					Type: "add",
					Payload: JSON.stringify(["TODO #1"])
				}));
			},

			NotifyWPF: function() {
				window[PublicCallbackName].apply(window, arguments);
			}
		});
	};

	var PublicCallbackName = "NotifyJs",
		WpfInterop,
		instance;

	WpfInterop = BaseObject.extend({

		onBeforeInitialize: function () {
			Vent.once("wpf:notify:ready", this.notifyReady, this);
			this.listenTo(Vent, "wpf:notify", this.notifyWpf, this);
		},

		notifyCallback: function(message) {
			var EventType,
				EventPayload;
			if (!_.isNullOrEmpty(message)) {
				try {
					message = JSON.parse(message);
					var payload = JSON.parse(message.Payload);
					if (!_.isNullOrEmpty(message.Type)) {
						EventType = message.Type;
						EventPayload = payload;
					}
				}
				catch(e) {}
			}

			if (!_.isNullOrEmpty(EventType) && !_.isNullOrEmpty(EventPayload)) {
				Vent.trigger("interop:" + EventType, EventPayload);
			}
		},

		notifyWpf: function (eventName, payload) {
			window.external.NotifyWPF(JSON.stringify({
				"Type": eventName,
				"Payload": JSON.stringify(payload)
			}));
		},

		notifyReady: function() {
			try {
				window.external.Ready(PublicCallbackName);
			}
			catch (e) {
				_shimWindowExternal();
				window.external.Ready(PublicCallbackName);
			}
		}

	});

	instance = new WpfInterop();

	window[PublicCallbackName] = function () {
		WpfInterop.prototype.notifyCallback.apply(instance, arguments);
	};
	window.TODO_COUNT = 0;

	return instance;
});