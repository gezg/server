var Main = Clazz.extend({
	construct: function(option){
		this.rootPath = 'http://localhost:5000/users/';
		this.$ele = $(option.ele);
		if(!this.$ele.length){
			this.log('初始化容器id错误!!!');
		}
	},
	log: function(msg){
		if(window.console){
			console.log(msg);
		}
	},
	getData: function(){
		var self = this;
		$.ajax({
			url : self.rootPath + 'getUsers.action',
			type : 'GET',
			dataType : 'json',
			success: function(data){
				self.draw('GET',data);
			}
		});
	},
	postData: function(){
		var self = this;
		$.ajax({
			url : self.rootPath + 'postUsers.action',
			type : 'POST',
			data:{
				id : '10000',
				name : '这个是POST请求'
			},
			dataType : 'json',
			success: function(data){
				self.draw('POST',data);
			}
		});
	},
	draw: function(type ,datas){
		var resulut = ['<br />这个是'+type+'请求回来的数据.<br />'];
		if(type == 'POST'){
			resulut.push('传入到后台的参数id是:'+ datas.id+'<br />');
			resulut.push('传入到后台的参数name是:'+ datas.name + '<br />');
		}

		if(type == 'GET'){
			for(var i = 0,len = datas.length;i < len;i++){
				var item = datas[i];
				resulut.push('<p>'+item.name+'</p>');
			}
		}
		this.$ele.append(resulut.join(''));
	}
});

var m = new Main({
	ele : '#test'
});

m.getData();
m.postData();