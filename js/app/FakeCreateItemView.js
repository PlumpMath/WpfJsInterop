define(["require","underscore","marionette","text!./FakeCreateItemView.html"],function(e){var t=e("underscore"),n=e("marionette"),r=e("text!./FakeCreateItemView.html");return n.ItemView.extend({className:"span3 sp",template:t.template(r),events:{"click .btn-primary":"onButtonClick"},ui:{createTitle:"#createTitle"},onButtonClick:function(e){e&&e.preventDefault&&e.preventDefault();var t=this.ui.createTitle.val();window.isNullOrEmpty(t)||(window.NotifyJs(JSON.stringify({Type:"add",Payload:JSON.stringify({Title:t})})),this.ui.createTitle.val(""))}})});