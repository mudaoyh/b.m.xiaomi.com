/*
* app.js app初始化
* 负责载入路由，和初始化一些配置
* */
define([
    'views/router',
    'libs/mipu'
], function(Router, Mipu){

    var init = function(){
        console.log('app.js 执行init方法');
        Router.init();
        if(Mipu.isApp()){
            alert('is app');
        }else{
            alert('is web');
        }
    };

    return {
        init: init
    }
});
