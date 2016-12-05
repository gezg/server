## 前端基于gulp构建的express服务器
###可以解析sass，静态文件实时刷新浏览器
###js文件和服务器文件修改手动按下F5刷新浏览器

####使用说明

1. 安装NodeJS
1. 下载项目后,进去server目录,按Shift+鼠标右键 -> 在此处打开命令窗口 执行 `npm install` 命令
1. 待所有node插件安装完成后，执行 `gulp dev` 命令
1. 访问 `localhost:5000`  查看效果


####目录结构
* public		     `静态文件目录(js,css...)`
* views         `视图html文件`
* sass          `sass文件`
* routes        `后台接口文件`
* gulpfile.js 	`gulp配置文件`
* package.json 	`nodejs 程序描述`
