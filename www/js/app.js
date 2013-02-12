// To load an app-specific module, place it in an app/ directory that is a
// sibling to this file. See app/uiNetworks.js and app/uiAppCache.js for
// examples.

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        'marionette': './marionette',
        'text': './text'
    },

    shim: {
	    marionette : {
	      deps : ['jquery', 'underscore', 'backbone'],
	      exports : 'Marionette'
	    }
    }
});

// Start loading the main app file.
requirejs(['app/main']);
