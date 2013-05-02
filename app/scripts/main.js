/*
* main.js 应用入口文件
* 配置类库的路径
* */

require.config({
    baseUrl: '/scripts',
    paths: {
        jquery: 'vendor/jquery/jquery',
        tmpl: 'vendor/jquery-tmpl/jquery.tmpl',
        lazyload: 'vendor/jquery.lazyload/jquery.lazyload',
        underscore: 'vendor/underscore-amd/underscore',
        backbone: 'vendor/backbone-amd/backbone',
        templates: 'templates'
    }
});

require(['libs/util', 'views/app'], function(Util, App){
    console.log('载入main.js入口文件 和 views/app.js的初始化文件');
    var root = this;
    root._isApp = Util.isApp();
    App.init();
});

