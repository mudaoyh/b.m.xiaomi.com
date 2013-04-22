/*
* main.js 应用入口文件
* 配置类库的路径
* */

require.config({
    paths: {
        jquery: 'vendor/jquery/jquery',
        tmpl: 'vendor/jquery-tmpl/jquery.tmpl',
        underscore: 'vendor/underscore-amd/underscore',
        backbone: 'vendor/backbone-amd/backbone',
        templates: 'templates'
    }
});

require(['views/app'], function(App){
    console.log('载入main.js入口文件 和 views/app.js的初始化文件');
    App.init();
});

