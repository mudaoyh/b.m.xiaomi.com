/*
* app.js app初始化
* 负责载入路由，和初始化一些配置
* */
define([
    'libs/util',
    'views/router',
    'views/layout/headerView',
    'views/layout/footerView'
], function(Util, Router, HeaderView, FooterView){

    var init = function(){
        console.log('app.js 执行init方法');
        var appRouter = new Router();

        if(!Util.isApp()){
            HeaderView.render();
            FooterView.render();
        }
    };

    return {
        init: init
    }
});
