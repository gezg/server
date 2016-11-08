/**
 * [construct description]
 */
var DrawTable = Clazz.extend({
    //构造器,new时执行
    construct: function(myParam) {
        this.$tbody = $('#tbody');
        this.getData();
    },
    log: function(str){
        window.console && console.log(str);
    },
    getData: function(){
        var self = this;
        $.ajax({
            url: 'http://localhost:3030/users/getUsers.action',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                self.draw(data);
            }
        });
    },
    draw: function(datas){
        var temp = [];
        for(var i = 0,len = datas.length;i < len;i++){
            var item = datas[i];
            temp.push('<tr>');
                temp.push('<td>'+item.name+'</td>');
                temp.push('<td>'+item.url+'</td>');
                temp.push('<td>'+item.city+'</td>');
                temp.push('<td>'+item.date+'</td>');
                temp.push('<td><img src="'+item.img+'" class="img-responsive img-thumbnail" alt="Responsive image"></td>');
                temp.push('<td>'+item.zip+'</td>');
            temp.push('</tr>');
        }
        this.$tbody.html(temp.join(''));
    }
});

var canvas = new DrawTable();
