/*
 * router.js 路由设置
 * */
define([
    'underscore',
    'backbone',
    'libs/api',
    'views/layout/headerView',
    'views/layout/footerView',
    'views/home/indexView',
    'views/home/yuyueView',
    'views/product/categoryView',
    'views/product/listView',
    'views/product/productView',
    'views/account/indexView',
    'views/shopping/styleListView',
    'views/shopping/cartListView',
    'views/shopping/editConsumptionView',
    'views/order/checkoutView',
    'views/address/add'
], function(
    _,
    Backbone,
    Api,
    HeaderView,
    FooterView,
    IndexView,
    YuyueView,
    CategoryView,
    ListView,
    ProductView,
    AccountView,
    StyleListView,
    CartListView,
    EditConsumptionView,
    CheckoutView,
    AddressAdd
    ){

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home/index1': 'showIndex',
            'home/yuyue': 'showYuyue',
            'home/qianggounew': 'showQianggou',
            'account/index': 'showAccount',
            'product/category': 'showProductCategory',
            'product/list/:cate_id': 'showProductList',
            'product/list/:cate_id/:adapt': 'showProductList',
            'product/view/:product_id': 'showProductView',
            'shopping/index': 'showShopping',
            'shopping/stylelist/:product_id/:consumption': 'showShoppingStyleList',
            'shopping/cartlist': 'showCartList',
            'shopping/editconsumption/:product_id/:item_id': 'showEditConsumption',
            'order/checkout': 'showOrderCheckout',
            'order/checkout/:address_id': 'showOrderCheckout',
            'address/add': 'showAddressAdd',
            'address/add/:origin': 'showAddressAdd',
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
        showCartList: function(){
            CartListView.render();
        },
        showEditConsumption: function(product_id, item_id){
            // 编辑购物车的商品
            EditConsumptionView.render(product_id, item_id);
        },
        showOrderCheckout: function(address_id){
            CheckoutView.render(address_id);
        },
        showAddressAdd: function(origin){
            AddressAdd.render(origin);
        },
        showDefault: function(actions){
            var options = {
                'that': this
            };
            Api.activity.control(actions, options, function(isActivity, res, self){
                if(isActivity){
                    if(res.activity_type == 'other'){
                        location.replace(res.activity_url);
                    }else{
                        self.nav('/home/'+res.activity_type);
                    }
                    return;
                }
                console.error('404: '+actions);
            });
        },
        nav: function(hash){
            this.navigate(hash, {trigger: true})
        }
    });

    return AppRouter;
});