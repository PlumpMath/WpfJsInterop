define(function (require) {
	"use strict";

	var _ = require("underscore"),
		Marionette = require("marionette"),
		// Header
		HeaderView = require("./views/common/HeaderView"),
		// Footer
		FooterView = require("./views/common/FooterView"),
		// Views
		IndexView = require("./views/IndexView"),

		// Data Collection
		TodoCollection = require("data/TodoCollection"),

		// Vent
		Vent = require("system/Vent")
		;

	return Marionette.Controller.extend({

		layout: null,

		initialize: function () {
			this.layout = Marionette.getOption(this, "Layout");

			Vent.on("todos:create:new", TodoCollection.add, TodoCollection);

			this.listenTo(Vent, "interop:add", this.onInteropAdd, this);
			this.listenTo(Vent, "interop:remove", this.onInteropRemove, this);
			this.listenTo(Vent, "todos:change", this.onTodoCollectionChange, this);
		},

		onBeforeAction: function () {
			this.layout.header.show(new HeaderView());
//			this.layout.footer.show(new FooterView());
		},

		onInteropAdd: function(todoArray) {
			_.each(todoArray, function (todoTitle) {
				Vent.trigger("todos:create:new", {
					Title: todoTitle
				});
			});
		},

		onInteropRemove: function(idArray) {
			_.each(idArray, function(id) {
				var results = TodoCollection.where({"Id": id});
				_.each(results, TodoCollection.remove, TodoCollection);
			});
		},

		onTodoCollectionChange: _.debounce(function() {
			Vent.trigger("wpf:notify", "status", {
				"Total": TodoCollection.length,
				"Completed": TodoCollection.completed().length,
				"Selected": TodoCollection.selected()
			});
		}, 100),


		// Actions

		index: function () {
			this.layout.main.show(new IndexView());
		}

	});
});
