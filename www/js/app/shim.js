define(function(require) {

	var Shim = {

		Ready: function() {
			console.log ("Shim.Ready: %o", arguments);
		},

		NotifyWPF: function() {
			window.NotifyJs.apply(window, arguments);
		}

	};

	return Shim;

});