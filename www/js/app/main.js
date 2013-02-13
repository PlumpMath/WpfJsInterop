// Defines the main app module. This one does the top level app wiring.

define(function (require) {
    "use strict";

    var $ = require("jquery");
	var _ = require("underscore");

	var JsCallbackName = "NotifyJs";
	var AppVent;
	var TodoCollection;
    var fakeStatusView,
	    fakeAddView,
	    fakeCreateView;

    var NotifyCallback = function(message) {
	    if (!isNullOrEmpty(message)) {
		    try {
		        message = JSON.parse(message);
			    var payload = JSON.parse(message.Payload);
			    switch(message.Type) {
				    case "add":
					    if (payload.length && payload.length >= 1) {
					        TodoCollection.create({Title: payload[0]});
					    }
					    break;
				    case "remove":
					    alert("Remove \"" + message.Payload + "\"");
					    break;
				    default:
					    alert("Type: " + message.Type);
//			            console.log ("Message Type: %o, Payload: %o", message.Type, payload);
					    break;
			    }
		    }
		    catch(e) {}
	    }
    };

	window.isNullOrEmpty = function(val) {
		return _.isUndefined(val) || _.isNull(val) || _.isEmpty(val);
	};

	var NotifyReady = function(cbName) {
		window.external.Ready(cbName);
	};

	var NotifyWpf = function(message) {
		window.external.NotifyWPF(message);
	};

    $(function () {

	    AppVent = require("./Vent");
	    TodoCollection = require("./collections/TodoCollection");

        var container = $(".row");

        fakeStatusView = new (require('app/FakeStatusView'))();
	    fakeAddView = new (require("app/FakeAddView"))();
	    fakeCreateView = new (require("app/FakeCreateItemView"))();

        var els = [
            fakeStatusView.render().$el,
	        fakeAddView.render().$el,
	        fakeCreateView.render().$el
        ];

        container.append(els);

		window[JsCallbackName] = NotifyCallback;
	    try {
		    NotifyReady(JsCallbackName);
	    }
	    catch (e) {
		    window.external = require("app/shim");
		    NotifyReady(JsCallbackName);
	    }

	    AppVent.on("notifywpf", function (eventName, payload) {
		    var message = {
			    "Type": eventName,
			    "Payload": JSON.stringify(payload)
		    };

		    NotifyWpf(JSON.stringify(message));
	    });

    });
});
