define(function (require) {
	"use strict";

	var Marionette = require("marionette"),
		Template = require("hbs!./templates/TodoItemView"),
		Vent = require("system/Vent");

	var CompletedClass = "completed",
		SelectedClass = "selected",

		_addRemoveClass = function($el, cls, condition) {
			$el.removeClass(cls);
			if (condition) {
				$el.addClass(cls);
			}
		};

	return Marionette.ItemView.extend({

		tagName: "li",

		template: Template,

		model: null,
		modelEvents: {
			"change:Completed": "onCompletedChanged",
			"change:Selected": "onSelectedChanged",
			"change": "onTodosChanged"
		},

		events: {
			"click .todo-check": "toggleCompleted",
			"click label": "toggleSelected"
		},

		initialize: function () {
			if (this.model.completed()) {
				this.className = CompletedClass;
			}
		},

		onCompletedChanged: function() {
			_addRemoveClass(this.$el, CompletedClass, this.model.completed());
		},

		onSelectedChanged: function() {
			_addRemoveClass(this.$el, SelectedClass, this.model.selected());
		},

		toggleCompleted: function () {
			this.model.toggleCompleted();
		},

		toggleSelected: function () {
			this.model.toggleSelected();
		},

		onTodosChanged: function () {
			Vent.trigger("todos:change");
		}

	});
});