define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("text!./templates/IndexView.hbs"),
		InputView = require("./todos/InputView"),
		ListView = require("./todos/ListView");

	return Marionette.ItemView.extend({

		className: "index-view",

		template: Template,

		ui: {
			todos: ".todos"
		},

		onShow: function () {
			this.ui.todos.append(new InputView().render().$el);
			this.ui.todos.append(new ListView().render().$el);
		}

	});
});