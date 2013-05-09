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
            'click #edit_consumption_template #DelShoppingCartBtn': 'delShoppingCart',
            'change #edit_consumption_template #xm-select-edit-consumption': 'selectEdit'
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
                Mipu.formUi.setSelect.changeSelect(self.$el.find('#xm-select-edit-consumption'));
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
                        return;
                    }
                });
                if(!!self.options.res){
                    var selectConsumptionArray = [];
                    for(i = 1,k=parseInt(self.options.res.buy_limit); i<=k; i+=1){
                        selectConsumptionArray.push(i);
                    }
                    self.options.res.selectConsumptionArray = selectConsumptionArray;
                    callback(self);
                }else{
                    // 没有匹配到该商品
                    location.replace('#shopping/cartlist');
                }
            });
        },
        selectChange: function(e){
            var selfEle = e.currentTarget;
            Mipu.formUi.setSelect.changeSelect(selfEle);
        },
        delShoppingCart: function(e){
            var product_id, itemId, scenario;
            product_id = this.options.product_id;
            itemId = this.options.item_id;
            scenario = this.options.res.scenario;

            Api.shopping.delCart({
                'param': {
                    'product_id': product_id,
                    'itemId': itemId,
                    'scenario': scenario
                },
                'that': this
            }, function(res, self){
                Mipu.popup('删除成功');
                location.replace('#shopping/cartlist');
            });
        },
        selectEdit: function(e){
            var selfEle, consumption, options;
            selfEle = e.currentTarget;
            consumption = $(selfEle).find('option:selected').val();

            options = {
                'param': {
                    'consumption': consumption,
                    'product_id': this.options.res.product_id,
                    'itemId': this.options.res.itemId,
                    'scenario': this.options.res.scenario
                },
                'that': this
            };

            Api.shopping.editConsumption(options, function(res, self){
                // 修改购物车数量成功
                self.render(self.options.res.product_id, self.options.res.itemId);
            });
        }
    });
    return new EditConsumptionView;
});