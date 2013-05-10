/**
 * cartListView.js 购物车列表
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/api',
    'views/layout/footerView',
    'text!templates/shopping/cartListTemplate.html',
    'text!templates/shopping/cartListEmptyTemplate.html',
    'text!templates/shopping/extendProductViewTemplate.html'
], function($, _, Backbone, Mipu, Api, FooterView, CartListTemplate, CartListEmptyTemplate, extendProductViewTemplate){
    var CartListView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #cart_list_template #checkbox_group_01 .name': 'editPromotion',
            'click #cart_list_template #ShoppingCheckOutBtn': 'checkOut',
            'click #cart_list_template .extendProductViewBtn': 'productView',
            'click #cart_list_template #returnShoppingBtn': 'render'
        },
        initialize: function(){
            console.log('CartListView init');
            this.on({
                'add:promotion': this.addPromotion,
                'del:promotion': this.delPromotion
            });
        },
        render: function(){
            this.process(function(self){
                var data = self.options.res.data;
                if(self.options.res.result !== 'ok' || !data.items.length ){
                    // Todo 空购物车 这有坑
                    self.$el.html($.tmpl(CartListEmptyTemplate));
                    return;
                }
                // 购物车有商品
                self.$el.html($.tmpl(CartListTemplate, self.options.res.data));
                // 隐藏底部导航
                FooterView.remove();
            });
        },
        process: function(callback){
            var options = {
                'that': this
            };
            Api.shopping.cartList(options, function(res, self){
                self.options.res = res;
                callback(self);
            });
        },
        editPromotion: function(e){
            var selfEle, product_id, promotion_id, itemId;
            selfEle = e.currentTarget;
            product_id = $(selfEle).attr('data-productId');
            promotion_id = $(selfEle).attr('data-promotionId');
            itemId = $(selfEle).attr('data-itemId');

            // 用于加入或删除加价购商品调用增加class selected
            this.options.currentPromotionEle = $(selfEle);

            if($(selfEle).parents('.checkbox').hasClass('selected')){
                // 删除加价购商品
                Api.shopping.delCart({
                    'param': {
                        'product_id': product_id,
                        'itemId': itemId
                    },
                    'that': this
                }, function(res, self){
                    Mipu.popup('删除成功');
                    self.trigger('del:promotion');
                });
            }else{
                // 加入加价购商品
                Api.shopping.addCart({
                    'param': {
                        'product_id': product_id,
                        'promotion_id': promotion_id
                    },
                    'that': this
                }, function(res, self){
                    Mipu.popup('成功加入购物车');
                    self.trigger('add:promotion');
                });
            }
        },
        addPromotion: function(){
            var item = this.options.currentPromotionEle.parents('.checkbox');
            item.addClass('selected');
            // 重载数据相当与刷新页面
            this.render();
        },
        delPromotion: function(){
            var item = this.options.currentPromotionEle.parents('.checkbox');
            item.removeClass('selected');
            // 重载数据相当与刷新页面
            this.render();
        },
        checkOut: function(e){
            /**
             * Todo 判断是否包含门票
             * */
            var options = {
                'param': {
                    'address_id': 0
                },
                'that': this
            };
            // 购物车去结算
            Api.order.checkOut(options, function(res, self){
                location.replace('#order/checkout');
            });
        },
        productView: function(e){
            // 配件预览
            var selfEle, data, compileTemplate;
            selfEle = e.currentTarget;
            data = {
                'desc': $(selfEle).attr('data-desc'),
                'imageUrl': $(selfEle).attr('data-imageUrl'),
                'price': $(selfEle).attr('data-price')
            };

            compileTemplate = $.tmpl(extendProductViewTemplate, data);
            this.$el.find('#cart_list_template').html(compileTemplate);
        }
    });
    return new CartListView;
});
