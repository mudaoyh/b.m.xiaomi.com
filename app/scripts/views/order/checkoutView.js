/**
 * checkout.js 购物车结算
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/api',
    'text!templates/order/checkoutTemplate.html'
], function($, _, Backbone, Mipu, Api, CheckoutTemplate){
    var checkoutView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #checkout_template #OrderCheckoutNextBtn': 'checkOutNext'
        },
        initialize: function(){
            console.log('orderCheckout init');
        },
        render: function(address_id){
            // Todo 获取收货地址
            var address_id = parseInt(address_id);
            if(!address_id){
                this.options.address_id = 0;
            }else{
                this.options.address_id = address_id;
            }

            this.process(function(self){
                var data, compileTemplate;
                data = self.options.res;
                compileTemplate = $.tmpl(CheckoutTemplate, data);

                self.$el.html(compileTemplate);
            });
        },
        process: function(callback){
            var options = {
                'param': {
                    'address_id': this.options.address_id
                },
                'that': this
            };
            Api.order.checkOut(options, function(res, self){
                // Todo 判断是否含有门票 获取发票title 和id
                res.data.invoice_title = 'invoice_title';
                res.data.invoice_id = 'invoic_id';
                res.data.hasTicket = false;

                self.options.res = res.data;
                callback(self);
            });
        },
        checkOutNext: function(){
            /**
             * Todo 下一步
             * 1 验证表单
             * 2 保存订单信息
             * 3 跳转至提交订单
             * */
            debugger;
        }
    });
    return new checkoutView
});
