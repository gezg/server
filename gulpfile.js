var gulp = require('gulp'),
    sass = require('gulp-sass'), 			//编译sass
    nodemon = require('gulp-nodemon'), 		//启动express
    config = require('./config'), 			//配置文件
    path = require('path'), 				//路径工具
    rename = require('rename'), 			//更改文件名称
    uglify = require('gulp-uglify'), 		//压缩js
    cssnano = require('gulp-cssnano'), 		//压缩css
    autoprefixer = require('gulp-autoprefixer'), //浏览器版本自动处理浏览器前缀
    jshint = require('gulp-jshint'), 		//js语法检查
	concat = require('gulp-concat'),		//合并文件
	browserSync = require('browser-sync').create('Jc server');

var reload      = browserSync.reload;

// path 定义
var baseDir = './'
var publicDir = './public'

var filePath = {
        'css': path.join(publicDir, 'css/**/*.css'),
        'scss': path.join(baseDir, 'sass/**/*.scss'),
        'js': path.join(publicDir, 'js/**/*.js'),
        'view': path.join(baseDir, 'views/**/*.html')
    };
// 编译 scss
gulp.task('scss', function () {
  return gulp.src(path.join(baseDir,filePath.scss))
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
    .pipe(gulp.dest(path.join(publicDir,'css')))
    .pipe(browserSync.reload({stream:true}));
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
// 联调后台服务
gulp.task('api:server', function() {
    nodemon({
        script: baseDir + 'server.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'api',
            'REMOTE_API': config.serverApi
        }
    });
});
//压缩css
gulp.task('cssmin', function () {
  return gulp.src(path.join(publicDir,'css/main.css'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(publicDir,'css')));
})
//压缩js
gulp.task('jsmin', function () {
  return gulp.src(filePath.js)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(publicDir,'js')));
})
//发布
gulp.task('build', ['cssmin', 'jsmin']);

// 监听文件变动
gulp.task('watch', function() {
    gulp.watch(filePath.scss, ['scss'])
})

gulp.task('dev', ['dev:server' ,'watch']);

gulp.task('api', ['api:server' ,'watch']);
