// Defines the main app module. This one does the top level app wiring.

define(function (require) {
    'use strict';

    var $ = require('jquery');

    // Dependencies that do not have an export of their own, just attach
    // to other objects, like jQuery. These are just used in the example
    // bootstrap modal, not directly in the UI for the network and appCache
    // displays.
    require('bootstrap/modal');
    require('bootstrap/transition');

    var fakeStatusView;

    var NotifyCallback = function() {
        console.log ("NotifyJs: %o", arguments);
    };

    $(function () {

        if (!window.external.Ready) {
            window.external = require("app/shim");
        }

        window.NotifyJs = NotifyCallback;

        var container = $(".row");

        fakeStatusView = new (require('app/FakeStatusView'))();


        var els = [
            fakeStatusView.render().$el
        ];


        container.append(els);



        var wpf = window.external;

        wpf.Ready("NotifyJs");



    });
});
