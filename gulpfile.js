var gulp = require('gulp'),
    sass = require('gulp-sass'), //编译sass
    nodemon = require('gulp-nodemon'), //启动express
    config = require('./config'), //配置文件
    path = require('path'), //路径工具
    rename = require('gulp-rename'), //更改文件名称
    uglify = require('gulp-uglify'), //压缩js
    cssnano = require('gulp-cssnano'), //压缩css
    autoprefixer = require('gulp-autoprefixer'), //浏览器版本自动处理浏览器前缀
    jshint = require('gulp-jshint'), //js语法检查
    concat = require('gulp-concat'), //合并文件
    browserSync = require('browser-sync').create('Jc server'), //热部署工具
    imagemin = require('gulp-imagemin'), //图片压缩工具
    base64 = require('gulp-base64'), //图片转换base64
    replace = require('gulp-jc-replace'), //图片转换base64
    gulpEjs = require('gulp-ejs'); //模版引擎

var reload = browserSync.reload;
// path 定义
var baseDir = './'
var publicDir = './public'

var filePath = {
    'css': path.join(publicDir, 'css/**/*.css'),
    'scss': path.join(baseDir, 'sass/**/*.scss'),
    'js': path.join(publicDir, 'js/**/*.js'),
    'image': path.join(publicDir, 'images/**/*.png'),
    'view': path.join(baseDir, 'views/**/*.html')
};
// 编译 scss
gulp.task('scss', function() {
        return gulp.src(path.join(baseDir, filePath.scss))
            .pipe(sass({
                /**
                 * 嵌套输出方式 nested
                 * 展开输出方式 expanded 
                 * 紧凑输出方式 compact 
                 * 压缩输出方式 compressed
                 */
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(path.join(publicDir, 'css')))
            .pipe(browserSync.reload({ stream: true }));
    })
    //express启动任务
gulp.task('dev:server', function() {
    nodemon({
        script: baseDir + 'server.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'development'
        }
    });

    browserSync.init(null, {
        proxy: 'http://localhost:' + config.port,
        files: [filePath.css, filePath.view],
        notify: false,
        open: true,
        port: 5000
    })

    gulp.watch(filePath.view).on("change", browserSync.reload);
});
//生成静态html文件
gulp.task('staticHtml', function() {
    var selfPath = [filePath.view, "!views/layout/**/*.html"];
    return gulp.src(selfPath)
        .pipe(gulpEjs({
            rootPath: '.',
            message: '错误输出信息位置'
        }))
        .pipe(gulp.dest(path.join(publicDir)));
});
//HTML更改成JSP文件
gulp.task('jsp', function() {
    //<%@ page language="java" pageEncoding="UTF-8"%>
    return gulp.src(filePath.view)
        .pipe(gulpEjs({
            rootPath: '.',
            message: '错误输出信息位置'
        }))
        .pipe(replace({
            jspPrefix: ''
        }))
        .pipe(rename({
            extname: '.jsp'
        }))
        .pipe(gulp.dest(path.join(publicDir ,'jsp')));
});
//把小于8k的png图片转换成base64
gulp.task('imageBase64', function() {
    return gulp.src(filePath.css)
        .pipe(base64({
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            maxImageSize: 8 * 1024, // bytes 
        }))
        .pipe(gulp.dest(path.join(publicDir, 'css')));
});
//压缩图片
gulp.task('imagemin', function() {
    return gulp.src(filePath.image)
        .pipe(imagemin())
        .pipe(gulp.dest(path.join(publicDir, 'images')));
});

//压缩css
gulp.task('cssmin', function() {
    return gulp.src(path.join(publicDir, 'css/main.css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.join(publicDir, 'css')));
});
//压缩js
gulp.task('jsmin', function() {
        var selfPath = [filePath.js, "!public/js/**/*.min.js"];
        return gulp.src(selfPath)
            //排除混淆关键字
            .pipe(uglify({ mangle: { except: ['require', 'exports', 'module', '$'] } }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(path.join(publicDir, 'js')));
    })
//普通发布
gulp.task('build', ['imagemin', 'imageBase64', 'staticHtml']);
//压缩发布
gulp.task('buildmin', ['imagemin', 'imageBase64', 'staticHtml' ,'jsmin' ,'cssmin']);
//普通发布
gulp.task('buildjsp', ['imagemin', 'imageBase64', 'jsp',]);
// 监听文件变动
gulp.task('watch', function() {
    gulp.watch(filePath.scss, ['scss'])
})
//启动开发环境服务
gulp.task('dev', ['dev:server', 'watch']);
