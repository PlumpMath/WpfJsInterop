define(function (require) {
	"use strict";


	var _ = require("underscore"),
		Marionette = require("marionette"),
		TodoCollection = require("app/collections/TodoCollection"),
		TodoView = require("./views/TodoView"),
		Template = require("text!./FakeAddView.html"),
		NoItemsTemplate = require("text!./NoItemsView.html");

	return Marionette.CompositeView.extend({

		className: 'span3 sp',
		template: _.template(Template),

		collection: TodoCollection,
		itemView: TodoView,
		itemViewContainer: ".todolist",

		emptyView: Marionette.ItemView.extend({
			template: _.template(NoItemsTemplate)
		}),

		events: {
			"click .btn": "onButtonClick"
		},


		onButtonClick: function(e) {
			if (e && e.preventDefault) { e.preventDefault(); }

			this.collection.reset();
		}
	});
});