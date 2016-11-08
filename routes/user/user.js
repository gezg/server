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

    // if (req.query.id) {
    //     reslut = '{"id":' + req.query.id + ',"name":' + req.query.name + '}';
    // }
    
    res.send(JSON.stringify(reslut))
});

module.exports = router;
