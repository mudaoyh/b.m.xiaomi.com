/**
 * viewView.js 产品详情列表
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'libs/mipu',
    'libs/util',
    'text!templates/product/productViewTemplate.html',
    'lazyload'
], function($, _, Backbone, Mipu, Util, ProductViewTemplate){
    var ProductView = Backbone.View.extend({
        el: $('#viewbody'),
        events: {
            'click #LoadmoreImagesBtn': 'loadMore',
            'change select': 'selectChange',
            'change .xm-select-style': 'selectProduct'
        },
        initialize: function(){
            console.log('productView render');
        },
        render: function(product_id){
            this.options.product_id = product_id;
            this.process(function(self){
                var compileTemplate = $.tmpl(ProductViewTemplate, self.options.res);
                self.$el.html(compileTemplate);
                // 商品详情图片 lazyLoad
                self.$el.find('.imgurl img').lazyload({effect: 'fadeIn'});
                // formSelect 初始化
                Mipu.formUi.setSelect.init();
            });
        },
        process: function(callback){
            var options = {
                url: '/product/view',
                param: {
                    'product_id': this.options.product_id
                },
                that: this
            };
            Mipu.request(options, function(res, self){
                var product, selectConsumptionArray, i, k, stylelist;

                product = res.data.result;
                selectConsumptionArray = [];

                for(i = 1,k=parseInt(product.buy_limit); i<=k; i+=1){
                    selectConsumptionArray.push(i);
                }
                // 购买限制 buy_limit
                product.selectConsumptionArray = selectConsumptionArray;

                product.stylelength = 0;
                for(stylelist in product.style){
                    product.stylelength += 1;
                }
                self.options.res = product;
                callback(self);
            });
        },
        loadMore: function(e){
            var selfEle = e.currentTarget;
            var imgHide = this.$el.find('.product_desc .hide');
            imgHide.eq(0).removeClass('hide');
            imgHide.eq(1).removeClass('hide');
            if(this.$el.find('.product_desc .hide').length == 0){
                $(selfEle).hide();
            }
        },
        selectChange: function(e){
            var selfEle = e.currentTarget;
            // formSelect 选择当前项
            Mipu.formUi.setSelect.changeSelect(selfEle);
        },
        selectProduct: function(e){
            var product_id = $(e.currentTarget).find('option:selected').val();
            location.replace('#/product/view/'+product_id);
        }
    });
    return new ProductView;
});
