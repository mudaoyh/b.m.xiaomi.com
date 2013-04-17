/*
* app.js app初始化
* 负责载入路由，和初始化一些配置
* */
define(['views/router'], function(Router){

    var init = function(){
        console.log('app.js 执行init方法');
        Router.init();
    };

    return {
        init: init
    }
});