define(function(require) {

	var Shim = {

		Ready: function() {
			console.log ("Shim.Ready: %o", arguments);
		},

		NotifyWPF: function() {
			console.log("Shim.NotifyWPF: %o", arguments);
		}

	};

	return Shim;

});