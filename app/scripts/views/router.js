/*
 * router.js 路由设置
 * */
define([
    'underscore',
    'backbone',
    'libs/mipu',
    'views/layout/headerView',
    'views/layout/footerView',
    'views/home/indexView',
    'views/home/yuyueView',
    'views/product/categoryView',
    'views/product/listView',
    'views/product/productView',
    'views/account/indexView',
    'views/shopping/styleListView'
], function(
    _,
    Backbone,
    Mipu,
    HeaderView,
    FooterView,
    IndexView,
    YuyueView,
    CategoryView,
    ListView,
    ProductView,
    AccountView,
    StyleListView
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
            'shopping/stylelist/:product_id/:consumption': 'showShoppingStyleList',
            '*actions': 'showDefault'
        },
        initialize: function(){
            if( !_isApp ){
                HeaderView.render();
                FooterView.render();
            }
        },
        showAccount: function(){
            console.log('showAccount');
            AccountView.render();
        },
        showShopping: function(){
            console.log('showShopping');
        },
        showIndex: function(){
            console.log('showIndex');
            IndexView.render();
        },
        showYuyue: function(){
            console.log('showYuyue');
            YuyueView.render();
        },
        showQianggou: function(){
            console.log('showQiangGou');
        },
        showProductCategory: function(){
            console.log('showProductCategory');
            CategoryView.render();
        },
        showProductList: function(cate_id, adapt){
            console.log('showProductList cate_id: '+cate_id+ 'adapt: ' +adapt);
            if(cate_id == -1){
                ListView.showPhoneList();
            }else{
                ListView.set(cate_id, adapt);
                ListView.render();
            }
        },
        showProductView: function(product_id){
            console.log('showProductView: '+product_id);
            if(product_id == 1731){
                debugger;
            }else{
                ProductView.render(product_id);
            }
        },
        showShoppingStyleList: function(product_id, consumption){
            console.log('showProductStyleList');
            StyleListView.render(product_id, consumption);
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