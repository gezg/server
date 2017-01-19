var Common = Clazz.extend({
	construct: function(){
		this.log('Common  init');
	},
	log: function(message){
		window.console && console.log(message);
	}
});

new Common();