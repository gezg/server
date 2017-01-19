var express = require('express');
var Mock = require('mockjs');

var router = express.Router();

/* GET users listing. */
router.get('/getUsers.action', function(req, res, next) {
    var reslut = [];
    for (var i = 0; i < 10; i++) {
        var name = Mock.Random.cname();
        // 使用 Mock
        var data = Mock.mock({
            name: name, //名称随机
            url: Mock.Random.url('http'), //网址
            city: Mock.Random.county(true), //地址
            date: Mock.Random.date('yyyy-MM-dd'), //日期
            img: Mock.Random.image('30x30', '#02adea', name.substring(0,1)), //头像
            zip: Mock.Random.zip(), //邮编
        });
        reslut.push(data);
    }
    res.send(JSON.stringify(reslut))
});

router.post('/postUsers.action', function (req, res) {
    var data = Mock.mock({
	    url: Mock.Random.url('http'), //网址
	    city: Mock.Random.county(true), //地址
	    date: Mock.Random.date('yyyy-MM-dd'), //日期
	});
    if(req.body.id){
        data.id = req.body.id;
    }
    if(req.body.name){
        data.name = req.body.name;
    }
    res.send(JSON.stringify(data));
});

module.exports = router;