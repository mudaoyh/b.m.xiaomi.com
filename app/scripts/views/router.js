/*
* router.js 路由设置
* */
define([
    'underscore',
    'backbone',
    'views/home/indexView',
    'views/home/yuyueView',
    'views/product/categoryView',
    'views/product/listView'
], function(_, Backbone, IndexView, YuyueView, CategoryView, ListView){

    var AppRouter = Backbone.Router.extend({
        routes: {
            'yuyue': 'showYuyue',
            'product/category': 'showProductCategory',
            'product/list/:cate_id': 'showProductList',
            'product/list/:cate_id/:adapt': 'showProductAdapt',
            '*actions': 'showHome'
        },
        initialize: function(){
        }
    });

    var init = function(){
        console.log('Router.js 执行init');

        var appRouter = new AppRouter;

        appRouter.on('route:showHome', function(actions){
            console.log('showHome actions: '+ actions);
            IndexView.render();
        });

        appRouter.on('route:showYuyue', function(){
            console.log('showYuyue');
            YuyueView.render();
        });

        appRouter.on('route:showProductCategory', function(){
            console.log('showProductCategory分类页面');
            CategoryView.render();
        });

        appRouter.on('route:showProductList', function(cate_id){
            ListView.render(cate_id);
        });

        appRouter.on('route:showProductAdapt', function(cate_id, adapt){
            debugger;
        });

        Backbone.history.start();

    };

    return {
        init: init
    }
});