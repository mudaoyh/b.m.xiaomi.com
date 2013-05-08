/**
 * editConsumptionView.js 编辑购物车商品
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/api',
    'text!templates/shopping/editConsumptionTemplate.html'
], function($, _, Backbone, Mipu, Api, EditConsumptionTemplate){
    var EditConsumptionView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'change #edit_consumption_template select': 'selectChange',
            'click #edit_consumption_template #DelShoppingCartBtn': 'delShopingCart'
        },
        initialize: function(){
            console.log('editConsumptionView init');
        },
        render: function(product_id, item_id){
            this.options.product_id = product_id;
            this.options.item_id = item_id;

            this.process(function(self){
                var compileTemplate = $.tmpl(EditConsumptionTemplate, self.options.res);
                self.$el.html(compileTemplate);
                Mipu.formUi.setSelect.init();
            });
        },
        process: function(callback){
            var options = {
                'that': this
            };
            Api.shopping.cartList(options, function(res, self){
                _.each(res.data.items, function(product){
                    if(product.itemId == self.options.item_id){
                        self.options.res = product;
                        console.log('ok');
                        return;
                    }
                });
                // Todo 购买限制 buy_limit 有坑
                var selectConsumptionArray = [];
                for(i = 1,k=parseInt(self.options.res.buy_limit); i<=k; i+=1){
                    selectConsumptionArray.push(i);
                }
                self.options.res.selectConsumptionArray = selectConsumptionArray;
                callback(self);
            });
        },
        selectChange: function(e){
            var selfEle = e.currentTarget;
            Mipu.formUi.setSelect.changeSelect(selfEle);
        },
        delShopingCart: function(e){
            var product_id, itemId, scenario;
            product_id = this.options.product_id;
            itemId = this.options.item_id;
            scenario = this.options.res.scenario;

            if( confirm('确定要删除该商品吗？') ){
                Api.shopping.delCart({
                    'param': {
                        'product_id': product_id,
                        'itemId': itemId
                    },
                    'that': this
                }, function(res, self){
                    Mipu.popup('删除成功');
                    // Todo 跳转到我的购物车
                });
            }
        }
    });
    return new EditConsumptionView;
});