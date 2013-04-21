/*
* app.js app初始化
* 负责载入路由，和初始化一些配置
* */
define([
    'libs/mipu',
    'views/router',
    'views/layout/headerView',
    'views/layout/footerView'
], function(Mipu, Router, HeaderView, FooterView){

    var init = function(){
        console.log('app.js 执行init方法');
        Router.init();
        if(Mipu.isApp()){
            alert('is app');
        }else{
            alert('is web');
            HeaderView.render();
            FooterView.render();
        }
    };

    return {
        init: init
    }
});
