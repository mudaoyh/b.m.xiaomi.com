#意在通过requirejs和backbone合理的组织代码结构,提高可维护可协作性。v1.0.0 by Enlei

## install

###先安装[nodeJS](http://nodejs.org/)

* [bower](http://twitter.github.io/bower/) web包管理工具用来安装项目所需要的类库
* [requirejs](http://requirejs.org/) 用于编译与压缩项目

###用nodeJS的包管理工具npm安装bower和requirejs

    npm install -g bower
    npm install -g requirejs

###用bower web包管理工具安装项目依赖框架

* requirejs
* jquery
* backbone-amd
* underscore-amd

###bower命令

    cd b.m.xiaomi.com
    bower install

###通过requirejs的r.js编译与压缩项目代码

    cd b.m.xiaomi.com/app
    sudo sh build/build.sh

###结构

    /app
        /build
            -build.sh 编译压缩项目
        /scripts
            /vendor 依赖的类库
            /libs
                -mipu.js 通用类库
            /templates 模板目录
                /home
                    -indexTemplates.html
                    -yuyueTemplates.html
            /views
                /home 控制器
                    -indexView.js
                    -yuyueView.js
                -app.js 初始化
                -router.js 路由
            -main.js requirejs的入口文件
            -text.js 静态文件载入类库
        -index.html



