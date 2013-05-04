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
    'text!templates/shopping/cartListEmptyTemplate.html'
], function($, _, Backbone, Mipu, Api, FooterView, CartListTemplate, CartListEmptyTemplate){
    var CartListView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #cart_list_template #checkbox_group_01 .name': 'a'
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
                if(self.options.res.result !== 'ok' || !self.options.res.data.items){
                    // 空购物车
                    self.$el.html($.tmpl(CartListEmptyTemplate));
                    return;
                }
                // 购物车有商品
                self.$el.html($.tmpl(CartListTemplate, self.options.res.data));
                // 隐藏底部导航
                console.dir(self.options.res.data);
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
        a: function(e){
            var selfEle, product_id, promotion_id, itemId;
            selfEle = e.currentTarget;
            product_id = $(selfEle).attr('product_id');
            promotion_id = $(selfEle).attr('promotion_id');
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
        }
    });
    return new CartListView;
});
