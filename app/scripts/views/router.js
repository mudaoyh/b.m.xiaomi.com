/*
 * router.js 路由设置
 * */
define([
    'underscore',
    'backbone',
    'libs/mipu',
    'views/home/indexView',
    'views/home/yuyueView',
    'views/product/categoryView',
    'views/product/listView',
    'views/account/indexView'
], function(
    _,
    Backbone,
    Mipu,
    IndexView,
    YuyueView,
    CategoryView,
    ListView,
    AccountView
    ){

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home/index1': 'showIndex',
            'home/yuyue': 'showYuyue',
            'home/qianggounew': 'showQianggou',
            'account/index': 'showAccount',
            'shopping/index': 'showShopping',
            'product/category': 'showProductCategory',
            'product/list/:cate_id': 'showProductList',
            'product/list/:cate_id/:adapt': 'showProductList',
            'product/view/:product_id': 'showProductView',
            '*actions': 'showDefault'
        },
        initialize: function(){
            Backbone.history.start();
        },
        showAccount: function(){
            console.error('showAccount');
            AccountView.render();
        },
        showShopping: function(){
            console.error('showShopping');
        },
        showIndex: function(){
            console.error('showIndex');
            IndexView.render();
        },
        showYuyue: function(){
            console.error('showYuyue');
            YuyueView.render();
        },
        showQianggou: function(){
            console.error('showQiangGou');
        },
        showProductCategory: function(){
            console.error('showProductCategory');
            CategoryView.render();
        },
        showProductList: function(cate_id, adapt){
            console.error('showProductList cate_id: '+cate_id+ 'adapt: ' +adapt);
            ListView.render(cate_id);
        },
        showProductView: function(product_id){
            console.error('showProductView: '+product_id);
        },
        showDefault: function(actions){
            Mipu.activityControl(actions, function(isActivity, res, self){
                if(isActivity){
                    if(res.activity_type == 'other'){
                        location.replace(res.activity_url);
                    }else{
                        self.nav('/home/'+res.activity_type);
                    }
                    return;
                }
                console.error('404: '+actions);
            }, this);
        },
        nav: function(hash){
            this.navigate(hash, {trigger: true})
        }
    });

    return AppRouter;
});