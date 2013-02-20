define(function (require) {
	"use strict";

	var $ = require("jquery"),
		_ = require("underscore"),
		Marionette = require("marionette"),
		Template = require("hbs!./templates/IndexView"),
		TodoCollection = require("data/TodoCollection"),
		TodoItemView = require("./TodoItemView"),
		Vent = require("system/Vent");

	var ENTER_KEY = 13;

	return Marionette.CompositeView.extend({

		className: "index-view",

		template: Template,

		itemView: TodoItemView,
		itemViewContainer: ".todo-list",

		collection: TodoCollection,

		collectionEvents: {
			"add": "onTodosChanged",
			"remove": "onTodosChanged",
			"reset": "onTodosChanged"
		},

		events: {
			"click #complete-all": "onCompleteAll",
			"keypress #new-todo": "onNewTodoKeypress"
		},

		ui: {
			completeAll: "#complete-all",
			newTodo: "#new-todo"
		},

		initialize: function () {
			Vent.on("force:repaint", this.onForceRepaint, this);
		},

		onNewTodoKeypress: function (e) {
			var val = this.ui.newTodo.val().trim();

			if (e.which === ENTER_KEY && !_.isNullOrEmpty(val)) {
				if (e.preventDefault) {e.preventDefault();}

				TodoCollection.add({Title: val});
				this.ui.newTodo.val("");
			}
		},

		onTodosChanged: function () {
			Vent.trigger("todos:change");
		},

		onAfterItemAdded: function () {
			this.onForceRepaint();
		},

		onForceRepaint: function () {
			// This is for IE because it sucks
			if (!$.support.boxSizingReliable) {
				var ctx = this;
				_.delay(function () {
					ctx.$el.append('<br id="force-refresh">');
					_.delay(function () {
						ctx.$("#force-refresh").remove();
					}, 15);
				}, 15);
			}
		},

		onCompleteAll: function () {
			var doComplete = !(this.ui.completeAll.data("toggled") || false);
			this.ui.completeAll.data("toggled", doComplete);
			TodoCollection.each(function (m) {
				m.completed(doComplete);
			});
		}

	});
});