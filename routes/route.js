var express = require('express'),
    rootPath = require('../config').rootPath,
    router = express.Router();

var loginMessage = '';
//首页
router.get('/', function(req, res, next) {
    //判断当前是否是登录状态
    if (req.cookies.loginStatus == 1) {
        res.render('index', { rootPath: rootPath });
    } else {
        res.redirect('/login'); //重定向到登录页
    }
});
//登录页面
router.get('/login', function(req, res, next) {
	var params = { rootPath: rootPath };
    res.render('login', { rootPath: rootPath ,message: loginMessage});
});
//登录请求
router.post('/loginCheck', function(req, res, next) {
    if (req.body.username == 'admin' && req.body.password == 'admin') {
        res.cookie('loginStatus', 1, { expires: new Date(Date.now() + 900000), httpOnly: true });
        loginMessage = '';
        res.redirect('/');
    } else {
    	loginMessage = '登录失败,用户名和密码是admin';
        res.redirect('/login');
    }
});
//退出登录
router.get('/loginOut', function(req, res, next) {
    res.clearCookie('loginStatus', { maxAge: 0 });
    res.redirect('/login'); //重定向到登录页
});
//用户页面
router.get('/user', function(req, res, next) {
    res.render('./com/user', { rootPath: rootPath });
});

module.exports = router;
